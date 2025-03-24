
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 3000;                  //Save the port number where your server will be listening
const bodyParser = require('body-parser')
const messagesRouter = require('./routes/messages.js');
const usersRouter = require('./routes/users.js');
const cors = require('cors');
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Set up CORS
app.use(cors({
  origin: true, // "true" will copy the domain of the request back
                // to the reply. If you need more control than this
                // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
                     // authenticated via either a session cookie
                     // or Authorization header. Otherwise the
                     // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                         // pre-flight OPTIONS requests
}));

app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});