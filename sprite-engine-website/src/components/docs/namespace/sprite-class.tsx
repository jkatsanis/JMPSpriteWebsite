import React, { Component } from 'react';
import { BigDocu } from '../util/doc';
import Syntax from '../util/syntax';

class SpriteClass extends React.Component {
  render() {

    return (
      <details id="sprite-docs">
        <summary>Sprite</summary>
        <hr/>
        <BigDocu title='Properties'>
          <div>
              <p>
                The name of the sprite. It's unique so you can't have duplicats
              </p>
              <Syntax code="std::string Name;"></Syntax>

              <p>
                The tag of the sprite, multiple sprites can have the same tag, so you can get a specifc group of sprites.
              </p>
              <Syntax code="std::string Tag;"></Syntax>
          </div>
        </BigDocu>


        <BigDocu title='Components'>
          <div>
            <p>The sprite renderer component.</p>
            <Syntax code="spe::SpriteRenderer SpriteRenderer;"></Syntax>

            <p>The box collider component.</p>
            <Syntax code="spe::BoxCollider Collider;"></Syntax>

            <p>The physics body component.</p>
            <Syntax code="spe::PhysicsBody Physicsbody;"></Syntax>

            <p>The transform component.</p>
            <Syntax code="spe::Transform Transform;"></Syntax>

            <p>The animator component.</p>
            <Syntax code="spe::Animator Animator;"></Syntax>

            <p>The prefab component.</p>
            <Syntax code="spe::Prefab Prefab;"></Syntax>

            <p>The light component.</p>
            <Syntax code="spe::Light Light;"></Syntax>
          </div>
        </BigDocu>

        <BigDocu title='Constructor'>
          <div>
            <p>Default constructor for Sprite class.</p>
            <Syntax code="Sprite();"></Syntax>

            <p>Constructor with parameters for Sprite class.</p>
            <Syntax code="Sprite(std::string name, spe::Vector2 spawnPosition, std::string path, spe::LightRepository&amp; lightrepo);"></Syntax>

            <p>Copy constructor for Sprite class.</p>
            <Syntax code="Sprite(spe::Sprite&amp; rhs);"></Syntax>

            <p>Destructor for Sprite class.</p>
            <Syntax code="~Sprite();"></Syntax>
          </div>
        </BigDocu>

        <BigDocu title='Functions'>
          <div>
          <p>Sets the ID of the sprite.</p>
            <Syntax code="void SetId(const int32_t id) noexcept;"></Syntax>

            <p>Gets the sprite.</p>
            <Syntax code="sf::Sprite&amp; GetSprite();"></Syntax>

            <p>Gets the texture.</p>
            <Syntax code="sf::Texture&amp; GetTexture();"></Syntax>

            <p>Clears the parent data.</p>
            <Syntax code="void ClearParentData();"></Syntax>

            <p>Clears all the children.</p>
            <Syntax code="void ClearAllChilds();"></Syntax>

            <p>Sets the parent sprite.</p>
            <Syntax code="void SetParent(spe::Sprite* parent);"></Syntax>

            <p>Removes a child sprite.</p>
            <Syntax code="void RemoveChild(const spe::Sprite* child);"></Syntax>

            <p>Gets the parent ID.</p>
            <Syntax code="int32_t GetParentId() const noexcept;"></Syntax>

            <p>Sets the sprite texture from the file path.</p>
            <Syntax code="void SetSpriteTexture(const std::string&amp; path);"></Syntax>

            <p>Sets the sprite texture from an existing texture and a file path.</p>
            <Syntax code="void SetSpriteTexture(const sf::Texture&amp; texture, const std::string&amp; path);"></Syntax>

            <p>Sets the sprite texture from the file path and scale.</p>
            <Syntax code="void SetSpriteTexture(const std::string&amp; path, const spe::Vector2&amp; scale);"></Syntax>

            <p>Gets the absolute parent node.</p>
            <Syntax code="spe::Sprite* GetNode();"></Syntax>

            <p>Gets the ID of the sprite.</p>
            <Syntax code="int32_t GetId() const;"></Syntax>

            <p>Checks if the sprite is a parent.</p>
            <Syntax code="bool IsParent() const;"></Syntax>

            <p>Checks if the sprite contains a specific child.</p>
            <Syntax code="bool ContainsChild(const spe::Sprite* child) const;"></Syntax>

            <p>Checks if the sprite contains a child with a specific name.</p>
            <Syntax code="bool ContainsChild(const ImGuiTextFilter&amp; name) const;"></Syntax>

            <p>Gets the parent ID.</p>
            <Syntax code="int GetParentId() const noexcept;"></Syntax>

            <p>Gets the path of the texture file.</p>
            <Syntax code="const std::string&amp; getPathOfTextureFile() const;"></Syntax>
          </div>
        </BigDocu>  

      </details>
    );
  }
}

export default SpriteClass;
