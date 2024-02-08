import "./link.css"

export class Link {
    constructor(icon, content, website) {
      this.icon = icon;
      this.content = content;
      this.website = website;
    }
}

/*
    when link.icon is none it wont generate a img icon
*/
export function CreateLink({ Link }) {

    if(Link.icon == "none")
    {  
        return (
            <div> 
                <a href={Link.website} target="_blank">
                    <div style={{ display: 'inline-block' }}>
                        <p  className="link "> {Link.content}</p>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div> 
            <a href={Link.website} target="_blank">
                <div style={{ display: 'inline-block' }}>
                    <img src={Link.icon} alt="Icon" style={{ width: 30, height: 30 }} />
                    <p className="link-i">{Link.content}</p>
                </div>
            </a>
        </div>
    );
}