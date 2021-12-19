import { Reservation } from "./reservation";
import { ReservationAggregate } from "./validateReservationUsecase";

export interface BookingRepository {
    getReservationAggregate: (reservation:Reservation) => Promise<ReservationAggregate>
    setReservationAggregate: (aggregate:ReservationAggregate) => Promise<void>
}

