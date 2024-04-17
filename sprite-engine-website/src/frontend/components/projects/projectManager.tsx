import {Project} from "./project";

export class ProjectManager{
    private projects: Project[];
    constructor(){
        this.projects = [];
    }
    addProject(project: Project){
        this.projects.push(project);
    }
    getProjects(){
        return this.projects;
    }
    removeProject(project: Project){
        this.projects = this.projects.filter(p => p !== project);
    }
}