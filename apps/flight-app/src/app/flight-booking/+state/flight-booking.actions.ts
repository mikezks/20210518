import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{ flights: Flight[] }>()
);

/* export const loadFlightBookingsFailure = createAction(
  '[FlightBooking] Load FlightBookings Failure',
  props<{ error: any }>()
); */
