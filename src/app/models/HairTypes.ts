export class HairType {

    hairtype: string;
    cuttingTimeHour: number;
    cuttingTimeMinute: number;

    constructor(hairType: string, cuttingTimeHour: number, cuttingTimeMinute: number){
        this.hairtype = hairType;
        this.cuttingTimeHour = cuttingTimeHour;
        this.cuttingTimeMinute = cuttingTimeMinute;
    }
}
