import React from 'react';

const DocsComponent: React.FC = () => {
    return (
        <details id="components">
            <summary>Components</summary>
            <br />
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
    );
};

export default DocsComponent;
