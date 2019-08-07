# Mammon Manager Server
Node-Express server. Using MongoDB on-premise as database.

### Project Structure
The `public/` directory contains all files that can be viewed on a browser.

It would help to look at the rest of the important folders in terms of how a request comes in. When an API request is
made, it gets to the `routes/api/` first, which decides which route should trigger which controller action. There is no
logic beyond routing.

* [ ] add an example here

The `controllers/` folder involves implementing the actual logic of what should be done when a request is made to a
certain route. It utilizes the `db/` folder to access our MongoDB database.

* [ ] add another example here

The `db/` folder has all the database access logic, i.e. the basic CRUD calls.

And there you have it, the basic structure of our Node-Express API.

### MongoDB
I've downloaded MongoDB using homebrew, so I start my MongoDB server using the command `brew services start mongodb`.
To access the MongoDB shell, type `mongo`. To shut down the service, use `brew services stop mongodb`. Restart the 
service with `brew services restart mongodb`.

For more options, type `brew info mongodb`. 

#### Switching to Mongo Atlas
MongoDB provides a cloud storage option. The free tier (M0) allows 512MB free storage, which should be sufficient for Mammon Manager's purposes. Refer to the below articles to connect to Mongo Atlas:

- https://docs.atlas.mongodb.com/driver-connection
- https://docs.mongodb.com/ecosystem/drivers/node
