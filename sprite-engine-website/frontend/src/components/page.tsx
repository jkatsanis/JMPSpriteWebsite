import React, { ReactNode } from 'react';
import Bottom from './bottom/bottom';
import "utils/general.css"

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