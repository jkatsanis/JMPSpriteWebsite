export class Link {
    constructor(icon, content, website) {
      this.icon = icon;
      this.content = content;
      this.website = website;
    }
}

export function CreateLink({ Link }) {
    return (
        <div> 
            <a href={Link.website} target="_blank">
                <div style={{ display: 'inline-block' }}>
                    <img src={Link.icon} alt="Icon" style={{ width: 30, height: 30 }} />
                    <p className="link" style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '5px' }}>{Link.content}</p>
                </div>
            </a>
        </div>
    );
}