import { NextResponse } from 'next/server';
import { Indicadores } from '@/models/Indicadores';
import connectDB from '@/config/db';
import mongoose from "mongoose";

export async function GET() {
    await connectDB()
    const indicadores = await Indicadores.find({codigoIndicador: "UF" })
    return NextResponse.json(indicadores);
}

export async function POST(request: Request) {
    await connectDB()
    const body = await request.json();
    const { _id } = body
    const valid = mongoose.Types.ObjectId.isValid(_id)
    if(valid){
        const indicadorEncontrado = await Indicadores.findById(_id)
        if(!indicadorEncontrado) {
            const error = new Error('Producto no encontrado');
            return NextResponse.json({ msg: error.message});
        }
        try {
            await indicadorEncontrado.deleteOne()
            return NextResponse.json({msg: 'indicador Eliminado Correctamente'})
          } catch (error: any) {
            return NextResponse.json({ msg: error.message});
          }
    }
    const IndicadorNuevo = new Indicadores(body)
    await IndicadorNuevo.save()
    return NextResponse.json(IndicadorNuevo);
}

export async function PUT(request: Request) {
    await connectDB()
    const body = await request.json();
    const { _id } = body
    const valid = mongoose.Types.ObjectId.isValid(_id)
    if(valid){
        const indicadorActualizado = await Indicadores.findByIdAndUpdate(_id, body, {new: true});
        if(indicadorActualizado) {
            await indicadorActualizado.save()
            return NextResponse.json(indicadorActualizado);
        } else {
            return NextResponse.json({"404": "no encontrado el indicador" });
        }
    }
    return NextResponse.json({"400": "metodo no soportado" });
}