// use crate::schema::{intake_accounts, intake_users};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::intake_accounts)]
#[diesel(check_for_backend(diesel::mysql::Mysql))]
pub struct IntakeAccount {
    pub id: i32,
    pub account_number: i32,
    pub name_first1: String,
    pub name_last1: String,
    pub name_first2: Option<String>,
    pub name_last2: Option<String>,
    pub entity_name: Option<String>,
}

#[derive(Insertable, Queryable, Identifiable, Clone, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::intake_users)]
#[diesel(check_for_backend(diesel::mysql::Mysql))]
pub struct IntakeUser {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub country: String,
    pub tax_number: String,
}
