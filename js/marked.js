// marked.js - Processamento de Markdown

export function parseMarkdown(markdown) {
     marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false
     });

     return marked.parse(markdown);
}