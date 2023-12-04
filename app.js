let listaDeNumerosSorteados = [];               // lista vazia
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// manipulando o conteúdo das tags:
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}:`); //Essa é uma função com parâmetros.
}
exibirMensagemInicial();

// Criar a interação do botão "Chutar" com o usuário quando clicar nesse botão:
function verificarChute() {
    let chute = document.querySelector('input').value; //queremos só o valor colocado no <input>
    if(chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';          //operador ternário
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', 'Acertou!!');
        exibirTextoNaTela('p', mensagemTentativas);                 // variável com o template strings
        document.getElementById('reiniciar').removeAttribute('disabled');            // coloca dentro dos () o nome do id como está no HTML
    }
    else if(chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é MENOR.');
    } else {
        exibirTextoNaTela('p', 'O número secreto é MAIOR.');
    }
    tentativas++                       // mesma coisa que escrever tentativas = tentativas + 1
    limparCampo()
}

//Gerar o número aleatório, com uma função sem parâmetro, mas COM RETORNO:
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';                // string vazia: para limpar o campo.
}

// AULA 3, vídeo 4: Reiniciar o jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
