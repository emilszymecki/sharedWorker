const worker = new SharedWorker("worker.js");
const id = uuid.v4();


let webSocketState = WebSocket.CONNECTING;

console.log(`Initializing the web worker for user: ${id}`);

worker.port.start();
worker.port.onmessage = event => {
      console.log(event, "EVENT!!!");
      handleMessageFromPort(event.data);

};


function handleMessageFromPort(data) {
  console.log(`This message is meant only for user with id: ${id}`);
  console.log(data);
}

// Use this method to send data to the server.
function postMessageToWSServer(input) {
    worker.port.postMessage({
      fromData: id,
      placements: input
    });
  
}


setTimeout(() => {
  const elArr = [...document.querySelectorAll(".spolecznoscinet")].map(x => x.id);
  console.log(elArr);
  postMessageToWSServer(elArr);
},2000);
