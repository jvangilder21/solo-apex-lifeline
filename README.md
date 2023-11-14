
# Apex Lifeline Summary

Apex Lifeline is an application that allows an Apex Legends player to track and edit their in game stats. The user will also be able to add and track any challenge. Challenges can be daily, weekly, event, or one of the users own challenge they would like to track and complete. This app gives the user and player the option to see their stats even when in the middle of a game as you cannot see the challenges while in the game. When games can last 23 minutes, it can be frustrating to complete a challenge if you forgot which challenges you were trying to complete.

# Apex Lifeline Test Username Login

[Apex Lifeine](https://salty-beyond-11648-3029f82166f3.herokuapp.com/#/home) is hosted on Heroku. To test how the app works please enter the following:

Username: GetSkittyWitIt
Password: ApexLifeline

This will load and show you how certain stats load into the same. If stats say "Loading..." instead of a number this means that the user either has not:

- unlocked the stat
- doesn't have any stats for this stat
- username is new and needs 48 hours for the API to load their stats.

# Apex Lifeline Starting Repo
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account. Make the project `PUBLIC`!

## Design and Functionality

The application functionality and flow from page to page is shown below. All screenshots shown in the wireframe below are all noted in the WireFrames Folder. A week was spent scoping the flow and functionality of the app. The scope document was written, planned, and designed before any code was ever written. 

![Apex Lifeline Functionality WireFrame Flow](<WireFrames/00 Apex Lifeline WireFrame Whole.png>)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Create a new database called `apex_lifeline` and create the following tables:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--Stats table:
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

--Tracking Table:
CREATE TABLE "challenge" (
    "id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" ("id"),
    "trackedChallenge" VARCHAR(1000) NOT NULL
);

--Test Data to Start With:
INSERT INTO "challenge" ("trackedChallenge")
VALUES ('Play 5 games with Lifeline'),
('Get 100000 damage with GIBI!');
```

If you would like to name your database something else, you will need to change `apex_lifeline` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm install`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## API Development Setup Instructions

- This app uses the [APEX LEGENDS STATUS API](https://apexlegendsapi.com/#introduction).
- You must register for an API key to receive your API key. To register for an API key, click on the [API Portal](https://portal.apexlegendsapi.com/).
  Fill out the Create an API key form and submit by clicking the Create my API key button. You may need to link your discord account if prompted.
- When you receive your API key, do not share this with anyone. Save it somewhere if you would like or save the link as you can request your API key at anytime 
  on the site.
- Once the API key is received and or saved, make sure to add your API key in your .env file as we do not want to commit this for the public. It should look like:
  API_KEY="ENTER_API_KEY_HERE"
- Make sure to read through the documentation to get a feel for the API.
- Postman is a great tool when testing which GET request is best to use and what resulting are outputting. 

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Technologies Used

- CSS
- JavaScript
- Node.js
- Express
- React
- Redux
- Redux-Saga
- PostgreSQL
- Postico
- Passport
- Material UI
- Visual Studio Code
- [APEX LEGENDS STATS API](https://apexlegendsapi.com/#introduction)

## Application Use

- New users will need to Register first to load their stats.
- The username will need to be their Origin User name and a password
- Once logged in, the user will be navigated to the Home Page.
- From the HOME page the user can select the OVERALL STATS or TRACKED CHALLENGES buttons or navigate with the navigation bar on the top right.
- To add stats to their HOME page, the user will select the OVERALL STATS page. 
- From here, the user will select ADD STATS to add their stats to their OVERALL STATS HOME PAGE.
- The ADD STATS page will need a few moments to pull and update the users most recent stats so that the user can select the stats to display on their page. If the stats do not update to a number and stays at the Loading... this means the user does not have this tracker set on their in game legend or they do not have any stats available.
- The user can click on any button to select and click again to de-select the stats. Selected stats will display in the SELECTED STATS box below.
- Once the user has selected the stats and saved them, the user will be re-directed to the OVERALL STATS page. 
- If the user would like to edit their stats, the user can select the EDIT STATS button to bring them to the EDIT STATS page.
- Once on the EDIT STATS page the user can see their previously selected stats and have the option to select new stats. The user will be able to select and de-select stats and then save when ready. Once saved, the user will be re-directed to the OVERALL STATS page again, displaying their new stats.
- If the user would like to track their challenges, the user can click on the TRACKED CHALLENGES button on the HOME page or click the CHALLENGES button from the navigation bar on the top right.
- Once the user has been re-directed to the Tracked Challenges page, the user can add the in game daily, weekly, event, and/ or any challenge the user would like to add on their page. 
- Once the user has added a challenge, they may edit the challenge if they need to update the challenge or can mark the challenge completed once the challenge has been accomplished.

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. Add an environment variable for `API_KEY` with your API key - Do not include the "" that are in your VS Code.
1. In the deploy section, select manual deploy

## Special Thanks!

I am immensely grateful for the invaluable guidance and support provided by my instructors, code-coaches, and cohort mates at Prime Digital Academy. This application stands as a testament to the invaluable support and guidance they provided, without which its creation would not have been possible. Thank You!!

