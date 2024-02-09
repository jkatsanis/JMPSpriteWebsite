import "./link.css"
import {createLinkProps, ILink} from "../../props";
import React from "react";


export class Link implements ILink{
    content: string;
    icon: string | null;
    website: string;
    constructor(content: string, icon: string | null, website: string) {
        this.content = content;
        this.icon = icon;
        this.website = website;
    }
}
/*
    when link.icon is none it wont generate a img icon
*/
const CreateLink: React.FC<createLinkProps> = ({ Link, left }) => {

    console.log(left)   

    if(Link.icon === null)
    {  
        return (
            <div> 
                <a href={Link.website} target="_blank" rel="noreferrer">
                    <div style={{ display: 'inline-block' }}>
                        <p  className="link "> {Link.content}</p>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div> 
            <a href={Link.website} target="_blank" rel="noreferrer">
                <div style={{ display: 'inline-block' }}>
                    <img src={Link.icon} alt="Icon" style={{ width: 30, height: 30, marginLeft: left }} />
                    <p className="link-i">{Link.content}</p>
                </div>
            </a>
        </div>
    );
}
export default CreateLink;