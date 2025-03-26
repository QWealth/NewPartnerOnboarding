#[macro_use] extern crate rocket;

mod db;

use rocket::State;
use diesel::mysql::MysqlConnection;
use diesel::r2d2::ConnectionManager;
use rocket::serde::json::Json;

#[get("/")]
async fn index(state: &State<db::DbPool>) -> Json<String> {
    use diesel::prelude::*;
    let conn = state.inner().get().expect("Failed to get DB connection");

    let result = diesel::sql_query("SELECT 1")
        .execute(&conn)
        .expect("Query failed");

    Json(format!("Hello, world! DB Result: {}", result))
}

#[launch]
fn rocket() -> _ {
    let db_pool = db::init_db();
    rocket::build()
        .manage(db_pool)
        .mount("/", routes![index])
}