-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS memorybook CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;

CREATE TABLE github_users (
    uuid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT,
);

CREATE TABLE profile (
    id BIGINT REFERENCES github_users(uuid),
    avatar TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    linked_in VARCHAR,
    github VARCHAR,
    quote TEXT NOT NULL,
    company TEXT
);

CREATE TABLE cohort (
    id BIGINT REFERENCES github_users(uuid),
    name TEXT NOT NULL
);

CREATE TABLE memorybook (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cohort_name TEXT REFERENCES cohort(name),
    image TEXT,
    audio TEXT
);

CREATE TABLE user_permissions (
    user_id BIGINT REFERENCES github_users(uuid),
    memory_id BIGINT REFERENCES memorybook(id)
);