# NewPartnerOnboarding

`npm run dev` will run dev (lol) from inside the front-end folder.

# Flask

```
set FLASK_APP=app.py
set FLASK_ENV=development
```

# create database

will create the db where-ever your connection is
`python3 -m database`

## Backend (unfinished)

`cargo run` will run the api
`cargo test` will run all tests
`cargo test --test test_conn` will test test_conn

# local testing:

## mysql

### install

`brew install mysql`

### start

`brew services start mysql`

    to connect: `mysql -u root -p ` (unless you set up password)

you may need to create a local test db:

```
CREATE DATABASE qw_prod
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```
