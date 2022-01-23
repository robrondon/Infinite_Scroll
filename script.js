const imagesContainer = document.getElementById('images-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];

// Unsplash API
const count = 30;
const photoOrientation = 'landscape';
const apiKey = 'zI6uxJXhIbFt62cEbpdXSG7m4-ofuRXTjXPS-GcHPWk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=${photoOrientation}`;

// Check images loaded
const imageLoaded = function () {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready', ready);
  }
};

// Helper function to set attributes to items
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements to display photos from photos array
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photos.length;
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

    // Check if images were loaded
    img.addEventListener('load', imageLoaded);

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
    displayPhotos();
  } catch (error) {
    // handle error
    console.log(error);
  }
};

// Check if scroll is near to bottom
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
