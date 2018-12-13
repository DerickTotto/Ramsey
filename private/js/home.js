$("#data").mousedown(function(e){
    //1: izquierda, 2: medio/ruleta, 3: derecho
    document.oncontextmenu=inhabilitar;// eliminar menu contextual de navegador
    if(e.which == 3){
        console.log("click derecho");
            $("#menuCapa").css("top", (e.pageY - 0));
            $("#menuCapa").css("left", (e.pageX - 220));
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


$(document).bind("contextmenu", function(e){  
    return false;
});

function inhabilitar(){ 
    console.log("menu Contextual del navegador desabilitado.");
    return false 
} 
