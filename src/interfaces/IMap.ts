import Location from "./ILocation"

export default interface IMap {
    _id: string,
    name: string,
    description: string,
    postedBy: string,
    likes: number,
    locationsList: Location[],
    country: string,
    createDate: Date,
}