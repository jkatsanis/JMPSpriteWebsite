export class Project{
    private name: string;
    private description: string;
    constructor(name: string, description: string, id: number){
        this.name = name;
        this.description = description;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
}