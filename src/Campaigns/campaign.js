// import { DateTime } from 'luxon'
// import { Timestamp } from '@firebase/firestore'

export default class Campaign {
    constructor(name, description=null, players=null) {
        this.name = name
        this.description = description
        this.players = players == null ? [] : players
    }

    toString() {
        return `Campaign: ${this.name}`
    }

}
Campaign.firestoreConvertor = {
    toFirestore: campaign => {
        return {
            ...campaign
        }
    },
    fromFirestore: (snapshot, options) => {
        const {name, description, players} = snapshot.data(options)
        const campaign = new Campaign(name, description, players)
        campaign.id = snapshot.id
        Object.defineProperty(campaign, 'id', {writable: false})
        return campaign
    }
}