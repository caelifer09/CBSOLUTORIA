import React, { useState } from "react";

interface SelectYearProps {
  dates: string[]; // Arreglo de fechas
  onDateSelected: (date: string) => void; // Función de devolución de llamada para la fecha seleccionada
}

const SelectYear: React.FC<SelectYearProps> = ({ dates, onDateSelected }) => {
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    setSelectedYear(selectedDate);
    onDateSelected(selectedDate);
  };

  return (
    <select value={selectedYear} onChange={handleYearChange}>
      <option value="">Selecciona un año</option>
      {dates.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default SelectYear;

