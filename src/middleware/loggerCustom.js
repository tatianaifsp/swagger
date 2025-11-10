// 🔹 Este middleware registra o tempo de resposta de cada requisição feita ao servidor.
// Ele mostra no terminal qual rota foi chamada, o método HTTP, o código de status e o tempo total da resposta.

export default function loggerCustom(req, res, next) { // Função middleware padrão do Express
  const start = Date.now() // Marca o horário em milissegundos no momento em que a requisição começa

  // O evento "finish" é disparado quando o servidor termina de enviar a resposta
  res.on('finish', () => {
    const ms = Date.now() - start // Calcula o tempo total decorrido
    console.log(
      '⏱️',
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    ) // Exemplo no terminal: ⏱️ GET /api/maquinas -> 200 (15ms)
  })

  next() // Chama o próximo middleware ou rota; sem isso o fluxo para aqui e a aplicação trava
}

