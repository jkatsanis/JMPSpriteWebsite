import React, { useState } from 'react';
import { ImageData } from 'components/threads/logic/model';

import "./image-importer.css"

interface ImageImporterProps {
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>; 
}

const ImageImporter: React.FC<ImageImporterProps> = (props) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imagesArray: ImageData[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArray.push(new ImageData(file.name, file)); // Store the File object directly
          if (imagesArray.length === files.length) {
            props.setImages(imagesArray);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <div className='inline'>
        {props.images.map((image, index) => (
          <div key={index}>
            <p className='image-item'>{image.name}</p>
          </div>
        ))}
      </div>
      <label className="default-btn">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hide the default file input
          multiple // Allow multiple file selection
        />
        Select Image
      </label>
    </div>
  );
};

export default ImageImporter;
