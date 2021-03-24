export interface SingleItineraryProps {
    data: FindItineraryByIdObject
}

export interface FindItineraryByIdObject {
    pkitinerary: number
    title: string
    summary: string
    content: Object[]
    created_on: Date
    user_itineraries: Object[]
    users: Object
    itinerary_tags: Object[]
    itinerary_experiences: Object[]
}