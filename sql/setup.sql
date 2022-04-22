-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS no_profile CASCADE;
DROP TABLE IF EXISTS your_cohort CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS cohort_members CASCADE;
DROP TABLE IF EXISTS memorybook CASCADE;
DROP TABLE IF EXISTS advice CASCADE;

CREATE TABLE github_users (
    uuid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    github_user_id INT UNIQUE,
    username TEXT
);

CREATE TABLE no_profile(
    no_profile_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    github_user_id INT UNIQUE,
    html_url TEXT
);

CREATE TABLE your_cohort(
    your_cohort_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    github_user_id INT UNIQUE
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
    email TEXT,
    pronoun TEXT
);

CREATE TABLE cohort (
    -- gH_team_id will be from gitHub teams generated ID
    github_team_id INT NOT NULL PRIMARY KEY,
    -- name is populated from gH teams/students/teams + slug
    name TEXT
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
    resource_url TEXT,
    name TEXT NOT NULL
);

CREATE TABLE advice (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    advice TEXT NOT NULL,
    alumni_name TEXT,
    cohort TEXT NOT NULL
);


INSERT INTO github_users (username, github_user_id) VALUES ('mikemike', 1);

INSERT INTO 
    profile (avatar, first_name, last_name, linked_in, github, quote, company, user_id, email) 
VALUES 
    ('https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/panthers/cxdylbkzafoaeort5joe', 'mikemike', 'jordan', 'https://www.linkedin.com/in/kdo/', 'https://github.com/kevindo1', 'i love pizza', 'piped piper', '1', 'kevind0501@gmail.com'),

    ('https://avatars.githubusercontent.com/u/71483160?v=4', 'Gabriel', 'Simek', 'https://www.linkedin.com/in/gabrielsimek/', 'https://github.com/gabrielsimek', 'for sureeeee', '4');
    



INSERT INTO cohort (github_team_id, name)
VALUES (5116318, 'september-2021');

INSERT INTO memorybook (cohort_id, image_url, audio, text, resource_url, name)
VALUES ('5116318', 'https://i.ibb.co/qB7Pw9w/IMG-9759.jpg', '', 'test', '', 'kevin');
