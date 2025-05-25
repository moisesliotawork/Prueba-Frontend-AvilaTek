import { FlightClass } from './flight';

export type TravelFormData = {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: FlightClass;
  travelers?: Traveler[];
  pets?: number;
  extraLuggage?: number;
  travelInsurance?: boolean;
  preferredSeats?: boolean;
  specialAssistance?: string;
  petCost?: number;
  luggageCost?: number;
  insuranceCost?: number;
  seatsCost?: number;
  basePrice?: number;
  totalCost?: number;
};

export interface Traveler {
  fullName: string;
  birthDate: string;
  docType: 'V' | 'E';
  docNumber: string;
}

export type Step1Data = {
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: FlightClass | '';
};

export type Step1Props = {
  onNext: (data: Step1Data) => void;
  initialData?: Partial<TravelFormData>;
};

export interface Step2Data {
  travelerCount: number;
  travelers: Traveler[];
  hasPets: boolean;
  petCount: number;
  hasExtraLuggage: boolean;
  luggageCount: number;
  petCost: number;
  luggageCost: number;
}

export interface Step2Props {
  onNext: (data: Step2Data) => void;
  onPrev: () => void;
  initialData?: Partial<Step2Data>;
}

export interface Step3Data {
  hasTravelInsurance: boolean;
  hasPreferredSeats: boolean;
  needsSpecialAssistance: boolean;
  specialAssistanceNote: string;
  insuranceCost: number;
  seatsCost: number;
}

export interface Step3Props {
  onNext: (data: Step3Data) => void;
  onPrev: () => void;
  initialData?: Partial<Step3Data>;
}

export interface Step4Data {
  basePrice: number;
  totalCost: number;
}

export interface Step4Props {
  formData: TravelFormData & Step2Data & Step3Data & Step4Data;
  onPrev: () => void;
  onConfirm: () => void;
}