#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel;

mod db;
mod models;
mod schema;

use db::DbPool;
use diesel::prelude::*;
use models::{IntakeAccount, IntakeUser};
use rocket::State;
use rocket::serde::json::Json;

#[get("/")]
fn index() -> &'static str {
    "Welcome to the API"
}

#[post("/intake/accounts", format = "json", data = "<new_account>")]
async fn create_intake_account(
    state: &State<DbPool>,
    new_account: Json<IntakeAccount>,
) -> Json<IntakeAccount> {
    use schema::intake_accounts::dsl::*;
    let mut conn = state.inner().get().expect("Failed to get DB connection");

    diesel::insert_into(intake_accounts)
        .values(&new_account.into_inner())
        .execute(&mut conn)
        .expect("Error inserting account");

    let account = intake_accounts
        .order(id.desc())
        .first::<IntakeAccount>(&mut conn)
        .expect("Error loading account");

    Json(account)
}

#[post("/intake/users", format = "json", data = "<new_user>")]
async fn create_intake_user(state: &State<DbPool>, new_user: Json<IntakeUser>) -> Json<IntakeUser> {
    use schema::intake_users::dsl::*;
    let mut conn = state.inner().get().expect("Failed to get DB connection");

    diesel::insert_into(intake_users)
        .values(&new_user.into_inner())
        .execute(&mut conn)
        .expect("Error inserting user");

    let user = intake_users
        .order(id.desc())
        .first::<IntakeUser>(&mut conn)
        .expect("Error loading user");

    Json(user)
}

#[launch]
fn rocket() -> _ {
    let db_pool = db::init_db();
    rocket::build().manage(db_pool).mount(
        "/",
        routes![
            index,
            create_intake_account, // Make sure this matches the function name exactly
            create_intake_user
        ],
    )
}
