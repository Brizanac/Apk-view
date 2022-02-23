const express 		= require('express');
var router 			= express.Router();

var aplikacija        = require('./aplikacija.js');
var datotekaupload    = require('./datotekaupload.js');

router.post('/api/prijava',                         aplikacija.prijava);
router.get('/api/odjava',                           aplikacija.odjava);
router.post('/api/aplikacijaDodaj',                 aplikacija.aplikacijaDodaj);
router.get('/api/aplikacijaDodaj',                  aplikacija.aplikacijaDodaj);
router.post('/api/aplikacijaObrisi',                aplikacija.aplikacijaObrisi);
router.get('/api/aplikacijaObrisi',                 aplikacija.aplikacijaObrisi);
router.post('/api/aplikacijaPopis',                 aplikacija.aplikacijaPopis);
router.get('/api/aplikacijaPopis',                  aplikacija.aplikacijaPopis);
router.post('/api/aplikacijaUredi',                 aplikacija.aplikacijaUredi);
router.get('/api/aplikacija',                       aplikacija.aplikacija);
router.get('/api/aplikacijaDodajForm',              aplikacija.aplikacijaDodajForm);


router.post('/api/datotekauploadDodaj',             datotekaupload.datotekauploadDodaj);
router.post('/api/datotekauploadDodajFile',         datotekaupload.datotekauploadDodajFile);
router.get('/api/datotekauploadDodajFile',          datotekaupload.datotekauploadDodajFile);
router.post('/api/datotekaUploadObrisi',            datotekaupload.datotekaUploadObrisi);
router.get('/api/datotekaUploadObrisi',             datotekaupload.datotekaUploadObrisi);


router.post('/api/datotekaUploadPrikaziFunkc',      datotekaupload.datotekaUploadPrikaziFunkc);
router.post('/api/datotekaUploadPrikaziSql',        datotekaupload.datotekaUploadPrikaziSql);
router.get('/api/datotekaUploadPrikaziSql',         datotekaupload.datotekaUploadPrikaziSql);
router.post('/api/datotekauploadBrisanjepoImenu',   datotekaupload.datotekauploadBrisanjepoImenu);
router.post('/api/datotekauploadBrisanjepoImenu2',  datotekaupload.datotekauploadBrisanjepoImenu2);
router.post('/api/datotekauploadUredi',             datotekaupload.datotekauploadUredi);
router.get('/api/datotekauploadUredi',              datotekaupload.datotekauploadUredi);
router.get('/api/datotekaUploadPrikaziSqlJedna',    datotekaupload.datotekaUploadPrikaziSqlJedna);
router.get('/api/datotekauploadPreuzmi',            datotekaupload.datotekauploadPreuzmi);
router.get('/api/datotekauploadDodajForm',          datotekaupload.datotekauploadDodajForm);
router.post('/api/datotekauploadDodajForm',         datotekaupload.datotekauploadDodajForm);


/*
router.post('/api/korisnik', 		    korisnik.korisnik);
router.post('/api/korisnikPopis', 	    korisnik.korisnikPopis);
router.post('/api/korisnikDodaj', 	    korisnik.korisnikDodaj);
router.post('/api/korisnikUredi', 	    korisnik.korisnikUredi);
router.post('/api/korisnikObrisi', 	    korisnik.korisnikObrisi);
router.post('/api/dodajKorisnika',      korisnik.dodajKorisnika);
router.post('/api/dodajViseKorisnika2',  korisnik.DodajViseKorisnika2);
router.post('/api/dodajViseKorisnika',  korisnik.DodajViseKorisnika);
router.post('/api/DodajViseKorisnika3',  korisnik.DodajViseKorisnika3);
router.post('/api/dodajInstrument',    instrument.dodajInstrument);
router.post('/api/dodajTecaj',          tecaj.dodajTecaj);
router.post('/api/izmjeniKorisnika',    korisnik.izmjeniKorisnika);
router.post('/api/izmjeniInstrument',   instrument.izmjeniInstrument);
router.post('/api/izmjeniTecaj',        tecaj.izmjeniTecaj);
*/

module.exports = router;

