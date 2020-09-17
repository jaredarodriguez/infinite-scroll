// Unsplash API
const count = 10; 
const apiKey = '9t9bCWY_CyxVohP7lGl8Oq8vc-rlbtDW1wRjTHCYfzY';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API 
async function getPhotos() {
    try {
        const response = await (fetch(apiURL));
        const data = await response.json(); 
        console.log(data);
    } catch (error) {
        // Catch error
    }
}

// On Load
getPhotos();
