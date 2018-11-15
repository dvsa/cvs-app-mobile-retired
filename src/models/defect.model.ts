export class DefectModel {
    private name: string;
    private description: string;
    private level: string;
    private prs: boolean;
    private axle: string;
    private position: string;
    private vertical: string;
    private notes: string;
    private attachments: string[];

    constructor(name: string, description: string, level: string) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.prs = false;
        this.attachments = [];
    }

    _clone(): DefectModel {
        let clone = new DefectModel(this.name, this.description, this.level);
        clone.setPrs(this.prs);
        clone.setAxle(this.axle);
        clone.setPosition(this.position);
        clone.setVertical(this.vertical);
        clone.setNotes(this.notes);
        return clone;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getLevel(): string {
        return this.level;
    }

    getPrs(): boolean {
        return this.prs;
    }

    getAxle(): string {
        return this.axle;
    }

    getPosition(): string {
        return this.position;
    }

    getVertical(): string {
        return this.vertical;
    }

    getNotes(): string {
        return this.notes;
    }

    setPrs(selected: boolean) {
        this.prs = selected;
    }

    setAxle(axle: string) {
        this.axle = axle;
    }

    setPosition(position: string) {
        this.position = position;
    }

    setVertical(vertical: string) {
        this.vertical = vertical;
    }

    setNotes(notes: string) {
        this.notes = notes;
    }

    addAttachment(attachment: string) {
        this.attachments.push(attachment);
    }
}
