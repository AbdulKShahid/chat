
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 3000;                  //Save the port number where your server will be listening
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const {pool} = require('./db.js');
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {     
    
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        res.json(results.rows);
    })
      //get requests to the root ("/") will route here
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});