const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const router = new Router;

router.get('/', async (request,response) => {
    const users = await new Promise((resolve,reject) => {
        fs.readFile(path.join(__dirname,'../db','db.json'),'utf8', (err,data) => {
            if(err){
                reject(err)
            }
            resolve(data) ;
        })
    })

    response.end(users)
})

module.exports = router;
