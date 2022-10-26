const express = require('express');
const fs = require('fs');

const routerService = express.Router();

var entriesServices = [];

routerService.get('/', (req, res, next) => {
    res.status(200).json(entriesServices);
});

routerService.post('/', (req, res, next) =>{
    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

    entriesServices.push(newService);
    res.status(200).json({ msg: 'The new service has been saved successfully'});

    let serJson = fs.readFileSync("./www/services.json", "utf-8");
    let services = JSON.parse(serJson);
    services.push(newService);
    serJson = JSON.stringify(services, null, 2);
    fs.writeFileSync("./www/services.json", serJson, "utf-8")

    console.log("it worked?x2");
});



module.exports = routerService;