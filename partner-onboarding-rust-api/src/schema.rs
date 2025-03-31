table! {
    intake_accounts (id) {
        id -> Integer,
        account_number -> Integer,
        name_first1 -> Text,
        name_last1 -> Text,
        name_first2 -> Nullable<Text>,
        name_last2 -> Nullable<Text>,
        entity_name -> Nullable<Text>,
    }
}

table! {
    intake_users (id) {
        id -> Integer,
        first_name -> Text,
        last_name -> Text,
        country -> Text,
        tax_number -> Text,
    }
}
