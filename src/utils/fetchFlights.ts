import { Flight } from '@/types/flight';

export async function fetchFlights(): Promise<Flight[]> {
  const res = await fetch(
    'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json'
  );
  return res.json();
}