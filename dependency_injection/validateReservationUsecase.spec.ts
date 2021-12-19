import { BookingRepositoryTest } from "./BookingRepositoryTest"
import { validateReservationUseCase } from "./validateReservationUsecase"

async function it (message:string, assertion:() => Promise<boolean>) {
    if (await assertion()) {
        console.log(`✅ ${message}`)
    } else {
        console.log(`❌ ${message}`)
    }
}
it("A reservation that does not exceed the capacity is validated", async () => {
    const bookingRepositoryTest = new BookingRepositoryTest()
    try {
        await validateReservationUseCase(bookingRepositoryTest, {name:"John Doe", quantity:5, date: new Date('2021-03-03'), validated:false})
        return true
    } catch (e) {
        console.log(e)
        return false
    }    
})

it("A reservation that exceeds the capacity fails", async () => {
    const bookingRepositoryTest = new BookingRepositoryTest()
    try {
        await validateReservationUseCase(bookingRepositoryTest, {name:"John Doe", quantity:5, date: new Date('2021-03-03'), validated:false})
        await validateReservationUseCase(bookingRepositoryTest, {name:"Bill Doe", quantity:6, date: new Date('2021-03-03'), validated:false})
        return false
    } catch (e:any) {
        console.log(e?.message)
        return true
    }    
})
