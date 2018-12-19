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
//****************************************************************************************************f*****
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
app.get("/pages/areaTrabajo/areaTrabajo.html",verificarSesion,function(req,res){
    
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
            if(req.body.tipo != "carpeta" && req.body.tipo != "proyecto"){
                contenidoArchivo(req.body.nombre,req.body.fecha,res,0);
                //res.end();
            }
            if(req.body.tipo == "proyecto"){
                url = req.body.url + req.body.nombre +"/";
                for(i=0; i<3; i++){
                    if(i == 0){
                        tipo = "html"
                    }if(i == 1){
                        tipo = "css"
                    }if(i == 2){
                        tipo = "js"
                    }
                    mysql.query("INSERT INTO tbl_archivos (txt_nombre, txt_tipo, txt_url, date_fechaCreacion, date_fechaModificacion, id_user) VALUES (?,?,?,?,?,?)",
                    [`${req.body.nombre}.${tipo}`, tipo, url, req.body.fecha, req.body.fecha, req.session.idUser],
                    function(error,data,fields){
                        if(error){
                            res.send(error);
                            res.end();
                        }else{
                            contenidoArchivo(req.body.nombre,req.body.fecha,res,1);
                        }
                        //res.end();
                    });
                }
                res.send(data);
                res.end();
            }
        }
    });
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/llenarMisArchivos", function(req,res){
    id = req.body.id;
    console.log(id, req.body.url);
    var sql;
    if(id=="id1"){
        sql="SELECT * FROM tbl_archivos WHERE id_user = ? and txt_url = ? and bool_papelera = 0";
        validacion = [req.session.idUser, req.body.url];
    }
    if(id=="id2"){
        sql="SELECT * FROM tbl_archivos WHERE id_user = ? and txt_url = ?";
        validacion = [req.session.idUser, req.body.url];
    }
    if(id=="id3"){
        sql="SELECT * FROM tbl_archivos WHERE id_user = ? and bool_favoritos = ?";
        validacion = [req.session.idUser, req.body.fav];
    }
    if(id=="id4"){
        sql="SELECT * FROM tbl_archivos WHERE id_user = ? and bool_compartido = ?";
        validacion = [req.session.idUser, req.body.comp];
    }
    if(id=="id5"){
        sql="SELECT * FROM tbl_archivos WHERE id_user = ? and bool_papelera = ?";
        validacion = [req.session.idUser, req.body.pap];
    }
    mysql.query(sql,
    validacion,
    function(error,data,fields){
        if(error){
            res.send(error);
            res.end();
        }else{
            console.log(req.body.url);
            res.send(data);
            res.end();
        }
    });
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/detallesArchivo", function(req, res){
    mysql.query("SELECT * FROM tbl_archivos WHERE id_archivos = ?",
    [req.body.id],
    function(error, data, fields){
        if(error){
            res.send(error);
            res.end();
        }else{
            res.send(data);
            res.end();
        }
    })
});

//*********************************************************************************************************
//*********************************************************************************************************
app.post("/tipoUsuario", function(req, res){
    mysql.query("SELECT txt_typeUser from tbl_user WHERE id_user = ?",
    [req.session.idUser],
    function(error,data,field){
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
app.post("/pagarPlan", function(req,res){
    mysql.query("UPDATE tbl_user SET txt_typeUser = ? WHERE id_user = ?",
    [req.body.plan, req.session.idUser],
    function(error,data,field){
        if(error){
            res.send(error);
            res.end();
        }else{
            res.send("plan "+req.body.plan+" abquirido");
            res.end();
        }
    }
    )
});
//*********************************************************************************************************
//*********************************************************************************************************
app.post("/acciones", function(req,res){
    var sql;
    console.log(req.body.acc);
    if(req.body.accion == "acc1"){
         sql = "UPDATE tbl_archivos SET bool_favoritos = 1"
         console.log(sql);
    }if(req.body.accion == "acc2"){
         sql = "UPDATE tbl_archivos SET bool_papelera = 1"
         console.log(sql);
    }if(req.body.accion == "acc3"){
         sql = "UPDATE tbl_archivos SET bool_compartido = 1"
         console.log(sql);
    }
    sqli = `${sql} WHERE id_user = ? and id_archivos = ?`
    console.log(sqli);
    mysql.query(sqli,
        [req.session.idUser, req.body.archivo],
        function(error,data,field){
            if(error){
                res.send(error);
                res.end()
            }else{
                res.send("actualizada"+data);
                res.end()
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

function contenidoArchivo(nombre, fecha, res, a){
    console.log(nombre, fecha);
    mysql.query("SELECT id_archivos from tbl_archivos WHERE txt_nombre = ? and date_fechaCreacion = ?",
    [nombre, fecha+":00"],
    function(error,data,fields){
        if(error){
            console.log(error);
            res.send(error);
            res.end();
        }else{
            console.log("********************************"+data[0].id_archivos);
            console.log(data[0].id_archivos);
            mysql.query("INSERT INTO tbl_dataarchivos(id_archivos) VALUES (?)",                        
            [data[0].id_archivos],
            function(error,data,fields){
                if(error){
                    res.send(error);
                    res.end();
                }else{
                    if(a == 0){
                        res.send(data);
                        res.end();
                    }if(a == 1){

                    }
                }
            });
        }
    })
}