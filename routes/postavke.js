var mysql = require('mysql');

var apiToken = require('api-token');

var pool = require('../connection');

var funkcije = require('./funkcije.js');

var postavke = {

testiranje : {
    log:        true, //true false zapisuje u log file
    doublelog:  false,
    directory1:  './', 
    directory2:  'C:/Users/AlenM/Desktop/Share/log/', 
    namefile:   'log.txt',
    namefileerr:'logerr.txt',
    filenameMOB:'logMOB.txt',
    namefileerrMOB:'logMOBerr.txt'
},

PHP_API: {
    //host:"192.168.8.102",
    //port:"8087",
    //path: '/index.php/api/fiskal_fiskalizirajracun',
    host:"192.168.8.16",
    port:"80",
    path: '/fiskalApi/index.php/api/fiskal_fiskalizirajracun',
},


putanja: {
    uploadDatoteka: './datoteke',
},

promjenalozinke : function(req, res){
    
    pool.getConnection(function(err, connection) {
 
        if (err) {
            console.error("An error occurred: " + err);
        }

        var query = "SELECT sec_users.idsec_users as id FROM ??  WHERE ??=? and ??=? and sec_users.active ='Y'";

        var table = ["sec_users","email",req.params.email,"pswd",req.body.stara];
        
        query = mysql.format(query,table);

        connection.query(query,function(err,rows){
            if(rows.length > 0) {    
                
                rows[0].newpswd = req.body.nova;
                promjenipass(rows);
            } else {
                res.status(401);
                res.json({ success: false, message: 'Authentication failed. Wrong email or password.' });
            }

             connection.release();
        });
       
    });


    function promjenipass(podaci){

        pool.getConnection(function(err, connection) {
 
            if (err) {
                console.error("An error occurred: " + err);
            }   
            
            var greska = 0;

            var operater = { 
                pswd: podaci[0].newpswd
                };      
            
            connection.query('update sec_users set ? where idsec_users = ?', [operater, podaci[0].id], function(err,rows){

                if(err){
                    greska = 1;
                    return next(err);
                    //spremiti u log datoteku koja stavka nije prosla
                }               
                //res.json({ success: false, racun: stavke.ra_broj });
                
            });     

                
            if(greska == 1){

                res.status(401);
                res.json({success: false});
                connection.release();
            }else{
                res.status(200);
                res.json({ success: true });             
                connection.release();
            }

            //res.json({ success: true, racun: stavke.ra_broj });               

        });
     
    }

}

};


module.exports = postavke;
