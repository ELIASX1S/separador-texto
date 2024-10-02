document.getElementById('separar').addEventListener('click', function () {
  const alertaDiv = document.getElementById('alerta');
  const texto = document.getElementById('texto').value.trim();
  const limite = parseInt(document.getElementById('limite').value);

  alertaDiv.classList.add('d-none');
  document.getElementById('resultado').innerHTML = '';

  if (!texto || isNaN(limite) || limite < 1 || limite > 1000) {
    alertaDiv.textContent = 'Por favor, insira um texto válido e um limite entre 1 e 1000.';
    alertaDiv.classList.remove('d-none');
    return;
  }

  const partes = separarTextoPorCaracteres(texto, limite);
  exibirPartes(partes);
});

document.getElementById('limpar').addEventListener('click', function () {
  document.getElementById('texto').value = '';
  document.getElementById('limite').value = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('alerta').classList.add('d-none');
});

function separarTextoPorCaracteres(texto, limite) {
  const palavras = texto.split(' ');
  const partes = [];
  let parteAtual = '';

  palavras.forEach(palavra => {
    if ((parteAtual + ' ' + palavra).trim().length <= limite) {
      parteAtual += (parteAtual ? ' ' : '') + palavra;
    } else {
      partes.push(parteAtual);
      parteAtual = palavra;
    }
  });

  if (parteAtual) {
    partes.push(parteAtual);
  }

  return partes;
}

function exibirPartes(partes) {
  const resultadoDiv = document.getElementById('resultado');
  partes.forEach((parte, index) => {
    const parteDiv = document.createElement('div');
    parteDiv.className = 'parte';

    const tituloParte = document.createElement('h5');
    tituloParte.textContent = `Parte ${index + 1} (${parte.length} caracteres):`;

    const textoParte = document.createElement('p');
    textoParte.textContent = parte;

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar';
    copyButton.className = 'btn btn-primary';

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(parte).then(() => {
        alert('Texto copiado!');
      });
    });

    parteDiv.appendChild(tituloParte);
    parteDiv.appendChild(textoParte);
    parteDiv.appendChild(copyButton);
    resultadoDiv.appendChild(parteDiv);
  });
}
