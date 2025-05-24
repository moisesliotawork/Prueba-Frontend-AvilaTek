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
};

export type Traveler = {
  fullName: string;
  birthDate: string;
  documentType: string;
  documentNumber: string;
};

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