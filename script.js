// Declarando e Preparando Variáveis Globais

let mainHTML = document.querySelector('main');
let primeiraCarta;
let segundaCarta;
const imagem = ["arquivosUteis/bobrossparrot.gif","arquivosUteis/explodyparrot.gif","arquivosUteis/fiestaparrot.gif","arquivosUteis/metalparrot.gif","arquivosUteis/revertitparrot.gif","arquivosUteis/tripletsparrot.gif","arquivosUteis/unicornparrot.gif",];
var nCartas;
let asCartas = [];
var tentativas = parseInt(0);
var cartasCorretas = parseInt(0);

// Iniciando o Jogo

iniciarJogo()

function iniciarJogo(){
    imagem.sort(comparador); //Imagens embaralhadas.
    while(true){
        nCartas = parseInt(prompt('Entre 2 e 7 pares, Quantos Pares de carta deseja?'));
        if(nCartas >= 2 && nCartas <= 7){
            cartasNaMesa();
            return false;
        }
        else {
            alert('Respeite o Limite de Cartas');
        }
    }
}

// Gerando e Distribuindo as Cartas na Mesa

function cartasNaMesa(){
    for (let i = 0; i < nCartas; i++) {
        let novaCarta = `<div class="espaçoDaCarta" data-identifier="card">                          
                            <div class="carta" onclick="virarCarta(this)">
                                <div class="frente" data-identifier="front-face">
                                    <img src="arquivosUteis/front.png" alt="">
                                </div>
                                <div class="costas" data-identifier="back-face">
                                    <img src="${imagem[i]}" alt="">
                                </div>
                            </div>
                        </div>`;
        // console.log(asCartas)
        asCartas.push(novaCarta);
        asCartas.push(novaCarta);
        asCartas.sort(comparador);
    }
    // "Distribuindo" As IMAGENS NO HTML
    for(let i = 0; i < asCartas.length; i++){
        mainHTML.innerHTML = mainHTML.innerHTML + asCartas[i];
    }
}

// Funções de Interação com as Cartas

function virarCarta(diviSelecionada){
        diviSelecionada.classList.add('viradinha');
        if(!document.querySelector('.primeiraCarta')){
            diviSelecionada.classList.add('primeiraCarta');
            primeiraCarta = diviSelecionada;
            primeiraCarta.setAttribute('onclick','')
            // console.log(primeiraCarta);
            return false;
        }
            diviSelecionada.classList.add('segundaCarta');
            segundaCarta = diviSelecionada;
            // console.log(segundaCarta);
            setTimeout(compararCartas,1000);
            // console.log(document.querySelectorAll('.estouComMeuPar').length);
            // console.log(asCartas.length);
}

// Condições de Comparação

function compararCartas(){
    if(primeiraCarta.innerHTML !== segundaCarta.innerHTML){
        primeiraCarta.classList.remove('primeiraCarta');
        primeiraCarta.classList.remove('viradinha');
        segundaCarta.classList.remove('segundaCarta');
        segundaCarta.classList.remove('viradinha');
        primeiraCarta.setAttribute('onclick','virarCarta(this)');
        tentativas = tentativas + 1;
    }
    else{
        primeiraCarta.classList.remove('primeiraCarta');
        primeiraCarta.classList.add('estouComMeuPar');
        primeiraCarta.setAttribute('onclick','');
        segundaCarta.classList.remove('segundaCarta');
        segundaCarta.setAttribute('onclick','');
        segundaCarta.classList.add('estouComMeuPar');
        tentativas = tentativas + 1;
        cartasCorretas = cartasCorretas + 2;
        console.log(cartasCorretas);
        console.log(asCartas.length);
        finalizarJogo(cartasCorretas,asCartas, tentativas);
    }
}
function finalizarJogo(cartasCorretas,asCartas){
    if(cartasCorretas == asCartas.length){
        alert(`VOCÊ GANHOU O JOGO EM ${tentativas} TENTATIVAS! PARABÉNS !`);
        const jogarDeNovo = prompt("Deseja Jogar Denovo ? (1 - Sim; 2- Não)");
        if (jogarDeNovo == 1){
            window.location.reload();
        }
        else{
            alert('Até mais...')
        }

    }
}

// Função de aleatoriedade para geração de cartas 

function comparador() { 
	return Math.random() - 0.5;
}