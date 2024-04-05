function copyLink(event, heading) {
    event.preventDefault(); // Prevent the default anchor action

    // Construct the full URL manually
    url = window.location.href.split('#')[0] + heading; // Append the slug (hash)

    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard: ' + url);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach(heading => {
        const anchor = document.createElement('a');
        anchor.className = 'anchor';
        anchor.textContent = '#';

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