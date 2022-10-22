
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var btn_iniciar = document.getElementById("btn_iniciar");

var palabras=["HOLA","SALCHICHA","PERRO","JAMON","TECLADO","PIZZA","CAMION","RATA","ROSA","AIRE"]

function iniciar()
{
  //  pantalla.hidden;
    alert("hola");
}

function numeroAleatorio(pMax)
{
    let res = 0, min = 0;
    pMax--;
    res = Math.floor(Math.random() * (pMax - min + 1) + min)
    return res;
}

function crear_lineas(posX, cant) {

    pincel.clearRect(0, 0, 640, 480);
    let i = 0;
    while (i < cant) {
        pincel.fillStyle = "blue"
        pincel.fillRect(posX, 200, 20, 4);
        posX += 25;
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

    crear_lineas(300, res.length);

    alert(res);
    return res;
}


function verificador(e)
{
    

    return e.key;
}


function letra_Correcta(e,pPalabra)
{
    
    let letra= "null";
    letra = verificador(e);
    if (letra !== "null")
    {
        alert(pPalabra.includes(letra));
        pincel.write("sdfsadfasdfasdf");
        document.write(palabras.find(letra));
    }
   
}

/*
function juego(e)
{
    let palabraSecreta = "null";
    palabraSecreta = crear_palabra_secreta();

    letra_Correcta(e, palabraSecreta);
}

*/
btn_iniciar.onclick = crear_palabra_secreta;

document.addEventListener("keypress", letra_Correcta);


