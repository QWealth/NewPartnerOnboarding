from typing import TypedDict, Optional


class TypedAccount(TypedDict):
    accountNumber: int
    entityName: str
    firstName1: str
    firstName2: Optional[str]
    lastName1: str
    lastName2: Optional[str]


class TypedUser(TypedDict):
    firstName: str
    lastName: str
    country: str
    taxNumber: str


class AddUserAccounts(TypedDict):
    Accounts: list[TypedAccount]
    Users: list[TypedUser]
