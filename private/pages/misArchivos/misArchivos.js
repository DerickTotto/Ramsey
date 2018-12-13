var date = new Date();
//==============================Llenado de MisArchivos=====================
(function(){
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
})();
//====================Funcion para llenar con datos de usuario=============
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
                                                                            <img class="col-xl-12" width="80px" src=${img} alt="">
                                                                            <p style="font-size: 12px;">${archivos[i].txt_nombre}</p>
                                                                        </section>
                                                                    </section>`;
        
    }
}
//========================Muestra Modal para crear Archivos=====================
function AbrirModalNuevo(tipo){
    $("#menuCapa").hide('fast');		
    if(tipo == "C"){
        tipo = "Nueva Carpeta";
    }else{
        tipo = "Nuevo Archivo";
    }
   document.getElementById("sec-modalNuevo").className = "sec-modalNuevoOn";
   document.getElementById("sec-modalNuevo").innerHTML = `<section class="modalNuevo">
                                                                <b><p>${tipo}</p><b/>
                                                                <input type="text" class="form-control mb-3" id="nuevoElemento" placeholder="Nombre">
                                                                <section style="text-align: right;">
                                                                    <button type="button" class="btn btn-success mr-2" onclick="nuevoElemento('${tipo}')">Aceptar</button>
                                                                    <button type="button" class="btn btn-danger" onclick="cerrarModalNuevo()">Cancelar</button>
                                                                </section>
                                                            </section>`;
}
//========================Cierra Modal para crear Archivos=====================
function cerrarModalNuevo(){
    document.getElementById("sec-modalNuevo").className = "sec-modalNuevoOff";
}
//========================Muestra el elemento creado y lo guarda en base==========================
function nuevoElemento(tipo){
    var nombreElemento = document.getElementById("nuevoElemento").value;
    console.log(nombreElemento, tipo);
    
    cadena = nombreElemento.split(".");

    tipo = cadena[cadena.length-1];
    console.log(tipo);
    if(tipo == "html"){
        img = "../../img/html.png"
        
    }else if (tipo == "css"){
        img = "../../img/css.png"
    }else if(tipo == "js"){
        img = "../../img/js2.png"
    }else{
        t="100px";
        img = "../../img/folder.png";
        
    }
    document.getElementById("contenidoMisArchivos").innerHTML += `<section class="col-xl-2 row" style="border:1px solid red; display: flex; justify-content: center; align-items: center;">
                                                                        <section>
                                                                            <img class="col-xl-12" width="80px"  src=${img} alt="">
                                                                            <p style="font-size: 12px;">${nombreElemento}</p>
                                                                        </section>
                                                                    </section>`;
    cerrarModalNuevo();
    url="/";
    fecha = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
    console.log(fecha);
    data= `nombre=${nombreElemento}&tipo=${tipo}&url=${url}&fecha=${fecha}`;
    $.ajax({
        url:"/guardarArchivo",
        method: "POST",
        data: data,
        dataType: "json",
        success:function(respuesta){
            console.log("se registro "+respuesta);
        },error:function(respuesta){
            console.log("No se registro "+respuesta);
        }
    });
}

//==============================================================================
function alerta(opcion){
    alert(opcion);
}