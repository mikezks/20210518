import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  flightBookingState => flightBookingState.flights
);

/* interface Booking {
  flightId: number;
  passengerId: number;
}

export const myFlights = createSelector(
  // Selectors
  selectFlights,
  selectPassengers,
  selectBookings,
  selectActiveUser,
  // Projector
  (flights, passengers, booking: Booking[], user) => {
    const myPassenger = passengers.find(p => p.id === user.passengerId);
    const myBookings = booking.filter(b => b.passengerId === myPassenger.id);
  }
); */
