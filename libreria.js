(function (window, document) {
    var contieneFuncion = function () {
        var funciones = {
            setCss: function (elemento, estilos) {
                debugger;
                if (!elemento) return;

                if (typeof estilos === "object") {
                    debugger;
                    var i = 0,
                        largoDeEstilos = 0, //definir el largo del estilo
                        arregloDeEstilos = [], //para convertir el objeto en array
                        elementosEstilos = document.querySelector(elemento).style; //selector del stilos  pasando por parametros el elemento

                    for (i in estilos) {
                        if (estilos.hasOwnProperty(i)) { //verfiicadmos si tiene la propiedad actual indicada como parametro
                            arregloDeEstilos.push(i);//si tiene esa propiedad la agregamos al arreglo
                        }
                    }
                    i = 0;//seteamos nuevamente su valor
                    largoDeEstilos = arregloDeEstilos.length;
                    for (; i < largoDeEstilos; i++) {
                        elementosEstilos[largoDeEstilos[i]] = estilos[arregloDeEstilos[i]];
                    }
                } else if (typeof estilo === "string") {
                    debugger;
                    estilos = estilos.replace(/\s/g, "");
                    var separadorDeEstilos = estilos.indexOf(",") ? "," : ":",
                        multiplesEstilos = estilos.indexOf(";");

                    if (multiplesEstilos >= 0) return;
                    if (separadorDeEstilos == "," || separadorDeEstilos == ":") {
                        estilos = estilos.split(separadorDeEstilos);
                        if (document.querySelector(elemento).style[estilos[0]]) {
                            document.querySelector(elemento).style[estilos[0]] = estilos[1];
                        } else {
                            if (document.querySelector(elemento).style(estilos[1])) {
                                document.querySelector(elemento).style[estilos[1]] = estilos[0];
                            }
                        }
                    }

                }
                //,
                //otras funciones
            },
            escribePorMi: function (leerDesdeId, elemento, limpiar = false) {

                if (!leerDesdeId)
                    return;
                if (typeof leerDesdeId === "object") {
                    if (!leerDesdeId.elemento || !leerDesdeId.leerDesdeId)
                        return;
                    elemento = leerDesdeId.elemento;
                    leerDesdeId = leerDesdeId.leerDesdeId;
                } else if (typeof elemento === "object") {
                    if (!elemento.elemento || !elemento.leerDesdeId)
                        return;
                    elemento = elemento.elemento;
                    leerDesdeId = elemento.leerDesdeId;
                }
                if (!document.body.contains(document.querySelector(leerDesdeId)))
                    return;

                if (limpiar)
                    document.querySelector(elemento).innerHTML = '';
                // document.querySelector(elemento).innerHTML = "Escribiendo Dinámicamente:";
                if (document.querySelector(leerDesdeId).getAttribute('type') == 'file') {
                    var fileInput = document.querySelector(leerDesdeId);

                    //falta validar que contenga un archivo

                    var filePath = fileInput.value;
                    var allowedExtensions = /(.txt)$/i;
                    if (!allowedExtensions.exec(filePath)) {
                        fileInput.value = '';
                        return false;
                    } else {
                        //Image preview
                        if (fileInput.files && fileInput.files[0]) {

                            var lector = new FileReader();
                            lector.onload = function (e) {
                                var texto = e.target.result;
                                texto = texto.toUpperCase();
                                //texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
                                            ejecutar(elemento, respuesta2);
                                        });
                                    }
                                });


                            }
                            lector.readAsText(fileInput.files[0]);
                            //reader.readAsDataURL(fileInput.files[0]);
                        }
                    }
                } else {
                    var texto = document.querySelector(leerDesdeId).value;
                    texto = texto.toUpperCase();
                    //texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
                                ejecutar(elemento, respuesta2);
                            });
                        }
                    });
                }

            }
        }
        return funciones;
    }
    //Validamos que nuestra función se haya declarado, sino la declaramos para usarla desde cualquier parte del proyecto.
    if (typeof window.contieneFuncion === "undefined") {
        window.contieneFuncion = contieneFuncion();
    }
})(window, document);

function contieneCallback(cadena, timer, callBack) {
    setTimeout(function () {
        callBack(cadena);
    }, timer);
}

function ejecutar(elemento, keyText) {
    var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
    // if (keyText == "\n") {
    if (numberOfLineBreaks >= 1) {
        document.querySelector(elemento).innerHTML = document.querySelector(elemento).innerHTML + "<br />";
        return;
    }
    document.querySelector(elemento).innerHTML = document.querySelector(elemento).innerHTML + keyText;

}