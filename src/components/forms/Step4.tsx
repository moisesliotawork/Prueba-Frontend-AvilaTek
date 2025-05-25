"use client";

import { Step4Props } from '@/types/travel-form';

export default function Step4({ formData, onPrev, onConfirm }: Step4Props) {
  // Calculate total costs
  const totalAdditionalCosts = 
    (formData.petCost || 0) + 
    (formData.luggageCost || 0) + 
    (formData.insuranceCost || 0) + 
    (formData.seatsCost || 0);

  const totalCost = (formData.basePrice || 0) + totalAdditionalCosts;

  return (
    <div className="card max-w-md mx-auto my-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Resumen de tu viaje</h2>
      
      <div className="space-y-6">
        {/* Información del viaje */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-lg text-gray-700 mb-3">Información del vuelo</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Destino:</span> {formData.destination}</p>
            <p><span className="font-medium">Fecha de ida:</span> {formData.departureDate}</p>
            <p><span className="font-medium">Fecha de regreso:</span> {formData.returnDate}</p>
            <p><span className="font-medium">Clase:</span> {formData.flightClass}</p>
          </div>
        </div>
        
        {/* Información de los viajeros */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-lg text-gray-700 mb-3">Viajeros</h3>
          {formData.travelers?.map((traveler, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="font-medium">Viajero {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                <p><span className="font-medium">Nombre:</span> {traveler.fullName}</p>
                <p><span className="font-medium">Fecha de nacimiento:</span> {traveler.birthDate}</p>
                <p><span className="font-medium">Documento:</span> {traveler.docType === 'V' ? 'Venezolano' : 'Extranjero'}-{traveler.docNumber}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Servicios adicionales */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-lg text-gray-700 mb-3">Servicios adicionales</h3>
          <div className="space-y-2 text-gray-600">
            {formData.hasPets && formData.petCount && (
              <p><span className="font-medium">Mascotas:</span> {formData.petCount} (${formData.petCost})</p>
            )}
            {formData.hasExtraLuggage && formData.luggageCount && (
              <p><span className="font-medium">Equipaje extra:</span> {formData.luggageCount} (${formData.luggageCost})</p>
            )}
            {formData.hasTravelInsurance && (
              <p><span className="font-medium">Seguro de viaje:</span> Sí (${formData.insuranceCost})</p>
            )}
            {formData.hasPreferredSeats && (
              <p><span className="font-medium">Asientos preferenciales:</span> Sí (${formData.seatsCost})</p>
            )}
            {formData.needsSpecialAssistance && (
              <div>
                <p><span className="font-medium">Asistencia especial:</span> Sí</p>
                {formData.specialAssistanceNote && (
                  <p className="pl-4 text-gray-500">{formData.specialAssistanceNote}</p>
                )}
              </div>
            )}
            {!formData.hasPets && !formData.hasExtraLuggage && !formData.hasTravelInsurance && 
              !formData.hasPreferredSeats && !formData.needsSpecialAssistance && (
              <p className="text-gray-400">No se seleccionaron servicios adicionales</p>
            )}
          </div>
        </div>

        {/* Resumen de costos */}
        <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
          <h3 className="font-medium text-lg text-gray-700 mb-3">Resumen de costos</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Precio base</span>
              <span>${formData.basePrice || 0}</span>
            </div>
            
            {formData.hasPets && formData.petCount && (
              <div className="flex justify-between">
                <span>Mascotas ({formData.petCount})</span>
                <span>${formData.petCost}</span>
              </div>
            )}
            
            {formData.hasExtraLuggage && formData.luggageCount && (
              <div className="flex justify-between">
                <span>Equipaje extra ({formData.luggageCount})</span>
                <span>${formData.luggageCost}</span>
              </div>
            )}
            
            {formData.hasTravelInsurance && (
              <div className="flex justify-between">
                <span>Seguro de viaje</span>
                <span>${formData.insuranceCost}</span>
              </div>
            )}
            
            {formData.hasPreferredSeats && (
              <div className="flex justify-between">
                <span>Asientos preferenciales</span>
                <span>${formData.seatsCost}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${totalCost}</span>
              </div>
            </div>
          </div>
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
          type="button"
          onClick={onConfirm}
          className="btn-check w-full py-3 px-4 mt-6 text-lg font-medium"
        >
          Confirmar reservación
        </button>
      </div>
    </div>
  );
}