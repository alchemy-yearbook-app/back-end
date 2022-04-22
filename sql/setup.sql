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

    ('https://avatars.githubusercontent.com/u/71483160?v=4', 'Gabriel', 'Simek', 'https://www.linkedin.com/in/gabrielsimek/', 'https://github.com/gabrielsimek', 'for sureeeee', 'CareRev', '1', ''),

    ('https://avatars.githubusercontent.com/u/88062154?v=4', 'Indy', 'Holdsworth', 'https://www.linkedin.com/in/h-indiana-holdsworth/', 'https://github.com/H-Indiana-Holdsworth', 'Indy out yo', '', '1', 'indianaholdsworth@gmail.com'),

    ('https://avatars.githubusercontent.com/u/80404797?v=4', 'Kevin', 'Do', '', 'https://github.com/kevindo1', 'lets Git this bread', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/88409474?v=4', 'Mark', 'Voltaire', '', 'https://github.com/markjvoltaire', '', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/90009901?v=4', 'Mira', 'Kinebuchi', '', 'https://github.com/mira-kine', 'i seen LOTS', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/89114786?v=4', 'Phoenix', 'Nicholson', '', 'https://github.com/phoenix-nicholson', 'if the test is green the code is clean', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/70282366?v=4', 'Andrew', 'Joy', '', 'https://github.com/ajoy267', 'is it an error or do I not know what im doing?', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/88357710?v=4', 'Brett', 'Seifried', '', 'https://github.com/BrettSeifried', 'I had 0 grey hair before starting Alchemy, look at me now', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/88062994?v=4', 'Chase', 'Crowder', '', 'https://github.com/gcrowder93', 'love you bye', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/89051411?v=4', 'James', 'Demiraiakian', '', 'https://github.com/james-demiraiakian', '/R\/E\G\\E/X\', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/85650484?v=4', 'Karyssa', 'Dandrea', '', 'https://github.com/karyssa-dandrea', 'what would michelle do?', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/69729289?v=4', 'Michelle', 'Nygren', '', 'https://github.com/michellerenehey', 'what would emma do?', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/89104000?v=4', 'Libbi', 'Dunham', '', 'https://github.com/libbi-dunham', 'love you byeee and MISS GIRL', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/86867967?v=4', 'Spencer', 'Eagleton', '', 'https://github.com/spencer-eagleton', 'To live is to suffer', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/89110001?v=4', 'Violet', 'Stewart', '', 'https://github.com/VioletKatrinStewart', 'No matter where you go, everyones connected. - Lain Iwakura', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/85139250?v=4', 'Zachary', 'Caldwell', '', 'https://github.com/zcaldwell', 'Pobodys Nerfect.', '', '1', ''),

    ('https://avatars.githubusercontent.com/u/29679939?v=4', 'Casey', 'Cameron', '', 'https://github.com/CaseyCameron', 'Get off my lawn', '', '1', '');
    



INSERT INTO cohort (github_team_id, name)
VALUES (5116318, 'september-2021');

INSERT INTO memorybook (cohort_id, image_url, audio, text, resource_url, name)
VALUES 
    ('5116318', 'https://i.ibb.co/qB7Pw9w/IMG-9759.jpg', '', 'when employee directory', '', 'Titanium'),
    ('5116318', '', '', 'You (Phoenix) and Kevin can`t even spend one day apart from each other???', '', '-Libbi'),
    ('5116318', 'https://i.ibb.co/vQ5pf8H/IMG-9771-2.jpg', '', 'When Git Revert', '', 'Titanium'),
    ('5116318', 'https://emoji.slack-edge.com/T6FCZF1HR/potato-head/6c637bbe90391dfd.png', '', 'Dan`s potato', '', '-Dan'),
    ('5116318', '', '', 'booger', '', '-Julie'),
    ('5116318', '', '', '"How do you center a Div??" Thats impossible', '', '-Mark'),
    ('5116318', 'https://i.ibb.co/qWMbJF5/screen-shot-2022-01-21-at-12-01-13-pm.png', '', '', '', 'Foundations w/ Julie'),
    ('5116318', 'https://i.ibb.co/yqKbThd/image-from-ios.jpg', '', '','', 'In person meet up')