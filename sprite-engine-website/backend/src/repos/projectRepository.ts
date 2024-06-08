import {Account, DB, Project} from "../model";
export class ProjectRepository {
    private dbPath: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    public async getAllProjects(){
        return await DB.select<Project>(`SELECT * FROM projects`, this.dbPath);
    }

    public async getProject(id:number){
        return await DB.select<Project>(`SELECT * FROM projects where id='${id}'`, this.dbPath);
    }

    public async insertProject(pro: Project) {
        return await DB.run(`INSERT INTO projects (owner, title, description) VALUES ('${pro.owner}', '${pro.title}', '${pro.description}')`, this.dbPath);
    }
}
