export class SelectItem {
    public value: string;
    public name: string;
    public children: Array<SelectItem>;
    public parent: SelectItem;

    constructor(source: any) {
        if (typeof source === 'string') {
            this.value = this.name = source;
        }

        if (typeof source === 'object') {
            this.value = source.value || source.name;
            this.name = source.name;

            if (source.children && source.name) {
                this.children = source.children.map((c: any) => {
                    let r: SelectItem = new SelectItem(c);
                    r.parent = this;
                    return r;
                });
                this.name = source.name;
            }
        }
    }

    public fillChildrenHash(optionsMap: Map<string, number>, startIndex: number): number {
        let i = startIndex;
        this.children.map(child => {
            optionsMap.set(child.value, i++);
        });

        return i;
    }

    public hasChildren(): boolean {
        return this.children && this.children.length > 0;
    }

    public getSimilar(): SelectItem {
        let r: SelectItem = new SelectItem(false);
        r.value = this.value;
        r.name = this.name;
        r.parent = this.parent;
        return r;
    }
}
