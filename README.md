# Libraries_Project
Analysis of libraries across the United States

## Instructions for creating our United States Libraries database and running the website that displays it's data.

1. Create a *config.py* file with the following content. You will have to enter your own password where specified:
```
user = 'postgres'
password = '<your password here>'
host = 'localhost'
port = 5432
database = 'catchphrases_db'
```
2. Open pgAdmin.
3. Create a database called 'libraries_db'.
4. Open the query tool and open the *schema.sql* file.
5. Run the file to create the 'libraries' table.
6. Open the *Libraries.ipynb* file.
7. Run all of the cells in the file.
8. Go back to pgAdmin to see the data in the databases.
9. Open a Terminal/Gitbash on the root folder (Libraries Project).
10. Type ```source activate PythonData``` and press the enter key to activate the Python environment.
11. Type ```python app.py``` to run the Flask app.
12. [Click this link](http://127.0.0.1:5000/) or open a web browser--preferrably Google Chrome--and enter ```http://127.0.0.1:5000/``` into the url bar.