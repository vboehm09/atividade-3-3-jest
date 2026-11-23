const {
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
} = require("./avancado");

describe("Funções avançadas", () => {
  test("ehPalindromo identifica palíndromos", () => {
    expect(ehPalindromo("arara")).toBe(true);
    expect(ehPalindromo("A base do teto desaba")).toBe(true);
    expect(ehPalindromo("casa")).toBe(false);
    expect(ehPalindromo("")).toBe(false);
  });

  test("contarVogais conta vogais, incluindo acentuadas", () => {
    expect(contarVogais("computador")).toBe(4);
    expect(contarVogais("programação")).toBe(5);
    expect(contarVogais("xyz")).toBe(0);
  });

  test("calcularFatorial calcula fatoriais", () => {
    expect(calcularFatorial(5)).toBe(120);
    expect(calcularFatorial(0)).toBe(1);
    expect(() => calcularFatorial(-1)).toThrow(
      "Não existe fatorial de número negativo"
    );
  });

  test("removerDuplicatas elimina valores repetidos", () => {
    expect(removerDuplicatas([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  test("agendarConsulta permite dias úteis e rejeita fins de semana", () => {
    expect(agendarConsulta(new Date(2026, 9, 26))).toBe(
      "Consulta agendada com sucesso"
    );

    expect(() => agendarConsulta(new Date(2026, 9, 24))).toThrow(
      "Clínica fechada aos finais de semana"
    );

    expect(() => agendarConsulta(new Date(2026, 9, 25))).toThrow(
      "Clínica fechada aos finais de semana"
    );
  });

  test("formatarMoeda formata valores em reais", () => {
    expect(formatarMoeda(10)).toBe("R$ 10,00");
    expect(formatarMoeda(12.5)).toBe("R$ 12,50");
    expect(() => formatarMoeda("abc")).toThrow("Valor inválido");
  });

  test("validarCpfBasico verifica o formato básico do CPF", () => {
    expect(validarCpfBasico("123.456.789-09")).toBe(true);
    expect(validarCpfBasico("111.111.111-11")).toBe(false);
    expect(validarCpfBasico("12345")).toBe(false);
  });

  test("calcularIngresso aplica meia-entrada", () => {
    expect(calcularIngresso(25, false, 1)).toBe(40);
    expect(calcularIngresso(25, true, 1)).toBe(20);
    expect(calcularIngresso(25, false, 3)).toBe(20);
    expect(calcularIngresso(60, false, 1)).toBe(20);
  });

  describe("ContaBancaria", () => {
    let conta;

    beforeEach(() => {
      conta = new ContaBancaria("Ana");
    });

    test("começa com saldo zero e permite depósito", () => {
      expect(conta.obterSaldo()).toBe(0);
      conta.depositar(100);
      expect(conta.obterSaldo()).toBe(100);
    });

    test("não permite depósito de valor inválido", () => {
      expect(() => conta.depositar(0)).toThrow(
        "Valor de depósito deve ser positivo"
      );
    });

    test("permite saque quando há saldo suficiente", () => {
      conta.depositar(100);
      conta.sacar(40);
      expect(conta.obterSaldo()).toBe(60);
    });

    test("não permite saque maior que o saldo", () => {
      expect(() => conta.sacar(10)).toThrow("Saldo insuficiente");
    });
  });

  describe("obterClima", () => {
    test("retorna a temperatura quando a consulta funciona", async () => {
      const servicoClima = {
        buscar: jest.fn().mockResolvedValue({ temperatura: 25 }),
      };

      await expect(obterClima("São Paulo", servicoClima)).resolves.toBe(
        "Temperatura em São Paulo: 25°C"
      );

      expect(servicoClima.buscar).toHaveBeenCalledWith("São Paulo");
    });

    test("lança erro quando a consulta falha", async () => {
      const servicoClima = {
        buscar: jest.fn().mockRejectedValue(new Error("Erro de conexão")),
      };

      await expect(obterClima("São Paulo", servicoClima)).rejects.toThrow(
        "Falha ao buscar dados climáticos"
      );
    });
  });
});