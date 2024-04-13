import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import './syntax.css';
import { customCppStyle, classes, components } from './syntax-data';

interface SyntaxProps {
  code: string;
}

class SyntaxF extends React.Component<SyntaxProps> {
  render() {
    return (
      <SyntaxHighlighter className="syntax" language="cpp" style={customCppStyle}>
        {this.props.code}
      </SyntaxHighlighter>
    );
  }
}

class Syntax extends React.Component<SyntaxProps> {

  codeHighlight(code: string): string {

    let content = code;

    let highlighted: { [key: string]: boolean } = {};

    for (let i = 0; i < classes.length; i++) {
      let className = classes[i].name;
      let classColor = classes[i].color;
    
      let regex = new RegExp("\\b" + className + "\\b", "gi");
      content = content.replace(regex, (match: string) => {
        if (!highlighted[className]) {
          if(components.includes(className))
          {
            highlighted[className] = true;
          }

          return '<span class="highlight" style="color:' + classColor + ';">' + match + '</span>';
        } else {
          return match;
        }
      });
    }

    return '<div class="box">' + content + '</div>';
  }

  render() {
    let highlight = this.codeHighlight(this.props.code);

    return (
      <div dangerouslySetInnerHTML={{ __html: highlight }} />
    );
  }
}

export { Syntax, SyntaxF };
export default Syntax;
