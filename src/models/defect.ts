export class Defect {
    private name: string;
    private description: string;
    private level: string;
    private prs: boolean;
    private axle: string;
    private position: string;
    private vertical: string;
    private notes: string;

    constructor(name: string, description: string, level: string) {
        this.name = name;
        this.description = description;
        this.level = level;
    }

    _clone(): Defect {
        var clone = new Defect(this.name, this.description, this.level);
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

    getLevel(): string {
        return this.level;
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
}