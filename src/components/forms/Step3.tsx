"use client";

import { useState } from 'react';
import { Step3Props } from '@/types/travel-form';

export default function Step3({ onNext, onPrev, initialData }: Step3Props) {
  // Estado para los servicios adicionales
  const [hasTravelInsurance, setHasTravelInsurance] = useState<boolean>(initialData?.hasTravelInsurance || false);
  const [hasPreferredSeats, setHasPreferredSeats] = useState<boolean>(initialData?.hasPreferredSeats || false);
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState<boolean>(initialData?.needsSpecialAssistance || false);
  const [specialAssistanceNote, setSpecialAssistanceNote] = useState<string>(initialData?.specialAssistanceNote || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onNext({
      hasTravelInsurance,
      hasPreferredSeats,
      needsSpecialAssistance,
      specialAssistanceNote,
      insuranceCost: hasTravelInsurance ? 75 : 0,
      seatsCost: hasPreferredSeats ? 50 : 0
    });
  };

  return (
    <div className="card max-w-md mx-auto my-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Servicios Adicionales</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seguro de viaje */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <label htmlFor="travelInsurance" className="text-sm font-medium text-gray-700">
              ¿Deseas agregar seguro de viaje?
            </label>
            <p className="text-xs text-gray-500">Cobertura completa por $75</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="travelInsurance"
              type="checkbox" 
              className="sr-only peer" 
              checked={hasTravelInsurance}
              onChange={() => setHasTravelInsurance(!hasTravelInsurance)}
              aria-label="Agregar seguro de viaje"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Asientos preferenciales */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <label htmlFor="preferredSeats" className="text-sm font-medium text-gray-700">
              ¿Deseas seleccionar asientos preferenciales?
            </label>
            <p className="text-xs text-gray-500">Selección por $50</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="preferredSeats"
              type="checkbox" 
              className="sr-only peer" 
              checked={hasPreferredSeats}
              onChange={() => setHasPreferredSeats(!hasPreferredSeats)}
              aria-label="Seleccionar asientos preferenciales"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Asistencia especial */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <label htmlFor="specialAssistance" className="text-sm font-medium text-gray-700">
              ¿Requiere asistencia especial?
            </label>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="specialAssistance"
              type="checkbox" 
              className="sr-only peer" 
              checked={needsSpecialAssistance}
              onChange={() => setNeedsSpecialAssistance(!needsSpecialAssistance)}
              aria-label="Requiere asistencia especial"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Nota de asistencia especial (condicional) */}
        {needsSpecialAssistance && (
          <div className="space-y-2">
            <label htmlFor="specialAssistanceNote" className="block text-sm font-medium text-gray-700">
              Por favor describe tus necesidades de asistencia
            </label>
            <textarea
              id="specialAssistanceNote"
              value={specialAssistanceNote}
              onChange={(e) => setSpecialAssistanceNote(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 min-h-[100px]"
              placeholder="Describe cualquier necesidad especial que tengas (máximo 200 caracteres)"
              aria-label="Descripción de necesidades de asistencia especial"
            />
            <p className="text-xs text-gray-500 text-right">
              {specialAssistanceNote.length}/200 caracteres
            </p>
          </div>
        )}

        {/* Resumen de costos */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Resumen de costos adicionales</h3>
          <div className="space-y-1">
            {hasTravelInsurance && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Seguro de viaje</span>
                <span className="text-sm font-medium">$75</span>
              </div>
            )}
            {hasPreferredSeats && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Asientos preferenciales</span>
                <span className="text-sm font-medium">$50</span>
              </div>
            )}
            {(hasTravelInsurance || hasPreferredSeats) ? (
              <div className="flex justify-between pt-2 border-t border-blue-100 mt-2">
                <span className="text-sm font-medium">Total adicional</span>
                <span className="text-sm font-medium">
                  ${(hasTravelInsurance ? 75 : 0) + (hasPreferredSeats ? 50 : 0)}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay costos adicionales seleccionados</p>
            )}
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="btn-primary w-full py-3 px-4 mt-6 text-lg font-medium"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="btn-primary w-full py-3 px-4 mt-6 text-lg font-medium"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}