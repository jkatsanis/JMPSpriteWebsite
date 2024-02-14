import React, { ReactNode } from 'react';
import Bottom from './bottom/bottom';

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
                    <Bottom />
                </div>
            </div>
        </div>
      );
    }
  }