import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';
import imagesData from './images.json'; // Vérifie que le chemin est correct


const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Fonction pour sélectionner une catégorie
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <h1>Galerie de photos</h1>
      
      {/* Boutons pour sélectionner les catégories */}
      <div>
        {imagesData.categories.map((category) => (
          <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Affichage des images de la catégorie sélectionnée */}
      <div className="gallery">
        {selectedCategory &&
          imagesData.categories
            .find((category) => category.id === selectedCategory)
            .images.map((image, index) => (
              <img key={index} src={image} alt={`Catégorie ${selectedCategory}`} />
            ))
        }
      </div>
    </div>
  );
};

export default PhotoGallery;
