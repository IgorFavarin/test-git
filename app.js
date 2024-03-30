
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo de adivinhação';

//let paragrafo =  document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let countTentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo de adivinhação');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 a ' + numeroMaximo);
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let mensagemTentativa = countTentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o numero secreto em ${countTentativa} ${mensagemTentativa}!`;
        exibirTextoNaTela('h1', 'ACERTOU!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é maior que ' + chute);
        } else {
            exibirTextoNaTela('p', 'O numero secreto é menor que ' + chute);
        }
        countTentativa++;
        limparCampo();
    }
    console.log(chute == numeroSecreto);
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    countTentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}