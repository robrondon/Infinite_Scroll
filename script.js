const imagesContainer = document.getElementById('images-container');
const loader = document.getElementById('loader');

let photos = [];

// Unsplash API
const count = 10;
const photoOrientation = 'landscape';
const apiKey = 'zI6uxJXhIbFt62cEbpdXSG7m4-ofuRXTjXPS-GcHPWk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=${photoOrientation}`;

// Helper function to set attributes to items
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements to display photos from photos array
const displayPhotos = function () {
  photos.forEach((photo) => {
    // Create <a> element to link with unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img>
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Add <a> and <img> to imagesContainer
    item.appendChild(img);
    imagesContainer.appendChild(item);
  });
};

// Get photos from Unsplash
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    console.log(photos);
    displayPhotos();
  } catch (error) {
    // handle error
    console.log(error);
  }
};

// On load
getPhotos();
