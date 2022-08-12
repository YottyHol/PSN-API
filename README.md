# PSN-API
Setup Steps:

1. You will need an instance of a database, in this case I have used MySQL and created the table mydb using the youtube.sql script

2. Add your .env file and variables. The .env.example shows how this should be structure, using MySQL all you will need to add is your APP_KEY and MYSQL_PASSWORD 

3. Populate your empty repository by running a POST request to http://127.0.0.1:3333/api/store
