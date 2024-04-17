import React, { ReactNode } from 'react';
import Bottom from './bottom/bottom';
import "frontend/utils/general.css"
import { Account } from './threads/logic/model';

interface PageProps {
    children: ReactNode;
}
  
  export class Page extends React.Component<PageProps> {
    render() {
      return (
        <div>
            <div className='wrapper'>
                <div>
                    {this.props.children}
                    <div className='h-3'/>
                    <Bottom />
                </div>
            </div>
        </div>
      );
    }
  }