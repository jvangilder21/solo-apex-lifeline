
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
CREATE TABLE "stats" (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL, 
	kills INT,
	headshots INT,
	damage INT,
	executions INT, 
	revives INT,
	kd INT
);

--New Tracking Table:
CREATE TABLE "challenge" (
    "id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" ("id"),
    "trackedChallenge" VARCHAR(1000) NOT NULL
);

INSERT INTO "challenge" ("trackedChallenge")
VALUES ('Play 5 games with Lifeline'),
('Get 100000 damage with GIBI!');
