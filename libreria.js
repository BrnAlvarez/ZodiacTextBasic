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
                    console.log("es un string");
                    debugger;
                }

            }
            //,
            //otras funciones
        }
        return funciones;
    }
    //Validamos que nuestra función se haya declarado, sino la declaramos para usarla desde cualquier parte del proyecto.
    if (typeof window.contieneFuncion === "undefined") {
        window.contieneFuncion = contieneFuncion();
    }
})(window, document);