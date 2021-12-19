import { BookingRepository } from "./BookingRepository";
import { Reservation, ValidatedReservation } from "./reservation";
import { ReservationAggregate } from "./validateReservationUsecase";



export class BookingRepositoryTest implements BookingRepository {
    _reservations : ValidatedReservation[] = []
    _capacity = 7;

    async getReservationAggregate (reservation: Reservation) {
        return {
            reservation,
            restaurantCapacity:this._capacity,
            validatedReservations: this._reservations.filter(r => r.date.valueOf() === reservation.date.valueOf())
        } 
    }
    async setReservationAggregate (aggregate: ReservationAggregate) {
        if (aggregate.reservation.validated === true) {
            this._reservations.push({...aggregate.reservation, validated:true})
        }
    }
    
}