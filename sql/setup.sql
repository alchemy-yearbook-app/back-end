-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS cohort_members CASCADE;
DROP TABLE IF EXISTS memorybook CASCADE;

CREATE TABLE github_users (
    uuid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
    email TEXT,
    pronoun TEXT
);

CREATE TABLE cohort (
    -- gH_team_id will be from gitHub teams generated ID
    github_team_id INT NOT NULL PRIMARY KEY,
    -- name is populated from gH teams/students/teams + slug
    name TEXT NOT NULL
);

-- INSERT INTO cohort (github_team_id, name) VALUES (5116318, 'september-2021');

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

INSERT INTO github_users (username) VALUES ('mikemike');

INSERT INTO profile (avatar, first_name, last_name, linked_in, github, quote, company, user_id, email) 
VALUES ('https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/panthers/cxdylbkzafoaeort5joe', 'mikemike', 'jordan', 'https://www.linkedin.com/in/kdo/', 'https://github.com/kevindo1', 'i love pizza', 'piped piper', '1', 'kevind0501@gmail.com');

-- INSERT INTO memorybook 
--     (text)
-- VALUES 
--     -- ('my first memory!'),
--     -- ('my second memory!');
--     (5116318, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.psychologytoday.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Farticle-inline-half%2Fpublic%2Ffield_blog_entry_images%2F1369847707_4085_memory-1.jpg%3Fitok%3DaZRKeJXR&imgrefurl=https%3A%2F%2Fwww.psychologytoday.com%2Fus%2Fblog%2Fthe-young-and-the-restless%2F201411%2Fcase-the-malleable-memory&tbnid=1ubZFsp_6igupM&vet=12ahUKEwj44P6kh6P3AhWeomoFHeeEDsgQMygAegUIARDdAQ..i&docid=GgTjU7ldPzR-PM&w=320&h=244&q=memory%20image&ved=2ahUKEwj44P6kh6P3AhWeomoFHeeEDsgQMygAegUIARDdAQ', 'some audio', 'some text', 'some-resource'),
--     (5022792, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fapi.time.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fmemory.jpg&imgrefurl=https%3A%2F%2Ftime.com%2F3739786%2Fmemory-september-11%2F&tbnid=0yD15Rw88TXKzM&vet=12ahUKEwj44P6kh6P3AhWeomoFHeeEDsgQMygGegUIARDqAQ..i&docid=q1Xt322XLCQGOM&w=2560&h=1703&q=memory%20image&ved=2ahUKEwj44P6kh6P3AhWeomoFHeeEDsgQMygGegUIARDqAQ', 'some-audio', 'some text', 'some resource');


-- alumni_advice: title, advice, github_users(name), alumni_name