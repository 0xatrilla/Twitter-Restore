// Twitter Restoration Content Script

// Twitter bird logo SVG (without fixed size - inherits from container)
function createTwitterBirdSVG(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'twitter-restored-logo');
  
  // Copy the original dimensions if provided
  if (width) svg.style.width = width;
  if (height) svg.style.height = height;
  
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', '#1DA1F2');
  path.setAttribute('d', 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z');
  
  g.appendChild(path);
  svg.appendChild(g);
  
  return svg;
}

// Track if we're currently updating to prevent infinite loops
let isUpdating = false;

// Debounce timer
let debounceTimer = null;

// Function to replace X logo with Twitter bird - ONLY header logo
function replaceLogos() {
  if (isUpdating) return;
  
  isUpdating = true;
  
  try {
    // ONLY replace the main header logo at the top
    const headerLogoContainer = document.querySelector('h1[role="heading"]');
    if (headerLogoContainer) {
      const svg = headerLogoContainer.querySelector('svg:not(.twitter-restored-logo)');
      if (svg && svg.parentElement && svg.isConnected) {
        try {
          // Get the original dimensions and classes
          const computedStyle = window.getComputedStyle(svg);
          const width = computedStyle.width;
          const height = computedStyle.height;
          
          // Create new Twitter bird with same dimensions
          const newSvg = createTwitterBirdSVG(width, height);
          
          // Copy all classes from original
          Array.from(svg.classList).forEach(c => newSvg.classList.add(c));
          newSvg.classList.add('twitter-restored-logo');
          
          // Replace the SVG
          svg.replaceWith(newSvg);
        } catch (e) {
          console.error('Error replacing header logo:', e);
        }
      }
    }
    
    // DON'T replace sidebar logos - use CSS instead to avoid breaking the navigation
  } catch (error) {
    console.error('Error replacing logos:', error);
  } finally {
    isUpdating = false;
  }
}

// Function to replace page title
function replaceTitle() {
  if (document.title && (document.title.includes('X') || document.title.includes('/ X'))) {
    document.title = document.title.replace(/\/ X/g, '/ Twitter').replace(/^X /, 'Twitter ');
  }
}

// Function to change "Post" button text to "Tweet"
function replacePostWithTweet() {
  try {
    // Primary buttons inside composer
    const postButtons = document.querySelectorAll('[data-testid="tweetButton"], [data-testid="tweetButtonInline"]');
    postButtons.forEach(button => {
      button.querySelectorAll('span').forEach(span => {
        if (span.textContent.trim() === 'Post' && !span.classList.contains('twitter-restored-text')) {
          span.textContent = 'Tweet';
          span.classList.add('twitter-restored-text');
        }
      });
    });

    // Sidebar compose button
    const sidebarCompose = document.querySelector('a[href="/compose/post"], a[href="/compose/tweet"]');
    if (sidebarCompose) {
      sidebarCompose.querySelectorAll('span').forEach(span => {
        if (span.textContent.trim() === 'Post' && !span.classList.contains('twitter-restored-text')) {
          span.textContent = 'Tweet';
          span.classList.add('twitter-restored-text');
        }
      });
    }
  } catch (error) {
    console.error('Error replacing Post with Tweet:', error);
  }
}

// Replace X Premium branding with Twitter Blue/Blue
function replacePremiumBranding() {
  try {
    // 1) Sidebar nav item: change "Premium" -> "Blue" and swap icon to bird
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const text = link.textContent?.trim();
      if (!text) return;
      if (text === 'Premium' || text === 'X Premium' || text === 'Premium+' || text === 'X Premium+') {
        // Update visible text nodes inside the link
        link.querySelectorAll('span').forEach(span => {
          const t = span.textContent?.trim();
          if (!t) return;
          if (t === 'Premium' || t === 'X Premium' || t === 'Premium+' || t === 'X Premium+') {
            span.textContent = t.includes('X') ? 'Twitter Blue' : 'Blue';
          }
        });

        // Replace leading SVG with bird
        const svg = link.querySelector('svg');
        if (svg && !svg.classList.contains('twitter-restored-logo')) {
          const computedStyle = window.getComputedStyle(svg);
          const width = computedStyle.width;
          const height = computedStyle.height;
          const newSvg = createTwitterBirdSVG(width, height);
          Array.from(svg.classList).forEach(c => newSvg.classList.add(c));
          newSvg.classList.add('twitter-restored-logo');
          try { svg.replaceWith(newSvg); } catch {}
        }
      }
    });

    // 2) Headings/banners that say "X Premium" → "Twitter Blue"
    const candidates = document.querySelectorAll('h1, h2, h3, h4, h5, h6, strong, b, span, div, a, button');
    candidates.forEach(el => {
      const txt = el.textContent;
      if (!txt) return;
      let replaced = false;
      if (txt.includes('X Premium')) {
        el.textContent = txt.replace(/X\s*Premium\+?/g, 'Twitter Blue');
        replaced = true;
      }
      if (!replaced && /(^|\b)Premium\+?($|\b)/.test(txt)) {
        // Avoid replacing paragraphs; only short labels/titles
        if (txt.trim().length <= 30) {
          el.textContent = txt.replace(/Premium\+?/g, 'Blue');
        }
      }
    });
  } catch (e) {
    // no-op
  }
}

// Replace generic brand phrases like "Live on X" → "Live on Twitter"
function replaceBrandPhrases() {
  try {
    const rules = [
      [/\bLive on X\b/g, 'Live on Twitter'],
      [/\bHappening on X\b/g, 'Happening on Twitter'],
      [/\bTrending on X\b/g, 'Trending on Twitter'],
      [/\bon X\b/g, 'on Twitter']
    ];

    const applyToTextNodes = (root) => {
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walker.nextNode())) {
        const val = node.nodeValue;
        if (!val) continue;
        let next = val;
        for (const [re, rep] of rules) next = next.replace(re, rep);
        if (next !== val) node.nodeValue = next;
      }
    };

    // Limit scope to sidebars and headings to keep this cheap and safe
    const scopes = [
      document.querySelector('aside'),
      ...document.querySelectorAll('[role="complementary"]'),
      ...document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ];
    scopes.forEach(applyToTextNodes);
  } catch {}
}

// Simple splash overlay to cover the default X splash while the app hydrates
// (splash overlay removed by user request)

// Function to change favicon (only run once)
let faviconReplaced = false;
function replaceFavicon() {
  if (faviconReplaced) return;

  try {
    // Real Twitter bird (SVG) as data URL
    const birdPath = 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#1DA1F2"/><path fill="#FFFFFF" d="${birdPath}"/></svg>`;
    const svgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);

    // Remove all existing icons (icon/shortcut icon/apple-touch-icon)
    document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]').forEach(n => n.remove());

    // Add SVG favicon (crisp in most browsers)
    const linkSvg = document.createElement('link');
    linkSvg.rel = 'icon';
    linkSvg.type = 'image/svg+xml';
    linkSvg.href = svgUrl;
    document.head.appendChild(linkSvg);

    // Fallback PNG sizes generated from the SVG
    const sizes = [16, 32];
    sizes.forEach(size => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = size; c.height = size;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const pngUrl = c.toDataURL('image/png');
        const l = document.createElement('link');
        l.rel = 'icon';
        l.type = 'image/png';
        l.sizes = `${size}x${size}`;
        l.href = pngUrl;
        document.head.appendChild(l);
      };
      img.src = svgUrl;
    });

    faviconReplaced = true;
  } catch (error) {
    console.error('Error replacing favicon:', error);
  }
}

// Debounced update function
function debouncedUpdate() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    replaceLogos();
    replaceTitle();
    replacePostWithTweet();
    replacePremiumBranding();
    replaceBrandPhrases();
  }, 100); // Wait 100ms after last mutation before updating
}

// Force color overrides for inline styles
function forceColorChanges() {
  if (isUpdating) return;
  
  try {
    // Find all elements with black backgrounds that should be blue
    const blackButtons = document.querySelectorAll('button, div[role="button"], a[role="link"]');
    
    blackButtons.forEach(elem => {
      const style = window.getComputedStyle(elem);
      const bgColor = style.backgroundColor;
      
      // If background is black (rgb(0, 0, 0)), change it to Twitter blue
      if (bgColor === 'rgb(0, 0, 0)' || bgColor === 'rgb(15, 20, 25)') {
        // Check if it's a primary action button
        const testIds = ['tweetButton', 'tweetButtonInline', 'follow', 'subscribe'];
        const hasActionTestId = testIds.some(id => elem.getAttribute('data-testid')?.includes(id));
        
        if (hasActionTestId || elem.matches('[data-testid*="follow"]')) {
          elem.style.setProperty('background-color', '#1DA1F2', 'important');
          elem.style.setProperty('border-color', '#1DA1F2', 'important');
        }
      }
    });
    
    // Force blue color on links
    const links = document.querySelectorAll('a[role="link"] span');
    links.forEach(span => {
      const color = window.getComputedStyle(span).color;
      if (color === 'rgb(29, 155, 240)' || color === 'rgb(0, 0, 0)') {
        span.style.setProperty('color', '#1DA1F2', 'important');
      }
    });
  } catch (error) {
    console.error('Error forcing color changes:', error);
  }
}

// Initialize restoration
function init() {
  // Run as early as possible with microtasks to avoid layout thrash
  Promise.resolve().then(() => {
    replaceLogos();
    replaceTitle();
    replaceFavicon();
    replacePostWithTweet();
    replacePremiumBranding();
    replaceBrandPhrases();
  });

  // Force favicon change after a short delay to ensure it overrides
  setTimeout(() => {
    if (!faviconReplaced) replaceFavicon();
  }, 200);
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// MutationObserver tuned to header logo, navigation, and composer changes
const observer = new MutationObserver((mutations) => {
  if (isUpdating) return;

  const isRelevantNode = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (el.matches?.('h1[role="heading"], nav[role="navigation"], a[href="/compose/post"], [data-testid="tweetButton"], [data-testid="tweetButtonInline"]')) return true;
    if (el.querySelector?.('h1[role="heading"], nav[role="navigation"], a[href="/compose/post"], [data-testid="tweetButton"], [data-testid="tweetButtonInline"]')) return true;
    return false;
  };

  for (const m of mutations) {
    if (m.type === 'childList') {
      for (const n of m.addedNodes) {
        if (isRelevantNode(n)) {
          debouncedUpdate();
          return;
        }
      }
    }
    if (m.type === 'attributes' || m.type === 'characterData') {
      const t = m.target;
      if (isRelevantNode(t) || isRelevantNode(t?.parentElement)) {
        debouncedUpdate();
        return;
      }
    }
  }
});

// Start observing (only watch for added nodes, not all changes)
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'aria-label', 'role', 'href']
  });
} else {
  // If body doesn't exist yet, wait for it
  const bodyObserver = new MutationObserver(() => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'aria-label', 'role', 'href']
      });
      bodyObserver.disconnect();
    }
  });
  bodyObserver.observe(document.documentElement, { childList: true });
}

// Short booster interval for the first 10 seconds to catch late mounts
let boosterMs = 0;
const booster = setInterval(() => {
  boosterMs += 200;
  if (!isUpdating) {
    replaceLogos();
    replaceTitle();
    replacePostWithTweet();
    replacePremiumBranding();
    replaceBrandPhrases();
  }
  if (boosterMs >= 10000) clearInterval(booster);
}, 200);

// Also check when tab becomes visible
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !isUpdating) {
    setTimeout(() => {
      replaceLogos();
      replaceTitle();
      replacePostWithTweet();
      replacePremiumBranding();
      replaceBrandPhrases();
    }, 500);
  }
});

console.log('Twitter Restoration extension loaded! 🐦');

