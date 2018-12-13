var nickName;
var email;
(function(){
    console.log("Login");
})();
//Login
$("#btn-login").click(function(){
    var login = `nickNameEmail=${$("#txt_nickNameEmail").val()}&password=${$("#txt_password").val()}`;
    $.ajax({
        url:"/login",
        method:"POST",
        data: login,
        dataType: "json",
        success:function(respuesta){
            if(respuesta.length == 1){
                nickName=respuesta[0].txt_nickName;
                email=respuesta[0].txt_email;                
                console.log("controlador "+nickName, email);
                window.location.href="../home.html";
            }
        },error:function(error){
            console.log(error);
        }
    });
});