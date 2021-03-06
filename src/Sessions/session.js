import {DateTime} from 'luxon'
import {Timestamp} from 'firebase/firestore'

const DEFAULT_CLUES = [{
    category: "כללי",
    items: []
}]

export default class Session {
    constructor (date,{ name=null, description=null, npcs=[], locations=[], scenes=[], encounters=[], names=[], clues=DEFAULT_CLUES, media=[]}) {
        this.date = date
        this.name = name
        this.description = description
        this.npcs = npcs
        this.locations = locations
        this.scenes = scenes
        this.encounters = encounters
        this.names = names
        this.clues = clues
        this.media = media
    }

    toString() {
        const name = this.name || ''
        return `${name}: session to play at ${this.getDateString()}`
    }

    getDateString() {
        return this.date.toLocaleString(DateTime.DATE_SHORT)
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