import mongoose from 'mongoose'                                          // Mongoose

const MachineSchema = new mongoose.Schema({                              // Schema
  nome: { type: String, required: true, trim: true },                    // Nome
  fabricante: { type: String, trim: true },                              // Fabricante
  modelo: { type: String, trim: true },                                  // Modelo
  numeroSerie: { type: String, unique: true, sparse: true, trim: true }, // Nº série
  dataAquisicao: { type: Date },                                         // Data
  status: { type: String, enum: ['ativa', 'inativa', 'manutencao'], default: 'ativa' }, // Status
  localizacao: { type: String, trim: true },                             // Local
  ultimaManutencao: { type: Date }                                       // Última manutenção
}, { timestamps: true })                                                 // createdAt/updatedAt

MachineSchema.index({ nome: 'text', fabricante: 'text', modelo: 'text' })// Índice texto

export default mongoose.model('Machine', MachineSchema)                   // Exporta Model
