"use client";

import { useState } from 'react';
import { Step2Props } from '@/types/travel-form';

export default function Step2({ onNext, onPrev, initialData }: Step2Props) {
  // Estado para el número de viajeros
  const [travelerCount, setTravelerCount] = useState<number>(initialData?.travelerCount || 1);
  
  // Estado para los datos de cada viajero
  const [travelers, setTravelers] = useState<Array<{
    fullName: string;
    birthDate: string;
    docType: 'V' | 'E';
    docNumber: string;
  }>>(initialData?.travelers || Array(travelerCount).fill({
    fullName: '',
    birthDate: '',
    docType: 'V',
    docNumber: ''
  }));
  
  // Estado para mascotas
  const [hasPets, setHasPets] = useState<boolean>(initialData?.hasPets || false);
  const [petCount, setPetCount] = useState<number>(initialData?.petCount || 0);
  
  // Estado para maletas extra
  const [hasExtraLuggage, setHasExtraLuggage] = useState<boolean>(initialData?.hasExtraLuggage || false);
  const [luggageCount, setLuggageCount] = useState<number>(initialData?.luggageCount || 0);

  // Manejar cambio en número de viajeros
  const handleTravelerCountChange = (count: number) => {
    if (count >= 1 && count <= 10) {
      setTravelerCount(count);
      // Ajustar array de viajeros
      if (count > travelers.length) {
        setTravelers([...travelers, ...Array(count - travelers.length).fill({
          fullName: '',
          birthDate: '',
          docType: 'V',
          docNumber: ''
        })]);
      } else if (count < travelers.length) {
        setTravelers(travelers.slice(0, count));
      }
    }
  };

  // Manejar cambio en datos de viajero
  const handleTravelerChange = (index: number, field: string, value: string) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value
    };
    setTravelers(updatedTravelers);
  };

  // Validar número de documento
  const validateDocNumber = (docNumber: string) => {
    const regex = /^[0-9]{6,10}$/;
    return regex.test(docNumber);
  };

  // Validar formulario
  const validateForm = () => {
    // Validar datos de cada viajero
    for (const traveler of travelers) {
      if (!traveler.fullName || !traveler.birthDate || !traveler.docNumber) {
        return false;
      }
      if (!validateDocNumber(traveler.docNumber)) {
        return false;
      }
    }
    return true;
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor completa todos los campos requeridos y verifica que los números de documento tengan entre 6 y 10 dígitos');
      return;
    }

    onNext({
      travelerCount,
      travelers,
      hasPets,
      petCount,
      hasExtraLuggage,
      luggageCount,
      petCost: petCount * 100,
      luggageCost: luggageCount * 50
    });
  };

  return (
    <div className="card max-w-md mx-auto my-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Información del Viajero</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Número de viajeros */}
        <div className="space-y-2">
          <label htmlFor="travelerCount" className="text-sm font-medium text-gray-700">
            Número de viajeros
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => handleTravelerCountChange(travelerCount - 1)}
              disabled={travelerCount <= 1}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-gray-100 text-black"
            >
              -
            </button>
            <input
              type="number"
              id="travelerCount"
              min="1"
              max="10"
              value={travelerCount}
              onChange={(e) => handleTravelerCountChange(parseInt(e.target.value))}
              className="input-field w-full px-4 py-2"
            />
            <button
              type="button"
              onClick={() => handleTravelerCountChange(travelerCount + 1)}
              disabled={travelerCount >= 10}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-gray-100 text-gray-800"
            >
              +
            </button>
          </div>
        </div>

        {/* Datos de cada viajero */}
        {travelers.map((traveler, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50">
            <h3 className="font-medium text-gray-700 text-lg">Viajero {index + 1}</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor={`fullName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  id={`fullName-${index}`}
                  type="text"
                  value={traveler.fullName}
                  onChange={(e) => handleTravelerChange(index, 'fullName', e.target.value)}
                  className="input-field w-full px-4 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor={`birthDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de nacimiento
                </label>
                <input
                  id={`birthDate-${index}`}
                  type="date"
                  value={traveler.birthDate}
                  onChange={(e) => handleTravelerChange(index, 'birthDate', e.target.value)}
                  className="input-field w-full px-4 py-2"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`docType-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de documento
                  </label>
                  <select
                    id={`docType-${index}`}
                    value={traveler.docType}
                    onChange={(e) => handleTravelerChange(index, 'docType', e.target.value as 'V' | 'E')}
                    className="input-field w-full px-4 py-2"
                    required
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor={`docNumber-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Número de documento (6-10 dígitos)
                  </label>
                  <input
                    id={`docNumber-${index}`}
                    type="text"
                    value={traveler.docNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        handleTravelerChange(index, 'docNumber', value);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800"
                    pattern="[0-9]{6,10}"
                    minLength={6}
                    maxLength={10}
                    required
                  />
                  {traveler.docNumber && !validateDocNumber(traveler.docNumber) && (
                    <p className="text-xs text-red-500 mt-1">El número debe tener entre 6 y 10 dígitos</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mascotas */}
        <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              ¿Viajas con mascotas?
            </label>
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setHasPets(false)}
                className={`px-4 py-2 rounded-md transition-colors ${!hasPets ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setHasPets(true)}
                className={`px-4 py-2 rounded-md transition-colors ${hasPets ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Sí
              </button>
            </div>
          </div>
          
          {hasPets && (
            <div className="space-y-2 pt-2">
              <label htmlFor="petCount" className="block text-sm font-medium text-gray-700">
                Cantidad de mascotas (Costo: $100 c/u)
              </label>
              <input
                type="number"
                id="petCount"
                min="0"
                value={petCount}
                onChange={(e) => setPetCount(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800"
              />
              {petCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">Costo adicional: ${petCount * 100}</p>
              )}
            </div>
          )}
        </div>

        {/* Maletas extra */}
        <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              ¿Necesitas maletas extra?
            </label>
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setHasExtraLuggage(false)}
                className={`px-4 py-2 rounded-md transition-colors ${!hasExtraLuggage ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setHasExtraLuggage(true)}
                className={`px-4 py-2 rounded-md transition-colors ${hasExtraLuggage ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Sí
              </button>
            </div>
          </div>
          
          {hasExtraLuggage && (
            <div className="space-y-2 pt-2">
              <label htmlFor="luggageCount" className="block text-sm font-medium text-gray-700">
                Cantidad de maletas extra (Costo: $50 c/u)
              </label>
              <input
                type="number"
                id="luggageCount"
                min="0"
                value={luggageCount}
                onChange={(e) => setLuggageCount(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800"
              />
              {luggageCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">Costo adicional: ${luggageCount * 50}</p>
              )}
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}