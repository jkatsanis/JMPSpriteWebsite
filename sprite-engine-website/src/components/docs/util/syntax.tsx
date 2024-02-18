import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React from 'react';
import './syntax.css'

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
      backgroundColor: '#1E1E1E', // Dark theme background color
      padding: '20px', // Default padding
      borderRadius: '5px', // Default border radius
    },
    // Add more custom styles as needed
  };

interface SyntaxProps {
    code: string;
  }
  


export default class Syntax extends React.Component<SyntaxProps> {
  
    render() {
        return (
          <SyntaxHighlighter className="syntax" language="cpp" style={customCppStyle}>
            {this.props.code}
          </SyntaxHighlighter>
        )
    };
}