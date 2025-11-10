import 'dotenv/config'                                  // .env
import express from 'express'                           // Express
import cors from 'cors'                                 // CORS
import morgan from 'morgan'                             // Logs
import path from 'path'                                 // Caminhos
import fs from 'fs'                                     // Arquivos
import { fileURLToPath } from 'url'                     // __dirname

import { connectDB } from './src/config/db.js'          // DB local/Atlas
import machinesRouter from './src/routes/machines.js'   // Rotas CRUD
import { notFound, errorHandler } from './src/middleware/errorHandler.js' // Erros
import loggerCustom from './src/middleware/loggerCustom.js'               // Tempo resposta

import swaggerUi from 'swagger-ui-express'              // Swagger UI

const __filename = fileURLToPath(import.meta.url)       // Caminho arquivo
const __dirname = path.dirname(__filename)              // Pasta atual

const app = express()                                   // Express app
app.use(cors())                                         // CORS
app.use(express.json())                                 // JSON body
app.use(morgan('dev'))                                  // Logs
app.use(loggerCustom)                                   // Logger custom

await connectDB()                                       // Conecta DB

app.get('/health', (_req, res) => {                     // Healthcheck
  res.json({ ok: true, at: new Date().toISOString() })
})

app.use('/api/maquinas', machinesRouter)                // Rotas base

const SWAGGER_MODE = (process.env.SWAGGER_MODE || 'auto').toLowerCase()
const fileAuto = path.join(__dirname, 'swagger_output.json')
const fileManual = path.join(__dirname, 'swagger.json')
let swaggerDoc = null

try {
  if (SWAGGER_MODE === 'auto' && fs.existsSync(fileAuto)) {
    swaggerDoc = JSON.parse(fs.readFileSync(fileAuto, 'utf-8'))
    console.log('📄 Swagger AUTO')
  } else if (fs.existsSync(fileManual)) {
    swaggerDoc = JSON.parse(fs.readFileSync(fileManual, 'utf-8'))
    console.log('📄 Swagger MANUAL')
  } else {
    console.warn('⚠️ Gere o Swagger com "npm run swagger" ou crie swagger.json')
  }
} catch (e) {
  console.error('❌ Erro carregando Swagger:', e.message)
}

if (swaggerDoc) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  app.get('/', (_req, res) => res.redirect('/api-docs'))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ API http://localhost:${PORT}`)
  if (swaggerDoc) console.log(`📚 Docs http://localhost:${PORT}/api-docs`)
})
