import React, { ReactNode } from 'react';
import Syntax from "./syntax";

import '../documentation.css';
import 'frontend/utils/general.css'
import './doc.css'

interface DocuProps {
  children: string;
  description: string;
}

export class Docu extends React.Component<DocuProps> {
  render() {
    return (
      <div>
        <p className='docu-desc'> {this.props.description}</p>
        <Syntax code={this.props.children}></Syntax>
      </div>
    );  
  }
}

interface BigDocuProps {
  title: string;
  children: ReactNode;
}

export class BigDocu extends React.Component<BigDocuProps> {
  render() {
    return (
      <div className='big-docu'>
        <div className="second-color">
            <h5>{this.props.title}</h5>
            <div className="description">
              {this.props.children}
              <br/>
            </div>
        </div>
        <div className='h-1'/>
      </div>
    );
  }
}