var mysql = require('mysql');

var apiToken = require('api-token');

var pool = require('../connection');

var fs = require('fs');

var postavke = require('./postavke.js');

var funkcije = {

posaljiRes: function(res, data){
    res.json({ success: data.success, message: data.message, status: data.status, data:data.data});
    return 1;
},

zamjenazatocku: function(a){
    if(typeof a === 'string'){
        var iznos = a.replace(",", ".");
    }else{
        var iznos = a;
    }
    return iznos;
},
test: {
    success:        true,
    data_not_found: false,
    err_sql:        501,
    err_data:       502,
    err_unknown:    503
},
f_current_datetime :function(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
},

f_uppercase :function(a){
    if(typeof(a) == 'string'){
        return a.toUpperCase();
    }else{
        return a;
    }
},

f_cro_to_eng :function(a){
    if(typeof(a) == 'string'){
        let str = a.replace(/Đ/g, 'D');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/Š/g, 'S');
        str = str.replace(/š/g, 's');
        str = str.replace(/Ž/g, 'Z');
        str = str.replace(/ž/g, 'z');
        str = str.replace(/Č|Ć/g, 'C');
        str = str.replace(/č|ć/g, 'c');
        return str;
    }else{
        return a;
    }
},

f_grad_zarez :function(a){
    if(typeof(a) == 'string'){
        if(a.lastIndexOf(',') == -1){
            return null;
        }else{
            return a.substr(a.lastIndexOf(',')+1, a.length).toUpperCase();
        }
    }else{
        return null;
    }
},

log: function(file, data, device){
    if(postavke.testiranje.log == true){
        if(file == true){file = postavke.testiranje.namefile; if(device == 'MOB'){file = postavke.testiranje.filenameMOB}
        }else{ file=postavke.testiranje.namefileerr; if(device == 'MOB'){ file = postavke.testiranje.namefileerrMOB;}}
        try{
            let a= JSON.stringify(data);
            let text = new Date().toLocaleString() +' -> '+ a + "\n";
            if(postavke.testiranje.doublelog == true){
                if(postavke.testiranje.directory1 != postavke.testiranje.directory2){
                    fs.appendFile(postavke.testiranje.directory2+file, text, function (err) {
                        if (err) return err;
                    });
                }
            }
            fs.appendFile(postavke.testiranje.directory1+file, text, function (err) {
                if (err) return err;
            });
        }catch(err){
            return err;
        }

    }
    return 1;
},


mysql_query:function(upit, callback){
    //console.log(upit);
    function funkcija1(a, callback){
        
        pool.getConnection(function(err, connection){
            if(err) {
                //connection.release();
                callback(500, err);
            }else{
                connection.query(a,function(err, rows) {
                    connection.release();
                    if(err){
                        console.log(err);
                        callback(501, err);
                    }else{
                        callback(true, rows);
                    }                          
                });
            }
        });
    }

    try{
        if(typeof(upit)==='string'){
            funkcija1(upit, function(rezultat, podaci){
                if(rezultat == true){
                    callback({ success: true, message: 'Uspješno', status: rezultat, data:podaci });
                }else{
                    callback({ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            callback({ success: false, message: 'Upit nije poslan u dobrom obliku!', status: 502, data:[] });
        }
    }catch(err){
        console.log(err);
        callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }
},

mysql_queryV2:function(upit, callback){
    //console.log(upit);
    function funkcija1(a, callback){
        
        pool.getConnection(function(err, connection){
            if(err) {
                //connection.release();
                //console.log(err);
                callback(500, err, 'Greška konekcije!');
            }else{
                connection.query(a,function(err, rows) {
                    //console.log(rows)
                    connection.release();
                    if(err){
                        //console.log(err);
                        callback(501, err, 'Greška upita');
                    }else{
                        //callback(true, rows);
                        try {
                            if(typeof(rows) == "object"){
                                //console.log(typeof(rows));
                                if(rows.length > 0){
                                    if(rows[0][0]){
                                        //PROCEDURE
                                        //console.log(4);
                                        callback(true, rows[0], 'Postoje podaci!');
                                    }else{
                                        //console.log(3);
                                        callback(true, rows, 'Postoje podaci!');
                                    }  
                                }else{
                                    //console.log(2);
                                    if(rows.insertId >= 0){
                                        //PROCEDURE bez returna i UPDATE, DELETE, INSERT
                                        callback(true, rows,'Uspješno');
                                    }else{
                                        callback(false, rows,'Ne postoje podaci!');
                                    }
                                }
                            }else{
                                callback(false, rows,'Ne postoje podaci1!');
                            }
                        } catch (error) {
                            callback(false, error,'greška kod dohvaćanja podataka!');
                        }
                    }                          
                });
            }
        });
    }

    try{
        if(typeof(upit)==='string'){
            funkcija1(upit, function(success, data, message){
                if(success == true){
                    callback({ success: true, message: message, status: success, data:data });
                }else{
                    callback({ success: false, message: message, status: success, data:data });
                }
            });
        }else{
            callback({ success: false, message: 'Upit nije poslan u dobrom obliku!', status: 502, data:[] });
        }
    }catch(err){
        console.log(err);
        callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }
},
/*
sql_query:function(upit, callback){
    function sqlfunkcija(a, callback){
        sql.connect(mssqlconfig.config, function (err) {
            if (err){
                sql.close();
                console.log(err);
                callback(500, err)
            }else{
                var request = new sql.Request();
                request.query(a, function (err, recordset) {
                    sql.close();
                    if(err){
                        console.log(err);
                        callback(501, err)
                    }else{
                        //console.log(recordset)
                        callback(true, recordset.recordsets)
                    }  
                });
            }
        });
    }

    try{
        if(typeof(upit)==='string'){
            sqlfunkcija(upit, function(rezultat, podaci){
                if(rezultat == true){
                    callback({ success: true, message: 'Uspješno', status: rezultat, data:podaci });
                }else{
                    callback({ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            callback({ success: false, message: 'Upit nije poslan u dobrom obliku!', status: 502, data:[] });
        }
    }catch(err){
        console.log(err);
        callback({ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }
},
*/
err_data: { success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] },
err_validation: function(data){
    //let a= JSON.stringify(err);
    return {success: false, message: 'Greška validacije', status: 504, data:data}
},
err_custom: function(success, message, status, data){
    //let a= JSON.stringify(err);
    return {success: success, message: message, status: status, data:data}
},
err_unknown: function(err){
    console.log(err);
    //let a= JSON.stringify(err);
    return {success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err}
},

provjera: function(optional, data, type, min, max, defaultvalue){
    //console.log(data);
    //console.log(typeof(data));
    var ok  = true;
    var leng = 0;
    var vardata = data;
    if(!data){ok=false;}
    if(type=='number'){data=Number(data);}
    if(type=='string'){data=data.toString();}
    if(typeof(data)!=type){ok=false;}
    if(min != null || max != null){
        if(typeof(data)=='number'){
            if(isNaN(data)){ok=false;}
            if(min != null){if(data<min){ok=false;}}
            if(max != null){if(data>max){ok=false;}}
        }else if(typeof(data)=='string'){
            leng = data.length;
            if(min != null){if(leng<min){ok=false;}}
            if(max != null){if(leng>max){ok=false;}}
        }else if(typeof(data)=='object'){
            leng = data.length;
            if(data.length){
                if(min != null){if(leng<min){ok=false;}}
                if(max != null){if(leng>max){ok=false;}}
            }
        }else{
            ok=false;
        }
    }

    if(ok){defaultvalue=data};
    return ok;
},

secToTime: function(sec){
    let date = new Date(null);
    date.setSeconds(sec); // specify value for SECONDS here
    let timeString = date.toISOString().substr(11, 8);
    return timeString;
},

oibCheck: function(oibCode) {
	var checkDigit, num;

	var code = oibCode.toString();

	if (code.length === 13 && code.substr(0, 2).toUpperCase() === 'HR') {
		code = code.substr(2, 11);
	} else if (code.length !== 11) {
		return false;
	}

	var numCheck = parseInt(code, 10);
	if (isNaN(numCheck)) {
		return false;
	}

	num = 10;
	for (var i = 0; i < 10; i++) {
		num = num + parseInt(code.substr(i, 1), 10);
		num = num % 10;
		if (num === 0) {
			num = 10;
		}
		num *= 2;
		num = num % 11;
	}

	checkDigit = 11 - num;
	if (checkDigit === 10) {
		checkDigit = 0;
	}
	
	return parseInt(code.substr(10, 1), 10) === checkDigit;
}

};

module.exports = funkcije;
