import React from 'react'; 
import CreateLink, { Link } from "components/link/link";
import './likewindow.css'; // Import CSS for styling

export interface LikeWindowProps
{
    imageSrc: string,
    title: string,
    description: string,
    lin: Link | null
}

export default class LikeWindow extends React.Component<LikeWindowProps>
{ 
    render()
    {

        if(this.props.lin === null)
        {
            return (
                <div className="like-window">
                    <img src={this.props.imageSrc} alt={this.props.title} />
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                </div>
            );
        }

        return (
            <div className="like-window">
                <img src={this.props.imageSrc} alt={this.props.title} />
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <CreateLink Link={this.props.lin} left={10}/>
            </div>
        );
    }
}

