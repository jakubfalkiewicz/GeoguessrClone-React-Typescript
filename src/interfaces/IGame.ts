import Location from "./ILocation"
export default interface IGame {
    gameId: string,
    time: number,
    player: string,
    mapId: string,
    move: boolean,
    pan: boolean,
    zoom: boolean,
    locations: Location[],
    currentRound: number,
    roundsList: Location[][],
    timesList: number[],
    finishDate: Date | null,
    country: string,
    createDate: Date,
}