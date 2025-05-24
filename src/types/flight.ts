export type FlightClass = 'Economy' | 'Business' | 'First Class';

export interface Flight {
  destination: string;
  price: number;
  class: FlightClass;
}