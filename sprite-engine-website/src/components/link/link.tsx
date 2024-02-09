import React from "react";
import "./link.css"


export class Link {
    content: string;
    icon: string | null;
    website: string;
    constructor(icon : string | null, content : string, website: string) {
        this.content = content;
        this.icon = icon;
        this.website = website;
    }
}

export interface LinkProps {
    Link: Link;
    left: number;
}

/*
    when link.icon is none it wont generate a img icon
*/
export default class CreateLink extends React.Component<LinkProps>
{
    render()
    {
        const ref : Link = this.props.Link;

        console.log(ref);

        if(ref.icon === null)
        {  
            return (
                <div> 
                    <a href={ref.website} target="_blank" rel="noreferrer">
                        <div style={{ display: 'inline-block' }}>
                            <p  className="link "> {ref.content}</p>
                        </div>
                    </a>
                </div>
            );
        }
        
        return (
            <div> 
                <a href={ref.website} target="_blank" rel="noreferrer">
                    <div style={{ display: 'inline-block' }}>
                        <img src={ref.icon} alt="Icon" style={{ width: 30, height: 30, marginLeft: this.props.left }} />
                        <p className="link-i">{ref.content}</p>
                    </div>
                </a>
            </div>
        );
    }
}

