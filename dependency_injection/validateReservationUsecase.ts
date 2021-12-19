// This is the regular use-case pattern :
// 1) load an aggregate
// 2) pass it to the pure function
// 3) save the updated aggregate

import { BookingRepository } from "./BookingRepository";
import {
  Reservation,
  ValidatedReservation,
  validateReservation,
} from "./reservation";

// Why do I need the validatedReservations in the aggregate ?
// It'a question on consistency
// The repository will check that AFTER adding the new reservation
// to the database, the number of validatedReservations whould increase
// with 1 more.
// If not, that means that another reservation process was done 
// concurrently

export type ReservationAggregate = {
  reservation: Reservation;
  restaurantCapacity: number;
  validatedReservations: ValidatedReservation[];
};

export async function validateReservationUseCase(
  bookingRepository: BookingRepository,
  reservation: Reservation
) {
    // 1) Load the aggregate
  const aggregate = await bookingRepository.getReservationAggregate(
    reservation
  );
  // 2) compute a new aggregate with a pure function
  const validatedReservation = validateReservation(
    aggregate.reservation,
    aggregate.validatedReservations,
    aggregate.restaurantCapacity
  );
  if (validatedReservation) {
    // 3) save the aggregate 
    await bookingRepository.setReservationAggregate({
      ...aggregate,
      reservation: validatedReservation,
    });
  } else throw new Error("Reservation could not be validated");
}
