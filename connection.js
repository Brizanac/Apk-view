var mysql = require('mysql');

function Connection() {
  this.pool = null;

  // 0 - localhost baza
  // 1 (ili bilo koja vrijednost) - baza 115
  var online = 1;

  if(online){
    this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: 250, // privremeno jer blokira slanje zahtjeva na APi nakon toliko puta (mozda je problem u proceduri)
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'apkview'
      });
    };
  }

  this.getConnection = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}


module.exports = new Connection();
