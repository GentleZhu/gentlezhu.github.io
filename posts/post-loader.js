document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('post-body');
  if (!body) return;
  const mdPath = body.getAttribute('data-md');
  if (!mdPath) return;

  fetch(mdPath)
    .then(r => {
      if (!r.ok) throw new Error(mdPath + ' (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      body.innerHTML = marked.parse(md);
      if (window.renderMathInElement) {
        renderMathInElement(body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$',   right: '$',   display: false }
          ],
          throwOnError: false
        });
      }
    })
    .catch(err => {
      body.innerHTML =
        '<p><em>Could not load ' + mdPath + ': ' + err.message + '</em></p>' +
        '<p>If you opened this file directly, run <code>python3 -m http.server</code> from the repo root and reload.</p>';
    });
});
