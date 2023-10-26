
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Latest stats table:
CREATE TABLE stats (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL, 
	kills INT,
	headshots INT,
	damage INT,
	executions INT, 
	revives INT,
	kd INT,
	display_order INT
);