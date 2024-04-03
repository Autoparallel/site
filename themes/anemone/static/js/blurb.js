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
