const express = require("express");
const path = require("path");
const  WebSocket  =  require("ws");
const pug = require('pug');
const {randomGen} = require('./public/randLabel');
const GenArr = [111,222,333,444,555,666];
const app = express();

//console.log(randomGen)

app.use(express.static("public"));
app.set('views', __dirname);
app.set('view engine', 'pug');
//const compiledFunction = pug.compileFile('template.pug');


const wss = new WebSocket.Server({ port: 3001 });


wss.on("connection", ws => {
  console.log('A new client connected!');
  ws.on("message", data => {
    console.log(`Message from client: ${data}`);

    // Modify the input and return the same.
    const  parsed  =  JSON.parse(data);
    ws.send(
      JSON.stringify({
        ...parsed.data,
        // Additional field set from the server using the from field.
        // We'll see how this is set in the next section.
        //messageFromServer: `Hello tab id: ${parsed.data.from}`
      })
    );
  });
  ws.on("close", () => {
    console.log("Sad to see you go :(");
  });
});

app.get('/', function (req, res) {
  res.render('index', {title:"test" , randomGen: randomGen(GenArr)})
})

// Listen for requests for static pages at 3000
const server = app.listen(3000, function() {
  console.log("The server is running on http://localhost:" + 3000);
});

