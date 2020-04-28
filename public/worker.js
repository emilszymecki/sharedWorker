const ws = new WebSocket('ws://localhost:3001');
const AllowArr = ["111","222","333"];

let state = {
  header: false,
  counter: 0,
  data: {},
};

onconnect = (e) => {
	const port = e.ports[0];
	state.counter += 1;

	port.onmessage = function(event) {
		const { fromData, placements} = event.data;
        placements.forEach(placement => {
          if(state.data[placement] === undefined){
            state.data[placement] = {positive:[],rejected:[]}
          }
          if(!state.data[placement].positive.length && AllowArr.includes(placement)){
            state.header = true;
            state.data[placement].positive.push(fromData);
            port.postMessage({...state});
          }else{
            state.header = false;
            state.data[placement].rejected.push(fromData);
            port.postMessage({...state,header:false});
          }
          ws.send(JSON.stringify({header:"test",...state}));
        })
         //ws.send(JSON.stringify({...state}));
            
  
		//port.postMessage({ ...state});
		
		console.log(message, 'MSG');
	};
};
