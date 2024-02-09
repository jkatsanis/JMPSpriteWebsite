export interface createLinkProps {
    Link: ILink;
    left: number;
}

export interface LikeWindowProps
{
    imageSrc: string,
    title: string,
    description: string,
    lin: ILink
}

export interface ILink {
    icon: string | null;
    content: string;
    website: string;
}
