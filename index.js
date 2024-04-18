// Crie uma instância da fila
let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  const nome = document.querySelector('#txtnovoNome').value
  const cpf = document.querySelector('#txtnovoCpf').value
  const atendimento = new Atendimento(nome, cpf, obterDataAtual(), obterHoraAtual())

  if(minhaFila.enqueue(atendimento)===true){
    atualizarFila();
    alert("Atendimento adicionado com sucesso")
    txtnovoNome.value="";
    txtnovoCpf.value="";
      }else{
    alert("Fila cheia! Não é possível adicionar mais elementos");
  }

}

//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da fila

function removerElemento() {
  if(!minhaFila.isEmpty()){
  mostrarMensagemRemocao(minhaFila.dequeue())
  atualizarFila()

}else{
  alert("Fila vazia! Não é possível remover elementos")

}
}
//--------------------------------------------------------------------------------
function buscarCpf() {
  if (minhaFila.isEmpty()) return;
  const cpf = document.querySelector('#txtnovoCpf').value
  let isSearch = false
  for (let item of minhaFila) {
    if (item.cpf === cpf) {
      alert(item.toString())
      isSearch = true
    }
    txtnovoNome.value="";
    txtnovoCpf.value="";
  }
  if (!isSearch) {
    alert('Não encontrado!')
  }

}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
  document.querySelector('#mensagem-remocao').textContent = `Atendimento realizado: ${pessoaAtendida} ás ${obterHoraAtual()}, tempo: ${calcularDiferencaHoras(pessoaAtendida.hora, obterHoraAtual())}`
}
//--------------------------------------------------------------------------------------------
// Função para atualizar a exibição da fila
function atualizarFila() {
  document.querySelectorAll('#listFila li').forEach(li => li.remove())
  for (let item of minhaFila) {
    document.querySelector('#listFila').innerHTML += `<li>${item.toString()}</li>`
  }
  if (minhaFila.qtd === 0) {
    document.querySelector('#lblPessoasFila').textContent = 'Fila vazia!'
  } else {
    document.querySelector('#lblPessoasFila').textContent = ''
  }
}
//--------------------------------------------------------------------------------------------
// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
