//Registrar Usuario
$("#btn-registrar").click(function(){
    if($("#password").val()==$("#confirmPassword").val()){// Validacion de contraseñas iguales Si lo son crea el ajax y envia la informacion a guardarUsuario
        var registrarUsuario = `nickName=${$("#nickName").val()}&email=${$("#email").val()}&password=${$("#password").val()}&confirmPassword=${$("#confirmPassword").val()}`;
        console.log("datos registro UrlEncode "+ registrarUsuario);
        $.ajax({
            url:"/guardarUsuario",
            method:"POST",
            data: registrarUsuario,
            dataType:"json",
            success:function(respuesta){
                console.log("guardarUsuario "+respuesta);
                if(respuesta.affectedRows==1){
                    window.location.href="/login.html";
                }
            },error:function(error){
                console.log(error);
            }
        });
    }
    else{ //sino error de contraseñas
        console.log("error contraseña diferente");
        document.getElementById("password").style="border: 1px solid red";
        document.getElementById("confirmPassword").style="border: 1px solid red";
    }
});
