var palabraSecreta = "null",letrasCorrectas=[],letrasIncorrectas=[];
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
//botones
var btn_iniciar = document.getElementById("btn_iniciar");
var btn_AgregarInicio = document.getElementById("btn_agregarInicio");
var btn_nuevoJuego = document.getElementById("btn_nuevoJuego");
var btn_desistir = document.getElementById("btn_desistir");
var btn_aceptarG = document.getElementById("btn_AceptarGanaste");
var btn_aceptarP = document.getElementById("btn_AceptarPerdiste");
var btn_agregarPalabra = document.getElementById("btn_guardarPalabra");
var btn_cancelaAgregarP = document.getElementById("btn_cancelarAgregar");

// Carteles
var cartel_ganar = document.getElementById("cartelGanaste");
var cartel_perder = document.getElementById("cartelPerdiste"); 
var textoPalabraCorrecta = document.getElementById("palabraCorrecta");
var cartel_nuevaPalabra = document.getElementById("cartelNuevaPalabra");

var palabraIngresada = document.getElementById("inputPalabra");
//-----
var tecladoHabilitado = false;
var palabras = ["TECLADO", "RATON", "MICROFONO", "MONITOR", "COMPUTADORA", "USB", "CAMARA", "PENDRIVE", "WIFI", "CPU","ESCRITORIO","TELEVISOR"];
var separacion = 35,inicioX=500,inicioY=400;



function numeroAleatorio(pMax)
{
    let res = 0, min = 0;
    pMax--;
    res = Math.floor(Math.random() * (pMax - min + 1) + min)
    return res;
}

function crear_lineas(posX, cant) {

    pincel.clearRect(0, 0, 1280,860);
    let i = 0;
    while (i < cant) {
        pincel.fillStyle = "blue"
        pincel.fillRect(posX, inicioY, 20, 4);
        posX += separacion;
        i++;
    }
}


function crear_palabra_secreta() //funciona
{
    let res = "null", aleatorio = 0;
    aleatorio = numeroAleatorio(palabras.length);
    if (aleatorio < palabras.length) {
        res = palabras[aleatorio];
    }    
    return res;
}

function escribe_letra(pLetra, pX, pY)
{
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.font ="35px Lobster";
    pincel.fillStyle = "blue";
    pincel.fillText(pLetra, pX, pY);
}

function ubica_letras(pLetra)
{
    for (let i = 0; i < palabraSecreta.length; i++)
    {
        if (pLetra === palabraSecreta[i])
        {
            escribe_letra(pLetra, inicioX + separacion * i, inicioY -20);
            letrasCorrectas.push(pLetra);
        }
    }
}

function escribe_resultado(pResultado, pX, pY) {
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.font = "60px Georgia";
    pincel.fillStyle = "red";
    pincel.fillText(pResultado, pX, pY);
}


function verificador(e)
{
    res = "null";
    if (e.key.match("[A-Z\s]") !== null) {
        if (e.key != "Enter")
        {
            res = e.key;
        }     
    }
    return res;
}


function letra_Correcta(e)
{
    
    palabraSecreta.lastIndexOf
   
    let letra= "null",pos=0;
    letra = verificador(e);
    if (letra !== "null")
    {
        if (palabraSecreta.includes(letra) && !letrasCorrectas.includes(letra))
        {
            ubica_letras(letra);
        }
        else if (!letrasIncorrectas.includes(letra) && !letrasCorrectas.includes(letra))
        {             
            escribe_letra(letra, inicioX + separacion * letrasIncorrectas.length, inicioY+80);
                letrasIncorrectas.push(letra);
        }        
    }
    else { alert("Solo se puede jugar con letras en MAYUSCULAS.") }

    if (palabraSecreta.length === letrasCorrectas.length)
    {
        cartel_ganar.style.display = "block";
        document.removeEventListener("keypress", letra_Correcta);
    }

    if (letrasIncorrectas.length > 5) {
        cartel_perder.style.display = "block";
        document.removeEventListener("keypress", letra_Correcta);
    }
}

function dibujaMiembros(pX,pY,finX,finY,pGrosor)
{
  //podria ir coordinando con letras_acertadas.lenght. para cada instancia del dibujo
    //intentar hacer la base cuadrada y el tipito redondo. 
    pincel.lineWidth = pGrosor;
    pincel.fillStyle = "blue";  
    pincel.strokeStyle = "#e7c874"
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.beginPath();
    pincel.moveTo(pX, pY);
    pincel.lineTo(finX, finY);
    pincel.stroke();
    pincel.closePath();
}

function dibujaPalos(pX, pY, finX, finY, pGrosor) {
    //podria ir coordinando con letras_acertadas.lenght. para cada instancia del dibujo
    //intentar hacer la base cuadrada y el tipito redondo. 
    pincel.lineWidth = pGrosor;
    pincel.fillStyle = "blue";
    pincel.strokeStyle = "brown"
    pincel.lineCap = "square"; // agrega un capuchon cuadrado en a las lineas
    pincel.lineJoin = "bevel"; // une lineas que se cruzan con triangulos
    pincel.beginPath();
    pincel.moveTo(pX, pY);
    pincel.lineTo(finX, finY);
    pincel.stroke();
    pincel.closePath();
}

function dibuja_parapeto()
{
    dibujaPalos(inicioX, inicioY - 60, 800, inicioY - 60, 15); // BASE
    dibujaPalos(inicioX + 150, inicioY - 65, inicioX + 150, (inicioY-75-280), 15); // MASTIL
    dibujaPalos(inicioX + 150, (inicioY - 75 - 280), 900, (inicioY - 75 - 280) , 9); // BRAZO
}

function mostrar_pantalla_inicial(bool)
{
    let ubicacion = "none";
    if (bool) { ubicacion = "block";}

    pincel.clearRect(0, 0, 1280, 860);
    btn_iniciar.style.display = ubicacion;
    btn_agregarInicio.style.display = ubicacion;    
}

function mostrar_pantalla_juego(bool)
{   
    let ubicacion = "none";
    if (bool) { ubicacion = "inline"; }
    btn_nuevoJuego.style.display = ubicacion;
    btn_desistir.style.display = ubicacion;
}

    

function mostrar_pantalla_agregarPalabra(Bool)
{
    let ubicacion = "none";
    if (Bool) { ubicacion = "block"; }

    btn_agregarPalabra.style.display = ubicacion;
    btn_cancelaAgregarP.style.display = ubicacion;  

}

function iniciar_pantalla_inicial()
{
    document.removeEventListener("keypress", letra_Correcta);
    mostrar_pantalla_inicial(true);
    mostrar_pantalla_juego(false)
    mostrar_pantalla_agregarPalabra(false);
}

function fun_AgregarPalabra() {
    if (palabraIngresada.value != "") {
        palabras.push(palabraIngresada.value);
        palabraIngresada.value = "";
        cartel_nuevaPalabra.style.display = "none"; juego();
    }
    else { alert("Debe ingresar una palabra"); }
    console.log(palabras);
}


function juego()
{
    mostrar_pantalla_juego(true);
    mostrar_pantalla_inicial(false);
    letrasCorrectas = [];
    letrasIncorrectas = [];
    palabraSecreta = crear_palabra_secreta();
    alert(palabraSecreta);
    textoPalabraCorrecta.textContent = palabraSecreta;
    crear_lineas(inicioX, palabraSecreta.length);
    document.addEventListener("keypress", letra_Correcta);
    dibuja_parapeto();
    letra_Correcta();   
}

btn_iniciar.onclick = juego;
btn_nuevoJuego.onclick = juego;
btn_desistir.onclick = iniciar_pantalla_inicial;
btn_aceptarG.onclick = function() { cartel_ganar.style.display = "none"; }
btn_aceptarP.onclick = function () { cartel_perder.style.display = "none"; }
btn_agregarPalabra.onclick = fun_AgregarPalabra;

btn_cancelaAgregarP.onclick = function () { cartel_nuevaPalabra.style.display = "none"; iniciar_pantalla_inicial(); }
btn_agregarInicio.onclick = function () { mostrar_pantalla_inicial(false); cartel_nuevaPalabra.style.display = "block"; }