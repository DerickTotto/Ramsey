
console.log("funciones");
function nuevo(){
    console.log("funciones2");
    document.getElementById("contenidohome").innerHTML +=
                                                            `<section class="proyecto col-xl-2 mr-4 mb-4" style="background-color:#007bff;" onClick="areaTrabajo()">
                                                                <img src="" alt="">
                                                                <p>${document.getElementById("txtNombreArchi").value}</p>
                                                            </section>`;
    document.getElementById("nuevoProyecto").style.display="none";                                                  
    document.getElementById("txtNombreArchi").value="";          

}
function nuevoProyecto(){
    document.getElementById("nuevoProyecto").style.display="flex";
}

/*Para saber si es un archivo o carpeta debo descomponer y ver si el nombre lleva un punto y los que vaya 
despues del punto es el tipo, si es carpeta se abre otra raiz y si es archivo voy a area de trabajo*/

function areaTrabajo(){
    location.assign("./areaTrabajo.html");
    //location.replace("./areaTrabajo.html");
}

function clickDerecho(){
    alert("Se presiono click derecho");
    document.getElementById("contenidohome").style.backgroundColor="black";
}

/*
    #Base de datos: IDArchivo, tipo, nombre, fecha de creacion, fecha de modificacion 
    #usuarios enlazados con sus archivos
    #favoritos
    #reciclados
    #recientes

    ordenar por:
    #fecha
    #nombre
    #tipo
*/


/* Clase de C++

1) Declaracion de variables y tipos

Bool 
char
int
float
double

Como declarar variables ejm
int numero= 25;

Imprimir en pantalla
cout<<"mensaje"<<endl;  salto de linea endl
cout<<"mensaje\n";      salto de linea \n

concatenar
(<<)

pedir datos

cin>>variable;

funciones
declaracion
1) antes del main
    int suma(int num1, int num2);

    despues del main
int suma(int num1, int num2){
	int r;
	r=num1+num2;
	cout<<r;
}

2) antes del main todo

    int suma(int num1, int num2){
	int r;
	r=num1+num2;
	cout<<r;
}
""""""""""""""""""""""""""""""""""""""""
cmath
math.h

ejemplo
pow
cos
sen
sqrt
log
exp
""""""""""""""""""""""""""""""""""""""""""""
Hope- love
funcion recursiva
1a Instancia 
n=4 
n > 1 
salida ← 4 * factorial(3) (Guarda el valor de n = 4)

2a Instancia 
n > 1 
salida ← 3*factorial(2) (Guarda el valor de n = 3)

3a Instancia
n > 1 
salida ← 2*factorial(1) (Guarda el valor de n = 2)

4a Instancia
n == 1 → retorna 1

3a Instancia 
(recupera n=2 de la pila) retorna 1*2=2

2a instancia 
(recupera n=3 de la pila) retorna 2*3=6

1a instancia
(recupera n=4 de la pila) retorna 6*4=24
Valor de retorno → 24


*/