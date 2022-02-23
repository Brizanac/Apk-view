/**
* @api {true} /true true
* @apiName true
* @apiGroup 1Response
* @apiVersion 0.0.1
* @apiSampleRequest off
* @apiSuccessExample {json} Success:
*  {
*      success:    true, 
*      message:    'Uspješan dohvat', 
*      status:     true, 
*      data:       ["Podaci u obliku niza"]
*  }
*/


/**
* @api {false} /false false
* @apiName false
* @apiGroup 1Response
* @apiVersion 0.0.1
* @apiSampleRequest off
* @apiErrorExample {json} Error:
*  {    
*      success:    false,
*      message:    'Kratak opis greške', 
*      status:     500, 
*      data:       ["Opis greške"]
*  }
*  
*  status:{
*      true:   "Uspješno",
*      false:  "Podaci nisu pronađeni",
*      500:    "Greška konekcije",
*      501:    "Greška SQL upita"
*      502:    "Obavezni parametri nisu poslani",
*      503:    "Neočekivana pogreška",
*      504:    "Greška validacije",
*      888:    "Čekanje autorizacije kod mobilnih uređaja ukloliko uređaj nije odobren",
*      109007: "Unešen nepoznat url ili nije poslan token u slučaju da aplikacija zahtjeva token"
*  }
*/
















/*
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */


/*
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */


/*
 * @api {post} /users Create user
 * @apiVersion 0.0.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [google_id] Google id
 * @apiParam {String} [Country] Country (HR, D,GB,...)
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */

 /*
 * @api {post} /users Create user
 * @apiVersion 0.0.1-beta
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [google_id] Google id
 * @apiParam {String} [Country] Country (D,GB,...)
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */

  /*
 * @api {post} /users Create user
 * @apiVersion 0.0.2
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} korisničkoime.
 * @apiParam {String} [imekorisnika] korisničkoime.
 * @apiParam {String} [name] User's name.
 * @apiParam {int} [picture] User's picture.
 * @apiParam {String} [google_id] Google id
 * @apiParam {String} [Country] Country (HR,D,GB,...)
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */

/*
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [google_id] Google id
 * @apiParam {String} [Country] Country (HR, D,GB,...)
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */


/*
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */


/*
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */

