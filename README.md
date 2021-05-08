# Libraries_Project
Analysis of libraries across the United States

## Instructions for creating our United States Libraries database and running the website that displays it's data.

1. Clone repo.
2. Create a *config.py* file in the directory at the same level as the *Libraries.ipynb* file. Enter the following information. You will have to enter your own password where specified:
```
username = '<your username here>'
password = '<your password here>'
host = 'localhost'
port = 5432
database = 'libraries_db'
```
3. Save *config.py*.
4. Create a *config.js* file in the static/JS folder with the following content. Be sure to use your own [Mapbox API key](https://www.mapbox.com/):
```
const API_KEY = "<your Mapbox API key here>"
```
5. Save *config.js*.
6. Open pgAdmin.
7. Create a database called 'libraries_db'.
8. Open the query tool and open the *schema.sql* file.
9. Run the *schema.sql* file to create the 'libraries' table.
10. Open a Terminal/Gitbash on the root folder (Libraries_Project).
11. Type ```source activate PythonData``` and press the enter key to activate the Python environment.
12. Type ```jupyter notebook``` launch the Jupyter Notebook.
13. Open the *Libraries.ipynb* file.
14. Run all of the cells in the *Libraries.ipynb* file.
15. Go back to pgAdmin to see the data in the database.
16. In your Terminal/Gitbash, type ```python app.py``` and hit enter to run the Flask app.
17. [Click this link](http://127.0.0.1:5000/) or open a web browser--preferrably Google Chrome--and type ```http://127.0.0.1:5000/``` into the url bar. Hit enter.