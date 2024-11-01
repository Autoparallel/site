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

// Sticky header stuff
document.addEventListener('DOMContentLoaded', () => {
    const stickyPath = document.createElement('div');
    stickyPath.className = 'sticky-path';

    const articleContent = document.querySelector('.blog-content');
    if (articleContent) {
        articleContent.insertBefore(stickyPath, articleContent.firstChild);
    }

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    function getHeadingLevel(heading) {
        return parseInt(heading.tagName.charAt(1));
    }

    function getHeadingText(heading) {
        const anchor = heading.querySelector('a.anchor');
        const anchorText = anchor ? anchor.textContent : '';
        return heading.textContent.replace(anchorText, '').trim();
    }

    function isHeadingOffScreen(heading) {
        const rect = heading.getBoundingClientRect();
        const stickyHeaderHeight = stickyPath.offsetHeight;
        return rect.top + rect.height <= stickyHeaderHeight;
    }

    function findActiveHeading() {
        // Find the last heading that has scrolled past the sticky header
        let activeHeading = null;

        for (const heading of headings) {
            if (isHeadingOffScreen(heading)) {
                activeHeading = heading;
            } else {
                // Stop when we find the first heading that hasn't scrolled past
                break;
            }
        }

        return activeHeading;
    }

    function buildPathForHeading(heading) {
        if (!heading) return [];

        const path = [heading];
        let currentLevel = getHeadingLevel(heading);

        // Look backwards through headings to find direct ancestors
        const currentIndex = headings.indexOf(heading);
        for (let i = currentIndex - 1; i >= 0; i--) {
            const ancestor = headings[i];
            const level = getHeadingLevel(ancestor);

            if (level < currentLevel) {
                path.unshift(ancestor);
                currentLevel = level;
            }
        }

        return path;
    }

    function updatePath() {
        const activeHeading = findActiveHeading();

        if (!activeHeading) {
            stickyPath.style.display = 'none';
            return;
        }

        const path = buildPathForHeading(activeHeading);

        if (path.length === 0) {
            stickyPath.style.display = 'none';
            return;
        }

        stickyPath.style.display = 'flex';
        stickyPath.innerHTML = '';

        path.forEach((heading, index) => {
            if (index > 0) {
                const separator = document.createElement('span');
                separator.className = 'path-separator';
                separator.textContent = '>';
                stickyPath.appendChild(separator);
            }

            const item = document.createElement('span');
            item.className = 'path-item';

            const marker = document.createElement('span');
            marker.className = 'marker';
            marker.textContent = '#'.repeat(getHeadingLevel(heading));

            const text = document.createElement('span');
            text.textContent = getHeadingText(heading);

            item.appendChild(marker);
            item.appendChild(text);
            stickyPath.appendChild(item);
        });
    }

    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePath();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updatePath();
});