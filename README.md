# TodoList
A Todo list application 

Tools Used :
- Node js
- Express js
- EJS
- Mongodb
- Heroku

In this application the user can add tasks for the current day in the home page 
Going to any route (baseurl/someList) will take the user to another List if it already exists else it creates one. 

The application code is in the file "app.js" , the view folder consists of different Ejs files for differnt views.
The static files are in the public folder.

The application is currently hosted on heroku at https://guarded-gorge-01824.herokuapp.com/

## To Run the project
- clone the repository https://github.com/kanhayaKy/TodoList
- To use localdatabase , start your mongodb server by running the command : mongod 
- To use a cloud database , copy your database url to the variable 'url' in app.js
- Navigate into the project and run the app.js using the command  : node app.js
- You're now ready to create your todo list.
