from contextlib import contextmanager


from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from dotenv import load_dotenv
from pathlib import Path

import os

env = '.env.development' if os.getenv('FLASK_ENV') == 'development' else '.env'
load_dotenv(Path('.') / env)

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(f'mysql+pymysql://{DATABASE_URL}')

sessionLocal = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)


@contextmanager
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables(Base):
    engine = create_engine(f'mysql+pymysql://{DATABASE_URL}')
    Base.metadata.create_all(engine)
    print("Tables created successfully!")


if __name__ == "__main__":
    from models.tables import Base, IntakeAccount, IntakeUser
    create_tables(Base)
