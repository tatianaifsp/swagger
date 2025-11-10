// 🔹 Este arquivo define middlewares de tratamento de erro no Express.
// Ele intercepta erros, incluindo rotas não encontradas (404) e erros internos (500),
// garantindo que o servidor responda de forma controlada e com mensagens em formato JSON.

export function notFound (req, res, next) { // Função executada quando nenhuma rota é encontrada (erro 404)
  const error = new Error(`Rota não encontrada: ${req.originalUrl}`) // Cria um objeto de erro com uma mensagem personalizada
  error.status = 404 // Define o código de status HTTP como 404 (Not Found)
  next(error) // Passa o erro adiante para o próximo middleware (errorHandler)
}

export function errorHandler (err, _req, res, _next) { // Middleware global de erro (captura qualquer erro que acontecer no app)
  const status = err.status || 500 // Se o erro tiver um status, usa ele; senão, assume 500 (erro interno)
  const message = err.message || 'Erro interno do servidor' // Usa a mensagem do erro ou uma padrão
  res.status(status).json({ error: message }) // Retorna a resposta em formato JSON com o código e a mensagem do erro
}

