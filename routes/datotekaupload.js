var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');
var fs          = require('fs');

var datotekaupload = {

    //unos naziva datoteke u sql 
    datotekauploadSql : function(a, callback){

        try{
            if(a.aplikacija_idaplikacija && a.korisnik_idkorisnik){
                let datotekaupload = {
                    aplikacija_idaplikacija :a.aplikacija_idaplikacija,
                    korisnik_idkorisnik     :a.korisnik_idkorisnik,
                    du_verzija              :a.du_verzija || null,
                    du_opis                 :a.du_opis || null,
                    du_nazivdatoteka_orig   :a.du_nazivdatoteka_orig,
                    du_nazivdatoteka        :a.du_nazivdatoteka,
                    du_putanja              :a.du_putanja,
                    du_velicinedatoteke     :a.du_velicinedatoteke
                 };
                   
                let query = "insert into datotekaupload SET ?";
                let table = [datotekaupload];  
                query = mysql.format(query,table);
                console.log(query);
                funkcije.mysql_query(query,function(podaci){
                    callback({ success: podaci.success, message: podaci.message, status: podaci.status, data:[] })
                });
            }else{
                console.log('asdsadsadsadadsad')
                callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] })
            }
        }catch(err){
            console.log(err);
            callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:[] })
        }
        
    },

    datotekauploadDodajForm: function(req, res, next){
        try{
            
            let idaplikacija = req.query.idaplikacija || req.body.idaplikacija;
            let idkorisnik = req.query.idkorisnik || req.body.idkorisnik;
            console.log(req.query);
            res.render('pages/datotekauploadDodajFile', {message:'', title: 'Dodaj inačicu aplikacije', idkorisnik:idkorisnik, idaplikacija:idaplikacija, data: {idaplikacija:2}});
            //console.log(data);
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    //sprema file u folder
    datotekauploadDodaj : function(req, res, next){
        try{ 
            if(req.files && req.body.aplikacija_idaplikacija && req.body.korisnik_idkorisnik && req.body.du_verzija) {
                console.log(file);
                var file = req.files.file;
                var filenameorig = file.name;
                var filename = file.name.replace(/ /g, "_").substr(0, file.name.lastIndexOf("."))+'_'+ Date.now()+ file.name.substr(file.name.lastIndexOf("."), 5);
                console.log(filename);
                console.log(file);
                var velicinedatoteke = file.size;
/*
                function kapacitetFile(filename){
                    var stats = fs.statSync(filename);
                    var fileSize = stats.size;
                    console.log(file.size);
                    return fileSize; 
                }

                var stats = fs.statSync(file);
                var velicina = stats.size;
                console.log(velicina);
*/
                var urlSpremanja = './datoteke/'+filename;

                file.mv(urlSpremanja, function(err){
                    if (err) {
                        funkcije.posaljiRes(res,{success: false, message:"Greška! Nije uploadano.", status: 501, data:err});
                    }else{
                     
                        req.body.du_nazivdatoteka_orig = filenameorig;
                        req.body.du_putanja = urlSpremanja;
                        req.body.du_nazivdatoteka = filename;
                        req.body.du_velicinedatoteke = velicinedatoteke;

                        datotekaupload.datotekauploadSql(req.body, function(podaci){
  /*                          
                            var stats = fs.statSync(filename);
                            console.log("Velicina u Byteovima:- "+stats.size);
*/
                            if(podaci.success == false){
                                fs.unlink('./datoteke/'+filename);
                            }else{
                                {
                                    try{
                                        res.render('pages/datotekauploadDodajFile', {message:'', title: 'Dodaj aplikaciju', data: {idkorisnik:1}});
                                    }catch(err){
                                        funkcije.posaljiRes(res,funkcije.err_unknown(err));
                                    }
                                }
                            }
                        });
                        funkcije.posaljiRes(res,{success: true, message: 'Uspješno uploadano.', status: true});
                    }
                });
                        
            }else{
                funkcije.posaljiRes(res,{success: false, message: 'Greška, provjerite podatke koje šaljete .', status: 502, data:[]});
            }
        }catch(err){
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },

    datotekauploadDodajFile : function(req, res, next){
        try{ 
            if(req.files && req.body.aplikacija_idaplikacija && req.body.korisnik_idkorisnik && req.body.du_verzija) {
                //console.log(file);
                var file = req.files.file;
                //console.log(file)
                var filenameorig = file.name;
                var filename = file.name.replace(/ /g, "_").substr(0, file.name.lastIndexOf("."))+'_'+ Date.now()+ file.name.substr(file.name.lastIndexOf("."), 5);
                console.log(filename);
                console.log(file);
                var velicinedatoteke = file.size;
                var urlSpremanja = './datoteke/'+filename;

                file.mv(urlSpremanja, function(err){
                    if (err) {
                        funkcije.posaljiRes(res,{success: false, message:"Greška! Nije uploadano.", status: 501, data:err});
                    }else{
                     
                        req.body.du_nazivdatoteka_orig = filenameorig;
                        req.body.du_putanja = urlSpremanja;
                        req.body.du_nazivdatoteka = filename;
                        req.body.du_velicinedatoteke = velicinedatoteke;
                        req.body.idkorisnik = req.body.korisnik_idkorisnik;

                        datotekaupload.datotekauploadSql(req.body, function(podaci){

                            if(podaci.success == false){
                                fs.unlink('./datoteke/'+filename);
                            }
                            datotekaupload.datotekaUploadPrikaziSql(req,res,next);

                        });
                    }
                });
                        
            }else{
                funkcije.posaljiRes(res,{success: false, message: 'Greška, provjerite podatke koje šaljete .', status: 502, data:[]});
            }
        }catch(err){
            console.log(err)
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },

    datotekaUploadObrisi : function(req, res, next){
        try{
            //1.pronađi putanju
            //2.obriši folder
            //3. obriši iz baze
            let iddatotekaupload = req.body.iddatotekaupload || req.query.iddatotekaupload;
            if(iddatotekaupload){
                let query = "select du_putanja from datotekaupload where iddatotekaupload = ?";
                let table = [iddatotekaupload];
                query = mysql.format(query, table);
                funkcije.mysql_queryV2(query, function(podaci){
                console.log(podaci.data);
                    
                    if(podaci.success == true){
                        fs.unlink(podaci.data[0].du_putanja, function(podaci1){
                            let query = "delete from datotekaupload where iddatotekaupload = ?";
                            let table = [iddatotekaupload];
                            query = mysql.format(query, table);
                            funkcije.mysql_queryV2(query, function(podaci){
                                req.body.idkorisnik = req.body.idkorisnik || req.query.idkorisnik;
                                datotekaupload.datotekaUploadPrikaziSql(req,res,next);
                            })
                            });
                    }
                   else{
                    funkcije.posaljiRes(res,{success: false, message: 'Greška, provjerite podatke koje šaljete .', status: 502, data:[]});
                   }
                    });
            }else{
                funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
            }
        }catch(err){
            console.log(err);
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
        }
    },
    
    datotekaUploadPrikaziFunkc : function(req, res, next){
        try{ 
            let filenames = fs.readdirSync('./datoteke');
            funkcije.posaljiRes(res,{success: true, message: 'Uspješno uploadano.', status: true,data:filenames});

            //console.log("\n Datoteke unutar mape:");
            /*filenames.forEach((file) => {
                console.log("Datoteke: ", file);
               // funkcije.posaljiRes(res,{success: true, message: 'Uspješno uploadano.', status: true});
            });*/

            
        }catch(err){
            console.log(err);
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
        }
    },

    datotekaUploadPrikaziSql : function(req, res, next){
        try{
                let idaplikacija = req.body.idaplikacija || req.query.idaplikacija || req.body.aplikacija_idaplikacija;
                let query = "SELECT UPPER(du_nazivdatoteka) as du_nazivdatoteka_upper, DATE_FORMAT(du_datumizmjene, '%Y.%m.%d %H:%i:%s') as du_datumizmjene_prikaz, datotekaupload.* FROM datotekaupload where aplikacija_idaplikacija =? ";
                let table = [idaplikacija];  
                query = mysql.format(query,table);
                funkcije.mysql_queryV2(query,function(podaci){
                    console.log(podaci.data)
                    let idkorisnik = req.body.idkorisnik || req.query.idkorisnik;
                    res.render('pages/table', { message:'', title: req.query.ap_naziv ||'Popis datoteka', idkorisnik:idkorisnik, idaplikacija: idaplikacija , userData: podaci.data});
                   // funkcije.posaljiRes(res,podaci);
                });
        }catch(err){
            res.render('pages/error', { message:'', title: 'Stranica ne postoji!'});
        }
    },


    datotekaUploadPrikaziSqlJedna : function(req, res, next){
        try{
                let query = "SELECT UPPER(du_nazivdatoteka) as du_nazivdatoteka_upper, DATE_FORMAT(du_datumizmjene, '%Y.%m.%d %H:%i:%s') as du_datumizmjene_prikaz, datotekaupload.* FROM datotekaupload where iddatotekaupload =? ";
                let table = [req.body.iddatotekaupload || req.query.iddatotekaupload];  
                query = mysql.format(query,table);
                funkcije.mysql_queryV2(query,function(podaci){
                    console.log(podaci.data)
                    let idkorisnik=req.body.idkorisnik || req.query.idkorisnik;
                    res.render('pages/datotekauploadform', { message:'', idkorisnik:idkorisnik, title: 'Uredi datoteku', data: podaci.data});
                   // funkcije.posaljiRes(res,podaci);
                });
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    datotekauploadBrisanjepoImenu2 : function(req, res, next){
        try{
            if(req.body.du_nazivdatoteka){
                fs.unlink('./datoteke/'+req.body.du_nazivdatoteka, function(podaci){
                    let query = "delete from datotekaupload where du_nazivdatoteka = ?";
                    let table = [req.body.du_nazivdatoteka];
                    query = mysql.format(query, table);
                    funkcije.mysql_queryV2(query, function(podaci){
                    funkcije.posaljiRes(res, podaci);
                    })
                });
            }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
            }
        }catch(err){
            console.log(err);
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
        }
       },
    
    datotekauploadBrisanjepoImenu : function(req, res, next){
        try{
            if(req.body.du_nazivdatoteka){
                    let query = "select du_putanja from datotekaupload where du_nazivdatoteka = ?";
                    let table = [req.body.du_nazivdatoteka];
                    query = mysql.format(query, table);
                    funkcije.mysql_queryV2(query, function(podaci){
                    console.log(podaci.data[0].du_putanja);
                    fs.unlink(podaci.data[0].du_putanja, function(podaci){
                        let query = "delete from datotekaupload where du_nazivdatoteka = ?";
                        let table = [req.body.du_nazivdatoteka];
                        query = mysql.format(query, table);
                        funkcije.mysql_queryV2(query, function(podaci){
                        funkcije.posaljiRes(res, podaci);
                })
              });
                    });
                    
                    }else{
                         funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
                 }
             }catch(err){
                 console.log(err);
                 funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
            }
       },

    datotekauploadUredi : function(req, res, next){
        try{
            if(req.body.iddatotekaupload && req.body.du_verzija){
                let datoteka = {
                    //du_nazivdatoteka_orig   :req.body.du_nazivdatoteka_orig,
                    du_verzija              :req.body.du_verzija,
                    du_opis                 :req.body.du_opis || null
                };
                let query = "UPDATE datotekaupload SET ? WHERE iddatotekaupload = ?";
                let table = [datoteka, req.body.iddatotekaupload];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    req.body.idkorisnik=req.body.idkorisnik || req.query.idkorisnik;
                    datotekaupload.datotekaUploadPrikaziSql(req,res,next);
                    /*res.render('pages/datotekauploadform', {message:podaci.message, title: 'Uredi inačicu aplikacije', data: [{
                        du_verzija :req.body.du_verzija, du_opis:req.body.du_opis || null
                    }]});*/
                });
            }else{
                funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
            }
        }catch(err){
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    }, 

    datotekauploadPreuzmi : function(req, res, next){
        try{
            let putanja = req.body.du_putanja || req.query.du_putanja;
            
            //linux
            putanja = '/home/ivanbrizanac/Desktop/apkview/datoteke/'+putanja
            console.log(putanja);
            
            //windows
             //putanja = 'C:/node/apkviewV2/datoteke/'+putanja
           
            if(fs.existsSync(putanja)){
                res.sendFile(putanja, function(err){
                    if(err){
                        //res.json({ success: false, message: 'Greška kod slanja dokumenta!', status:404, data: {} });
                        console.log(err);
                    }else{
                        //console.log('dobro');
                    }
                });
            }else{
                res.json({ success: false, message: 'Dokument nije pronađen!', status:404, data: {} });
            } 
        }catch(err){
            console.log(err);
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
        }
    }
};

  /*

    datotekaUploadObrisi : function(req, res, next){
        try{
            if(req.files && req.body.putanja){
                var file = req.files.file
                //var urlSpremanja = req.body.putanja;
               // fs.unlink(urlSpremanja, function(err){
                    
                let table = [req.body.iddatotekaupload];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    funkcije.posaljiRes(res,podaci);
                });
            }else{
                funkcije.posaljiRes(res,funkcije.err_data);
            }
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    f_deleteUrlDatoteke : function(iddatotekaupload, callback){

        try{
            if(iddatotekaupload){
                let query = "DELETE FROM datotekaupload WHERE iddatotekaupload = ?";
                let table = [iddatotekaupload];
                query = mysql.format(query, table); 
                funkcije.mysql_query(query,function(podaci){
                    if(podaci.data.affectedRows > 0){
                        callback(podaci);
                    }else{
                        callback(podaci);
                    }
                });
            }else{
                callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
            }
        }catch(err){
            callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },
   
    datotekaUploadObrisi22 : function(req, res, next){
        try{ 
            if(req.files && req.body.iddatotekaupload) {
                
                console.log(req.files);
                var file = req.files.file;
                var filename = file.name;
                console.log(filename);
                var urlSpremanja = './datoteke/'+filename;
                fs.unlink(urlSpremanja, function(err){
                    if (err) {
                        if(err.errno== -4058 && err.code == "ENOENT"){
                            datotekaupload.f_deleteUrlDatoteke(req.body.iddatotekaupload, function(podaci){
                            });
                            funkcije.posaljiRes(res,{success: true, message: 'Uspješno obrisano.', status: true});
                        }else{
                            funkcije.posaljiRes(res,{success: false, message:"Greška! Nije obrisano.", status: 503, data:err});
                        }
                    }else{
                        
                        datotekaupload.f_deleteUrlDatoteke(req.body.iddatotekaupload, function(podaci){
                        });
                        funkcije.posaljiRes(res,{success: true, message: 'Uspješno obrisano.', status: true});
                    }
                });
    
            }else{
                funkcije.posaljiRes(res,{success: false, message: 'Greška, provjerite podatke koje šaljete .', status: 502, data:[]});
            }
        }catch(err){
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },

};

*/

module.exports = datotekaupload;
