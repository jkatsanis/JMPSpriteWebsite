import React from 'react';
import './likewindow.css'; // Import CSS for styling
 
import CreateLink from "../link/link";
import {LikeWindowProps} from "../../props";

export default class LikeWindow extends React.Component<LikeWindowProps>
{
    
    render()
    {
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

