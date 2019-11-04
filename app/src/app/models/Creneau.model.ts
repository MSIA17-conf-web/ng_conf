export class Creneau {
    constructor(
        public crenName: string,
        public description: string,
        public startTime: string,
        public endTime: string,
        public activities: Array<string>
        ) {
    }
}