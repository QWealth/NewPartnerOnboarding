use mysql::prelude::*;
use mysql::*;

#[test]
fn test_database_connection() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    let url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set in .env file");

    println!("Attempting to connect to MySQL {}", url);

    let opts = Opts::from_url(&url)?;
    let pool = Pool::new(opts)?;

    let mut conn = pool.get_conn()?;

    let result: Option<i32> = conn.query_first("SELECT 1")?;
    assert_eq!(result, Some(1));

    println!("✅ MySQL connection test passed!");
    Ok(())
}
