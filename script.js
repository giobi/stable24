const form = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const imageContainer = document.getElementById('imageContainer');
const loadingIndicator = document.getElementById('loading');

// Extract image generation logic into a reusable function
async function generateImage() {
    const prompt = promptInput.value.trim();
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Clear previous image and show loading indicator
    imageContainer.innerHTML = '';
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(`https://giobiflare-llm24.giobi.workers.dev/image?prompt=${encodeURIComponent(prompt)}`);
        
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        // Create an image element from the response blob
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = prompt;
        img.style.maxWidth = '100%';
        img.style.border = '1px solid #333';
        img.style.borderRadius = '4px';

        imageContainer.appendChild(img);
    } catch (error) {
        console.error('Error generating image:', error);
        imageContainer.innerHTML = '<p>Failed to generate image. Please try again later.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Handle button click
document.getElementById('generateButton').addEventListener('click', generateImage);

// Handle form submission (Enter key press)
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    generateImage();
});
