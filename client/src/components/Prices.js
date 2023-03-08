import { useEffect, useState } from "react";
import date from 'date-and-time';
import chalk from 'chalk';

let intervalo = 10; //seconds
let interval;
let token = "ripple"; //ripple, bitcoin
let currency = "usd";

let v_1 = 0.1;

let decimalesp = 4;

const cUp = chalk.green;
const cDown = chalk.red;


const urlcall = 'https://api.coingecko.com/api/v3/simple/price?';

const options = {
  method: 'GET',
  json: true,
};
const urlparams = new URLSearchParams({
  ids: token,
  vs_currencies: currency
})



function Prices() {
    function loadPrice() {
        setIsLoading(true);
        fetch(urlcall+urlparams, options)
            .then((response) => response.json())
            .then((resJson) => {

                setIsLoading(false);
                
                console.log(resJson);
            
            
                const now  =  new Date();
                const timestamp = date.format(now,'HH:mm:ss');
                const tokenprice = resJson[token];
                const currentprice = tokenprice[currency];
                setLastprice(currentprice);
                verifica(timestamp, currentprice)
                setThedata(tokenprice);
            
            })
            .catch((err) => {
            //console.log(err);
            });

    };

    function verifica(timestamp, currentprice) {
        var entry = {};
        entry.checkpoint = checkpoint;
        entry.lastprice = lastprice;
        entry.timestamp = timestamp;
        entry.currentprice  = currentprice;
        entry.variacion = 0;
        entry.porcentaje = 0;
        var output = `${checkpoint} ${timestamp} `; 
        if (entry.lastprice !== 0) {
            entry.variacion = entry.currentprice-entry.lastprice;
            if (entry.variacion === 0) {
                entry.currentpriceformated = (
                  <div className="H_priceSame">
                    [{timestamp}] <span className="H_price">{entry.currentprice}</span>
                  </div>
                )
                output+= entry.currentprice;
            }
            else if (entry.variacion>0) {
              //Price riced  entry.porcentaje % -- entry.variacion
              entry.porcentaje = (entry.variacion*100)/entry.currentprice;
              if (entry.porcentaje>=v_1) {
                entry.alert = (
                    <span>🔴</span>
                )
              }
              entry.currentpriceformated = (
                <div className="H_priceUp">
                  [{timestamp}] <span className="H_price">{entry.currentprice} %{parseFloat(entry.porcentaje).toFixed(decimalesp)} (+{entry.variacion})</span>
                  {entry.alert}
                </div>
              )
              //for logs
              output = output + cUp(entry.currentprice) + " " + cUp("%") + cUp(parseFloat(entry.porcentaje).toFixed(decimalesp)) + " ("+ cUp(entry.variacion)+")";
    
            }
            else {
              //Price down entry.porcentaje % -- entry.variacion
              entry.porcentaje = ((entry.variacion)*100)/entry.currentprice;
              if (entry.porcentaje>=v_1) {
                entry.alert = (
                    <span>🔵</span>
                )
              }
              entry.currentpriceformated = (
                <div className="H_priceDown">
                  [{timestamp}] <span className="H_price">{entry.currentprice} %{(-1)*parseFloat(entry.porcentaje).toFixed(decimalesp)} ({entry.variacion})</span>
                  {entry.alert}
                </div>
              )
              //for logs
              output = output + cDown(entry.currentprice)+ " "+cDown("-%") + cDown((-1)*parseFloat(entry.porcentaje).toFixed(decimalesp)) +  " ("+ cDown(entry.variacion)+")";
            }
        }

    setHistoric([...historic, entry]);
  
      console.log(output);
    }
  

    const [thedata, setThedata] = useState([]);
    const [lastprice, setLastprice] = useState(0);
    const [checkpoint, setCheckpoint] = useState(0);
    const [historic, setHistoric] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        startTimer();
        return () => {
          clearInterval(interval)
        }
    });

    function startTimer() {
        interval = setInterval(() => {
            setCheckpoint(checkpoint+1);
            
            loadPrice();
            
        }, intervalo*1000);
      }

    if (historic.length === 0) {
        return <p>Loading...</p>;
    }

    return (

        <div className="App">
        <h2>{token}/{currency}: ${thedata[currency]}</h2>
        <div className="Historic_container">
        <ul className="Historic">
        {historic.map((entry) => (
          <li key={entry.checkpoint}>{entry.currentpriceformated}</li>
        ))}
        </ul>
        </div>
        <button disabled={isLoading} onClick={loadPrice}>🔄</button>
     </div>
    );
}

export default Prices;
