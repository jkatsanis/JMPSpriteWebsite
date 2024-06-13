export class FilterRepository {
    public account: string;
    public labels: string[];

    constructor() {
        this.account = "";
        this.labels = [];
    }

    public reset() : void {
        this.account = "";
        this.labels = [];
    }

    public hasActiveFilter() : boolean {
        return this.account !== "" || this.labels.length !== 0; 
    } 
}

export let filterRepo:FilterRepository = new FilterRepository();