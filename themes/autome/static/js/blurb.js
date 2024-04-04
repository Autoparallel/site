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

// Collect unique tags from blurbs and populate the tag checkboxes
const checkboxesContainer = document.getElementById('checkboxes');
const uniqueTags = new Set();
document.querySelectorAll('.blurb').forEach(blurb => {
    const tags = blurb.dataset.tags.split(',');
    tags.forEach(tag => uniqueTags.add(tag));
});
uniqueTags.forEach(tag => {
    const checkbox = document.createElement('label');
    checkbox.innerHTML = `<input type="checkbox" value="${tag}"> ${tag}`;
    checkbox.style.paddingLeft = '5px';
    checkboxesContainer.appendChild(checkbox);
});

// Filter blurbs by selected tags
function filterBlurbsByTags() {
    const selectedTags = Array.from(checkboxesContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    document.querySelectorAll('.blurb').forEach(blurb => {
        const tags = blurb.dataset.tags.split(',');
        if (selectedTags.length === 0 || selectedTags.every(tag => tags.includes(tag))) {
            blurb.style.display = 'block';
        } else {
            blurb.style.display = 'none';
        }
    });
}
checkboxesContainer.addEventListener('change', filterBlurbsByTags);

// Show/hide checkboxes when the select box is clicked
function toggleCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}