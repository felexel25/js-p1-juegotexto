/*FELIX LLERENA 2022*/

var f1 = "background: LightSteelBlue; color: white";
var f2 = "background: LightSlateGray; color: white";
var f3 = "background: DarkSlateGray; color: white" ;

console.log("%c " + "%c " + "%c Felix Llerena | Felexel | ??? | 2022 | 1.0 " + "%c " + "%c ", f1 , f2 , f3 , f2 , f1);

/*INICIO DE VARIABLES*/
     
/*VARIABLES DEL JUEGO*/
var velocidad = 80; //>VARIABLE QUE DEFINE LA VELOCIDAD DE REFRESCO DEL JUEGO

var estadoJuego = "PRE-JUEGO";

var enJuego = false;

var areaJuego = "";

var habitacionJuego = "";

var buffer = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]; //>VARIABLE QUE GUARDA LOS TEXTOS INTRODUCIDOS

var codigoCaracteres = [39,81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,192,90,88,67,
                        86,66,78,77,32,13,8,49,50,51,52,53,54,55,56,57,48,97,98,99,100,101,102,103,104,105,96]; //>VARIABLE QUE CONTIENE LOS CÓDIGOS DE CARACTERES

var caracteres = ["ArrowRight","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L",
                  "Ñ","Z","X","C","V","B","N","M"," ","ENTER","BACKSPACE","1","2","3","4","5","6","7","8","9","0","1","2","3","4","5","6","7","8","9","0"]; //>VARIABLE QUE CONTIENE LAS CARACTERES

var caracterEncontrado = false; //>VARIABLE BOOLEANA UTILIZADA PARA SABER SI UN CARÁCTER HA SIDO ENCONTRADO

var cadenaTemporal = "";

/*VARIABLES EN PANTALLA*/
var posicion = "???"; //>VARIABLE QUE DEFINE LA POSICIÓN DEL PERSONAJE

var lugares = ["HOTEL", "CASA", "BOSQUE"];

var posLugar = 0;

var movimientos = 0; //>VARIABLE CONTADORA DE LOS MOVIMIENTOS 

var textoEntrada = ""; //>VARIABLE QUE GUARDA EL TEXTO DE ENTRADA

var textoSalida = ""; //>VARIABLE QUE GUARDA EL TEXTO DE SALIDA 

var barraBoolean = true; //>VARIABLE BOOLEANA QUE CONTROLA LA BARRA DEL TEXTO

/*VARIABLES-OBJETOS*/
var bolsa_G = false;

var bolsa_P = false;

var destornillador = false;

var llave201 = false;
var llave202 = false;
var llave203 = false;
var llave204 = false;
var llave205 = false;
var llave206 = false;
var llave301 = false;
var llave302 = false;
var llave303 = true;
var llave304 = false;
var llave305 = false;
var llave306 = false;
var llave401 = false;
var llave402 = false;
var llave403 = false;
var llave404 = false;
var llave405 = false;
var llave406 = false;

/*FINAL DE VARIABLES*/

/*INICIO DEL PROGRAMA*/

window.onload = function(){
    var juego = document.getElementById("juego");
    juego.addEventListener('keydown', teclado);
}

setInterval("principal()", velocidad);

function principal(){
    dibujar();
}

function teclado(event){
    console.log(event.keyCode + "-" + event.key + " " + caracterEncontrado);
    
    //>ENCUENTRA EL CARÁCTER
    for (i = 0; i < codigoCaracteres.length; i++) {
        if (codigoCaracteres[i] == event.keyCode) {
            var caracter = caracteres[i];
            caracterEncontrado = true;
            break;	
        }
    }
    
    //>PROCESA LOS CARACTERES
    if (caracterEncontrado) {
        //>BACKSPACE (BORRAR LETRA)
       if (caracter == "BACKSPACE") {
           caracterEncontrado = false;
            if (textoEntrada.length >= 1) {
                textoEntrada = textoEntrada.substring(0, textoEntrada.length - 1);
            }
        }
        //>ENTER (AGREGAR TEXTO)
        else if (caracter == "ENTER") {
            caracterEncontrado = false;
            if (textoEntrada != "") {
                movimientos++;
                agregarTexto(" ");
                agregarTexto("> " + textoEntrada);
                procesarTexto(textoEntrada);
        cadenaTemporal = textoEntrada;
                textoEntrada = "";
            }
        }
    else if (caracter == "ArrowRight"){
        textoEntrada = "";
        textoEntrada = cadenaTemporal;
    }
        //>LIMITE DE CARACTERES 30 ESPACIOS
        else {
            if (textoEntrada.length < 30) {
                caracterEncontrado = false;
                textoEntrada += caracter;
            }
        }
    }
}

function dibujar(){
    var canvas = document.getElementById("canvas"); //>CANVAS
    var ctx = canvas.getContext("2d"); //>CONTEXTO DEL CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height); //>LIMPIADOR DEL CANVAS
    ctx.beginPath(); 
    //>TITULO
    ctx.font = "bold 40px Monotype Corsiva";
    ctx.fillText("JUEGO DE TEXTO", canvas.width/2 - 150, 30);
    //>LINEA 
    ctx.moveTo(0, 50);
    ctx.lineTo(700, 50);
    ctx.stroke();
    //>
    ctx.font = "bold 16px Consolas";
    //>TEXTO DE SALIDA
    let y = 400;
    for (lineas = buffer.length - 1; lineas >= 0 ; lineas--) {
        ctx.fillText(buffer[lineas], 60, y);
        y -= 15;
    }
    //>LINEA
    ctx.moveTo(0, 420);
    ctx.lineTo(700, 420);
    ctx.stroke();
    //>TEXTO DE ENTRADA
    if(barraBoolean){
        ctx.fillText("> " + textoEntrada + "|", 60, 440); 
        setTimeout(function(){barraBoolean = false}, 500);
    }else{
        ctx.fillText("> " + textoEntrada + "", 60, 440); 
        setTimeout(function(){barraBoolean = true}, 500);
    }
    //>LINEA
    ctx.moveTo(0, 450);
    ctx.lineTo(700, 450);
    ctx.stroke();
    //>
    ctx.fillText("POSICIÓN: " + posicion, 80, 480); //>POSICION
    ctx.fillText("MOVIMIENTOS: " + movimientos, 470, 480); //>MOVIMIENTOS
    //>LINEA
    ctx.moveTo(0, 505);
    ctx.lineTo(700, 505);
    ctx.stroke();
}

//>AGREGA TEXTO AL BUFFER 
function agregarTexto(texto) {
    buffer.shift();
    buffer.push(texto);
}

//>PROCESA EL TEXTO PARA CONVERTIRLO EN COMANDOS
function procesarTexto (comando) {
    //>SEPARA EL TEXTO EN COMANDO PARA PROCESAR PATRONES
    let primero = comando.split(" ")[0];
    let segundo = comando.split(" ")[1];
    let tercero = comando.split(" ")[2];
    let cuarto = comando.split(" ")[3];
    
    //agregarTexto(primero + " - " + segundo + " - " + tercero + " - " + cuarto); 
    
    //>COMANDO JUGAR
    if (primero == "JUGAR" || primero == "JUEGO"){
        if (estadoJuego == "PRE-JUEGO"){
            resetearJuego();
            estadoJuego = "JUEGO";
            enJuego = true;
            areaJuego = "HOTEL-PISO-3";
            habitacionJuego = "PASILLO-3";
            agregarTexto("LLEGAS A TU CASA DESPUÉS DE UN AGOTADOR DÍA, TU ÚNICO PENSAMIENTO");
            agregarTexto("ES DESCANSAR. LUEGO DE UNA RÁPIDA DUCHA, UNA ENERGIZANTE COMIDA Y");
            agregarTexto("UNA LECTURA CASUAL TE QUEDAS DORMIDO.");
            agregarTexto("");
            agregarTexto("ES DE MAÑANA Y LA LUZ DEL SOL ANUNCIA LA LLEGADA DE UN NUEVO DÍA.");
            agregarTexto("TE LEVANTAS CON MUCHA ENERGÍA Y AL SALIR DE TU HABITACIÓN VES QUE");
            agregarTexto("TODO ES DIFERENTE...");
        } else if (estadoJuego == "JUEGO"){
                   
        } else if (estadoJuego == "POST-JUEGO"){
            
        }
    } 
    //>COMANDO AYUDA
    else if (primero == "AYUDA"){
        if (estadoJuego == "PRE-JUEGO"){
            
        } else if (estadoJuego == "JUEGO"){
                   
        } else if (estadoJuego == "POST-JUEGO"){
            
        }
    }  
    //>COMANDO SALIR
    else if (primero == "SALIR"){
        if (estadoJuego == "PRE-JUEGO"){
            
        } else if (estadoJuego == "JUEGO"){
            agregarTexto(" '¿QUIERE SALIR DEL JUEGO?'.");
        } else if (estadoJuego == "POST-JUEGO"){
            
        }       
    }
    else if (primero == "SI"){
        if(enJuego == true){
            estadoJuego = "PRE-JUEGO";
            resetearJuego();
        }
    }
    else if (primero == "NO"){
        
    }
    //>COMANDO PISTA
    else if (primero == "PISTA"){
        
    }
    //>COMANDO VER
    else if (comando == "VER" || comando == "MIRAR"){
        if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-1"){
            
        } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-2"){
            
        } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){
            posicion = lugares[posLugar] + " |" + habitacionJuego + "|";
            agregarTexto("");
            agregarTexto(" 'ESTAS EN EL PASILLO DE UN HOTEL'.");
            agregarTexto("  [HACIA NORTE/ARRIBA: PUERTA DE LA HABITACION 306]");
            agregarTexto("  [HACIA OESTE/IZQUIERDA: PASILLO]");
            agregarTexto("  [HACIA ESTE/DERECHA: PARED]");
            agregarTexto("  [HACIA SUR/ABAJO: PUERTA DE LA HABITACION 303]");
        } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-4"){
            
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-301"){
            
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-302"){
            
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-303"){
            posicion = lugares[posLugar] + " |" + habitacionJuego + "|";
            agregarTexto("");
            agregarTexto(" 'ESTAS EN TU HABITACION...'");
            agregarTexto("  [HACIA NORTE/ARRIBA: PUERTA DE LA HABITACION 303]");
            agregarTexto("  [HACIA OESTE/IZQUIERDA: PARED]");
            agregarTexto("  [HACIA ESTE/DERECHA: PARED]");
            agregarTexto("  [HACIA SUR/ABAJO: VENTANA]");
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-304"){
            
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-305"){
            
        } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-306"){
            
        }
    } 
    //>COMANDO CAMINAR
    else if (primero == "CAMINAR" || primero == "ANDAR"){
        if (comando == "CAMINAR" || comando == "ANDAR") {
             agregarTexto(" '¿" + primero + " HACIA DONDE?'."); 
             agregarTexto(" 'ARRIBA - IZQUIERDA - DERECHA - ABAJO'."); 
        } else if (segundo == "ARRIBA" || segundo == "NORTE") {
            if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "LOBBY-PISO-3-VENTANA"){
               
            }else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "LOBBY-PISO-3-ELEVADOR"){
               
            }else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "LOBBY-PISO-3-ESCALERAS"){
           
            }else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-1"){
                agregarTexto("");
                agregarTexto(" 'NO PUEDES AVANZAR MAS'.");
                agregarTexto("  [HACIA NORTE/ARRIBA: PUERTA DE LA HABITACION 304]");
                agregarTexto("  [HACIA OESTE/IZQUIERDA: LOBBY ELEVADOR]");
                agregarTexto("  [HACIA ESTE/DERECHA: PASILLO]");
                agregarTexto("  [HACIA SUR/ABAJO: PUERTA DE LA HABITACION 301]");
            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-2"){
                agregarTexto("");
                agregarTexto(" 'NO PUEDES AVANZAR MAS'.");
                agregarTexto("  [HACIA NORTE/ARRIBA: PUERTA DE LA HABITACION 305]");
                agregarTexto("  [HACIA OESTE/IZQUIERDA: PASILLO]");
                agregarTexto("  [HACIA ESTE/DERECHA: PASILLO]");
                agregarTexto("  [HACIA SUR/ABAJO: PUERTA DE LA HABITACION 302]");
            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){
                agregarTexto("");
                agregarTexto(" 'NO PUEDES AVANZAR MAS'.");
                agregarTexto("  [HACIA NORTE/ARRIBA: PUERTA DE LA HABITACION 306]");
                agregarTexto("  [HACIA OESTE/IZQUIERDA: PASILLO]");
                agregarTexto("  [HACIA ESTE/DERECHA: PARED]");
                agregarTexto("  [HACIA SUR/ABAJO: PUERTA DE LA HABITACION 303]");
            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-301"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-302"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-303"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-304"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-305"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-306"){

            }
        } else if (segundo == "IZQUIERDA" || segundo == "OESTE") {
            if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-1"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-2"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-4"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-301"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-302"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-303"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-304"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-305"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-306"){

            }
        } else if (segundo == "DERECHA" || segundo == "ESTE") {
            if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-1"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-2"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-4"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-301"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-302"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-303"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-304"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-305"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-306"){

            }
        } else if (segundo == "ABAJO" || segundo == "SUR") {
            if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-1"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-2"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){

            } else if(areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-4"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-301"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-302"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-303"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-304"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-305"){

            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "HABITACION-306"){

            }
        }
    }
    //>COMANDO ABRIR
    else if (primero == "ABRIR") {
        //>
        if (comando == "ABRIR") {
             agregarTexto(" '¿" + primero + " QUE?'."); 
        } 
        //>
        if (segundo == "PUERTA") {
            if (comando == "ABRIR PUERTA"){
                 if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){
                    agregarTexto(" '¿" + primero +  " CUAL " + segundo + "?'.");
                    agregarTexto(" 'HABITACIÓN 303 - HABITACIÓN 306'.");
                 }
            } else if (areaJuego == "HOTEL-PISO-3" && habitacionJuego == "PASILLO-3"){
                if (tercero == "HABITACION" && cuarto== "303" && llave303 == true){
                    agregarTexto(" 'ABRES LA PUERTA Y ENTRAS'."); 
                    areaJuego = "HOTEL-PISO-3";
                    habitacionJuego = "HABITACION-303";
                } else if (tercero == "HABITACION" && cuarto== "303" && llave303 == false){
                    agregarTexto(" 'LA PUERTA ESTA CERRADA CON LLAVE'."); 
                }else if (tercero == "HABITACION" && cuarto== "306" && llave306 == true){
                    agregarTexto(" 'ABRES LA PUERTA Y ENTRAS'."); 
                    areaJuego = "HOTEL-PISO-3";
                    habitacionJuego = "HABITACION-306";
                }else if (tercero == "HABITACION" && cuarto== "306" && llave306 == false){
                    agregarTexto(" 'LA PUERTA ESTA CERRADA CON LLAVE'."); 
                } 
            } else{
                agregarTexto(" 'NO RECONOZCO ESTE COMANDO'."); 
            }
        }
        //>
        if (segundo == "BOLSA") {
            if (comando == "ABRIR BOLSA") {
                agregarTexto(" '¿CUAL " + segundo + "?'."); 
            } else if (tercero == "PEQUEÑA" && bolsa_P == false) {
                agregarTexto(" 'NO POSEES LA BOLSA PEQUEÑA'."); 
            }else if (tercero == "PEQUEÑA" && bolsa_P == true) {
                agregarTexto("================================================================"); 
                agregarTexto("================================================================"); 
            } else if (tercero == "GRANDE" &&  bolsa_G == false) {
                agregarTexto(" 'NO POSEES LA BOLSA GRANDE'."); 
            }else if (tercero == "GRANDE" &&  bolsa_G == true) {
                agregarTexto("================================================================"); 
                agregarTexto("================================================================"); 
            } else{
                agregarTexto(" 'NO RECONOZCO ESTE COMANDO'."); 
            }
        } 
    } else {
        agregarTexto(" 'NO RECONOZCO ESTE COMANDO'."); 
    }
}

function resetearJuego(){
    buffer = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "];
    posicion = "???";
    movimientos = 0;
}

/*FINAL DEL PROGRAMA*/