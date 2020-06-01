use jumbo;
CREATE TABLE user (
    user_id VARCHAR(1000) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    token VARCHAR(1000) NOT NULL,
    is_admin INT(1) NOT NULL
)