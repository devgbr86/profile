// purify.js - Sanitização de HTML

export function sanitizeHTML(html) {
     return DOMPurify.sanitize(html, {
          ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'strong', 'em', 'br', 'hr', 'img', 'div', 'span'],
          ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'style', 'align']
     });
}