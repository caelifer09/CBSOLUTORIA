"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import { Indicadores } from "@/types/indicador"
import {Chart} from 'chart.js/auto';

const Grafico = (): JSX.Element => {
    const [datos, setDatos] = useState<Indicadores[]>([]);

    useEffect(() => {
        obtenerDatos()
    },[])
    
    useEffect(() => {
       generarGrafico(datos)
    },[datos])

      const obtenerDatos = async () => {
        try {
          const {data} = await axios('/api');

          setDatos(data.sort((a:any, b: any) => new Date(a.fechaIndicador).getTime() - new Date(b.fechaIndicador).getTime()));
        } catch (error) {
          console.log(error)
        }
      }

    function generarGrafico(datos: Indicadores[]) {
        if(datos.length === 0) return
        const fechas = datos.map((dato) => dato.fechaIndicador);
        const valores = datos.map((dato) => dato.valorIndicador);
      
        const ctx = document.getElementById('grafico') as HTMLCanvasElement;
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: fechas,
            datasets: [
              {
                label: 'Valor Indicador',
                data: valores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

  return (
    <div>
         <a href='/' className="text-black text-2xl">Volver</a>
        <canvas id="grafico">
        Tu navegador no admite el elemento &lt;canvas&gt;.
        </canvas>
    </div>
  )
}

export default Grafico