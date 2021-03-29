var matriz = [];
matriz['A'] = ['♞', 'A'];
matriz['B'] = ['♡', 'B'];
matriz['C'] = ['μ', 'C'];
matriz['D'] = ['♣', 'D'];
matriz['E'] = ['♠', 'E'];
matriz['F'] = ['Ω', 'F'];
matriz['G'] = ['❧', 'G'];
matriz['H'] = ['♦', 'H'];
matriz['I'] = ['♂', 'I'];
matriz['J'] = ['⁝', 'J'];
matriz['K'] = ['⌃', 'K'];
matriz['L'] = ['❦', 'L'];
matriz['M'] = ['∷', 'M'];
matriz['N'] = ['❣', 'N'];
matriz['O'] = ['☽', 'O'];
matriz['P'] = ['❥', 'P'];
matriz['Q'] = ['♃', 'Q'];
matriz['R'] = ['♄', 'R'];
matriz['S'] = ['︽', 'S'];
matriz['T'] = ['♁', 'T'];
matriz['U'] = ['დ', 'U'];
matriz['V'] = ['⁝', 'V'];
matriz['W'] = ['⁕'], 'W';
matriz['X'] = ['ღ', 'X'];
matriz['Y'] = ['☸', 'Y'];
matriz['Z'] = ['Ξ', 'Z'];
matriz[' '] = ['🃏', 'SPACE'];
matriz['0'] = ['0', 'NUMBER_0_'];
matriz['1'] = ['1', 'NUMBER_1_'];
matriz['2'] = ['2', 'NUMBER_2_'];
matriz['3'] = ['3', 'NUMBER_3_'];
matriz['4'] = ['4', 'NUMBER_4_'];
matriz['5'] = ['5', 'NUMBER_5_'];
matriz['6'] = ['6', 'NUMBER_6_'];
matriz['7'] = ['7', 'NUMBER_7_'];
matriz['8'] = ['8', 'NUMBER_8_'];
matriz['9'] = ['9', 'NUMBER_9_'];
matriz['.'] = ['9', 'PUNTO'];
matriz['\n'] = ['\n', 'SALTO'];

/*var texto = 'No te amo como si fueras rosa de sal, topacio\n'+
'o flecha de claveles que propagan el fuego:\n'+
'te amo como se aman ciertas cosas oscuras,\n'+
'secretamente, entre la sombra y el alma.\n'+
'\n'+
'Te amo como la planta que no florece y lleva\n'+
'dentro de sí, escondida, la luz de aquellas flores,\n'+
'y gracias a tu amor vive oscuro en mi cuerpo\n'+
'el apretado aroma que ascendió de la tierra.\n'+
'\n'+
'Te amo sin saber cómo, ni cuándo, ni de dónde,\n'+
'te amo directamente sin problemas ni orgullo:\n'+
'así te amo porque no sé amar de otra manera,\n'+
'\n'+
'sino así de este modo en que no soy ni eres,\n'+
'tan cerca que tu mano sobre mi pecho es mía,\n'+
'tan cerca que se cierran tus ojos con mi sueño.\n';*/


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


$(function () {


    // $('#newspaper').css('min-height', '900px');
    // $('#newspaper').css('border', '1px red');
    // $('#newspaper').css('height', 'auto');
    // $('#newspaper').css('background', 'white');
    $(document).on({
        keydown: function (event) {
            var keyText = event.originalEvent.key.toUpperCase();
            var tag = event.target.tagName.toLowerCase();
            if (
                (event.keyCode < 48 || event.keyCode > 57) &&  //32 si
                (event.keyCode < 65 || event.keyCode > 90) && //32 si
                (event.keyCode < 97 || event.keyCode > 122) && //32 si 
                (event.keyCode != 32) && //32 no
                (event.keyCode != 13)
            ) {
                console.log("(" + event.keyCode + " < 48) || (" + event.keyCode + " > 57) &&" +  //32 si
                    "(" + event.keyCode + " < 65 || " + event.keyCode + " > 90) &&" + //32 si
                    "(" + event.keyCode + " < 97) || (" + event.keyCode + " > 122) &&" + //32 si 
                    "(" + event.keyCode + " != 32 || " +
                    "(" + event.keyCode + " != 13)");
                return false;
            }

            if (event.which != 8 && event.which != 12 && tag != 'input' && tag == 'body' && tag != 'textarea') {
                $('#textoCodificado').val($('#textoCodificado').val() + keyText);
                if (event.keyCode == 13) {
                    $('#textoEscrito').val($('#textoEscrito').val() + '\n');
                    $('#newspaper').append("<br />");
                    return false;
                }
                if (event.keyCode == 8) {
                    return false;
                }

                $('#textoCodificado').val($('#textoCodificado').val().toUpperCase());
                var textoAnterior = $('#textoCodificado').val();
                textoAnterior = textoAnterior.substring(0, textoAnterior.length - 1);

                var existe = 0;
                for (var key in matriz) {
                    if (key[0] == keyText) {
                        existe = 1;
                    }
                }
                if (existe == 0) {
                    $('#textoCodificado').val(textoAnterior);
                    return false;
                }

                $('#textoEscrito').val($('#textoEscrito').val() + keyText);
                $('#textoCodificado').val('');
                for (var key in matriz) {
                    if (key[0] == keyText) {
                        var Random = '';
                        if (keyText != '0' && keyText != '1' && keyText != '2' && keyText != '3' && keyText != '4' && keyText != '5' && keyText != '6' && keyText != '7' && keyText != '8' && keyText != '9')
                            Random = (Math.floor(Math.random() * 6) + 1);
                        else
                            Random = '1';
                        $('#newspaper').append('<img src="images/' + matriz[key][1] + Random + '.jpg" />');
                        $('#textoCodificado').val(textoAnterior + matriz[key][0]);
                    }
                }
            }
        }
    });
    $(document).on('keydown', function (event) {
        var key = event.keyCode || event.charCode;
        if (key == 8 || key == 46) {
            $('#textoEscrito').val($('#textoEscrito').val().substring(0, $('#textoEscrito').val().length - 1));
            $('#textoCodificado').val($('#textoCodificado').val().substring(0, $('#textoCodificado').val().length - 1));
            $('#newspaper').children().last().remove()
        }
    });


    function leerArchivo(e) {
        $("#Titutlo").text("Interpretando Contenido");
        $("#newspaper").html('');
        var archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = function (e) {
            var texto = e.target.result;
            texto = texto.toUpperCase();
            texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(texto);
            // var texto = "HOLA";
            var timer = 1000;
            contieneCallback(texto, timer, function (respuesta) {
                for (var i = 0; i < respuesta.length; i++) {
                    var keyText = respuesta.substr(i, 1);
                    var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
                    if (keyText == " ")
                        timer = timer + 150;
                    else if (numberOfLineBreaks >= 1)
                        timer = timer + 200;
                    else
                        timer = timer + 100;
                    contieneCallback(keyText, timer, function (respuesta2) {
                        ejecutar(respuesta2);
                    });
                }
            });


        };
        lector.readAsText(archivo);
    }

    document.getElementById('file-input')
        .addEventListener('change', leerArchivo, false);



});

function contieneCallback(cadena, timer, callBack) {
    setTimeout(function () {
        callBack(cadena);
    }, timer);
}

function ejecutar(keyText) {
    var existe = 0;
    for (var key in matriz) {
        if (key[0] == keyText) {
            existe = 1;
        }
    }
    if (existe == 0) {
        console.log("No existe caracter");
    }

    for (var key in matriz) {
        if (key[0] == keyText) {
            var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
            // if (keyText == "\n") {
            if (numberOfLineBreaks >= 1) {
                $('#newspaper').append("<br /><br />");
                break;
            }
            var Random = '';
            if (keyText != '0' && keyText != '1' && keyText != '2' && keyText != '3' && keyText != '4' && keyText != '5' && keyText != '6' && keyText != '7' && keyText != '8' && keyText != '9')
                Random = (Math.floor(Math.random() * 6) + 1);
            else
                Random = '1';
            $('#newspaper').append('<img class="rounded" style="width: 35px; height: 35px;" src="images/' + matriz[key][1] + Random + '.jpg" />');
            $('html, body').animate({
                scrollTop: $(document).height()
            }, 'slow');
        }
    }

}





