import react from 'react';
import './threads.css';

export function Threads(){
    return(
        <div className="mainBack">
            <h1 className="headerChange">Threads</h1>
            <p>Threads are the most important part of the SpriteEngine. They are used to run the game loop, which is the main loop of the game. The game loop is responsible for updating the game state and rendering the game world. In this tutorial, we will learn how to create and manage threads in the SpriteEngine.</p>
            <ThreadButton threadName="Thread" threadDescription="Thread Description" />
        </div>
    );
}

export function ThreadButton({threadName, threadDescription}){
    const handleClick = () => {
        console.log(threadDescription);
    }
    return(
        <div>
            <button className="buttonChange" title={threadName} onClick={handleClick}>{threadDescription}</button>
        </div>
    );
}