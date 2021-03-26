var matriz = [];
matriz['A']='♞';
matriz['B']='♡';
matriz['C']='μ';
matriz['D']='♣';
matriz['E']='♠';
matriz['F']='Ω';
matriz['G']='❧';
matriz['H']='♦';
matriz['I']='♂';
matriz['J']='⁝';
matriz['K']='⌃';
matriz['L']='❦';
matriz['M']='∷';
matriz['N']='❣';
matriz['O']='☽';
matriz['P']='❥';
matriz['Q']='♃';
matriz['R']='♄';
matriz['S']='︽';
matriz['T']='♁';
matriz['U']='დ';
matriz['V']='⁝';
matriz['W']='⁕';
matriz['X']='ღ';
matriz['Y']='☸';
matriz['Z']='Ξ';
matriz[' ']='🃏';


$(function(){
    $('#textoLimpio').on('input',function(event){
        this.value = this.value.toUpperCase();
        $('#textoEscrito').val($('#textoEscrito').val()+this.value);
        for (var key in matriz) {
            if(key==this.value){
                $('#textoCodificado').val($('#textoCodificado').val()+matriz[key]);
            }
        }
        this.value = '';
       
    });
    $('#textoLimpio').on('keydown',function(event){
        var key = event.keyCode || event.charCode;
        if(key == 8 || key == 46 ){
            $('#textoEscrito').val($('#textoEscrito').val().substring(0, $('#textoEscrito').val().length - 1));
            $('#textoCodificado').val($('#textoCodificado').val().substring(0, $('#textoCodificado').val().length - 1));
        }
    });
});

