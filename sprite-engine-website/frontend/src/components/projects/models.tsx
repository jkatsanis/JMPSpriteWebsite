import { URL } from "macros";
import { accountRepo } from "components/threads/logic/account-repository";
import { Account } from "components/threads/logic/model";

export interface Project {
    id: number;
    owner: string;
    title: string;
    description: string;
    filename: string;
    picture: string;
}

export const fetchProject = async (id: string | undefined, setProject: (param: Project | null) => void, setIsLoading: (param: boolean) => void) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${URL}/api/projects/byID/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching project');
        }
        
        const data: Project = await response.json();
        const acc:Account = await accountRepo.getAccountByName(data.owner);
        data.picture = acc.picture;

        setProject(data);
        setIsLoading(false);
    } catch (error) {
        console.error('Error fetching project:', error);
        setIsLoading(false);
    }
};
