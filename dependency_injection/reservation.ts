// This is the core domain
export type Reservation = {
  name: string;
  date: Date;
  quantity: number;
  validated: boolean;
};

export type ValidatedReservation = Reservation & { validated: true };

// This is pure
export function validateReservation(
  reservation: Reservation,
  validatedReservations: ValidatedReservation[],
  restaurantCapacity: number
): ValidatedReservation | null {
  if (validatedReservations.some((r) => r.date.valueOf() !== reservation.date.valueOf()))
    throw new Error("validatedReservations should be restricted");
  const alreadyBooked = validatedReservations.reduce(
    (seats, r) => seats + r.quantity,
    0
  );
  if (reservation.quantity + alreadyBooked <= restaurantCapacity) {
    return { ...reservation, validated: true };
  }
  return null;
}

