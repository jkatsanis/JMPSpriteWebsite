import React, { useState } from 'react';
import SearchComponent from './search';
import EditorDocs, { handleClickEditor } from './engine/docs-editor';
import { Page } from 'components/page';
import LikeWindow from 'components/likewindow/likewindow';

import 'components/bottom/bottom.css';
import './documentation.css';
import 'utils/general.css';

interface DocuProps {}

const Docu: React.FC<DocuProps> = () => {

    return (
        <Page>
            <div className='docs'>
                <div className="centered-div-content-left-70">
                    <div>
                        <div className='h-3'/>                    
                        <h3>Any questions?</h3>
                        <hr/>
                        <p>
                            Feel free to connect with us on Discord using the username <b>gameengine</b> for any queries or assistance. I'm always happy to help :=)
                        </p>
                        <div className='h-3'/>
                        <h3>Welcome</h3>
                        <hr/>
                        <p>
                            Welcome to the SpriteEngine documentation! Whether you're a beginner or an experienced developer, 
                            this page is designed to provide you with comprehensive guides and references for
                            utilizing the SpriteEngine in your 2D game development projects.
                        </p>
                        <div className='h-3'/>                        

                        <SearchComponent/>
                    
                        <div className='h-3'/>
                        <div className="like-windows-container">
                            <LikeWindow
                                imageSrc="ressources/pictures/c++.png"
                                title="The editor"
                                description="Delve into our 2D C++ engine and kickstart your game development journey with our easy guide and start creating your first game!"
                                lin={null} 
                                onClickCallback={handleClickEditor}/>
                            <LikeWindow
                                imageSrc="ressources/pictures/c++.png"
                                title="Components"
                                description="Explore the key components of our 2D C++ engine and ignite your creativity in game design!"
                                lin={null}
                                onClickCallback={null} />
                            <LikeWindow
                                imageSrc="ressources/pictures/c++.png"
                                title="Namespace (spe::)"
                                description="Experience the efficiency of our spe:: namespace and simplify your game development process with ease!"
                                lin={null} 
                                onClickCallback={null}/>
                        </div>
                        <div className='h-3'/>

                        <EditorDocs/>

                        <details>
                            <summary>Components</summary>
                            <br/>
                            <details>
                                <summary>Collider</summary>
                            </details>

                            <details>
                                <summary>Animation</summary>
                            </details>

                            <details>
                                <summary>Prefab</summary>
                            </details>

                            <details>
                                <summary>Transform</summary>    
                            </details>

                            <details>
                                <summary>Sprite Renderer</summary>
                            </details>

                            <details>
                                <summary>Physics</summary>
                            </details>
                        </details>

                        <details>
                            <summary>SpriteEngine namespace</summary>
                        </details>
                        
                    </div>
                </div>
            </div>
        </Page>

        
    );
};

export default Docu;
