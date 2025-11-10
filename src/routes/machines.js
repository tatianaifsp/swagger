// src/routes/machines.js
// ==========================================================
// EXEMPLO COMPLETO: Documentando uma rota com Swagger
// ==========================================================

// Importações
import { Router } from 'express'
import Machine from '../models/Machine.js'
import { machineCreateSchema, machineUpdateSchema } from '../validators/machineValidator.js'

const router = Router()

// ==========================================================
// LISTAR MÁQUINAS (GET /api/maquinas)
// ==========================================================

// #swagger.tags = ['Máquinas']
// #swagger.summary = 'Listar máquinas cadastradas'
// #swagger.description = 'Retorna todas as máquinas do banco, com filtro opcional por nome, fabricante ou modelo.'

router.get('/', async (req, res, next) => {
  /* #swagger.parameters['q'] = {
        in: 'query',                   // Local do parâmetro: query string
        description: 'Busca textual (opcional)', 
        required: false,               // O parâmetro não é obrigatório
        type: 'string'                 // Tipo do valor
  } */

  /* #swagger.responses[200] = {
        description: 'Lista de máquinas retornada com sucesso'
  } */

  try {
    const { q } = req.query
    const filter = q ? { $text: { $search: q } } : {}
    const maquinas = await Machine.find(filter).sort({ createdAt: -1 })
    res.json(maquinas)
  } catch (err) { next(err) }
})


// ==========================================================
//  BUSCAR MÁQUINA POR ID (GET /api/maquinas/:id)
// ==========================================================

// #swagger.tags = ['Máquinas']
// #swagger.summary = 'Buscar máquina por ID'
// #swagger.description = 'Retorna os dados completos de uma máquina a partir do seu ID.'

router.get('/:id', async (req, res, next) => {
  /* #swagger.parameters['id'] = {
        in: 'path',                    // Parâmetro vem da URL
        description: 'ID da máquina',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[200] = {
        description: 'Máquina encontrada'
  } */
  /* #swagger.responses[404] = {
        description: 'Máquina não encontrada'
  } */
  try {
    const maquina = await Machine.findById(req.params.id)
    if (!maquina) return res.status(404).json({ error: 'Máquina não encontrada' })
    res.json(maquina)
  } catch (err) { next(err) }
})


// ==========================================================
// CRIAR NOVA MÁQUINA (POST /api/maquinas)
// ==========================================================

// #swagger.tags = ['Máquinas']
// #swagger.summary = 'Cadastrar nova máquina'
// #swagger.description = 'Cria um novo registro de máquina no banco de dados.'

router.post('/', async (req, res, next) => {
  /* #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/MachineCreate' }
          }
        }
  } */
  /* #swagger.responses[201] = {
        description: 'Máquina criada com sucesso'
  } */
  /* #swagger.responses[400] = {
        description: 'Dados inválidos enviados'
  } */
  try {
    const { value, error } = machineCreateSchema.validate(req.body, { abortEarly: false })
    if (error) return res.status(400).json({ error: 'Dados inválidos', details: error.details.map(d => d.message) })
    const criada = await Machine.create(value)
    res.status(201).json(criada)
  } catch (err) { next(err) }
})


// ==========================================================
// ATUALIZAR MÁQUINA (PUT /api/maquinas/:id)
// ==========================================================

// #swagger.tags = ['Máquinas']
// #swagger.summary = 'Atualizar dados de uma máquina'
// #swagger.description = 'Atualiza informações de uma máquina existente pelo seu ID.'

router.put('/:id', async (req, res, next) => {
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da máquina a ser atualizada',
        required: true,
        type: 'string'
  } */
  /* #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/MachineUpdate' }
          }
        }
  } */
  /* #swagger.responses[200] = {
        description: 'Máquina atualizada com sucesso'
  } */
  /* #swagger.responses[404] = {
        description: 'Máquina não encontrada'
  } */
  try {
    const { value, error } = machineUpdateSchema.validate(req.body, { abortEarly: false })
    if (error) return res.status(400).json({ error: 'Dados inválidos', details: error.details.map(d => d.message) })
    const atualizada = await Machine.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true })
    if (!atualizada) return res.status(404).json({ error: 'Máquina não encontrada' })
    res.json(atualizada)
  } catch (err) { next(err) }
})


// ==========================================================
// 📘 EXCLUIR MÁQUINA (DELETE /api/maquinas/:id)
// ==========================================================

// #swagger.tags = ['Máquinas']
// #swagger.summary = 'Excluir máquina'
// #swagger.description = 'Remove permanentemente uma máquina do banco de dados.'

router.delete('/:id', async (req, res, next) => {
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da máquina a ser removida',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[204] = {
        description: 'Máquina removida com sucesso (sem conteúdo)'
  } */
  /* #swagger.responses[404] = {
        description: 'Máquina não encontrada'
  } */
  try {
    const removida = await Machine.findByIdAndDelete(req.params.id)
    if (!removida) return res.status(404).json({ error: 'Máquina não encontrada' })
    res.status(204).send()
  } catch (err) { next(err) }
})

export default router