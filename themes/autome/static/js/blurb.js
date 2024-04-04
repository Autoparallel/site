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

// Collect unique tags from blurbs and populate the tag select dropdown
const tagSelect = document.getElementById('tag-select');
const uniqueTags = new Set();
document.querySelectorAll('.blurb').forEach(blurb => {
    const tags = blurb.dataset.tags.split(',');
    tags.forEach(tag => uniqueTags.add(tag));
});
uniqueTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tagSelect.appendChild(option);
});

// Filter blurbs by selected tag
tagSelect.addEventListener('change', () => {
    const selectedTag = tagSelect.value;
    document.querySelectorAll('.blurb').forEach(blurb => {
        const tags = blurb.dataset.tags.split(',');
        if (selectedTag === '' || tags.includes(selectedTag)) {
            blurb.style.display = 'block';
        } else {
            blurb.style.display = 'none';
        }
    });
});