import React, { Component } from 'react';
import { BigDocu } from '../util/doc';
import Syntax from '../util/syntax';

class SpriteClass extends React.Component {
  render() {

    return (
      <details>
        <summary>Sprite</summary>
        <hr/>
        <BigDocu title='Sprite'>
          <p>
              <p>
                The name of the sprite. It's unique so you can't have duplicats
              </p>
              <Syntax code="public std::string Name;"></Syntax>

              <p>
                The tag of the sprite, multiple sprites can have the same tag, so you can get a specifc group of sprites.
              </p>
              <Syntax code="public std::string Tag;"></Syntax>
          </p>
        </BigDocu>
      </details>
    );
  }
}

export default SpriteClass;
