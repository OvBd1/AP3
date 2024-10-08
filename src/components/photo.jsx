import React, { useState } from 'react';
import './photo.css';
import imagesData from './images.json';

const Photo = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div>
      <div className='logo'>
        <img src="/assets/pablo-removebg.png" alt="" />
      </div>
      <div className='name'>
        <h3>Pablo ❤️ </h3>
      </div>
      <div className='title'>
        <h1>Album Photo</h1>
      </div>
      
      {/* Ajout d'un padding en haut de la section des catégories */}
      <div className="category-section">
        <div className="category-buttons">
          {imagesData.categories.map((category) => (
            <button 
              key={category.id} 
              onClick={() => handleCategoryClick(category.id)}
              className={selectedCategory === category.id ? 'selected' : ''}
            >
              <img src={category.images[0]} alt={category.name} />
              <p>{category.name}</p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Affichage des images de la catégorie sélectionnée */}
      <div className="gallery">
        {selectedCategory &&
          imagesData.categories
            .find((category) => category.id === selectedCategory)
            .images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`Catégorie ${selectedCategory}`} />
            ))
        }
      </div>
    </div>
  );
};

export default Photo;