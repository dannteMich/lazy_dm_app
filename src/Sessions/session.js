import {DateTime} from 'luxon'
import {Timestamp} from 'firebase/firestore'

export default class Session {
    constructor (date,{ name=null, description=null}) {
        this.date = date
        this.name = name
        this.description = description
    }

    toString() {
        const name = this.name || ''
        const formatted_date = this.date.toLocaleString(DateTime.DATE_SHORT)
        return `${name}: session to play at ${formatted_date}`
    }
}

Session.firestoreConvertor = {
    toFirestore: session => {
        const {date, ...data} = session
        return {
            date: Timestamp.fromDate(date.toJSDate()),
            ...data
        }
    },
    fromFirestore: (snapshot, options) => {
        const {date, ...data} = snapshot.data(options)
        const session = new Session(
            DateTime.fromJSDate(date.toDate()),
            data
        )
        session.id = snapshot.id
        Object.defineProperty(session, 'id', {writable:false})
        return session
    }
}