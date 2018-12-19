function modalPlan(plan){
    console.log("Hola MOdal");
    document.getElementById("sec-modalNuevo").className = "sec-modalNuevoOn";
    document.getElementById("sec-modalNuevo").innerHTML = `<section class="modalNuevo">
        <b><p>Pagar plan ${plan.toUpperCase()}</p><b/>
        <section style="text-align: right;">
            <button type="button" class="btn btn-success mr-2" onclick="pagarPlan('${plan}')">Aceptar</button>
            <button type="button"   class="btn btn-danger" onclick="cerrarModalNuevo()">Cancelar</button>
        </section>
    </section>`;
}
function pagarPlan(plan){
    data = `plan=${plan}`;
    $.ajax({
        url:"/pagarPlan",
        method: "POST",
        data:data,
        dataType: "json",
        success:function(respuesta){
            console.log(respuesta);
        },error:function(error){
            console.log(error);
        }
    });
    cerrarModalNuevo();
}