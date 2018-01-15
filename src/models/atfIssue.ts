export class ATFIssue {
    private time: Date;
    private reason: string;
    private notes: string;
    private actionTaken: string;
    private resolved: boolean;

    constructor(){
        this.time = new Date();
    }
}