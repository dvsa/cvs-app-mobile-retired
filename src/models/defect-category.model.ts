export class DefectCategoryModel {
    private name: string;
    private children: Object[];

    constructor(name: string, children: Object[]) {
        this.name = name;
        this.children = children;
    }

    getName(): string {
        return this.name;
    }

    getChildren(): Object[] {
        return this.children;
    }
}
