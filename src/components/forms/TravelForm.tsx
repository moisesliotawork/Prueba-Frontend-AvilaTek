"use client";

import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { TravelFormData, Step1Data, Step2Data, Step3Data } from '@/types/travel-form';

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
      extraLuggage: data.hasExtraLuggage ? data.luggageCount : undefined,
      petCost: data.petCost,
      luggageCost: data.luggageCost
    });
  };

  const handleStep3Complete = (data: Step3Data) => {
    nextStep({
      travelInsurance: data.hasTravelInsurance,
      preferredSeats: data.hasPreferredSeats,
      specialAssistance: data.needsSpecialAssistance ? data.specialAssistanceNote : undefined,
      insuranceCost: data.insuranceCost,
      seatsCost: data.seatsCost
    });
  };

  const getStep3InitialData = (): Partial<Step3Data> => {
    return {
      hasTravelInsurance: formData.travelInsurance || false,
      hasPreferredSeats: formData.preferredSeats || false,
      needsSpecialAssistance: !!formData.specialAssistance,
      specialAssistanceNote: formData.specialAssistance || '',
      insuranceCost: formData.travelInsurance ? 75 : 0,
      seatsCost: formData.preferredSeats ? 50 : 0
    };
  };

  const calculateCosts = () => {
    let basePrice = 200;
    if (formData.flightClass === 'Business') basePrice = 500;
    if (formData.flightClass === 'First Class') basePrice = 800;

    const petCost = formData.pets ? formData.pets * 50 : 0;
    const luggageCost = formData.extraLuggage ? formData.extraLuggage * 30 : 0;
    const insuranceCost = formData.travelInsurance ? 75 : 0;
    const seatsCost = formData.preferredSeats ? 50 : 0;

    const totalAdditionalCosts = petCost + luggageCost + insuranceCost + seatsCost;
    const totalCost = basePrice + totalAdditionalCosts;

    return {
      basePrice,
      petCost,
      luggageCost,
      insuranceCost,
      seatsCost,
      totalCost
    };
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    alert('Reservation confirmed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {currentStep === 1 && (
          <Step1 
            onNext={handleStep1Complete}
            initialData={formData}
          />
        )}

        {currentStep === 2 && (
          <Step2
            onNext={handleStep2Complete}
            onPrev={prevStep}
            initialData={formData}
          />
        )}

        {currentStep === 3 && (
          <Step3
            onNext={handleStep3Complete}
            onPrev={prevStep}
            initialData={getStep3InitialData()}
          />
        )}

        {currentStep === 4 && (
          <Step4
            formData={{
              // Required TravelFormData fields
              destination: formData.destination || '',
              departureDate: formData.departureDate || '',
              returnDate: formData.returnDate || '',
              flightClass: formData.flightClass || 'Economy',
              travelers: formData.travelers || [],
              
              // Optional TravelFormData fields
              pets: formData.pets,
              extraLuggage: formData.extraLuggage,
              travelInsurance: formData.travelInsurance,
              preferredSeats: formData.preferredSeats,
              specialAssistance: formData.specialAssistance,
              
              // Step2Data fields
              travelerCount: formData.travelers?.length || 0,
              hasPets: !!formData.pets,
              petCount: formData.pets || 0,
              hasExtraLuggage: !!formData.extraLuggage,
              luggageCount: formData.extraLuggage || 0,
              
              // Step3Data fields
              hasTravelInsurance: !!formData.travelInsurance,
              hasPreferredSeats: !!formData.preferredSeats,
              needsSpecialAssistance: !!formData.specialAssistance,
              specialAssistanceNote: formData.specialAssistance || '',
              
              // Step4Data fields (from calculateCosts)
              ...calculateCosts()
            }}
            onPrev={prevStep}
            onConfirm={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}