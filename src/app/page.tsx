import TravelForm from '@/components/forms/TravelForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Globetrotter</h1>
          <p className="text-xl text-gray-600">
            Reserva tus viajes de forma fácil y rápida
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl mx-auto">
          <TravelForm />
        </div>
      </div>
    </main>
  );
}