# Partner Onboarding Portal

A full-stack application for streamlining new partner onboarding processes, built with Flask (Python backend) and React (TypeScript frontend).

## File Structure

```
new-partner-onboarding/
├── partner-onboarding-flask/
│   ├── app.py
│   ├── tests/
    │       └── new client portal.postman_collection.json #importable test collection
│   └── .env       # Flask configuration
│
├── partner-onboarding-react-app/
│   ├── public/
│   ├── src/
│   └── tsconfig.json
├── scripts/            # Scripts to create dependencies
└── .gitignore          # Version control ignore rules
```

## Prerequisites

- Node.js 16+ (for frontend)
- Python 3.9+ (for backend)
- PostgreSQL 12+ (or SQLite for development)
- Git

## Development Setup

### Backend (Flask)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. create virtual env:

```
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate     # Windows

```

3. install dependencies:

```
pip install -r requirements.txt
```

4. Configure environment variables

put env file into `partner-onboarding-python/.env`

5. run flask `flask run --port 5001`

### Frontend (React+Vite+TailwindCSS)

in a second terminal:

1. Navigate to the frontend directory
   `cd partner-onboarding-react-app`

2. Install dependencies:
   `npm install`

3. start dev server
   `npm run dev`

the application will be available at `http://localhost:3000`. The url is not yet deployed

# Production Deploment

IN PROGRESS ...
