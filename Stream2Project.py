from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
 
app = Flask(__name__)

#The os module will determine which environment variables to use from where they are supplied from
#Local Connection
MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'Stream2Project-LOCAL-DB')
#Remote Connection
#MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://Stream2Bod:Stream2Project123@ds129442.mlab.com:29442/heroku_2z1cv575')
#DBS_NAME = os.getenv('MONGO_DB_NAME', 'heroku_2z1cv575')
COLLECTION_NAME = 'projects'

 
@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")
 
 
@app.route("/footy/projectdata")
def stream2_projects():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """
 
    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'transfer_window': True, 'season': True, 'player_name': True,
        'league_moving_from': True, 'club_moving_from': True,
        'league_moving_to': True, 'club_moving_to': True, 'fee': True, 'date': True
    }
 
    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    # The MONGO_URI connection is required when hosted using a remote mongo db.
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to a lower limit of 20000
        projects = collection.find(projection=FIELDS, limit=20000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))
 
 
if __name__ == "__main__":
    app.run(debug=True)