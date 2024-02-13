import React from 'react';
import './docu.css';
import Syntax from "./syntax"

interface DocuProps {

}

export default class Docu extends React.Component<DocuProps> {

    

    render() {
        const codeSnippet = `#include <iostream>
using namespace std;
        
class MyClass {
public:
    void myMethod() {
        cout << "This is my method." << endl;
    }
};`;
        return (
            <div className="mainBack">
                <h1>Welcome to the Documentation Page</h1>
                <p>Hello, I am new. This is a simple documentation page for the SpriteEngine project.</p>
                <p>Here, you can find various guides and references to help you understand and use SpriteEngine.</p>

                <Syntax code={codeSnippet} />

            </div>
        );
    }
}
