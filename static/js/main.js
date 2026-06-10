// Copy BibTeX to clipboard (no-op while the BibTeX section is commented out)
const copyBtn = document.getElementById('copy-bibtex');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    const text = document.getElementById('bibtex-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
      this.textContent = 'Copied!';
      setTimeout(() => { this.textContent = 'Copy'; }, 2000);
    });
  });
}

// Pause videos that scroll out of view to save bandwidth/CPU
const videos = document.querySelectorAll('video');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && !entry.target.paused) {
        entry.target.pause();
      }
    });
  }, { threshold: 0.1 });
  videos.forEach((v) => observer.observe(v));
}
