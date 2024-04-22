

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
}

export let filterRepo:FilterRepository = new FilterRepository();