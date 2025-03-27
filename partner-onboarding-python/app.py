import logging
from os import getenv, path, remove
from werkzeug.utils import secure_filename


from flask import Flask, jsonify, request
from sentry_sdk import add_breadcrumb, capture_exception, init


from database import sessionLocal
from models.tables import IntakeAccount, IntakeUser
from request_types.new_account import AddUserAccounts
import boto3
from pathlib import Path
from dotenv import load_dotenv


logging.basicConfig(level=logging.WARNING)

app = Flask(__name__)


# enable for local development. Cors handled by NBINX otherwise...
# from flask_cors import CORS
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:5173", "http://localhost:5174", "https://ifn.qcentral.qwnext.com", "*"],
#         "allow_headers": ["Authorization", "Content-Type"],
#         "supports_credentials": True
#     }
# })

load_dotenv(Path('.') / '.env')

app.secret_key = 'zjadzona_rosślinka'
BUCKET_NAME = getenv('AWS_S3_BUCKET')


def before_send(event, hint):
    if isinstance(hint.get('exc_info', tuple())[1], ValueError):
        return None
    return event


init(
    dsn="https://335e54e29f2d0a74e98a291a8a61097e@o1168654.ingest.us.sentry.io/4509049998934016",
    before_send=before_send
)


@app.route('/', methods=["GET", "POST", "OPTIONS"])
def elb_health_check():
    return "ok", 200


@app.route('/health', methods=["GET", "OPTIONS"])
def nginx_health_check():
    return "ok", 200


@app.route('/addUser', methods=["POST"])
def get_add_humans():
    incoming_json: AddUserAccounts = request.json

    intake_account_records: list[IntakeAccount] = []
    for account in incoming_json.get('Accounts'):
        intake_account_records.append(IntakeAccount(**account))
        add_breadcrumb(message='user account', data=account)

    intake_user_records: list[IntakeUser] = []
    for user in incoming_json.get('Users'):
        intake_user_records.append(IntakeUser(**user))
        add_breadcrumb(message='user added', data=user)

    try:
        session = sessionLocal()
        print(session)
        ans = session.add_all(
            [
                *intake_user_records,
                *intake_account_records
            ]
        )
        session.commit()
        print(ans)
    except Exception as exc:
        capture_exception(exc)
        return str(exc), 500

    return "yay!", 201


@app.route('/uploadId', methods=["POST"])
def upload_files():
    if 'file' not in request.files:
        return "No file!", 400
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    file = request.files['file']

    filename = secure_filename(file.filename)

    s3_client = boto3.client('s3',
                             aws_access_key_id=getenv('AWS_ACCESS_KEY_ID'),
                             aws_secret_access_key=getenv(
                                 'AWS_SECRET_ACCESS_KEY'),
                             region_name=getenv('AWS_REGION'))
    UPLOAD_FOLDER = './uploads'

    try:
        # Optional: Save the file locally first, then upload to S3
        file_path = path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        s3_client.upload_file(file_path, BUCKET_NAME, filename)

        remove(file_path)

        return jsonify({
            "status": "success",
            "message": f"File uploaded successfully to S3 with name {filename}",
            "firstName": first_name,
            "lastName": last_name,
            "s3FileUrl": f"https://{BUCKET_NAME}.s3.amazonaws.com/{first_name}_{last_name}_{filename}"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
