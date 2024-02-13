import React from 'react';
import './docu.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Define your custom style object
const customCppStyle = {
    'comment': {
      color: '#008000', // Dark theme comment color
    },
    'keyword': {
      color: '#569CD6', // Dark theme keyword color
    },
    'string': {
      color: '#CE9178', // Dark theme string color
    },
    'number': {
      color: '#B5CEA8', // Dark theme number color
    },
    'operator': {
      color: '#D4D4D4', // Dark theme operator color
    },
    'function': {
      color: '#DCDCAA', // Dark theme function color
    },
    'class-name': {
      color: '#4EC9B0', // Dark theme class name color
    },
    'object': {
      color: '#4EC9B0', // Dark theme object color
    },
    'pre[class*="language-"]': {
      backgroundColor: '#262626', // Dark theme background color
      padding: '20px', // Default padding
      borderRadius: '5px', // Default border radius
    },
    // Add more custom styles as needed
  };
  
  

interface DocuProps {

}

export default class Docu extends React.Component<DocuProps> {
    render() {
        return (
            <div className="mainBack">
                <h1>Welcome to the Documentation Page</h1>
                <p>Hello, I am new. This is a simple documentation page for the SpriteEngine project.</p>
                <p>Here, you can find various guides and references to help you understand and use SpriteEngine.</p>

                {/* Use the SyntaxHighlighter with custom style */}
                <SyntaxHighlighter language="cpp" style={customCppStyle}>
                    {`#include <iostream>
using namespace std;

class MyClass {
public:
    void myMethod() {
        cout << "This is my method." << endl;
    }
};

int main() {
    MyClass obj;
    obj.myMethod();
    return 0;
}`}
                </SyntaxHighlighter>
            </div>
        );
    }
}
