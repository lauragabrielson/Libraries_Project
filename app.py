# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from config import (username, password, port, database)
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Define the database connection parameters
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table = base.classes.libraries

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage


@app.route("/donut")
def donut():
    ''' Query the database and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.mls_librarians, table.librarians, table.employees, table.total_staff, table.library_name, table.state, table.state_name).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_employees = []
    for mls_librarians, librarians, employees, total_staff, library_name, state, state_name in results:
        dict = {}
        dict["mls_librarians"] = mls_librarians
        dict["librarians"] = librarians
        dict["employees"] = employees
        dict["total_staff"] = total_staff
        dict["library_name"] = library_name
        dict["state"] = state
        dict["state_name"] = state_name
        all_employees.append(dict)

    # Return the jsonified result. 
    return jsonify(all_employees)

@app.route("/libraries_map")
def libraries_map():
    ''' Query the database and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.lat, table.lon, table.services_population, table.bookmobiles, table.library_name, table.state, table.state_name).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_libraries = []
    for lat, lon, services_population, bookmobiles, library_name, state, state_name in results:
        dict = {}
        dict["lat"] = lat
        dict["lon"] = lon
        dict["services_population"] = services_population
        dict["bookmobiles"] = bookmobiles
        dict["library_name"] = library_name
        dict["state"] = state
        dict["state_name"] = state_name
        all_libraries.append(dict)

    # Return the jsonified result. 
    return jsonify(all_libraries)



@app.route("/libraries_bar")
def libraries_bar():
    ''' Query the database and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.print_collection, table.digital_collection, table.audio_collection, table.downloadable_audio, table.physical_video, table.downloadable_video, table.library_name, table.state, table.state_name).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_collections = []
    for print_collection, digital_collection, audio_collection, downloadable_audio, physical_video, downloadable_video, library_name, state, state_name in results:
        dict = {}
        dict["print_collection"] = print_collection
        dict["digital_collection"] = digital_collection
        dict["audio_collection"] = audio_collection
        dict["downloadable_audio"] = downloadable_audio
        dict["physical_video"] = physical_video
        dict["downloadable_video"] = downloadable_video
        dict["library_name"] = library_name
        dict["state"] = state
        dict["state_name"] = state_name
        all_collections.append(dict)

    # Return the jsonified result. 
    return jsonify(all_collections)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)