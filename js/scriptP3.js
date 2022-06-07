function preparaCanvas(){
    let cvs = document.querySelectorAll('canvas');
    cvs.forEach(function(e){
        e.width=360;
        e.height=360;
    });
}


function limpiar(){

    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');
    ctx.clearRect(0,0,cv.width,cv.height);
    cv.width=cv.width; 


}

function redimensiona(){

    limpiar();
    let tam = document.querySelector('#desplegable').value;
    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');
    rejilla(tam);
}

function comprobar(final, ancho){

    let id = sessionStorage['id'];
    let token = sessionStorage['token'];
    let sudoku = sessionStorage['sudoku'];
    let url = 'api/sudoku/'+id+'/comprobar';
    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');
    
    console.log('El token es: '+token);
    let fd = new FormData();
    fd.append('juego', sudoku);

    fetch(url,{method:'POST', body:fd ,headers:{'Authorization': token}}).then(function(respuesta){

        if(respuesta.ok){
            respuesta.json().then(function(datos){
                     
                console.log(datos);

                if(final == true){
                    if(datos.FALLOS.length==0){
                        let html = '';
                        html += '<article>';
                        html += '<h2 id=datos_correctos>SUDOKU</h2>';

                        pararRAF();
                        let tiempo = document.querySelector('#crono-raf').value;
                        tiempo = tiempo.split(":  ")[1];
                        html += '<p>¡ENHORABUENA! Has completado el sudoku en un tiempo de '+tiempo+'</p>';

                        html += '<footer><button onclick="cerrarMensajeModal(); finalizar();"> Aceptar</button></footer>';
                        html += '</article>';
                        
                        mensajeModal(html);
                        
                        
                    }
                    else {
                        let html = '';
                        html += '<article>';
                        html += '<h2 id=datos_incorrectos>SUDOKU</h2>';
                        let fallos = datos.FALLOS.length;
                        html += '<p>Hay '+ fallos +' errores ¿quieres intentar corregirlos?</p>';
                        html += '<footer><button onclick="cerrarMensajeModal();"> Sí</button> <button onclick="cerrarMensajeModal();finalizar();"> No</button></footer>';
           
                        html += '</article>';
                        mensajeModal(html);
                    }
                }
                else {

                    for(let i=0; i<datos.FALLOS.length; i++){

                        let col = datos.FALLOS[i].columna;
                        let fil = datos.FALLOS[i].fila;
                        let num = JSON.parse(sessionStorage['sudoku'])[fil][col];

                        ctx.beginPath();
                        ctx.rect(col*ancho+1, fil*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "red";
                        ctx.fill();
                    
                        ctx.beginPath();
                        ctx.fillStyle = "#000";
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = 'bold 32px sans-serif,arial';
                        ctx.fillText(num, (col*ancho)+(ancho/2), (fil*ancho)+(ancho/2));
                    }
                    //mousemove(cv,ancho);
                    if(sessionStorage['bool_marcado']=='true') {
                    cv.onmouseenter = function(evt){
                     
                            let col = parseInt(sessionStorage['columnita']);
                            let fil = parseInt(sessionStorage['filita']);
                            let num_inicial = JSON.parse(sessionStorage['sudoku_inicial'])[fil][col];
                            let tam = document.querySelector('#desplegable').value;

                            if(num_inicial == 0){     
                        
                                limpiar();
                                let html = '';
                                html += '<hr><h2>Números disponibles</h2>';
                                html += '<button onclick="mete(1,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">1</button>';
                                html += '<button onclick="mete(2,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">2</button>';
                                html += '<button onclick="mete(3,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">3</button>';
                                html += '<button onclick="mete(4,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">4</button>';
        
                                if(tam==9){
                                    html += '<button onclick="mete(5,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">5</button>';
                                    html += '<button onclick="mete(6,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">6</button>';
                                    html += '<button onclick="mete(7,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">7</button>';
                                    html += '<button onclick="mete(8,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">8</button>';
                                    html += '<button onclick="mete(9,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">9</button>';
                                }
                        
                                //document.querySelector('#numeros').innerHTML = html;
                                let entro = false;
        
                                for(let i=0; i<sessionStorage['sudoku'].length;i++){
                                    ctx.beginPath(); 
                                    ctx.rect(i*ancho+1, fil*ancho+1, ancho-2, ancho-2);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();                     
                                }
                                for(let i=0; i<sessionStorage['sudoku'].length;i++){
                                    ctx.beginPath(); 
                                    ctx.rect(col*ancho+1, i*ancho+1, ancho-2, ancho-2);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();                     
                                }
                                
                                if(tam == 4){
        
                                    if((col==0 && fil == 0 )||(col==0 && fil == 1 )|| (col==1 && fil == 0 ) || (col==1 && fil == 1)){
                                        ctx.beginPath(); 
                                        ctx.rect(0*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(0*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(1*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(1*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                    }
                                    if((col==2 && fil == 0 )||(col==2 && fil == 1 )|| (col==3 && fil == 0 ) || (col==3 && fil == 1)){
                                        ctx.beginPath(); 
                                        ctx.rect(2*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(2*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(3*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(3*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
        
                                    }
                                    if((col==0 && fil == 2 )||(col==1 && fil == 2)|| (col==0 && fil == 3 ) || (col==1 && fil == 3)){
                                        ctx.beginPath(); 
                                        ctx.rect(0*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(1*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(0*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(1*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
        
                                    }
                                    if((col==2 && fil == 2 )||(col==2 && fil == 3)|| (col==3 && fil == 2) || (col==3 && fil == 3)){
                                        ctx.beginPath(); 
                                        ctx.rect(2*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(2*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(3*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
                                        ctx.beginPath(); 
                                        ctx.rect(3*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                        ctx.fillStyle = "orange";
                                        ctx.fill();
        
                                    }
                                }
                                if(tam == 9) {
                                  
                                        if((col==0 && fil == 0 )||(col==0 && fil == 1 )|| (col==0 && fil == 2) || (col==1 && fil == 0 )||(col==1 && fil == 1 )|| (col==1 && fil == 2) || (col==2 && fil == 0 )||(col==2 && fil == 1 )|| (col==2 && fil == 2)){
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==3 && fil == 0 )||(col==3 && fil == 1 )|| (col==3 && fil == 2) || (col==4 && fil == 0 )||(col==4 && fil == 1 )|| (col==4 && fil == 2) || (col==5 && fil == 0 )||(col==5 && fil == 1 )|| (col==5 && fil == 2)){
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==6 && fil == 0 )||(col==6 && fil == 1 )|| (col==6 && fil == 2) || (col==7 && fil == 0 )||(col==7 && fil == 1 )|| (col==7 && fil == 2) || (col==8 && fil == 0 )||(col==8 && fil == 1 )|| (col==8 && fil == 2)){
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==0 && fil == 3 )||(col==1 && fil == 3 )|| (col==2 && fil == 3) || (col==0 && fil == 4 )||(col==1 && fil == 4)|| (col==2 && fil == 4) || (col==0 && fil == 5 )||(col==1 && fil == 5)|| (col==2 && fil == 5)){
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==3 && fil == 3 )||(col==4 && fil == 3 )|| (col==5 && fil == 3) || (col==3 && fil == 4 )||(col==4 && fil == 4)|| (col==5 && fil == 4) || (col==3 && fil == 5 )||(col==4 && fil == 5)|| (col==5 && fil == 5)){
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==6 && fil == 3 )||(col==7 && fil == 3 )|| (col==8 && fil == 3) || (col==6 && fil == 4 )||(col==7 && fil == 4)|| (col==8 && fil == 4) || (col==6 && fil == 5 )||(col==7 && fil == 5)|| (col==8 && fil == 5)){
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==0 && fil == 6 )||(col==1 && fil == 6 )|| (col==2 && fil == 6) || (col==0 && fil == 7 )||(col==1 && fil == 7)|| (col==2 && fil == 7) || (col==0 && fil == 8 )||(col==1 && fil == 8)|| (col==2 && fil == 8)){
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(0*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(1*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(2*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==3 && fil == 6 )||(col==4 && fil == 6 )|| (col==5 && fil == 6) || (col==3 && fil == 7 )||(col==4 && fil == 7)|| (col==5 && fil == 7) || (col==3 && fil == 8 )||(col==4 && fil == 8)|| (col==5 && fil == 8)){
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(3*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(4*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(5*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                        if((col==6 && fil == 6 )||(col==7 && fil == 6 )|| (col==8 && fil == 6) || (col==6 && fil == 7 )||(col==7 && fil == 7)|| (col==8 && fil == 7) || (col==6 && fil == 8 )||(col==7 && fil == 8)|| (col==8 && fil == 8)){
                                            ctx.beginPath();  ctx.rect(6*ancho+1, 6*ancho+1, ancho-3, ancho-3); ctx.fillStyle = "orange";                                                      
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(6*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(7*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                            ctx.beginPath(); 
                                            ctx.rect(8*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                            ctx.fillStyle = "orange";
                                            ctx.fill();
                                        }
            
                                    
                                }
                                mousemove2(cv,ancho);
                          
                                
                                ctx.beginPath();
                                ctx.rect(col*ancho+1, fil*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "red";
                                ctx.fill();
        
                                ctx.beginPath();
                                ctx.rect(col*ancho+3, fil*ancho+3, ancho-6, ancho-6);
                                ctx.fillStyle = "green";
                                ctx.fill();
        
                                for(let i=0; i<JSON.parse(sessionStorage['sudoku']).length; i++) {
                                    for(let j=0; j<JSON.parse(sessionStorage['sudoku'])[i].length; j++) {
                                        let numerito_ini = JSON.parse(sessionStorage['sudoku_inicial'])[i][j];
                                        let numerito_fin = JSON.parse(sessionStorage['sudoku'])[i][j];
                                        if(numerito_ini != 0){
                                            ctx.beginPath();
                                            ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                                            ctx.fillStyle = "rgb(176, 196, 206)";
                                            ctx.fill();
                                            ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                                            ctx.font = 'bold 32px sans-serif,arial';
                                            ctx.fillText(numerito_ini, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
                                        }
                                        else if(numerito_fin != numerito_ini){
                                            ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                                            ctx.font = 'bold 32px sans-serif,arial';
                                            ctx.fillText(numerito_fin, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
                                        }
                                    }
                                }
                                rejilla(tam);
                            }
                        

                    }
                }
                }
            });
        }
    });
    return false;
}


function finalizar(){
   
    document.querySelector('canvas').onmousemove = function(evt){}
    document.querySelector('canvas').onclick = function(evt){}
    document.querySelector('#numeros').innerHTML = '';
    document.querySelector('canvas').style.cursor = 'auto';
    let id = sessionStorage['id'];
    let url = 'api/sudoku/'+id;
    let token = sessionStorage['token'];

    fetch(url,{method:'DELETE',headers:{'Authorization': token}}).then(function(respuesta){

        if(respuesta.ok){
            respuesta.json().then(function(datos){
                     
                console.log(datos);

                html = '<button onclick="empieza();">Empezar partida</button>';
                document.querySelector('.botoncitos').innerHTML = html;

                pararRAF();
                document.querySelector('#temp').innerHTML = '';
                document.querySelector('#desplegable').disabled = false;

                //EDU HA HECHO: document.querySelector('#crono-raf').innerHTML = '';
                //Y ABAJO EN EL RAF QUITO EL != NULL

                limpiar();

                let tam = document.querySelector('#desplegable').value;
                rejilla(tam);

            });
        }
    });
    return false;


}

function rejilla(tam){
   
    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');

    if(tam == 9){
        //Los grises del 9
        ctx.lineWidth = 2; //par
        ctx.strokeStyle = 'grey';
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(360, 0); ctx.moveTo(0, 0); ctx.lineTo(0, 360);
        ctx.moveTo(0, 40); ctx.lineTo(360, 40); ctx.moveTo(0, 80); ctx.lineTo(360, 80); ctx.moveTo(0, 120); ctx.lineTo(360, 120);
        ctx.moveTo(0, 160); ctx.lineTo(360, 160); ctx.moveTo(0, 200); ctx.lineTo(360, 200); ctx.moveTo(0, 240); ctx.lineTo(360, 240); 
        ctx.moveTo(0, 280); ctx.lineTo(360, 280); ctx.moveTo(0, 320); ctx.lineTo(360, 320); ctx.moveTo(0, 360); ctx.lineTo(360, 360);
        ctx.moveTo(40, 0); ctx.lineTo(40, 360); ctx.moveTo(80, 0); ctx.lineTo(80, 360); ctx.moveTo(120, 0); ctx.lineTo(120, 360);         
        ctx.moveTo(160, 0); ctx.lineTo(160, 360); ctx.moveTo(200, 0); ctx.lineTo(200, 360); ctx.moveTo(240, 0); ctx.lineTo(240, 360);
        ctx.moveTo(280, 0); ctx.lineTo(280, 360); ctx.moveTo(320, 0); ctx.lineTo(320, 360); ctx.moveTo(360, 0); ctx.lineTo(360, 360); 
        ctx.lineCap = 'square'; 
        ctx.stroke(); 

        //Los negros del 9
        ctx.beginPath();
        ctx.lineWidth = 2; //par
        ctx.strokeStyle = '#000';
        ctx.moveTo(0, 120); ctx.lineTo(360, 120); ctx.moveTo(0, 240); ctx.lineTo(360, 240);
        ctx.moveTo(120, 0); ctx.lineTo(120, 360); ctx.moveTo(240, 0); ctx.lineTo(240, 360);
        ctx.stroke();
       
    }
    else{
        //Las grises
        ctx.beginPath();
        ctx.lineWidth = 2; //par
        ctx.strokeStyle = 'grey';
        ctx.moveTo(0, 0); ctx.lineTo(360, 0); ctx.moveTo(0, 0); ctx.lineTo(0, 360);
        ctx.moveTo(0, 90); ctx.lineTo(360, 90); ctx.moveTo(0, 180); ctx.lineTo(360, 180); ctx.moveTo(0, 270);
        ctx.lineTo(360, 270); ctx.moveTo(0, 360); ctx.lineTo(360, 360); ctx.moveTo(90, 0); ctx.lineTo(90, 360);   
        ctx.moveTo(180, 0); ctx.lineTo(180, 360); ctx.moveTo(270, 0); ctx.lineTo(270, 360); ctx.moveTo(360, 0);
        ctx.lineTo(360, 360);
        ctx.stroke();

        //Negros para el 4
        ctx.beginPath();
        ctx.lineWidth = 2; //par
        ctx.strokeStyle = '#000';
        ctx.moveTo(0, 180); ctx.lineTo(360, 180);
        ctx.moveTo(180, 0); ctx.lineTo(180, 360);
        ctx.lineCap = 'square'; 
    
        ctx.stroke();
    }
}

function empieza(){
    
    let tam = document.querySelector('#desplegable').value;
    let html = '';
    let url = 'api/sudoku/generar/'+tam;
    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');
    cv.onmouseenter = function(evt){};
    let regiones = tam;
    let ancho = cv.width / regiones;
    
    fetch(url,{method:'POST'}).then(function(respuesta){

        if(respuesta.ok){
            respuesta.json().then(function(datos){
                     
                document.querySelector('#desplegable').disabled = true;
                document.querySelector('.botoncitos').innerHTML = '';
                let par = false;
                html += '<button onclick="return comprobar('+par+','+ancho+');">Comprobar</button>';
                html += '<button onclick="finalizar();">Finalizar</button>';
                document.querySelector('.botoncitos').innerHTML = html;

                html = '';
                html += '<output class="crono" id="crono-raf">  00:00:00</output>';
                document.querySelector('#temp').innerHTML = html;
                iniciarRAF();

                sessionStorage['sudoku'] = JSON.stringify(datos.SUDOKU);
                sessionStorage['sudoku_inicial'] = JSON.stringify(datos.SUDOKU);
                console.log(sessionStorage['sudoku']);
                sessionStorage['id'] = datos.ID;
                sessionStorage['token'] = datos.TOKEN;

                for(let i=0; i<datos.SUDOKU.length;i++) {
                    for(let j=0; j<datos.SUDOKU[i].length;j++) {
                        let num= datos.SUDOKU[i][j];
                        

                        //console.log(num);
                  
                        if(parseInt(num) != 0){
                            
                            console.log('DIBUJO EL '+num+ 'en la pos:('+i+'), ('+j+') ');
                            ctx.beginPath();
                            ctx.rect(j*ancho, i*ancho, ancho, ancho);
                            ctx.fillStyle = "rgb(176, 196, 206)";
                            ctx.fill();
                
                            ctx.beginPath();
                            ctx.fillStyle = "#000";
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.font = 'bold 32px sans-serif,arial';
                            ctx.fillText(num, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));

                            rejilla(tam);
                        }                         
                    }
                }

                mousemove(cv,ancho);
                
                cv.onclick = function(evt){
                    let col = Math.floor(evt.offsetX/ancho);
                    let fil = Math.floor(evt.offsetY/ancho);
                    sessionStorage['columnita'] = col;
                    sessionStorage['filita'] = fil;
                    let num_inicial = JSON.parse(sessionStorage['sudoku_inicial'])[fil][col];
                    
                    if(num_inicial == 0){     
                        sessionStorage['bool_marcado'] = true;
                        limpiar();
                        let html = '';
                        html += '<hr><h2>Números disponibles</h2>';
                        html += '<button onclick="mete(1,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">1</button>';
                        html += '<button onclick="mete(2,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">2</button>';
                        html += '<button onclick="mete(3,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">3</button>';
                        html += '<button onclick="mete(4,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">4</button>';

                        if(tam==9){
                            html += '<button onclick="mete(5,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">5</button>';
                            html += '<button onclick="mete(6,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">6</button>';
                            html += '<button onclick="mete(7,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">7</button>';
                            html += '<button onclick="mete(8,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">8</button>';
                            html += '<button onclick="mete(9,'+fil+','+col+','+tam+');" onmouseover="cambia_cursor();" id="numerito">9</button>';
                        }
                
                        document.querySelector('#numeros').innerHTML = html;
                        let entro = false;

                        for(let i=0; i<datos.SUDOKU.length;i++){
                            ctx.beginPath(); 
                            ctx.rect(i*ancho+1, fil*ancho+1, ancho-2, ancho-2);
                            ctx.fillStyle = "orange";
                            ctx.fill();                     
                        }
                        for(let i=0; i<datos.SUDOKU.length;i++){
                            ctx.beginPath(); 
                            ctx.rect(col*ancho+1, i*ancho+1, ancho-2, ancho-2);
                            ctx.fillStyle = "orange";
                            ctx.fill();                     
                        }
                        
                        if(tam == 4){

                            if((col==0 && fil == 0 )||(col==0 && fil == 1 )|| (col==1 && fil == 0 ) || (col==1 && fil == 1)){
                                ctx.beginPath(); 
                                ctx.rect(0*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(0*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(1*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(1*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                            }
                            if((col==2 && fil == 0 )||(col==2 && fil == 1 )|| (col==3 && fil == 0 ) || (col==3 && fil == 1)){
                                ctx.beginPath(); 
                                ctx.rect(2*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(2*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(3*ancho+1, 0*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(3*ancho+1, 1*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();

                            }
                            if((col==0 && fil == 2 )||(col==1 && fil == 2)|| (col==0 && fil == 3 ) || (col==1 && fil == 3)){
                                ctx.beginPath(); 
                                ctx.rect(0*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(1*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(0*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(1*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();

                            }
                            if((col==2 && fil == 2 )||(col==2 && fil == 3)|| (col==3 && fil == 2) || (col==3 && fil == 3)){
                                ctx.beginPath(); 
                                ctx.rect(2*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(2*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(3*ancho+1, 2*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();
                                ctx.beginPath(); 
                                ctx.rect(3*ancho+1, 3*ancho+1, ancho-2, ancho-2);
                                ctx.fillStyle = "orange";
                                ctx.fill();

                            }
                        }
                        if(tam == 9) {
                          
                                if((col==0 && fil == 0 )||(col==0 && fil == 1 )|| (col==0 && fil == 2) || (col==1 && fil == 0 )||(col==1 && fil == 1 )|| (col==1 && fil == 2) || (col==2 && fil == 0 )||(col==2 && fil == 1 )|| (col==2 && fil == 2)){
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==3 && fil == 0 )||(col==3 && fil == 1 )|| (col==3 && fil == 2) || (col==4 && fil == 0 )||(col==4 && fil == 1 )|| (col==4 && fil == 2) || (col==5 && fil == 0 )||(col==5 && fil == 1 )|| (col==5 && fil == 2)){
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==6 && fil == 0 )||(col==6 && fil == 1 )|| (col==6 && fil == 2) || (col==7 && fil == 0 )||(col==7 && fil == 1 )|| (col==7 && fil == 2) || (col==8 && fil == 0 )||(col==8 && fil == 1 )|| (col==8 && fil == 2)){
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 0*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 1*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 2*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==0 && fil == 3 )||(col==1 && fil == 3 )|| (col==2 && fil == 3) || (col==0 && fil == 4 )||(col==1 && fil == 4)|| (col==2 && fil == 4) || (col==0 && fil == 5 )||(col==1 && fil == 5)|| (col==2 && fil == 5)){
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==3 && fil == 3 )||(col==4 && fil == 3 )|| (col==5 && fil == 3) || (col==3 && fil == 4 )||(col==4 && fil == 4)|| (col==5 && fil == 4) || (col==3 && fil == 5 )||(col==4 && fil == 5)|| (col==5 && fil == 5)){
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==6 && fil == 3 )||(col==7 && fil == 3 )|| (col==8 && fil == 3) || (col==6 && fil == 4 )||(col==7 && fil == 4)|| (col==8 && fil == 4) || (col==6 && fil == 5 )||(col==7 && fil == 5)|| (col==8 && fil == 5)){
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 3*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 4*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 5*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==0 && fil == 6 )||(col==1 && fil == 6 )|| (col==2 && fil == 6) || (col==0 && fil == 7 )||(col==1 && fil == 7)|| (col==2 && fil == 7) || (col==0 && fil == 8 )||(col==1 && fil == 8)|| (col==2 && fil == 8)){
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(0*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(1*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(2*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==3 && fil == 6 )||(col==4 && fil == 6 )|| (col==5 && fil == 6) || (col==3 && fil == 7 )||(col==4 && fil == 7)|| (col==5 && fil == 7) || (col==3 && fil == 8 )||(col==4 && fil == 8)|| (col==5 && fil == 8)){
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(3*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(4*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(5*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                                if((col==6 && fil == 6 )||(col==7 && fil == 6 )|| (col==8 && fil == 6) || (col==6 && fil == 7 )||(col==7 && fil == 7)|| (col==8 && fil == 7) || (col==6 && fil == 8 )||(col==7 && fil == 8)|| (col==8 && fil == 8)){
                                    ctx.beginPath();  ctx.rect(6*ancho+1, 6*ancho+1, ancho-3, ancho-3); ctx.fillStyle = "orange";                                                      
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 6*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 7*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(6*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(7*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                    ctx.beginPath(); 
                                    ctx.rect(8*ancho+1, 8*ancho+1, ancho-3, ancho-3);
                                    ctx.fillStyle = "orange";
                                    ctx.fill();
                                }
    
                            
                        }
                        mousemove2(cv,ancho);
                  
                        
                        ctx.beginPath();
                        ctx.rect(col*ancho+1, fil*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "red";
                        ctx.fill();

                        ctx.beginPath();
                        ctx.rect(col*ancho+3, fil*ancho+3, ancho-6, ancho-6);
                        ctx.fillStyle = "green";
                        ctx.fill();

                        for(let i=0; i<datos.SUDOKU.length; i++) {
                            for(let j=0; j<datos.SUDOKU[i].length; j++) {
                                let numerito_ini = JSON.parse(sessionStorage['sudoku_inicial'])[i][j];
                                let numerito_fin = JSON.parse(sessionStorage['sudoku'])[i][j];
                                if(numerito_ini != 0){
                                    ctx.beginPath();
                                    ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                                    ctx.fillStyle = "rgb(176, 196, 206)";
                                    ctx.fill();
                                    ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                                    ctx.font = 'bold 32px sans-serif,arial';
                                    ctx.fillText(numerito_ini, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
                                }
                                else if(numerito_fin != numerito_ini){
                                    ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                                    ctx.font = 'bold 32px sans-serif,arial';
                                    ctx.fillText(numerito_fin, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
                                }
                            }
                        }
                        rejilla(tam);
                    }
                }
            });
        }
    });
}

function cambia_cursor(){
    let array = document.querySelectorAll("#numerito");  
    array.forEach(function(e){

        e.style.cursor = 'pointer';
    });
}

function mete(num,fil,col,tam){
    reestablece();
    let m = JSON.parse(sessionStorage['sudoku']);
    m[fil][col] = num;
    //sessionStorage['sudoku'] = m;
    sessionStorage['sudoku'] = JSON.stringify(m);

    document.querySelector('#numeros').innerHTML = '';
    
    let cv = document.querySelector('canvas');
        let ctx = cv.getContext('2d');
    cv.onmouseenter = function(evt){}; 
    let regiones = tam;
    let ancho = cv.width / regiones
	
    ctx.beginPath();
    ctx.rect(col*ancho+1, fil*ancho+1, ancho-2, ancho-2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 32px sans-serif,arial';
    ctx.fillText(num, (col*ancho)+(ancho/2), (fil*ancho)+(ancho/2));

    mousemove(cv,ancho);
  

    //comprobar
    let vacio = false;
    for(let i=0; i<JSON.parse(sessionStorage['sudoku']).length;i++) {
        for(let j=0; j<JSON.parse(sessionStorage['sudoku'])[i].length;j++) {
            if(JSON.parse(sessionStorage['sudoku'])[i][j] == 0){
                vacio = true;
            }
        }
    }
    if(vacio == false){

        comprobar(true, ancho);    
    }


}

function mousemove(cv,ancho){

    cv.onmousemove = function(evt){ //cuando se produce un evento lo podemos capturar si lo ponemos como paramtro

        let estoy = false;

        for(let i=0; i<JSON.parse(sessionStorage['sudoku']).length;i++) {
            for(let j=0; j<JSON.parse(sessionStorage['sudoku'])[i].length;j++) {
                let num2= JSON.parse(sessionStorage['sudoku'])[i][j];
                let num_inicial = JSON.parse(sessionStorage['sudoku_inicial'])[i][j];
                //console.log(num2);
                let cv = document.querySelector('canvas');
                let ctx = cv.getContext('2d');
                if(parseInt(num2) == 0){
                    //console.log('ENTRO NUM = 0');
                    if((evt.offsetX > j*ancho) && evt.offsetX< ((j*ancho)+ancho) && (evt.offsetY > i*ancho) && evt.offsetY< ((i*ancho)+ancho) ){
                        document.querySelector("canvas").style.cursor = "pointer";
                        estoy = true;
                        ctx.beginPath();
                        ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "green";
                        ctx.fill();
                    }
                    else {
                       
                        ctx.beginPath();
                        ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "white";
                        ctx.fill();
                    }
                }
                else if(parseInt(num2) != num_inicial){
                    
                    if((evt.offsetX > j*ancho) && evt.offsetX< ((j*ancho)+ancho) && (evt.offsetY > i*ancho) && evt.offsetY< ((i*ancho)+ancho) ){
                        document.querySelector("canvas").style.cursor = "pointer";
                        estoy = true;
                        ctx.beginPath();
                        ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "green";
                        ctx.fill();

                    }
                    else {
                       
                        ctx.beginPath();
                        ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                        ctx.fillStyle = "white";
                        ctx.fill();    
                    }
                    //Pongo el numero 
                    ctx.beginPath();
                    ctx.fillStyle = "#000";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 32px sans-serif,arial';
                    ctx.fillText(num2, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
                }               
            }
        }
        if(estoy == false) document.querySelector("canvas").style.cursor = "auto";
    }
}

function mousemove2(cv,ancho){
    cv.onmousemove = function(evt){ //cuando se produce un evento lo podemos capturar si lo ponemos como paramtro

        let estoy = false;

        for(let i=0; i<JSON.parse(sessionStorage['sudoku']).length;i++) {
            for(let j=0; j<JSON.parse(sessionStorage['sudoku'])[i].length;j++) {
                let num2= JSON.parse(sessionStorage['sudoku'])[i][j];
                let num_inicial = JSON.parse(sessionStorage['sudoku_inicial'])[i][j];
                let ctx = cv.getContext('2d');
                if(parseInt(num2) == 0){
                   
                    if((evt.offsetX > j*ancho) && evt.offsetX< ((j*ancho)+ancho) && (evt.offsetY > i*ancho) && evt.offsetY< ((i*ancho)+ancho) ){
                  
                        document.querySelector("canvas").style.cursor = "pointer";
                        estoy = true;
                    }
                }
                else if(parseInt(num2) != num_inicial){
               
                    if((evt.offsetX > j*ancho) && evt.offsetX< ((j*ancho)+ancho) && (evt.offsetY > i*ancho) && evt.offsetY< ((i*ancho)+ancho) ){
                
                        document.querySelector("canvas").style.cursor = "pointer";
                        estoy = true;
                    }
                }               
            }
        }
        if(estoy == false) {
            document.querySelector("canvas").style.cursor = "auto";

        }
    }

}

//TEMPORIZADOR
function actualizarRAF (timestamp) {

    //segun edu quito este if
    if(document.querySelector('#crono-raf') != null){

        if(document.querySelector('#crono-raf').getAttribute('data-parar')) return false;
        
        if(!document.querySelector('#crono-raf').getAttribute('data-valor'))
            document.querySelector('#crono-raf').setAttribute('data-valor', timestamp) //timestamp es el timepo en ms

        let valor = Math.floor((timestamp - parseInt(document.querySelector('#crono-raf').getAttribute('data-valor'))) / 1000),

        horas = Math.floor(valor/3600), 
        minutos = Math.floor((valor - horas * 3600) / 60),
        segundos = valor - horas * 3600 - minutos * 60;

        horas = (horas < 10?'0':'') + horas; 
        //si horas < 10 entonces concateno horas con '0' si no concateno con ''
        minutos = (minutos < 10?'0':'') + minutos; 
        segundos = (segundos < 10?'0':'') + segundos; 
        document.querySelector('#crono-raf').innerHTML = `Tiempo:  ${horas}:${minutos}:${segundos}`; 
        requestAnimationFrame(actualizarRAF);
    }
}

function pararRAF(){
	document.querySelector('#crono-raf').setAttribute('data-parar','si');
}

function iniciarRAF(){

	document.querySelector('#crono-raf').innerHTML = 'Tiempo:  00:00:00'; 
	document.querySelector('#crono-raf').removeAttribute('data-parar');
	document.querySelector('#crono-raf').removeAttribute('data-valor');
	requestAnimationFrame(actualizarRAF);
}
//---



function mensajeModal(html){

    let div = document.createElement('div');
    div.setAttribute('id','capa-fondo');
    div.innerHTML = html;
    document.body.appendChild(div);
}

function cerrarMensajeModal(){

    document.querySelector('#capa-fondo').remove();
}

function reestablece(){

    sessionStorage['bool_marcado'] = false;
    let cv = document.querySelector('#c1'),
    ctx = cv.getContext('2d');
    limpiar();
    let tam = document.querySelector('#desplegable').value;
    rejilla(tam);

   
    let regiones = tam;
    let ancho = cv.width / regiones;
    
    for(let i=0; i<JSON.parse(sessionStorage['sudoku']).length; i++) {
        for(let j=0; j<JSON.parse(sessionStorage['sudoku'])[i].length; j++) {
            let numerito_ini = JSON.parse(sessionStorage['sudoku_inicial'])[i][j];
            let numerito_fin = JSON.parse(sessionStorage['sudoku'])[i][j];
            if(numerito_ini != 0){
                ctx.beginPath();
                ctx.rect(j*ancho+1, i*ancho+1, ancho-2, ancho-2);
                ctx.fillStyle = "rgb(176, 196, 206)";
                ctx.fill();
                ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                ctx.font = 'bold 32px sans-serif,arial';
                ctx.fillText(numerito_ini, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
            }
            else if(numerito_fin != numerito_ini){
                ctx.beginPath(); ctx.fillStyle = "#000";  ctx.textAlign = 'center';  ctx.textBaseline = 'middle';                                                       
                ctx.font = 'bold 32px sans-serif,arial';
                ctx.fillText(numerito_fin, (j*ancho)+(ancho/2), (i*ancho)+(ancho/2));
            }
        }
    }
}
