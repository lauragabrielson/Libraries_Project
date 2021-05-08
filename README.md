# Libraries_Project
Analysis of libraries across the United States

## Instructions for creating our United States Libraries database and running the website that displays it's data.

1. Create a *config.py* file in the directory at the same level as the *Libraries.ipynb* file. Enter the following information. You will have to enter your own password where specified:
```
user = 'postgres'
password = '<your password here>'
host = 'localhost'
port = 5432
database = 'catchphrases_db'
```
3. Save the file.
4. Open pgAdmin.
4. Create a database called 'libraries_db'.
5. Open the query tool and open the *schema.sql* file.
6. Run the file to create the 'libraries' table.
7. Open the *Libraries.ipynb* file.
8. Run all of the cells in the file.
9. Go back to pgAdmin to see the data in the database.
10. Open a Terminal/Gitbash on the root folder (Libraries_Project).
11. Type ```source activate PythonData``` and press the enter key to activate the Python environment.
12. Type ```python app.py``` to run the Flask app.
13. [Click this link](http://127.0.0.1:5000/) or open a web browser--preferrably Google Chrome--and enter ```http://127.0.0.1:5000/``` into the url bar.