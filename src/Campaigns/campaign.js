// import { DateTime } from 'luxon'
// import { Timestamp } from '@firebase/firestore'

export default class Campaign {
    constructor(name, description=null) {
        this.name = name
        this.description = description
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
        const {name, description} = snapshot.data(options)
        const campaign = new Campaign(name, description)
        campaign.id = snapshot.id
        Object.defineProperty(campaign, 'id', {writable: false})
        return campaign
    }
}