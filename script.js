
/* Primeira maneira
var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw Error('Esse cep não existe')
    }else
        console.log(r)
    })
.catch(erro =>console.log(erro))
.finally(mensagem=>(console.log('Concluido')));
*/


async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        var consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error('CEP não existente!');
        }
        var logradouro = document.getElementById('endereco');
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');
        cidade.value = consultaCEPConvertida.localidade
        estado.value = consultaCEPConvertida.uf
        logradouro.value = consultaCEPConvertida.logradouro
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
    
}

var cep = document.getElementById('cep');

cep.addEventListener("focusout", ()=>buscaEndereco(cep.value));



/* Teste para ver varios ceps
let ceps = ['01001000','01001250','01001001']
let conjuntosCeps = ceps.map(valores=> buscaEndereco(valores));


Promise.all(conjuntosCeps).then(respostas=> console.log(respostas))
*/