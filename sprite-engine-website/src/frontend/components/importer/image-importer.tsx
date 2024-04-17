import React, { useState } from 'react';

import "./image-importer.css"

class ImageData {
  name: string;
  data: string | ArrayBuffer | null;

  constructor(name: string, data: string | ArrayBuffer | null) {
      this.name = name;
      this.data = data;
  }
}

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
          imagesArray.push(new ImageData(file.name, e.target!.result));
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
