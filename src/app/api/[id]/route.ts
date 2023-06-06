import { NextResponse } from 'next/server';
import { Indicadores } from '@/models/Indicadores';
import connectDB from '@/config/db';

export async function GET(
    request: Request,
    {
      params,
    }: {
      params: { id: string };
    },
  ) {
    const id = params.id;
    return NextResponse.json({ id });
 }

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
    const id = params.id;
    const res = await request.json();

    return NextResponse.json({ "POST" : id });
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
    const id = params.id;
    const res = await request.json();

    return NextResponse.json({ "UPDATE" : id });
}
