-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS cohort_members CASCADE;
DROP TABLE IF EXISTS memorybook CASCADE;

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
    company TEXT,
    email TEXT
);

CREATE TABLE cohort (
    -- gH_team_id will be from gitHub teams generated ID
    github_team_id INT NOT NULL UNIQUE,
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


INSERT INTO github_users (email, username) 
VALUES ('mike@gmail.com', 'mikemike');

INSERT INTO profile (avatar, first_name, last_name, linked_in, github, quote, company, user_id) 
VALUES ('https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/panthers/cxdylbkzafoaeort5joe', 'mikemike', 'jordan', 'https://www.linkedin.com/in/kdo/', 'https://github.com/kevindo1', 'i love pizza', 'piped piper', '1');
