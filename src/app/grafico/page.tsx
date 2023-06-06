"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import { Indicadores } from "@/types/indicador"
import {Chart} from 'chart.js/auto';
import SelectYear from "@/components/SelectYear";

const Grafico = (): JSX.Element => {
    const [datos, setDatos] = useState<Indicadores[]>([]);
    const [unicos, setUnicos] = useState<string[]>([]);

      useEffect(() => {
          obtenerDatos()
      },[])
      
      useEffect(() => {
        obtenerYear()
      },[datos])

      const obtenerYear = () => {
        if(datos.length === 0) return
        const añosUnicos = new Set<string>();
        datos.forEach((dato) => {
          const fecha = new Date(dato.fechaIndicador);
          const año = fecha.getFullYear().toString();
          añosUnicos.add(año);
        });

        const añosOrdenados = Array.from(añosUnicos).sort();
        setUnicos(añosOrdenados)
      }

      const obtenerDatos = async () => {
        try {
          const {data} = await axios('/api');

          setDatos(data.sort((a:any, b: any) => new Date(a.fechaIndicador).getTime() - new Date(b.fechaIndicador).getTime()));
        } catch (error) {
          console.log(error)
        }
      }

      const filterByYear = (data: Indicadores[], year: number) => {
        return data.filter(item => {
          const itemYear = new Date(item.fechaIndicador).getFullYear();
          return itemYear === year;
        });
      };

      function generarGrafico(datos: Indicadores[]) {
          if(datos.length === 0) return
          const fechas = datos.map((dato) => dato.fechaIndicador);
          const valores = datos.map((dato) => dato.valorIndicador);
        
          const ctx = document.getElementById('grafico') as HTMLCanvasElement;

          // Destruir el gráfico anterior si existe
          const existingChart = Chart.getChart(ctx);
          if (existingChart) {
            existingChart.destroy();
          }

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
        
        const handleDateSelected = (date: string) => {
         generarGrafico(filterByYear(datos,parseInt(date)))

        };

  return (
    <div>
        <a href='/' className="text-black text-2xl">Volver</a>
        <SelectYear dates={unicos} onDateSelected={handleDateSelected} />

        <canvas id="grafico">
        Tu navegador no admite el elemento &lt;canvas&gt;.
        </canvas>
    </div>
  )
}

export default Grafico