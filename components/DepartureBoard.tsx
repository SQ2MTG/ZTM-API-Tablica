import React from 'react';
import type { StopData } from '../types';
import { DepartureRow } from './DepartureRow';

interface DepartureBoardProps {
  stopData: StopData;
}

export const DepartureBoard: React.FC<DepartureBoardProps> = ({ stopData }) => {
  const { name, departures, lastUpdate, error } = stopData;

  const sortedDepartures = [...departures].sort((a, b) => 
    new Date(a.estimatedTime).getTime() - new Date(b.estimatedTime).getTime()
  );

  const formattedLastUpdate = lastUpdate 
    ? new Date(lastUpdate).toLocaleTimeString('pl-PL')
    : 'N/A';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-semibold text-white">{name}</h2>
        <p className="text-xs text-gray-400">Ostatnia aktualizacja: {formattedLastUpdate}</p>
      </div>
      <div className="flex-grow p-2">
        {error ? (
          <div className="h-full flex items-center justify-center p-4">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        ) : sortedDepartures.length > 0 ? (
          <div className="space-y-2">
            {sortedDepartures.slice(0, 7).map(dep => (
              <DepartureRow key={dep.id} departure={dep} />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-4">
            <p className="text-gray-400">Brak odjazdów w najbliższym czasie.</p>
          </div>
        )}
      </div>
    </div>
  );
};