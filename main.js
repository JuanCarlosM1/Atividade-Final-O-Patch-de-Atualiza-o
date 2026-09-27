const prompt = require('prompt-sync')();
const Decimal = require('decimal.js');
let aplicacaoAtiva = true;
const membros = [];

function somarComDecimais(...numeros){
    if(numeros.length === 0) return 0;
    
    const total = numeros.reduce((acc, val) => {
    return acc.plus(new Decimal(val || 0));
  }, new Decimal(0));

  return total.toNumber();
}

function dividirComDecimais(dividendo,divisor){
    const d1 = new Decimal(dividendo || 0);
    const d2 = new Decimal(divisor || 0);


    if (d2.isZero()) {
        return 0;
    }

    return d1.dividedBy(d2).toNumber();
}

function exibirOpcoes(){
    console.log("1 - Adicionar Jogador");
    console.log("2 - Deletar Jogador");
    console.log("3 - Calcular Média");
    console.log("4 - Atualizar Pontos");
    console.log("5 - Exibir Jogadores");
    console.log("0 - Sair");

}

function exibirJogadores(){
    if(membros.length === 0){
        console.log("O time não possuí membros registrados para serem exibidos");
    }

    if(membros.length > 0){
        membros.forEach( (m) => {
            console.log(`Nome: ${m.nome} | Função: ${m.funcao} | Pontos: ${m.pontuacao}`);
        })
    }
}

function adicionarJogador(){
    while(true){
        console.log("OBS: Digite 0 para voltar.");
        exibirJogadores();
        let nomeDoNovoJogador = null;

        while(nomeDoNovoJogador == null){
            const aux = prompt("Digite o nome do novo jogador: ");
            if(aux.length>0){
                nomeDoNovoJogador = aux;
            }

            if(aux === 0 ){
                return;
            }
        }

        let funcao = null;

        while(funcao == null){
            const aux = prompt("Digite a função do Jogador: ");
            if(aux.length>0){
                funcao = aux;
            }

            if(aux === 0 ){
                return;
            }
        }


        let pontuacao = null;
        
        while(pontuacao == null){
            const aux = Number(prompt("Digite a pontuacao do Jogador: "))
            if(!isNaN(pontuacao)){
                pontuacao = aux;
            }

            if(isNaN(pontuacao)){
                console.log("Pontuação Invalida, Digite um número")
            }
        }

        if(nomeDoNovoJogador != null && funcao != null && pontuacao != null){
            let jogador = {
                nome: nomeDoNovoJogador,
                funcao: funcao,
                pontuacao: pontuacao
            }

            membros.push(jogador);
            console.log("Jogador Adicionado com sucesso!");
            return;
        }

        if(nomeDoNovoJogador == null || funcao == null || pontuacao == null){
            console.log(`O jogador não foi adicionado 
                ${nomeDoNovoJogador == null ? "O nome do Jogador está vazio" : ""}
                ${funcao == null ? "O funcao do Jogador está vazio" : ""}
                ${pontuacao == null ? "O pontuacao do Jogador está invalida" : ""}
                `)
        }

        
    }
}

function deletarJogador(){
    if(membros.length === 0){
        console.log("O time não possuí membros para serem removidos!")
        return;
    }
    exibirJogadores();
    let nomeBusca = prompt("Digite o nome do Jogador que você deseja deletar: ");
    nomeBusca = nomeBusca.toLowerCase();
    jogadoresEncontrados = membros.filter((m) => m.nome === nomeBusca);
    let jogadorSelcionado = null;
    if(jogadoresEncontrados.length > 1){
        jogadoresEncontrados.forEach( (m, i) => {
            console.log(`N: ${i} - Nome: ${m.nome} | Função: ${m.funcao} | Pontos: ${m.pontuacao}`);
        })
        let numeroDoJogadorSelecionado = prompt("Digite o numero do jogador que será removido.");
        jogadorSelcionado = jogadoresEncontrados[numeroDoJogadorSelecionado];
        
    }

    if(jogadoresEncontrados.length==1){
        jogadorSelcionado = jogadoresEncontrados[0];
    }

    if(jogadorSelcionado != null){
        const index = membros.indexOf(jogadorSelcionado);
        membros.splice(index, 1);
        console.log("Jogador removido com sucesso!")
    }

    if(jogadorSelcionado == null){
        console.log("Falha ao tentar remover um jogador, não foi selecionado um jogador válido!")
    }
}

function caucularMedia(){
    if(membros.length===0){
        console.log("O time não possuí membros para calcular a média!")
        return;
    }

    let total = 0;
    membros.forEach( (m) => {
        total = somarComDecimais(m.pontuacao, total);
    })

    let media = dividirComDecimais(total,membros.length);

    console.log(`A media da equipe é: ${media}`);
}

function atualizarPontos(){
    if(membros.length === 0){
        console.log("O time não possuí membros para autalizar os pontos!")
        return;
    }

    exibirJogadores();
    console.log("--- ATUALIZAÇÃO DE RANKING --- ");
    let nomeBusca = prompt("Digite o nome do Jogador que você deseja alterar a pontuação: ");

    let jogadoresEncontrados = membros.filter((m) => m.nome === nomeBusca);

    let jogadorSelcionado = null;
    if(jogadoresEncontrados.length > 1){
        jogadoresEncontrados.forEach( (m, i) => {
            console.log(`N: ${i} - Nome: ${m.nome} | Função: ${m.funcao} | Pontos: ${m.pontuacao}`);
        })
        let numeroDoJogadorSelecionado = prompt("Digite o numero do jogador que você deseja aumentar os pontos:");
        jogadorSelcionado = jogadoresEncontrados[numeroDoJogadorSelecionado];
        
    }

    if(jogadoresEncontrados.length==1){
        jogadorSelcionado = jogadoresEncontrados[0];
    }

    if(jogadorSelcionado != null){
        console.log(`Jogador: ${jogadorSelcionado.nome}`);
        console.log(`Pontuação atual ${jogadorSelcionado.pontuacao}`);
        let pontuacaoAdicional = NaN
        
        while(isNaN(pontuacaoAdicional)){
            aux = Number(prompt("Digite a quantidade de pontos que o jogador ganhou: "));
            if(!isNaN(aux)){
                pontuacaoAdicional = aux;
            }

            if(isNaN(aux)){
                console.log("Digite um número válido!")
            }
        }

        if(!isNaN(pontuacaoAdicional)){
            const pontuacaoAutal = jogadorSelcionado.pontuacao
            jogadorSelcionado.pontuacao = somarComDecimais(pontuacaoAutal,pontuacaoAdicional) ;
        }
    }

    if(jogadorSelcionado == null){
        console.log("Falha ao tentar adicionar mais pontos ao jogador, não foi selecionado um jogador válido")
    }
}



while(aplicacaoAtiva){
    exibirOpcoes();
    let opcao = Number(prompt("Digite o numero da opção que deseja executar: "));

    switch (opcao) {
        case 1:
            adicionarJogador();
            break;
        case 2:
            deletarJogador();
            break;
        case 3:
            caucularMedia();
            break;
        case 4:
            atualizarPontos();
            break;
        case 5:
            exibirJogadores();
            break;
        case 0:
            aplicacaoAtiva = false;
            break;
    
        default:
            break;
    }
}