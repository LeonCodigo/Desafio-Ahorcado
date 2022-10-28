var palabraSecreta = "null",letrasCorrectas=[],letrasIncorrectas=[];
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
//botones
var btn_iniciar = document.getElementById("btn_iniciar");
var btn_agregar = document.getElementById("btn_agregar");
var btn_nuevoJuego = document.getElementById("btn_nuevoJuego");
var btn_desistir = document.getElementById("btn_desistir");
var btn_aceptarG = document.getElementById("btn_AceptarGanaste");
var btn_aceptarP = document.getElementById("btn_AceptarPerdiste");

// Carteles
var cartel_ganar = document.getElementById("cartelGanaste");
var cartel_perder = document.getElementById("cartelPerdiste"); 
var textoPalabraCorrecta = document.getElementById("palabraCorrecta");

//-----
var tecladoHabilitado = false;
var palabras = ["HOLA", "SALCHICHA", "PERRO", "JAMON", "TECLADO", "PIZZA", "CAMION", "RATA", "ROSA", "AIRE"];
var separacion = 35,inicioX=550,inicioY=400;



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
    pincel.font="35px Georgia";
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
    if (e.key.match(/[A-Z\s]/) !== null) {
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

function mostrar_pantalla_inicial(bool)
{
    let ubicacion = "none";
    if (bool) { ubicacion = "block";}

    pincel.clearRect(0, 0, 1280, 860);
    btn_iniciar.style.display = ubicacion;
    btn_agregar.style.display = ubicacion;    
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
    if (bool) { ubicacion = "inline"; }

}

function iniciar_pantalla_inicial()
{
    mostrar_pantalla_inicial(true);
    mostrar_pantalla_juego(false)
    mostrar_pantalla_agregarPalabra(false);
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
    letra_Correcta(e);   
}

btn_iniciar.onclick = juego;
btn_nuevoJuego.onclick = juego;
btn_desistir.onclick = iniciar_pantalla_inicial;
btn_aceptarG.onclick = function() { cartel_ganar.style.display = "none"; }
btn_aceptarP.onclick = function() { cartel_perder.style.display = "none"; }

