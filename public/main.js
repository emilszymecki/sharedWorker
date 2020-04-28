const worker = new SharedWorker("worker.js");
const id = uuid.v4();
//const elArr = [...document.querySelectorAll(".spolecznoscinet")];
//const elArrId = elArr.map(x => x.id.split("-")[1]);

let webSocketState = WebSocket.CONNECTING;

console.log(`Initializing the web worker for user: ${id}`);

worker.port.start();
worker.port.onmessage = event => {
      handleMessageFromPort(event.data);

};


function handleMessageFromPort(input) {
  console.log(`This message is meant only for user with id: ${id}`);
  const {counter,header,data} = input;
  const elArr = [...document.querySelectorAll(".spolecznoscinet")];
  elArr.forEach(element => {
    var idPlacement = element.id
    var idPlacementNB = idPlacement.split("-")[1]
    var selectFromData = data[idPlacementNB] || undefined;
    if(selectFromData !== undefined && !header){
      if(selectFromData.positive.length){
        element.innerText += " duplikat placementy"
      }else{
        element.innerText += " niedozwolone id placementu"
      }
    }
  });
  console.log(counter,header,data,elArr);
}

// Use this method to send data to the server.
function postMessageToWSServer(input) {
    worker.port.postMessage({
      fromData: id,
      placements: input
    });
  
}


setTimeout(() => {
  const elArr = [...document.querySelectorAll(".spolecznoscinet")].map(x => x.id.split("-")[1]);
  postMessageToWSServer(elArr);
},2000);
