import React, { useState, useEffect, useCallback } from 'react';
import { STOPS, REFRESH_INTERVAL_MS } from './constants';
import { fetchDepartures } from './services/transitService';
import type { StopData } from './types';
import { DepartureBoard } from './components/DepartureBoard';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { TramIcon } from './components/icons/TramIcon';
import { Clock } from './components/Clock';

const App: React.FC = () => {
  const [stopsData, setStopsData] = useState<StopData[]>(() =>
    STOPS.map(stop => ({ ...stop, departures: [], lastUpdate: null }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setGlobalError(null);
    const fetchPromises = STOPS.map(stop => 
      fetchDepartures(stop.id)
        .then(data => ({ ...stop, ...data, error: undefined }))
        .catch(error => {
            console.error(`Error fetching data for stop ${stop.name}:`, error);
            return { ...stop, departures: [], lastUpdate: null, error: `Could not load data for ${stop.name}.` };
        })
    );

    try {
      const results = await Promise.all(fetchPromises);
      setStopsData(results);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setGlobalError("An unexpected error occurred while fetching departure data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <div className="relative min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 font-sans">
      <Clock />
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <TramIcon className="w-12 h-12 text-cyan-400" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Odjazdy <span className="text-cyan-400">PKM Strzyża</span>
          </h1>
        </div>
        <p className="text-gray-400 mt-2">Tablica odjazdów w czasie rzeczywistym</p>
      </header>

      <main>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : globalError ? (
           <div className="text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="font-bold">Wystąpił błąd</p>
            <p>{globalError}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stopsData.map(stop => (
              <DepartureBoard key={stop.id} stopData={stop} />
            ))}
          </div>
        )}
      </main>
       <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Dane odświeżane co {REFRESH_INTERVAL_MS / 1000} sekund.</p>
        <p>ZTM Gdańsk</p>
      </footer>
    </div>
  );
};

export default App;