export interface Departure {
  id: string;
  delayInSeconds: number;
  estimatedTime: string; // "YYYY-MM-DDTHH:mm:ssZ"
  headsign: string;
  routeId: number;
  status: string;
  theoreticalTime: string;
  tripId: number;
  vehicleCode: string;
  vehicleId: number;
  vehicleService: string;
}

export interface StopDeparturesResponse {
  lastUpdate: string;
  departures: Departure[];
}

export interface StopInfo {
  id: number;
  name: string;
}

export interface StopData extends StopInfo {
  departures: Departure[];
  lastUpdate: string | null;
  error?: string;
}
