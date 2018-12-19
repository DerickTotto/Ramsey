
function mousedown(e, archivo){    
    //1: izquierda, 2: medio/ruleta, 3: derecho
    document.oncontextmenu=inhabilitar;// eliminar menu contextual de navegador
    if(e.button == 2){
        console.log("b"+archivo)
        console.log("click derecho");
            $("#menuCapa").css("top", (e.pageY - 55));
            $("#menuCapa").css("left", (e.pageX - 230));
            $("#menuCapa").show('fast');
            document.getElementById("menuCapa").innerHTML =`
            <li onclick="AbrirModalNuevo('C')"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-folder">&nbsp;&nbsp;</i>Nueva carpeta &nbsp;</p></b></li>
            <li onclick="AbrirModalNuevo('A')"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-file">&nbsp;&nbsp;</i>Nuevo archivo &nbsp;</p></b></li>
            <li onclick="AbrirModalNuevo('P')"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-file">&nbsp;&nbsp;</i>Nuevo Proyecto &nbsp;</p></b></li>
            <li><hr></li>
            <li onclick="acciones('acc1',${archivo})" id="accionFavoritos"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-heart">&nbsp;&nbsp;</i>Agregar a Favoritos &nbsp;</p></b></li>
            <li onclick="acciones('acc2',${archivo})" id="accionBorrar"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-trash">&nbsp;&nbsp;</i> Mandar a Papelera &nbsp;</p></b></li>
            <li onclick="acciones('acc3',${archivo})" id="accionCompartir"><b><p style="justify-content:left" class="textOpcionArchivo mb-2"><i class="opcionArchivo fas fa-share-alt">&nbsp;&nbsp;</i> Compartir &nbsp;</p></b></li>
            `;
        if(archivo != undefined){
            document.getElementById("accionFavoritos").style ="display: block";
            document.getElementById("accionBorrar").style ="display: block";
            document.getElementById("accionCompartir").style ="display: block";
        }
        if(archivo == undefined){
            document.getElementById("accionFavoritos").style ="display: none";
            document.getElementById("accionBorrar").style ="display: none";
            document.getElementById("accionCompartir").style ="display: none";
        }
    }if(e.button == 1){
        console.log("click central");
    }if(e.button == 0){
        console.log("click izquierdo");
        $("#data").click(function(){
            $("#menuCapa").hide('fast');			
        });
    }
    
};


/*$("#data").mousedown(function(e){
    //1: izquierda, 2: medio/ruleta, 3: derecho
    document.oncontextmenu=inhabilitar;// eliminar menu contextual de navegador
    if(e.which == 3){
        console.log("click derecho");
            $("#menuCapa").css("top", (e.pageY - 55));
            $("#menuCapa").css("left", (e.pageX - 230));
            $("#menuCapa").show('fast');
    }if(e.which == 2){
        console.log("click central");
    }if(e.which == 1){
        console.log("click izquierdo");
        $("#data").click(function(){
            $("#menuCapa").hide('fast');			
        });
    }
});
*/

$(document).bind("contextmenu", function(e){  
    return false;
});

function inhabilitar(){ 
    console.log("menu Contextual del navegador desabilitado.");
    return false 
} 

function acciones(acc,archivo){
    console.log("acc"+archivo+ acc)
    $.ajax({
        url:"/acciones",
        method: "POST",
        data:`archivo=${archivo}&accion=${acc}`,
        dataType: "json",
        success:function(respuesta){
            console.log(respuesta);
        },error:function(error){
            console.log(error);
        }
    });
}