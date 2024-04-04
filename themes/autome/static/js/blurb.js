// Function to expand the blurb content
function expandBlurb(blurbId) {
    const blurb = document.getElementById(blurbId);
    if (blurb) {
        const content = blurb.querySelector('.blurb-content');
        content.style.display = 'block';
    }
}

// Check if the URL contains a blurb slug and expand the corresponding blurb
function checkURLandExpandBlurb() {
    const hash = window.location.hash.substr(1);
    if (hash) {
        expandBlurb(hash);
    }
}

// Call the function on page load
window.addEventListener('DOMContentLoaded', checkURLandExpandBlurb);

// Toggle blurb content visibility when the toggle button is clicked
document.querySelectorAll('.blurb .toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.closest('.blurb').querySelector('.blurb-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
});

// Filter blurbs by tag when a tag is clicked
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const selectedTag = tag.textContent;
        document.querySelectorAll('.blurb').forEach(blurb => {
            const tags = Array.from(blurb.querySelectorAll('.tag')).map(tag => tag.textContent);
            if (tags.includes(selectedTag)) {
                blurb.style.display = 'block';
            } else {
                blurb.style.display = 'none';
            }
        });
    });
});