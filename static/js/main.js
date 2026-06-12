// Hero video initialization
function startHero() {
  const vid = document.getElementById('bg-video');
  if (!vid) return;
  vid.play().catch(() => {});
  vid.style.opacity = 1;
}

// Smooth scroll to content (used by the hero scroll indicator)
function scrollToContent() {
  const content = document.querySelector('.main-content');
  if (content) {
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  startHero();

  // Gallery videos: play when visible, pause when scrolled away
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.gallery-video').forEach((video) => {
      video.removeAttribute('autoplay');
      videoObserver.observe(video);
    });
  }

  // Teaser figure: play once at 2x when scrolled into view, then settle on the static figure
  const teaserVideo = document.getElementById('teaser-video');
  const teaserImage = document.getElementById('teaser-image');
  if (teaserVideo && teaserImage) {
    const showStaticTeaser = () => {
      teaserVideo.style.display = 'none';
      teaserImage.style.display = 'block';
    };
    if ('IntersectionObserver' in window) {
      const teaserObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            teaserVideo.playbackRate = 2;
            teaserVideo.play().catch(showStaticTeaser);
          } else if (!teaserVideo.paused) {
            teaserVideo.pause();
          }
        });
      }, { threshold: 0.3 });
      teaserObserver.observe(teaserVideo);
      teaserVideo.addEventListener('ended', () => {
        teaserObserver.unobserve(teaserVideo);
        showStaticTeaser();
      });
    } else {
      showStaticTeaser();
    }
  }

  // Horizontal scroll buttons for overflowing galleries
  const galleries = [
    {
      sectionId: 'gallery-section-zeroshot',
      galleryInnerId: 'zeroShotGallery',
      scrollLeftBtnId: 'scrollLeftBtnZeroShot',
      scrollRightBtnId: 'scrollRightBtnZeroShot'
    },
    {
      sectionId: 'gallery-section-dynamics',
      galleryInnerId: 'dynamicsGallery',
      scrollLeftBtnId: 'scrollLeftBtnDynamics',
      scrollRightBtnId: 'scrollRightBtnDynamics'
    },
    {
      sectionId: 'gallery-section-additional',
      galleryInnerId: 'additionalTasks',
      scrollLeftBtnId: 'scrollLeftBtnAdditional',
      scrollRightBtnId: 'scrollRightBtnAdditional'
    }
  ];

  galleries.forEach((galleryConfig) => {
    const gallerySection = document.getElementById(galleryConfig.sectionId);
    if (!gallerySection) return;

    const galleryContainer = gallerySection.querySelector('.video-gallery-container');
    const galleryInner = document.getElementById(galleryConfig.galleryInnerId);
    const scrollLeftBtn = document.getElementById(galleryConfig.scrollLeftBtnId);
    const scrollRightBtn = document.getElementById(galleryConfig.scrollRightBtnId);

    if (galleryContainer && galleryInner && scrollLeftBtn && scrollRightBtn) {
      const scrollAmount = (galleryInner.firstElementChild?.offsetWidth || 300) + 15;
      scrollLeftBtn.addEventListener('click', () => {
        galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      scrollRightBtn.addEventListener('click', () => {
        galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

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
});
