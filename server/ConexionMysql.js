//===========================================[Dependencias]===========================================
var mysql = require ("mysql");
//======================================[Credenciales Validacion]=====================================
var credencialesMysql={
    user:"root",
    password:"",
    database:"ramsey",
    host:"localhost",
    port:"3306"
}
//CONEXION UNICA 
//var conexion = mysql.createConnection(credencialesMysql);


// POOL DE CONEXIONES 
var conexion = mysql.createPool(credencialesMysql);

//ESTABLECER UNA NUEVA CONEXION 
conexion.getConnection(function (error){
   if (error) {
       console.log("No se pudo establecer conexion con la base de datos.");
       conexion = reconectar(conexion);
   } else {
    console.log("Se establecio conexion con la base de datos.");
   } 
});

//Funcion para reconectar en caso de que exista algun problema
function reconectar(conexion) {
    console.log('creando nueva conexion...');
    
    //se crea la nueva conexion
    conexion = mysql.createPool(credenciales);

    //se prueba la nueva conexion
    conexion.getConnection(function (error) {
       if (error) {
           //se vuelve a intentar cada 2s
           setTimeout(reconectar(conexion), 2000);
       } else {
        console.log("Se establecio conexion con la base de datos.");
        return conexion;
       } 
    });
}

//Manejo de errores
conexion.on('error', function (error) {
   if (error.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("No se pudo establecer conexion con la base de datos.");
        return reconectar(conexion);
   } else if(error.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("No se pudo establecer conexion con la base de datos.");
        return reconectar(conexion);
   } else if (error.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("No se pudo establecer conexion con la base de datos.");
   } else {
        console.log("No se pudo establecer conexion con la base de datos.");
        return reconectar(conexion);
   }
});

module.exports = conexion;