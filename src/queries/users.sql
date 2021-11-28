--1.--
-- CREATE TABLE teams (
--   id SERIAL PRIMARY KEY,
--   name varchar
-- );

-- INSERT INTO teams 
-- (name)
-- VALUES
-- ('Fjordie'),
-- ('Mobsters'),
-- ('Rubix'),
-- ('Status202')

--3.--
-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY,
--   date date default now(),
--   user_id int,
--   template_id int,
--   q1answer varchar,
--   q2answer varchar,
--   q3answer varchar
-- );

-- INSERT INTO reviews 
-- (user_id, template_id, q1answer, q2answer, q3answer)
-- VALUES
-- (4, 1, 'answer1', 'answer2', 'answer3' ),
-- (1, 2, 'answer12', 'answer22', 'answer32' ),
-- (8, 3, 'answer13', 'answer23', 'answer33' ),
-- (9, 4, 'answer14', 'answer24', 'answer34' )

--2.--
-- CREATE TABLE templates (
--   id SERIAL PRIMARY KEY,
--   name varchar,
--   q1 varchar,
--   q1type varchar,
--   q2 varchar,
--   q2type varchar,
--   q3 varchar,
--   q3type varchar
-- );

-- INSERT INTO templates 
-- (name, q1, q1type, q2, q2type, q3, q3type)
-- VALUES
-- ('race car', 'q1', 'q1type', 'q2', 'q2type', 'q3', 'q3type' ),
-- ('buy milk', 'q12', 'q12type', 'q22', 'q22type', 'q32', 'q32type' ),
-- ('drink beer', 'q13', 'q13type', 'q23', 'q23type', 'q33', 'q33type' )

-- ALTER TABLE users ADD FOREIGN KEY (team_id) REFERENCES teams (id);

-- ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- ALTER TABLE reviews ADD FOREIGN KEY (team) REFERENCES users (team_id);

-- ALTER TABLE reviews ADD FOREIGN KEY (template_id) REFERENCES templates (id);