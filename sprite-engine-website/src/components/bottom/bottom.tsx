import React, { useEffect } from 'react';
import CreateLink, { Link } from "../link/link";

import './bottom.css';
import 'utils/general.css';

interface BottomProps
{

}

export default class Bottom extends React.Component<BottomProps>
{
    render()
    {
        let engine = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis/SpriteEngineUI");
        let youtube = new Link("ressources/icons/youtube.png", "Youtube", "https://www.youtube.com/channel/UCWihpyidnoBJ4G-V2TT6bVw")
        let mit = new Link(null, "MIT License", "https://github.com/jkatsanis/SpriteEngineUI?tab=MIT-1-ov-file")

        return(
            <div className="bottom centered-div">
                <div style={{ transform: "scale(0.85)" }}>
                    <div className="inline links">
                        <CreateLink Link={engine} left={10}></CreateLink>
                        <CreateLink Link={youtube} left={10}></CreateLink>

                    </div>
        
                    <div className="copyright inline" style={{ marginBottom: "2rem" }}>
                        &copy; 2022-2024 SpriteEngine All rights reserverd.
                    </div>
                    <CreateLink Link={mit} left={0}></CreateLink>
                </div>
            </div>
        );
    }
}
