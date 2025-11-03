import React from 'react';
import type { Departure } from '../types';
import { ClockIcon } from './icons/ClockIcon';

interface DepartureRowProps {
  departure: Departure;
}

const LINE_COLORS = [
  'bg-sky-700', 'bg-emerald-700', 'bg-rose-700', 'bg-amber-600', 'bg-indigo-700',
  'bg-purple-700', 'bg-pink-700', 'bg-blue-700', 'bg-teal-700', 'bg-orange-700'
];

const getLineColor = (routeId: number) => {
  return LINE_COLORS[routeId % LINE_COLORS.length];
};

const calculateMinutesUntil = (isoTime: string): string => {
  const now = new Date();
  const departureTime = new Date(isoTime);
  const diffInSeconds = Math.floor((departureTime.getTime() - now.getTime()) / 1000);

  if (diffInSeconds < 45) {
    return 'Teraz';
  }
  
  const diffInMinutes = Math.round(diffInSeconds / 60);

  if (diffInMinutes < 1) {
    return '< 1 min';
  }

  return `${diffInMinutes} min`;
};

export const DepartureRow: React.FC<DepartureRowProps> = ({ departure }) => {
  const { routeId, headsign, estimatedTime, delayInSeconds, vehicleCode } = departure;
  const timeToDeparture = calculateMinutesUntil(estimatedTime);
  const isDelayed = delayInSeconds > 60;

  const rowClasses = `flex items-center p-3 rounded-lg transition-colors duration-200 ${
    isDelayed
      ? 'bg-amber-900/50 hover:bg-amber-800/60 border border-amber-700/80'
      : 'bg-gray-700/50 hover:bg-gray-700'
  }`;

  return (
    <div className={rowClasses}>
      <div className={`flex-shrink-0 w-12 h-12 ${getLineColor(routeId)} rounded-full flex items-center justify-center mr-4`}>
        <span className="text-white font-bold text-2xl">{routeId}</span>
      </div>
      <div className="flex-grow min-w-0 mr-2">
        <p className="font-semibold text-lg text-white truncate">{headsign}</p>
        {(vehicleCode || isDelayed) && (
          <div className="text-xs text-gray-400 flex items-center flex-wrap">
            {vehicleCode && <span>Pojazd: {vehicleCode}</span>}
            {vehicleCode && isDelayed && <span className="mx-1">·</span>}
            {isDelayed && (
              <span className="text-yellow-400 font-medium">
                Opóźnienie {Math.round(delayInSeconds / 60)} min
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 text-cyan-300 ml-auto">
        <ClockIcon className="w-5 h-5" />
        <span className="font-mono text-lg font-medium w-20 text-right">{timeToDeparture}</span>
      </div>
    </div>
  );
};