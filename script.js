const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let ready = false; 
let imagesLoaded = 0; 
let totalImages = 0; 
let photosArray = []; 

// Unsplash API
const count = 30; 
const apiKey = '9t9bCWY_CyxVohP7lGl8Oq8vc-rlbtDW1wRjTHCYfzY';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++; 
    if (imagesLoaded === totalImages){
        ready = true; 
        loader.hidden = true; 
        console.log('ready =', ready);
    }
}
//  Helper function to Set Attributes on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]); 
    }
}

// Create Elements For Links & Photos, Add, to DOm 
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    photosArray.forEach((photo) => {
        //  Create <a> to link to Unsplash 
        const item = document.createElement('a'); 
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank', 

        })
        //  Create <img> for photo
        const img = document.createElement('img'); 
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description
        })
        // Event Listener, check when each is finsihed loading 
        img.addEventListener('load', imageLoaded);
        //  Put <img> inside <a>, then put both inside imageContainer element 
        item.appendChild(img); 
        imageContainer.appendChild(item); 
    }); 
}

// Get photos from Unsplash API 
async function getPhotos() {
    try {
        const response = await (fetch(apiURL));
        photosArray = await response.json(); 
        displayPhotos();
    } catch (error) {
        // Catch error
    }
}

//  Check to see if srolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
         getPhotos();
         ready = false; 
    }
})

// On Load
getPhotos();