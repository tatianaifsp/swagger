// 🔹 Este arquivo define as regras de validação dos dados de "Máquinas" usando a biblioteca Joi.
// O objetivo é garantir que as informações enviadas no corpo da requisição (body)
// estejam no formato correto antes de gravar no banco de dados MongoDB.

import Joi from 'joi' // Importa o pacote Joi, usado para criar e validar esquemas de dados (schemas)

// -------------------------------------------------------------
// Validação para criação de uma nova máquina
// -------------------------------------------------------------
export const machineCreateSchema = Joi.object({ // Cria um esquema (schema) de validação para os dados recebidos
  nome: Joi.string().min(2).max(100).required(), // O campo "nome" é obrigatório e deve ter entre 2 e 100 caracteres
  fabricante: Joi.string().allow('', null), // O campo "fabricante" é opcional (pode ser vazio ou nulo)
  modelo: Joi.string().allow('', null), // O campo "modelo" também é opcional
  numeroSerie: Joi.string().allow('', null), // O campo "número de série" pode ser vazio ou nulo
  dataAquisicao: Joi.date().iso().allow(null), // O campo "dataAquisicao" deve estar no formato ISO (ex: 2024-05-10) e pode ser nulo
  status: Joi.string().valid('ativa', 'inativa', 'manutencao').default('ativa'), // O campo "status" só pode ter um dos três valores e, se não for informado, será "ativa"
  localizacao: Joi.string().allow('', null), // O campo "localização" é opcional
  ultimaManutencao: Joi.date().iso().allow(null) // O campo "ultimaManutencao" aceita data ISO ou nulo
})

// -------------------------------------------------------------
// Validação para atualização de máquina (PUT)
// -------------------------------------------------------------
export const machineUpdateSchema = machineCreateSchema.min(1) // Usa o mesmo schema da criação,
// mas exige que pelo menos 1 campo seja enviado na atualização (não pode mandar body vazio)
