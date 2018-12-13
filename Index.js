//===========================================[Dependencias]===========================================
var express = require ("express");
//var mysql = require ("mysql");
var bodyParser = require ("body-parser");
var session = require("express-session");
var mysql = require("./server/ConexionMysql");

//========================================[Instancia Servidor]========================================
var app = express();
var private = express.static("private");
//===========================================[Middleware]===========================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({secret:"tottoZkimoISUNAH", resave:true, saveUninitialized:true}));
//*********************************************************************************************************
//*********************************************************************************************************
app.use(function(req,res,next){
    console.log("session: "+ req.session.nickName);
    if(req.session.nickName){
        console.log("Carpeta Privada")
        private(req,res,next);
    }else{
        return next();
    }
});
//*********************************************************************************************************
//*********************************************************************************************************
function verificarSesion(req,res,next){
    if(req.session.nickName){
        return next();
    }else{
        res.redirect("/index.html");
        /*res.send("Acceso No Autorizado");*/
        res.end();
    }
}
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/guardarUsuario",function(req, res){
    mysql.query("SELECT txt_nickName,txt_email FROM tbl_user WHERE txt_nickName = ? or txt_email = ?",
        [req.body.nickName, req.body.email],
        function(error, data, fields){
            console.log(data);
            if(error){
                res.send(error);
                res.end();
            }else{
                if(data.length==1){
                    console.log("Ya existe el usuario");
                    res.end();
                }else{
                    mysql.query("INSERT INTO tbl_user(txt_nickName, txt_email, txt_password, txt_typeUser) VALUES (?,?,sha1(?),'free')",
                        [req.body.nickName, req.body.email, req.body.password],
                        function(error,data,fields){
                            if(error){
                                res.send(error);
                                res.end();
                            }else{
                                res.send(data);
                                console.log(data);
                                res.end();
                            }
                        }                
                    )
                }
            }
        }
    );
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/login", function(req, res){
    mysql.query("SELECT id_user, txt_nickName, txt_email, txt_typeUser FROM tbl_user WHERE (txt_nickName = ? or txt_email = ?) and txt_password = sha1(?)",
    [req.body.nickNameEmail, req.body.nickNameEmail, req.body.password],
    function(error,data,fields){
        if(error){
            res.send(error);
            res.end();
        }else{
            if(data.length==1){
                req.session.idUser = data[0].id_user;
                req.session.nickName = data[0].txt_nickName;
                req.session.email = data[0].txt_email;
                req.session.typeUser = data[0].txt_typeUser;
                console.log("user"+data[0].id_user);
                console.log("nick"+data[0].txt_nickName);
                console.log("typo"+data[0].txt_typeUser);
                //home.asignarPerfil(req.session.nickName,req.session.email);
            }
            res.send(data);
            res.end();
        }
    }
    )
});
app.listen(3000, function(){
    console.log("Servidor Iniaciado");
});
//*********************************************************************************************************
//*********************************************************************************************************
app.get("/cerrar-session",function(req,res){
    req.session.destroy();
    res.send("SesionEliminada");
    res.end();
});
//*********************************************************************************************************
//*********************************************************************************************************
app.get("/pages/home.html",verificarSesion,function(req,res){
    
    res.end();
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/guardarArchivo", function(req, res){
    mysql.query("INSERT INTO tbl_archivos (txt_nombre, txt_tipo, txt_url, date_fechaCreacion, date_fechaModificacion, id_user) VALUES (?,?,?,?,?,?)",
    [req.body.nombre, req.body.tipo, req.body.url, req.body.fecha, req.body.fecha, req.session.idUser],
    function(error,data,fields){
        if(error){
            res.send(error);
            res.end();
        }else{
            res.send(data);
            res.end();
        }
    });
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/llenarMisArchivos", function(req,res){
    mysql.query("SELECT * FROM tbl_archivos WHERE id_user = ?",
    [req.session.idUser],
    function(error,data,fields){
        if(error){
            res.send(error);
            res.end();
        }else{
            res.send(data);
            res.end();
        }
    });
});
//*********************************************************************************************************
//*********************************************************************************************************
app.get("/obtenerPerfil", function(req,res){
    perfil ={
        nickName : req.session.nickName,
        email : req.session.email
    }
    res.send(perfil);
    res.end();
});