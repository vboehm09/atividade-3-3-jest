function ehPalindromo(palavra) {
  if (!palavra) return false;

  const texto = palavra
    .toLowerCase()
    .replace(/[^a-záéíóúâêôãõàèìòùç]/gi, "");

  return texto === texto.split("").reverse().join("");
}

function contarVogais(texto) {
  const vogais = texto.match(/[aeiouáéíóúâêôãõ]/gi);
  return vogais ? vogais.length : 0;
}

function calcularFatorial(n) {
  if (n < 0) {
    throw new Error("Não existe fatorial de número negativo");
  }

  if (n === 0 || n === 1) return 1;

  let resultado = 1;

  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

function removerDuplicatas(array) {
  return [...new Set(array)];
}

function agendarConsulta(dataDaConsulta) {
  const diaDaSemana = dataDaConsulta.getDay();

  if (diaDaSemana === 0 || diaDaSemana === 6) {
    throw new Error("Clínica fechada aos finais de semana");
  }

  return "Consulta agendada com sucesso";
}

function formatarMoeda(valor) {
  if (isNaN(valor)) {
    throw new Error("Valor inválido");
  }

  return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
}

function validarCpfBasico(cpf) {
  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  return true;
}

function calcularIngresso(idade, ehEstudante, diaDaSemana) {
  const valorBase = 40;

  if (diaDaSemana === 3 || ehEstudante || idade >= 60) {
    return valorBase / 2;
  }

  return valorBase;
}

class ContaBancaria {
  constructor(titular) {
    this.titular = titular;
    this.saldo = 0;
  }

  depositar(valor) {
    if (valor <= 0) {
      throw new Error("Valor de depósito deve ser positivo");
    }

    this.saldo += valor;
  }

  sacar(valor) {
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente");
    }

    this.saldo -= valor;
  }

  obterSaldo() {
    return this.saldo;
  }
}

async function obterClima(cidade, servicoClima) {
  try {
    const dados = await servicoClima.buscar(cidade);
    return `Temperatura em ${cidade}: ${dados.temperatura}°C`;
  } catch (erro) {
    throw new Error("Falha ao buscar dados climáticos");
  }
}

module.exports = {
  ehPalindromo,
  contarVogais,
  calcularFatorial,
  removerDuplicatas,
  agendarConsulta,
  formatarMoeda,
  validarCpfBasico,
  calcularIngresso,
  ContaBancaria,
  obterClima,
};
