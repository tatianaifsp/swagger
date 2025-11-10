import swaggerAutogen from 'swagger-autogen'                               // Gerador

const outputFile = './swagger_output.json'                                 // Saída
const endpointsFiles = ['./server.js', './src/routes/machines.js']         // Rotas/servidor

const doc = {                                                              // Metadados
  info: {
    title: 'API de Máquinas (Compass/Atlas)',
    description: 'Documentação gerada automaticamente com swagger-autogen.',
    version: '1.0.0'
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local dev' }],
  tags: [{ name: 'Máquinas', description: 'CRUD de máquinas' }],
  components: { schemas: { MachineCreate: { type: 'object', properties: { nome: { type: 'string' } }, required: ['nome'] }, MachineUpdate: { type: 'object', properties: { nome: { type: 'string' } } } } }
}

const gen = swaggerAutogen({ openapi: '3.0.0' })                           // OpenAPI 3
gen(outputFile, endpointsFiles, doc).then(() => console.log('✅ swagger_output.json gerado'))
