const path = require('path');
const express = require('express');


import request from 'request';
import date from 'date-and-time';
import chalk from 'chalk';

let intervalo = 30; //seconds


let token = "ripple"; //ripple, bitcoin
let currency = "usd";


let checkpoint = 1;
let lastprice = 0;

const cUp = chalk.green;
const cDown = chalk.red;


const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../client/public')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Qué pede!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  //call();
});


/*
//setInterval(checkprice, (intervalo*1000));
checkprice();
const intervalprice = setInterval(() => {
    checkprice();
  }, intervalo*1000);




function rendertable() {
    return "<div>    </div>";
}


function checkprice() {
    const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/simple/price',
    qs: {ids: token, vs_currencies: currency},
    json: true,
    headers: {
        useQueryString: true
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const now  =  new Date();
        const timestamp = date.format(now,'HH:mm:ss');
        if(Object.keys(body).length !== 0) {
           const resp = body[token];
            var currentprice = resp[currency];
            verifica(timestamp, currentprice);
        }
        else {
            console.log(response);
        }
        checkpoint++;
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

            output = output + cUp(entry.currentprice) + " " + cUp("%") + cUp(parseFloat(entry.porcentaje).toFixed(2)) + " ("+ cUp(entry.variacion)+")";
        }
        else {
            entry.porcentaje = ((entry.variacion)*100)/entry.currentprice;

            output = output + cDown(entry.currentprice)+ " "+cDown("-%") + cDown((-1)*parseFloat(entry.porcentaje).toFixed(2)) +  " ("+ cDown(entry.variacion)+")";
        }
    }

    //console.log(entry);
    console.log(output);
    lastprice = currentprice;
}
*/