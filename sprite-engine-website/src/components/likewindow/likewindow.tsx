import React from 'react'; 
import CreateLink, { Link } from "components/link/link";
import './likewindow.css'; // Import CSS for styling

interface LikeWindowProps {
    imageSrc: string,
    title: string,
    description: string,
    lin: Link | null,
    onClickCallback: (() => void) | null // Callback function or null
}

export default class LikeWindow extends React.Component<LikeWindowProps> {

    handleClick = () => {
        if (this.props.onClickCallback) {
            this.props.onClickCallback(); // Call the callback function if it's provided
        }
    }

    render() {
        if (this.props.lin === null) {
            return (
                <div className="like-window" onClick={this.handleClick}>
                    <img src={this.props.imageSrc} alt={this.props.title} />
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                </div>
            );
        }

        return (
            <div className="like-window" onClick={this.handleClick}>
                <img src={this.props.imageSrc} alt={this.props.title} />
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <CreateLink Link={this.props.lin} left={10} />
            </div>
        );
    }
}
