import type { StopDeparturesResponse } from '../types';
import { API_BASE_URL } from '../constants';

export const fetchDepartures = async (stopId: number): Promise<StopDeparturesResponse> => {
  // NOTE: The target API may not have CORS headers configured,
  // which can block requests from a browser. This code assumes it's running
  // in an environment where these requests are allowed (e.g., via a proxy).
  const response = await fetch(`${API_BASE_URL}?stopId=${stopId}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data for stop ${stopId}. Status: ${response.status}. Message: ${errorText}`);
  }

  const data: StopDeparturesResponse = await response.json();
  return data;
};
