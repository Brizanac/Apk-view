var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');
var fs          = require('fs');

var aplikacija = {


    
    prijava: function (req, res, next) {
        try{
            let email = req.body.ko_email || null;
            let pass = req.body.ko_pass || null;
            if(email &&  pass){
                let query = "SELECT idkorisnik from korisnik where ko_email = binary ? and  ko_pass = binary ? limit 1";
                let table = [email, pass];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    if(podaci.data == ''){
                        //nije dohvatio korisnika
                        res.render('pages/home', {message:'Pogrešno korisničko ime ili lozinka', title: 'Uredi aplikaciju', data: podaci.data});
                    }else{
                        //uspješna prijava
                        req.body.idkorisnik = podaci.data[0].idkorisnik;
                        aplikacija.aplikacijaPopis(req,res,next);
                    }
                });
            }else{
                funkcije.posaljiRes(res,funkcije.err_data);
            }
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    odjava: function(req, res, next){
        try{
            res.render('pages/home', {message:'Uspješno ste se odjavili', title: '', data: {idkorisnik:''}});
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    aplikacijaDodaj : function(req, res, next){
        try{
            if(req.body.ap_naziv){
                let aplikacija = {
                    ap_naziv      :req.body.ap_naziv,
                    ap_opis       :req.body.ap_opis ||null
                 };
                   
                let query = "insert into aplikacija SET ?";
                let table = [aplikacija];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    res.render('pages/aplikacijaform', {message:podaci.message, title: 'Popis Aplikacija', data: [{idkorisnik:1,
                        ap_naziv      :req.body.ap_naziv,
                        ap_opis       :req.body.ap_opis ||null}]});
                });
            }else{
                funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
            }
        }catch(err){
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },

    aplikacijaDodajForm: function(req, res, next){
        try{
            res.render('pages/aplikacijaformdodaj', {message:'', title: 'Dodaj aplikaciju', data: {idkorisnik:1}});
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    aplikacijaObrisi : function(req, res, next){  
        try{
            if(req.body.idaplikacija || req.query.idaplikacija){
                let query = "DELETE FROM aplikacija WHERE idaplikacija = ?";
                let table = [req.body.idaplikacija || req.query.idaplikacija ];  
                query = mysql.format(query,table);

                    funkcije.mysql_query(query,function(podaci){
                        aplikacija.aplikacijaPopis(req,res,next);
                    });
            }else{
                funkcije.posaljiRes(res,funkcije.err_data);
            }
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },


    aplikacija: function (req, res, next) {
        try{
            let idaplikacija = req.body.idaplikacija || req.query.idaplikacija
            if(idaplikacija ){
                let query = "SELECT idaplikacija, UPPER(ap_naziv) as ap_naziv, UPPER(ap_opis) as ap_opis FROM aplikacija where idaplikacija =?";
                let table = [idaplikacija];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    res.render('pages/aplikacijaform', {message:'', title: 'Uredi aplikaciju', data: podaci.data});
                });
            }else{
                funkcije.posaljiRes(res,funkcije.err_data);
            }
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },
    

    
    aplikacijaPopis: function (req, res, next) {
        try{
            let idkorisnik = req.body.idkorisnik || req.query.idkorisnik;
            if(idkorisnik){
                let query = "SELECT idaplikacija, UPPER(ap_naziv) as ap_naziv, UPPER(ap_opis) as ap_opis FROM aplikacija";
                let table = [];  
                query = mysql.format(query,table);
                funkcije.mysql_query(query,function(podaci){
                    console.log(podaci.data);
                    res.render('pages/aplication', { title: 'Lista aplikacija', idkorisnik:idkorisnik, list: podaci.data});
                    //funkcije.posaljiRes(res,podaci);
                });
            }else{
                funkcije.posaljiRes(res,funkcije.err_data);
                
            }
        }catch(err){
            funkcije.posaljiRes(res,funkcije.err_unknown(err));
        }
    },

    aplikacijaUredi : function(req, res, next){
        try{
            if(req.body.idaplikacija && req.body.ap_naziv){
                let aplikacija = {
                    ap_naziv            :req.body.ap_naziv,
                    ap_opis             :req.body.ap_opis || null
                };
                let query = "UPDATE aplikacija SET ? WHERE idaplikacija = ?";
                let table = [aplikacija, req.body.idaplikacija];  
                query = mysql.format(query,table);
                console.log(query);
                funkcije.mysql_query(query,function(podaci){
                    res.render('pages/aplikacijaform', {message:podaci.message, title: 'Uredi aplikaciju', data: [{
                        ap_naziv            :req.body.ap_naziv,
                        ap_opis             :req.body.ap_opis,
                        idaplikacija        :req.body.idaplikacija
                    }]});
                });
            }else{
                funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
            }
        }catch(err){
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
        }
    
    },
    

};

module.exports = aplikacija;
