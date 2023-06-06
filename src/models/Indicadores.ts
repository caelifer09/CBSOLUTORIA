import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Indicadores document
interface IIndicadores extends Document {
  id: number;
  nombreIndicador: string;
  codigoIndicador: string;
  unidadMedidaIndicador: string;
  valorIndicador: number;
  fechaIndicador: string;
  tiempoIndicador: null;
  origenIndicador: string;
}

// Define the schema for the Indicadores document
const IndicadoresSchema: Schema = new Schema({
  id: { type: Number, required: true },
  nombreIndicador: { type: String, required: true },
  codigoIndicador: { type: String, required: true },
  unidadMedidaIndicador: { type: String, required: true },
  valorIndicador: { type: Number, required: true },
  fechaIndicador: { type: String, required: true },
  // tiempoIndicador: { type: null }, // You can remove this line if you don't need it
  origenIndicador: { type: String, required: true },
});

// Create and export the Indicadores model
export const Indicadores: mongoose.Model<IIndicadores> = mongoose.models.Indicadores
  ? mongoose.models.Indicadores
  : mongoose.model<IIndicadores>('Indicadores', IndicadoresSchema);
// export const Indicadores = mongoose.models.Indicadores ? mongoose.models.Indicadores : mongoose.model<IIndicadores>('Indicadores', IndicadoresSchema);
