import {DateTime} from 'luxon'
import {Timestamp} from 'firebase/firestore'

export default class Session {
    constructor (date, name=null) {
        this.date = date
        this.name = name
    }

    toString() {
        const name = this.name || ''
        const formatted_date = this.date.toLocaleString(DateTime.DATE_SHORT)
        return `${name}: session to play at ${formatted_date}`
    }
}

Session.firestoreConvertor = {
    toFirestore: session => {
        return {
            date: Timestamp.fromDate(session.date.toJSDate())
        }
    },
    fromFireStore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Session(
            DateTime.fromJSDate(data.date.toDate())
        )
    }
}