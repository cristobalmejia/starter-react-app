import React from "react";
import date from 'date-and-time';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setData(checkprice());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  /*

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
*/

  return (
    <div className="App">
        <h2>This my App</h2>
        <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;




let intervalo = 30; //seconds
let token = "ripple"; //ripple, bitcoin
let currency = "usd";

let checkpoint = 1;
let lastprice = 0;



function checkprice() {
  var returned = '';
  let url = 'https://api.coingecko.com/api/v3/simple/price';
  const options = {
    method: 'GET',
    qs: {ids: token, vs_currencies: currency},
    json: true,
    headers: {
        useQueryString: true
    }
  };
  console.log("Fetching: "+url);
  fetch(url, options)
    .then((res) => res.json())
    .then((body) => {
      console.log("Response ok");
      const now  =  new Date();
      const timestamp = date.format(now,'HH:mm:ss');
      if(Object.keys(body).length !== 0) {
         const resp = body[token];
          var currentprice = resp[currency];
          const returned = verifica(timestamp, currentprice);
      }
      else {
          console.log("Error !");
      }
      checkpoint++;
      return returned;
    });
}

function verifica(timestamp, currentprice) {
  var entry = {};
  entry.lastprice = lastprice;
  entry.timestamp = timestamp;
  entry.currentprice  = currentprice;
  entry.variacion = 0;
  entry.porcentaje = 0;
  var output = `${checkpoint} ${timestamp} `; 
  if (entry.lastprice != 0) {
      entry.variacion = entry.currentprice-entry.lastprice;
      if (entry.variacion == 0) {
          output+= entry.currentprice;
      }
      else if (entry.variacion>0) {
          entry.porcentaje = (entry.variacion*100)/entry.currentprice;

         // output = output + cUp(entry.currentprice) + " " + cUp("%") + cUp(parseFloat(entry.porcentaje).toFixed(2)) + " ("+ cUp(entry.variacion)+")";
      }
      else {
          entry.porcentaje = ((entry.variacion)*100)/entry.currentprice;

        //  output = output + cDown(entry.currentprice)+ " "+cDown("-%") + cDown((-1)*parseFloat(entry.porcentaje).toFixed(2)) +  " ("+ cDown(entry.variacion)+")";
      }
  }
  return entry;

  //console.log(entry);
  //console.log(output);
  lastprice = currentprice;
}

 