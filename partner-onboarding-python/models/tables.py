from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class IntakeAccount(Base):
    __tablename__ = 'intakeAccounts'

    id = Column(Integer, primary_key=True)
    accountNumber = Column(Integer)
    entityName = Column(String(255), nullable=True)
    firstName1 = Column(String(255))  # Varchar equivalent
    firstName2 = Column(String(255), nullable=True)  # Nullable
    lastName1 = Column(String(255))
    lastName2 = Column(String(255), nullable=True)


class IntakeUser(Base):
    __tablename__ = 'intakeUsers'

    id = Column(Integer, primary_key=True)
    country = Column(String(255))
    firstName = Column(String(255))
    lastName = Column(String(255))
    taxNumber = Column(String(255))
