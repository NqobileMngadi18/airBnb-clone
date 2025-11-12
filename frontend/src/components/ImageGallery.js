import React, { useState } from 'react';
import './ImageGallery.css';

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <div className="no-images">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="image-gallery">
        <div className="main-image-container">
          <img
            src={images[0]}
            alt="Main property view"
            className="main-image"
            onClick={() => handleImageClick(0)}
          />
        </div>

        <div className="thumbnail-grid">
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              className="thumbnail-container"
              onClick={() => handleImageClick(index + 1)}
            >
              <img
                src={image}
                alt={`Property view ${index + 2}`}
                className="thumbnail-image"
              />
              {index === 3 && images.length > 5 && (
                <div className="more-images-overlay">
                  <span>+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size images */}
      {showModal && (
        <div className="image-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>
              ×
            </button>

            <button className="nav-button prev" onClick={prevImage}>
              ←
            </button>

            <img
              src={images[selectedImage]}
              alt={`Property view ${selectedImage + 1}`}
              className="modal-image"
            />

            <button className="nav-button next" onClick={nextImage}>
              →
            </button>

            <div className="image-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
