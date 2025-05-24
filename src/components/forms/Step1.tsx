"use client";

import { useState, useEffect } from 'react';
import { fetchFlights } from '@/utils/fetchFlights';
import { Flight } from '@/types/flight';
import { Step1Props } from '@/types/travel-form';

export default function Step1({ onNext, initialData }: Step1Props) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedDestination, setSelectedDestination] = useState(initialData?.destination || '');
  const [departureDate, setDepartureDate] = useState(initialData?.departureDate || '');
  const [returnDate, setReturnDate] = useState(initialData?.returnDate || '');
  const [flightClass, setFlightClass] = useState<Flight['class'] | ''>(initialData?.flightClass || '');

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    loadFlights();
  }, []);

  const uniqueDestinations = [...new Set(flights.map(flight => flight.destination))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDestination || !departureDate || !returnDate || !flightClass) {
      alert('Please complete all fields');
      return;
    }

    onNext({
      destination: selectedDestination,
      departureDate,
      returnDate,
      flightClass: flightClass as Flight['class']
    });
  };

  return (
    <div className="card max-w-md mx-auto my-8">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Travel Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Field */}
        <div className="space-y-2">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <div className="relative">
            <input
              id="destination"
              type="text"
              list="destinations"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="input-field w-full px-4 py-2"
              placeholder="A donde quieres ir?"
              required
            />
            <datalist id="destinations">
              {uniqueDestinations.map((destination) => (
                <option key={destination} value={destination} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="departure" className="text-sm font-medium text-gray-700">
              Fecha de Ida
            </label>
            <input
              id="departure"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="input-field w-full px-4 py-2"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="return" className="text-sm font-medium text-gray-700">
              Fecha de Retorno
            </label>
            <input
              id="return"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input-field w-full px-4 py-2 disabled:opacity-50"
              min={departureDate || new Date().toISOString().split('T')[0]}
              disabled={!departureDate}
              required
            />
          </div>
        </div>

        {/* Flight Class */}
        <div className="space-y-2">
          <label htmlFor="class" className="text-sm font-medium text-gray-700">
            Class
          </label>
          <select
            id="class"
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value as Flight['class'])}
            className="input-field w-full px-4 py-2"
            required
          >
            <option value="" className="text-black">Select class</option>
            <option value="Economy" className="text-black">Economy</option>
            <option value="Business" className="text-black">Business</option>
            <option value="First Class" className="text-black">First Class</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full py-3 px-4 mt-6 text-lg font-medium"
        >
          Continue
        </button>
      </form>
    </div>
  );
}