// 🔹 Este arquivo conecta o Node.js ao banco de dados MongoDB (Compass local ou Atlas na nuvem)
// Ele usa o Mongoose para criar a conexão e trata erros caso o banco não esteja acessível.

import mongoose from 'mongoose' // Importa o Mongoose, biblioteca que facilita a conexão e modelagem com MongoDB

export async function connectDB () { // Cria e exporta a função assíncrona que fará a conexão com o banco
  const mode = (process.env.DB_MODE || 'local').toLowerCase() // Lê a variável DB_MODE do .env e define se o modo é 'local' (Compass) ou 'atlas' (nuvem)

  const uri = mode === 'atlas' 
    ? process.env.MONGODB_URI_ATLAS // Se o modo for 'atlas', usa a URI do banco Atlas (nuvem)
    : process.env.MONGODB_URI_LOCAL // Caso contrário, usa a URI local do Compass

  if (!uri) { // Se nenhuma URI for encontrada, o sistema não sabe onde conectar
    console.error('❌ URI ausente no .env') // Exibe erro informando que as variáveis não foram configuradas
    process.exit(1) // Encerra o servidor com erro (status 1 indica falha)
  }

  console.log(` Conectando no modo: ${mode.toUpperCase()}`) // Mostra no terminal se vai conectar no modo LOCAL ou ATLAS

  try { // Inicia o bloco para tentar conectar ao banco
    await mongoose.connect(uri) // Usa o Mongoose para se conectar ao banco de dados
    console.log('✅ Conectado ao MongoDB!') // Mensagem de sucesso se a conexão funcionar
  } catch (err) { // Caso aconteça algum erro na tentativa de conexão
    console.error('❌ Erro MongoDB:', err.message) // Exibe o erro detalhado no console
    process.exit(1) // Encerra o programa para evitar que rode sem banco de dados
  }
}

