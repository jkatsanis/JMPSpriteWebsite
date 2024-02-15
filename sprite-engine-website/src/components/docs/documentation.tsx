import React from 'react';
import SearchComponent from './search';
import EditorDocs from './engine/docs-editor';
import { Page } from 'components/page';

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
