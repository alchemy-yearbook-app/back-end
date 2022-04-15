-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS memorybook CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;
DROP TABLE IF EXISTS cloudinary CASCADE;
DROP TABLE IF EXISTS cohort_members CASCADE;

CREATE TABLE github_users (
    uuid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT,
    username TEXT
    -- profile
    -- member_id
);

CREATE TABLE profile (
    user_id BIGINT REFERENCES github_users(uuid),
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    avatar TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    linked_in VARCHAR,
    github VARCHAR,
    quote TEXT NOT NULL,
    company TEXT
);

CREATE TABLE cohort (
    -- gH_team_id will be from gitHub teams generated ID
    github_team_id BIGINT NOT NULL,
    -- name is populated from gH teams/students/teams + slug
    name TEXT NOT NULL
);

CREATE TABLE cohort_members (
    user_id BIGINT REFERENCES github_users(uuid),
    cohort_id BIGINT REFERENCES cohort(github_team_id)
);

CREATE TABLE memorybook (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cohort_id BIGINT REFERENCES cohort(github_team_id),
    image_url TEXT,
    audio TEXT,
    text TEXT,
    resource_url TEXT
    -- maybe name
);