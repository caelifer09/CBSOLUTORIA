"use client"
import { useEffect, useState } from "react"
import { Indicadores } from "@/types/indicador"
import axios from "axios";
import Swal from "sweetalert2";

export default function Home(): JSX.Element {
  const [datos, setDatos] = useState<Indicadores[] | null>(null);
  const [editar, setEditar] = useState<string | null>(null)
  const [valor, setValor] = useState(0.0);
  const [fecha, setFecha] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    obtenerDatos()
  },[])

  const obtenerDatos = async () => {
    try {
      const {data} = await axios('/api');
      setDatos(data)
    } catch (error) {
      console.log(error)
    }
  }

  const Editando = (dato: Indicadores) => {
    setEditar(dato._id)
    setValor(dato.valorIndicador)
    setFecha(dato.fechaIndicador)
    setNombre(dato.origenIndicador)
  }

  const Cancelando = () => {
    setEditar(null)
    setValor(0)
    setFecha('')
    setNombre('')
  }

  const Agregando = async () => {
    let indicador
    if(!validarFormatoFecha(fecha)){
      Swal.fire(
        'Error encontrado',
        'Fecha no coincide con formato:YYYY/MM/DD',
        'warning'
      )
      return
    }
    if (!editar) {
      indicador = {
        "id":0,
        "nombreIndicador": "UNIDAD DE FOMENTO (UF)",
        "codigoIndicador": "UF",
        "unidadMedidaIndicador": "Pesos",
        "valorIndicador": valor,
        "fechaIndicador": fecha,
        "origenIndicador": nombre,
      }
      try {
        const {data} = await axios.post('/api', indicador);
        Swal.fire(
          'Indicador ingresado',
          'Correctamente',
          'success'
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      indicador = {
        "_id": editar,
        "valorIndicador": valor,
        "fechaIndicador": fecha,
        "origenIndicador": nombre,
      }
      try {
        const {data} = await axios.put('/api', indicador);
        Swal.fire(
          'Indicador Actualizado',
          'Correctamente',
          'success'
        )
      } catch (error) {
        console.log(error)
      }
    }
    Cancelando()
    obtenerDatos()
  }

  const Eliminar = (id: string) => {
    Swal.fire({
      title: 'Estas Eliminando',
      text: "Esto no se podra recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const {data} = await axios.post('/api',{_id: id});
          Swal.fire(
            data.msg,
            'success'
          )
          obtenerDatos()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  function validarFormatoFecha(fecha: string): boolean {
    const formatoFechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    return formatoFechaRegex.test(fecha);
  }

  function formatearComoCLP(numero: number): string {
    const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 2, });
    return formatoCLP.format(numero);
  }

  return (
   <main className="flex justify-evenly bg-gray-200 w-full">
    <article className="my-auto">
      <h1 className="font-extrabold text-4xl p-4 ">Challenge UF</h1>
    <div className="max-w-md mx-auto border border-black p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
          Valor
        </label>
        <input
          type="number"
          id="valor"
          step={0.01}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ingrese un valor"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Fecha: YYYY-MM-DD"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Origen
        </label>
        <input
          type="text"
          id="nombre"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ingrese un Origen de datos"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => Agregando()}
        >
          {editar ? 'Grabar' : 'Agregar'}
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => Cancelando()}
        >
          Cancelar
        </button>
      </div>
    </div>
    <a href="/grafico" className="text-center font-bold p-2 mt-4 mx-auto">Ver Grafico</a>
    </article>
    <article className="h-screen overflow-scroll p-4 w-1/3">
      {datos && datos.map( dato => (
        <div className={`${dato._id === editar ? 'bg-blue-400' : 'bg-white'} flex gap-2 justify-evenly`} key={dato._id}>
          <p>{formatearComoCLP(dato.valorIndicador)}</p>
          <p>{dato.fechaIndicador}</p>
          <button
          className="p-2 text-green-500"
          onClick={(e) => Editando(dato)}
          >Editar</button>
          <button
          className="p-2 text-red-500"
          onClick={(e) => Eliminar(dato._id)}
          >Eliminar</button>
        </div>
      ))}
    </article>   
   </main>
  )
}
