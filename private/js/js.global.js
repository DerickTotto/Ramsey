(function(){
    $("#menuCapa").hide('fast');
    $.ajax({
        url:"/obtenerPerfil",
        success:function(respuesta){
            console.log("home" +respuesta.nickName);
            document.getElementById("perfil").innerHTML = `
            <nav class="navbar-item dropdown ml-4">    
                <a class="nav-link downPerfil" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <p><img width="40px" src="../img/usuario.png" alt=""><b>${respuesta.nickName}</b></p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#" onclick="componente('id6')">Mi perfil</a>
                    <a class="dropdown-item" href="#" >Configuraciones</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" onclick="cerrarSession()">Cerrar sesion<i class="fas fa-sign-out-alt ml-2"></i></a>
                </div>
            </nav>
                    `;
        }
    });
    $.ajax({
        url:"../pages/misArchivos/misArchivos.html",
        dataType:"text",
        success:function(data){
            document.getElementById("data").innerHTML = data;
        },
        error:function(data){
            console.log("Nose encontro el archivo a pintar en pantalla");
        }
    });
    desactivarOpcion();
    activarOpcion("id1");
})();


function componente(id){
    if(id=="id1"){
        ruta="../pages/misArchivos/misArchivos.html"
    }if(id=="id2"){
        ruta="../pages/recientes/recientes.html"
    }if(id=="id3"){
        ruta="../pages/favoritos/favoritos.html"
    }if(id=="id4"){
        ruta="../pages/archivosCompartidos/archivosCompartidos.html"
    }if(id=="id5"){
        ruta="../pages/papelera/papelera.html"
    }if(id=="id6"){
        ruta="../pages/miPerfil/miPerfil.html"
    }
    
        desactivarOpcion();
    if(id!="id6"){
        activarOpcion(id);
    }
    $.ajax({
        url:ruta,
        dataType:"text",
        success:function(data){
            document.getElementById("data").innerHTML = data;
        },
        error:function(data){
            console.log("Error de componente "+ data);
        }
    });

    setTimeout(function () {
        console.log(1);
      }, 1500);

    if(id!="id6"){
        data = `&url=Mi Unidad/`;
        if(id == "id1"){
            data = `&url=Mi Unidad/&id=${id}`;
        }
        if(id == "id3"){
            data = `${data}&fav=1&id=${id}`
        }
        if(id == "id4"){
            data = `${data}&comp=1&id=${id}`
        }
        if(id == "id5"){
            data = `${data}&pap=1&id=${id}`
        }
        $.ajax({
            url: "/llenarMisArchivos",
            method: "POST",
            data:data,
            dataType: "json",
            success:function(respuesta){
                console.log("llenado correcto");
                console.log(respuesta);
                llenarMisArchivos(respuesta,1);
            },error:function(respuesta){
                console.log("llenado fallo");
            }
        });
    }
    if(id=="id6"){
        $.ajax({
            url:"/obtenerPerfil",
            success:function(respuesta){
                console.log("home" +respuesta.nickName);
                document.getElementById("dataP").innerHTML = `<p><b>${respuesta.nickName}</b></p><p>${respuesta.email}</p>`;
            }
        });

        $.ajax({
            url:"/tipoUsuario",
            method: "POST",
            dataType: "json",
            success:function(respuesta){
                console.log(respuesta[0].txt_typeUser);
                if(respuesta[0].txt_typeUser == "free"){
                    document.getElementById("free").style = "background-color: rgba(1, 192, 1, 0.849)";
                }if(respuesta[0].txt_typeUser == "plus"){
                    document.getElementById("plus").style = "background-color: rgba(1, 192, 1, 0.849)";
                }if(respuesta[0].txt_typeUser == "pro master"){
                    document.getElementById("pro").style = "background-color: rgba(1, 192, 1, 0.849)";
                }
            }
        });
    }
}
/*function llenarMisArchivos(archivos,nuevoUrl){
    console.log("archivos"+archivos);
    for(i=0; i<=(archivos.length-1); i++){
        if(archivos[i].txt_tipo == "carpeta"){
            img = "../../img/folder.png";
        }else if(archivos[i].txt_tipo == "html"){
            img = "../../img/html.png";
        }else if(archivos[i].txt_tipo == "css"){
            img = "../../img/css.png";
        }else{
            img = "../../img/js2.png";
        }
        document.getElementById("contenidoMisArchivos").innerHTML += `<section class="col-xl-2 row archivo mr-2" ondblclick="dobleClick(${archivos[i].id_archivos})" onclick="oneClick(${archivos[i].id_archivos})"  id=${archivos[i].id_archivos}>
                                                                        <section>
                                                                            <img class="col-xl-12" width="100px" src=${img} alt="">
                                                                            <p style="font-size: 12px;">${archivos[i].txt_nombre}</p>
                                                                        </section>
                                                                    </section>`;
    }
}*/
function activarOpcion(opcion){
    document.getElementById(opcion).className = "activarOpcion";
    document.getElementById("txtOpcion").className = "";
    
}
function desactivarOpcion(){
    document.getElementById("id1").className= "opcion";
    document.getElementById("id2").className= "opcion";
    document.getElementById("id3").className= "opcion";
    document.getElementById("id4").className= "opcion";
    document.getElementById("id5").className= "opcion";
}

function cerrarSession(){
    $.ajax({
        url:"/cerrar-session",
        success:function(respuesta){
            console.log(respuesta);
            if(respuesta == "SesionEliminada"){                
                window.location.href = "/index.html";
            }
        },error:function(error){
            console.log(error);
        }
    })
};



