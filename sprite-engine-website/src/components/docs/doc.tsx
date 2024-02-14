import React, { ReactNode } from 'react';

import Syntax from "./syntax"

import './documentation.css';

interface DocuProps {
  children: string;
  description: string;
}

export default class Docu extends React.Component<DocuProps> {
  render() {
    return (
      <div>
        <p className='docu-desc'> {this.props.description}</p>
        <Syntax code={this.props.children}></Syntax>
      </div>
    );  
  }
}
