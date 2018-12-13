(function(){
    $.ajax({
        url:"/obtenerPerfil",
        success:function(respuesta){
            console.log("home" +respuesta.nickName);
            document.getElementById("dataPerfil").innerHTML = `
                    <p><b>${respuesta.nickName}</b></p>
                    <p>${respuesta.email}</p>`;
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
    }
    desactivarOpcion();
    activarOpcion(id);

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

    $.ajax({
        url: "/llenarMisArchivos",
        method: "POST",
        dataType: "json",
        success:function(respuesta){
            console.log("llenado correcto");
            console.log(respuesta);
            llenarMisArchivos(respuesta);
        },error:function(respuesta){
            console.log("llenado fallo");
        }
    });
}
function llenarMisArchivos(archivos){
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
        document.getElementById("contenidoMisArchivos").innerHTML += `<section class="col-xl-2 row" style="border:1px solid red; display: flex; justify-content: center; align-items: center; text-align:center;">
                                                                        <section>
                                                                            <img class="col-xl-12" width="80px"  src=${img} alt="">
                                                                            <p style="font-size: 12px;">${archivos[i].txt_nombre}</p>
                                                                        </section>
                                                                    </section>`;
        
    }
}
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

$("#btn-cerrarSesion").click(function(){
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
});



