var date = new Date();
//==============================Llenado de MisArchivos=====================
(function(){
    data = `&url=Mi Unidad/&id=id1`;
    $("#menuCapa").hide('fast');
    $.ajax({
        url: "/llenarMisArchivos",
        method: "POST",
        data: data,
        dataType: "json",
        success:function(respuesta){
            console.log("llenado correcto");
            console.log(respuesta);
            llenarMisArchivos(respuesta,1);
        },error:function(respuesta){
            console.log("llenado fallo");
        }
    });
})();
//====================Funcion para llenar con datos de usuario=============
function llenarMisArchivos(archivos,nuevoUrl){
    console.log("archivos"+archivos);
    document.getElementById("contenidoMisArchivos").innerHTML = "";
    if(archivos.length == 0){
        html = "";
        document.getElementById("contenidoMisArchivos").innerHTML = html;
    }else{
        for(i=0; i<=(archivos.length-nuevoUrl); i++){
            if(archivos[i].txt_tipo == "js"){
                img = "../../img/js2.png";
            }else if(archivos[i].txt_tipo == "html"){
                img = "../../img/html.png";
            }else if(archivos[i].txt_tipo == "css"){
                img = "../../img/css.png";
            }else{
                img = "../../img/folder.png";
            }

            html = `<section class="col-xl-2 row archivo mr-2" ondblclick="dobleClick(${archivos[i].id_archivos})" onmouseup="oneClick(${archivos[i].id_archivos},event)"  id=${archivos[i].id_archivos}>
                        <section>
                            <img class="col-xl-12" width="100px" src=${img} alt="">
                            <p style="font-size: 12px;">${archivos[i].txt_nombre}</p>
                        </section>
                    </section>`;
            
            if(nuevoUrl == 1){
                console.log("repintando raiz");
                document.getElementById("contenidoMisArchivos").innerHTML += html;
            }else{
                console.log("repintando subCarpeta");
                document.getElementById("contenidoMisArchivos").innerHTML += html;
            }
            
        }
    }
}
//========================Muestra Modal para crear Archivos=====================
function AbrirModalNuevo(tipo){
    $("#menuCapa").hide('fast');		
    if(tipo == "C"){
        tipo = "Nueva Carpeta";
    }if(tipo == "P"){
        tipo = "Nuevo Proyecto";
    }
    if(tipo == "A"){
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
    if((cadena.length == 1) && (tipo == "Nueva Carpeta")){
        tipo = "carpeta";
    }if((cadena.length == 1) && (tipo == "Nuevo Proyecto")){
        tipo = "proyecto";
    }if(cadena.length > 1){
        tipo = cadena[cadena.length-1];
    }
    
    console.log(tipo);
    if(tipo == "html"){
        img = "../../img/html.png"
    }else if (tipo == "css"){
        img = "../../img/css.png"
    }else if(tipo == "js"){
        img = "../../img/js2.png"
    }else{
        img = "../../img/folder.png";
    }
    document.getElementById("contenidoMisArchivos").innerHTML += `<section class="col-xl-2 row" style="display: flex; justify-content: center; align-items: center;">
                                                                        <section style="text-align:center;">
                                                                            <img class="col-xl-12" width="80px"  src=${img} alt="">
                                                                            <p style="font-size: 12px;">${nombreElemento}</p>
                                                                        </section>
                                                                    </section>`;
    cerrarModalNuevo();
    url=document.getElementById("urlArchivos").value;
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
//=========================Interpretacion de dobleClick========================
function dobleClick(id){
        console.log("dobleClick a id "+ id);
        $.ajax({
            url: "/detallesArchivo",
            method: "POST",
            data: data,
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                if(respuesta[0].txt_tipo == "carpeta"){
                    console.log("Abriendo Carpeta");
                    url= document.getElementById("urlArchivos").value+`${respuesta[0].txt_nombre}/`
                    document.getElementById("urlArchivos").value = url;
                    url = `&url=${url}&id=id1`;
                    console.log(url);
                    $.ajax({
                        url: "/llenarMisArchivos",
                        method: "POST",
                        data: url,
                        dataType: "json",
                        success:function(respuesta){
                            console.log("llenado correcto");
                            console.log(respuesta);
                            llenarMisArchivos(respuesta,0);
                        },error:function(respuesta){
                            console.log("llenado fallo");
                        }
                    });
                }else{
                    console.log("Abriendo Archivo");
                    window.location.href = "areaTrabajo/areaTrabajo.html";
                }
            },error:function(error){
                console.log(error);
            }
        });      
}
//=========================Interpretacion de unClick========================
function oneClick(id, evt){
        console.log("Click a id "+ id);
            data = `&id=${id}`;
            $.ajax({
                url: "/detallesArchivo",
                method: "POST",
                data: data,
                dataType:"json",
                success:function(respuesta){
                    console.log(respuesta);
                    document.getElementById("detalles").innerHTML = `<p style="font-size:12px;">Nombre: ${respuesta[0].txt_nombre} Tipo de Archivo: ${respuesta[0].txt_tipo} Fecha Creacion: ${respuesta[0].date_fechaCreacion} Ultima Modificacion: ${respuesta[0].date_fechaModificacion}</p>`
                    if(evt.button == 2){
                        console.log("Derick"+respuesta[0].id_archivos)
                        mousedown(evt, respuesta[0].id_archivos);
                    }
                },error:function(error){
                    console.log(error);
                }
            });
    
}
