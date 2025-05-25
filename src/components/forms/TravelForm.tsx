"use client";

import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import { TravelFormData, Step1Data, Step2Data } from '@/types/travel-form';

export default function TravelForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<TravelFormData>>({});

  const nextStep = (stepData: Partial<TravelFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleStep1Complete = (data: Step1Data) => {
    if (!data.flightClass) {
      alert('Please select a flight class');
      return;
    }
    
    nextStep({
      destination: data.destination,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      flightClass: data.flightClass
    });
  };

  const handleStep2Complete = (data: Step2Data) => {
    nextStep({
      travelers: data.travelers,
      pets: data.hasPets ? data.petCount : undefined,
      extraLuggage: data.hasExtraLuggage ? data.luggageCount : undefined
    });
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    alert('Reservation confirmed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Step 1: Travel Information */}
        {currentStep === 1 && (
          <Step1 
            onNext={handleStep1Complete}
            initialData={formData}
          />
        )}

        {/* Step 2: Traveler Information */}
        {currentStep === 2 && (
          <Step2
            onNext={handleStep2Complete}
            onPrev={prevStep}
            initialData={formData}
          />
        )}

        {/* Step 3: Additional Services */}
        {currentStep === 3 && (
          <div className="p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-light text-gray-800">Additional Services</h2>
            <div className="space-y-4">
              {/* Placeholder for Step3 component */}
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-400">Services selection</p>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={prevStep}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => nextStep({})}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <div className="p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-light text-gray-800">Review Your Trip</h2>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-lg text-gray-700 mb-3">Travel Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Destination:</span> {formData.destination}</p>
                  <p><span className="font-medium">Departure:</span> {formData.departureDate}</p>
                  <p><span className="font-medium">Return:</span> {formData.returnDate}</p>
                  <p><span className="font-medium">Class:</span> {formData.flightClass}</p>
                </div>
              </div>
              
              {/* Traveler Information Summary */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-lg text-gray-700 mb-3">Traveler Information</h3>
                {formData.travelers?.map((traveler, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="font-medium">Traveler {index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                      <p><span className="font-medium">Name:</span> {traveler.fullName}</p>
                      <p><span className="font-medium">Birth Date:</span> {traveler.birthDate}</p>
                      <p><span className="font-medium">Document:</span> {traveler.docType}-{traveler.docNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional Services Summary */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-lg text-gray-700 mb-3">Additional Services</h3>
                <div className="space-y-2 text-gray-600">
                  {formData.pets && (
                    <p><span className="font-medium">Pets:</span> {formData.pets} (${formData.pets * 100})</p>
                  )}
                  {formData.extraLuggage && (
                    <p><span className="font-medium">Extra Luggage:</span> {formData.extraLuggage} (${formData.extraLuggage * 50})</p>
                  )}
                  {(!formData.pets && !formData.extraLuggage) && (
                    <p className="text-gray-400">No additional services selected</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={prevStep}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}