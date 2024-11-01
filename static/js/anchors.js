function copyLink(event, heading) {
    event.preventDefault();
    url = window.location.href.split('#')[0] + heading;

    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard: ' + url);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach(heading => {
        // Get the heading level from the tag name (h1 -> 1, h2 -> 2, etc.)
        const level = parseInt(heading.tagName.charAt(1));

        const anchor = document.createElement('a');
        anchor.className = 'anchor';
        // Repeat '#' symbol based on heading level
        anchor.textContent = '#'.repeat(level);

        if (heading.id) {
            anchor.href = `#${heading.id}`;
            anchor.addEventListener('click', (event) => copyLink(event, `#${heading.id}`));
        } else {
            anchor.href = ``;
            anchor.addEventListener('click', (event) => copyLink(event, ``));
        }

        const headingFontSize = window.getComputedStyle(heading).fontSize;
        anchor.style.fontSize = headingFontSize;
        heading.prepend(anchor);
        anchor.style.marginRight = '8px';
    });
});