import type { StopInfo } from './types';

export const STOPS: StopInfo[] = [
  { id: 2033, name: "PKM Strzyża 01 (kier. Jelitkowo)" },
  { id: 2034, name: "PKM Strzyża 02 (kier. Centrum)" },
  { id: 213, name: "PKM Strzyża 03 (kier. Centrum)" },
];

export const API_BASE_URL = "https://ckan2.multimediagdansk.pl/departures";

export const REFRESH_INTERVAL_MS = 30000; // 30 seconds
