# Libraries_Project
## A Visual Analysis of Libraries Across the United States
#### University of Minnesota Data Visualization & Analysis Boot Camp
Laura Gabrielson, Beau Jeffrey, Melissa Lowe, Stephanie Richards

![Franklin Library Reading Room, Minneapolis](/static/images/franklin-library.jpg)

For this project, we used a dataset from [Kaggle](https://www.kaggle.com/) containing the results of the [2014 Public Libraries Survey](https://www.kaggle.com/imls/public-libraries) conducted by the Institute of Museum and Library Sciences in conjunction with the United States Census Bureau. We chose this dataset based on its size, completeness, and the fact that it had partially been cleaned, reducing the need for extensive ETL before we built our dashboard.

This repo contains everthing necessary to recreate our project. Please follow the instructions listed below to download the data, re-create our database, and display our findings. 

## Instructions for creating our United States Libraries database and running the website that displays its data.

1. Clone repo.
1. Create a *config.py* file in the directory at the same level as the *Libraries.ipynb* file. Enter the following information. You will have to enter your own password where specified:
```
username = '<your username here>'
password = '<your password here>'
host = 'localhost'
port = 5432
database = 'libraries_db'
```
1. Save *config.py*.
1. Create a *config.js* file in the static/JS folder with the following content. Be sure to use your own [Mapbox API key](https://www.mapbox.com/):
```
const API_KEY = "<your Mapbox API key here>"
```
1. Save *config.js*.
1. Open pgAdmin.
1. Create a database called 'libraries_db'.
1. Open the query tool and open the *schema.sql* file.
1. Run the *schema.sql* file to create the 'libraries' table.
1. Open a Terminal/Gitbash on the root folder (Libraries_Project).
1. Type ```source activate PythonData``` and press the enter key to activate the Python environment.
1. Type ```jupyter notebook``` launch the Jupyter Notebook.
1. Open the *Libraries.ipynb* file.
1. Run all of the cells in the *Libraries.ipynb* file.
1. Go back to pgAdmin to see the data in the database.
1. In your Terminal/Gitbash, type ```python app.py``` and hit enter to run the Flask app.
1. [Click this link](http://127.0.0.1:5000/) or open a web browser--preferrably Google Chrome--and type ```http://127.0.0.1:5000/``` into the url bar. Hit enter.