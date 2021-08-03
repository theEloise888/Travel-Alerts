# Travel-Alerts

**Overview**

* An app created to allow users to view travel alerts by traveller, region and sub-region as well as to add an advisory for a traveller. 

**Steps to run the app**

Clone this repo locally

* git clone https://github.com/theEloise888/World-Wide-Travel-Alerts.git.

* In the server folder, find the .env file and edit the SERVER constant to SERVER=localhost.

* Setup a free account on MongoDb.  

* In the server folder, set the constant "DBURL" to your own MongoDb connection string, which will be provided under the option Connect > Connect Your Application.

* In the client folder, find all component files and change GRAPHURL to http://localhost:5000/graphql.

* To start the app, run node app on the Server folder and npm start on the Client folder.




