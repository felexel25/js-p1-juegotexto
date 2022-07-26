//FELIX LLERENA 2022

var f1 = "background: LightSteelBlue; color: white";
var f2 = "background: LightSlateGray; color: white";
var f3 = "background: DarkSlateGray; color: white";

console.log(
  "%c " +
    "%c " +
    "%c Felix Llerena | Felexel | ??? | 2022 | 1.0 " +
    "%c " +
    "%c ",
  f1,
  f2,
  f3,
  f2,
  f1
);

/*INICIO DE VARIABLES*/

//VARIALES DEL SISTEMA
//VARIABLE QUE DEFINE LA VELOCIDAD DE REFRESCO DEL JUEGO
var velocidad = 60;
//VARIABLE QUE DEFINE EL ESTADO DEL SISTEMA
var estadoPrograma = "PRE-JUEGO";
//VARIABLE QUE GUARDA LOS TEXTOS INTRODUCIDOS
var buffer = [
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
];
//VARIABLE QUE CONTIENE LOS CÓDIGOS DE CARACTERES
var codigoCaracteres = [
  39, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75,
  76, 192, 90, 88, 67, 86, 66, 78, 77, 32, 13, 8, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 48, 97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
];
//VARIABLE QUE CONTIENE LAS CARACTERES
var caracteres = [
  "ARROWRIGHT",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  " ",
  "ENTER",
  "BACKSPACE",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];
//VARIABLE UTILIZADA PARA SABER SI UN CARÁCTER HA SIDO ENCONTRADO
var caracterEncontrado = false;
//VARIABLE QUE GUARDA TEMPORALMENTE EL TEXTO A INTRODUCIR
var cadenaTemporal = "";
//VARIABLE QUE GUARDA EL TEXTO DE ENTRADA
var textoEntrada = "";
//VARIABLE QUE GUARDA EL TEXTO DE SALIDA
var textoSalida = "";
//VARIABLE QUE CONTROLA EL ESTADO DE LA BARRA DEL TEXTO
var barra = true;

//VARIABLES DEL JUEGO

//VARIABLE QUE DEFINE EL ESTADO DEL JUEGO
var enJuego = false;
//VARIABLE QUE DEFINE EL AREA DONDE ESTA EL JUGADOR
var areaJuego = "";
//VARIABLE QUE DEFINE LA HABITACIÓN DONDE ESTA EL JUGADOR
var habitacionJuego = "";
//VARIABLE QUE DEFINE LA POSICIÓN DEL PERSONAJE
var posicion = "???";
//VARIABLE CONTADORA DE LOS MOVIMIENTOS
var movimientos = 0;
//VARIABLE QUE DEFINE LA SALIDA DEL JUEGO
var salir = false;

//VARIABLES OBJETOS
var bolsa_pequeña = true;
var bolsa_grande = true;
var destornillador = true;

//LLAVES

var llave101 = false;
var llave102 = false;
var llave103 = false;
var llave104 = false;
var llave201 = false;
var llave202 = false;
var llave203 = false;
var llave204 = false;
var llave301 = false;
var llave302 = false;
var llave303 = true;
var llave304 = false;

/*FINAL DE VARIABLES*/

/*INICIO DEL PROGRAMA*/

window.onload = function () {
  var juego = document.getElementById("juego");
  juego.addEventListener("keydown", teclado);
};

setInterval("principal()", velocidad);

function principal() {
  dibujar();
}

function teclado(event) {
  console.log(event.keyCode + "-" + event.key + " " + caracterEncontrado);

  //>ENCUENTRA EL CARÁCTER
  for (i = 0; i < codigoCaracteres.length; i++) {
    if (codigoCaracteres[i] == event.keyCode) {
      var caracter = caracteres[i];
      caracterEncontrado = true;
      break;
    }
  }

  //PROCESA LOS CARACTERES
  if (caracterEncontrado) {
    //>BACKSPACE (BORRAR LETRA)
    if (caracter == "BACKSPACE") {
      caracterEncontrado = false;
      if (textoEntrada.length >= 1) {
        textoEntrada = textoEntrada.substring(0, textoEntrada.length - 1);
      }
      return;
    }
    //ENTER (AGREGAR TEXTO)
    if (caracter == "ENTER") {
      caracterEncontrado = false;
      if (textoEntrada != "") {
        movimientos++;
        agregarTexto(" ");
        agregarTexto("> " + textoEntrada);
        comandos(textoEntrada);
        cadenaTemporal = textoEntrada;
        textoEntrada = "";
      }
      return;
    }
    if (caracter == "ARROWRIGHT") {
      caracterEncontrado = false;
      textoEntrada = "";
      textoEntrada = cadenaTemporal;
      return;
    }
    //LIMITE DE CARACTERES 30 ESPACIOS
    if (textoEntrada.length < 30) {
      caracterEncontrado = false;
      textoEntrada += caracter;
    }
    return;
  }
}

function dibujar() {
  //CANVAS
  var canvas = document.getElementById("canvas");
  //CONTEXTO DEL CANVAS
  var ctx = canvas.getContext("2d");
  //LIMPIADOR DEL CANVAS
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  //TITULO
  ctx.font = "bold 40px Monotype Corsiva";
  ctx.fillText("JUEGO DE TEXTO", canvas.width / 2 - 150, 30);
  //LINEA
  ctx.moveTo(0, 50);
  ctx.lineTo(700, 50);
  ctx.stroke();
  //FUENTE
  ctx.font = "bold 16px Consolas";
  //TEXTO DE SALIDA
  let y = 400;
  for (lineas = buffer.length - 1; lineas >= 0; lineas--) {
    ctx.fillText(buffer[lineas], 60, y);
    y -= 15;
  }
  //LINEA
  ctx.moveTo(0, 420);
  ctx.lineTo(700, 420);
  ctx.stroke();
  //TEXTO DE ENTRADA
  if (barra) {
    ctx.fillText("> " + textoEntrada + "|", 60, 440);
    setTimeout(function () {
      barra = false;
    }, 500);
  } else {
    ctx.fillText("> " + textoEntrada + "", 60, 440);
    setTimeout(function () {
      barra = true;
    }, 500);
  }
  //LINEA
  ctx.moveTo(0, 450);
  ctx.lineTo(700, 450);
  ctx.stroke();
  //POSICION EN PANTALLA
  ctx.fillText("POSICIÓN: " + posicion, 80, 480);
  //MOVIMIENTOS EN PANTALLA
  ctx.fillText("MOVIMIENTOS: " + movimientos, 470, 480);
  //LINEA
  ctx.moveTo(0, 505);
  ctx.lineTo(700, 505);
  ctx.stroke();
}

//AGREGA TEXTO AL BUFFER
function agregarTexto(texto) {
  buffer.shift();
  buffer.push(texto);
}

//PROCESA EL TEXTO PARA CONVERTIRLO EN COMANDOS
function comandos(comando) {
  //SEPARA EL TEXTO EN COMANDO PARA PROCESAR PATRONES
  let primero = comando.split(" ")[0];
  let segundo = comando.split(" ")[1];
  let tercero = comando.split(" ")[2];
  let cuarto = comando.split(" ")[3];

  //COMANDO JUGAR
  if (comando == "JUGAR" || comando == "JUEGO") {
    if (estadoPrograma == "PRE-JUEGO") {
      resetearJuego();
      estadoPrograma = "JUEGO";
      enJuego = true;
      areaJuego = "CUBO-PISO-3";
      habitacionJuego = "LOBBY";
      agregarTexto(
        "LLEGAS A TU CASA DESPUÉS DE UN AGOTADOR DÍA, TU ÚNICO PENSAMIENTO"
      );
      agregarTexto(
        "ES DESCANSAR. LUEGO DE UNA RÁPIDA DUCHA, UNA ENERGIZANTE COMIDA Y"
      );
      agregarTexto("UNA LECTURA CASUAL TE QUEDAS DORMIDO.");
      agregarTexto("");
      agregarTexto(
        "ES DE MAÑANA Y LA LUZ DEL SOL ANUNCIA LA LLEGADA DE UN NUEVO DÍA."
      );
      agregarTexto(
        "TE LEVANTAS CON MUCHA ENERGÍA Y AL SALIR DE TU HABITACIÓN VES QUE"
      );
      agregarTexto("TODO ES DIFERENTE...");
      return;
    }
    if (estadoPrograma == "JUEGO") {
      return;
    }
    if (estadoPrograma == "POST-JUEGO") {
      return;
    }
    return;
  }
  //COMANDO AYUDA
  if (comando == "AYUDA") {
    if (estadoPrograma == "PRE-JUEGO") {
      return;
    }
    if (estadoPrograma == "JUEGO") {
      return;
    }
    if (estadoPrograma == "POST-JUEGO") {
      return;
    }
    return;
  }
  //COMANDO SALIR
  if (primero == "SALIR") {
    if (estadoPrograma == "PRE-JUEGO") {
      return;
    }
    if (estadoPrograma == "JUEGO") {
      agregarTexto("> ¿QUIERE SALIR DEL JUEGO?");
      salir = true;
      return;
    }
    if (estadoPrograma == "POST-JUEGO") {
      return;
    }
  }
  //COMANDO SI
  if (comando == "SI") {
    if (salir == true) {
      resetearJuego();
      return;
    }
    return;
  }
  //COMANDO NO
  if (comando == "NO") {
    if (salir == true) {
      salir = false;
      return;
    }
    return;
  }
  //COMANDO PISTA
  if (primero == "PISTA") {
    return;
  }
  //COMANDO VER
  if (comando == "VER" || comando == "MIRAR") {
    if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "LOBBY") {
      posicion = "LOBBY";
      agregarTexto("");
      agregarTexto("> 'ESTAS EN UN CUBO TOTALMENTE BLANCO'.");
      agregarTexto(">  [HACIA NORTE/FRENTE: PUERTA DE LA HABITACION 301]");
      agregarTexto(">  [HACIA OESTE/IZQUIERDA: PUERTA DE LA HABITACION 304]");
      agregarTexto(">  [HACIA ESTE/DERECHA: PUERTA DE LA HABITACION 302]");
      agregarTexto(">  [HACIA SUR/ATRAS: PUERTA DE LA HABITACION 303]");
      return;
    }
    if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "HABITACION-301") {
      posicion = "HABITACIÓN 301";
      return;
    }
    if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "HABITACION-302") {
      posicion = "HABITACIÓN 302";
      return;
    }
    if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "HABITACION-303") {
      posicion = "HABITACIÓN 303";
      agregarTexto("");
      agregarTexto("> 'ESTAS EN TU HABITACION'.");
      agregarTexto(">  [HACIA NORTE/FRENTE: VENTANA]");
      agregarTexto(">  [HACIA OESTE/IZQUIERDA: PARED]");
      agregarTexto(">  [HACIA ESTE/DERECHA: PARED]");
      agregarTexto(">  [HACIA SUR/ATRAS: PUERTA DE LA HABITACION 303]");
      return;
    }
    if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "HABITACION-304") {
      posicion = "HABITACIÓN 304";
      return;
    }
    return;
  }
  //COMANDO CAMINAR
  if (primero == "CAMINAR" || primero == "ANDAR") {
    if (comando == "CAMINAR" || comando == "ANDAR") {
      agregarTexto(" '¿" + primero + " HACIA DONDE?'.");
      agregarTexto(" 'ARRIBA - IZQUIERDA - DERECHA - ABAJO'.");
      return;
    }
    if (segundo == "ARRIBA" || segundo == "NORTE") {
      return;
    }
    if (segundo == "IZQUIERDA" || segundo == "OESTE") {
      return;
    }
    if (segundo == "DERECHA" || segundo == "ESTE") {
      return;
    }
    if (segundo == "ABAJO" || segundo == "SUR") {
      return;
    }
  }
  //COMANDO ABRIR
  if (primero == "ABRIR") {
    if (comando == "ABRIR") {
      agregarTexto(" '¿" + primero + " QUE?'.");
      return;
    }
    //ABRIR PUERTAS
    if (segundo == "PUERTA") {
      if (comando == "ABRIR PUERTA") {
        if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "PASILLO-3") {
          agregarTexto("> ¿" + primero + " CUAL " + segundo + "?");
          agregarTexto("[HABITACIÓN 303] [HABITACIÓN 306]");
        }
        return;
      }
      if (areaJuego == "CUBO-PISO-3" && habitacionJuego == "PASILLO-3") {
        if (tercero == "HABITACION" && cuarto == "303" && llave303 == true) {
          agregarTexto("> 'ABRES LA PUERTA Y ENTRAS'.");
          areaJuego = "CUBO-PISO-3";
          habitacionJuego = "HABITACION-303";
          return;
        }
        if (tercero == "HABITACION" && cuarto == "306" && llave306 == true) {
          agregarTexto("> 'ABRES LA PUERTA Y ENTRAS'.");
          areaJuego = "CUBO-PISO-3";
          habitacionJuego = "HABITACION-306";
          return;
        }
        agregarTexto("> 'LA PUERTA ESTA CERRADA CON LLAVE'.");
        return;
      }
      agregarTexto(" 'NO RECONOZCO ESTE COMANDO'.");
      return;
    }
    //ABRIR BOLSAS
    if (segundo == "BOLSA") {
      if (comando == "ABRIR BOLSA") {
        agregarTexto(" '¿CUAL " + segundo + "?'.");
        return;
      }
      if (tercero == "PEQUEÑA" && bolsa_pequeña == false) {
        agregarTexto(" 'NO POSEES LA BOLSA PEQUEÑA'.");
        return;
      }
      if (tercero == "PEQUEÑA" && bolsa_pequeña == true) {
        agregarTexto(
          "================================================================"
        );
        agregarTexto(
          "================================================================"
        );
        return;
      }
      if (tercero == "GRANDE" && bolsa_grande == false) {
        agregarTexto(" 'NO POSEES LA BOLSA GRANDE'.");
        return;
      }
      if (tercero == "GRANDE" && bolsa_grande == true) {
        agregarTexto(
          "================================================================"
        );
        agregarTexto(
          "================================================================"
        );
        return;
      }
      agregarTexto(" 'NO RECONOZCO ESTE COMANDO'.");
    }
    return;
  }
  agregarTexto(" 'NO RECONOZCO ESTE COMANDO'.");
}

function resetearJuego() {
  estadoPrograma = "PRE-JUEGO";
  buffer = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];
  enJuego = false;
  areaJuego = "";
  habitacionJuego = "";
  posicion = "???";
  movimientos = 0;
  salir = false;
}

/*FINAL DEL PROGRAMA*/
