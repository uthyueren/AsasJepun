// Stroke Order Data Fetcher
// Fetches SVG stroke order data from hanzi-writer-data-jp CDN

const STROKE_DATA_CDN = 'https://unpkg.com/@k1low/hanzi-writer-data-jp@latest';

// Cache for stroke data
const strokeCache = {};

/**
 * Fetch stroke order data for a kanji character
 * @param {string} kanji - The kanji character
 * @returns {Promise<{strokes: string[], medians: number[][][]}>}
 */
export async function fetchStrokeData(kanji) {
  if (strokeCache[kanji]) {
    return strokeCache[kanji];
  }

  try {
    const encoded = encodeURIComponent(kanji);
    const url = `${STROKE_DATA_CDN}/${encoded}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch stroke data for ${kanji}`);
    }

    const data = await response.json();
    strokeCache[kanji] = data;
    return data;
  } catch (error) {
    console.warn(`Stroke data not found for ${kanji}:`, error.message);
    return null;
  }
}

/**
 * Convert stroke path to SVG path element
 * @param {string} strokePath - SVG path data
 * @param {number} index - Stroke index
 * @param {number} totalStrokes - Total number of strokes
 * @returns {string} - SVG path element string
 */
export function strokeToSVG(strokePath, index, totalStrokes) {
  const scale = 250 / 1024;

  return `<path
    d="${strokePath}"
    fill="#000"
    stroke="#000"
    stroke-width="8"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-path stroke-${index}"
    style="transform: scale(${scale});"
    data-stroke="${index}"
  />`;
}

/**
 * Render stroke order SVG into a container element
 * @param {HTMLElement} container - Container element for SVG
 * @param {string[]} strokes - Array of SVG path strings
 */
export function renderStrokeOrderSVG(container, strokes) {
  if (!strokes || strokes.length === 0) {
    container.innerHTML = '<p class="no-stroke-data">Stroke order data not available</p>';
    return;
  }

  const scale = 250 / 1024;
  const pathsHTML = strokes.map((stroke, i) =>
    `<path
      d="${stroke}"
      fill="#000"
      stroke="#000"
      stroke-width="8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-path"
      data-stroke="${i}"
      style="opacity: 0;"
    />`
  ).join('');

  // Wrap paths in a group that scales and flips Y to convert from data coords (Y-up) to SVG coords (Y-down)
  // translate(0, 900) shifts slightly up from bottom
  container.innerHTML = `
    <svg viewBox="0 0 1024 1024" class="stroke-order-svg">
      <g transform="translate(0, 900) scale(1, -1)">
        ${pathsHTML}
      </g>
    </svg>
    <div class="stroke-order-controls">
      <button class="stroke-btn" id="stroke-prev" disabled>Prev</button>
      <span class="stroke-count" id="stroke-count">0 / ${strokes.length}</span>
      <button class="stroke-btn" id="stroke-next">Next</button>
      <button class="stroke-btn" id="stroke-play">Play</button>
    </div>
  `;
}

/**
 * Animate strokes up to a certain index
 * @param {HTMLElement} container - Container with stroke SVG
 * @param {number} currentIndex - Current stroke index to show
 */
export function showStrokeUpTo(container, currentIndex) {
  const paths = container.querySelectorAll('.stroke-path');
  paths.forEach((path, i) => {
    if (i <= currentIndex) {
      path.style.opacity = '1';
    } else {
      path.style.opacity = '0';
    }
  });

  const countEl = container.querySelector('#stroke-count');
  if (countEl) {
    countEl.textContent = `${currentIndex + 1} / ${paths.length}`;
  }

  const prevBtn = container.querySelector('#stroke-prev');
  const nextBtn = container.querySelector('#stroke-next');
  if (prevBtn) prevBtn.disabled = currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentIndex >= paths.length - 1;
}

/**
 * Play all strokes animation
 * @param {HTMLElement} container - Container with stroke SVG
 */
export function playStrokeAnimation(container, speed = 500) {
  const paths = container.querySelectorAll('.stroke-path');
  let currentIndex = 0;

  // Reset all to hidden
  paths.forEach(p => p.style.opacity = '0');

  const interval = setInterval(() => {
    if (currentIndex < paths.length) {
      paths[currentIndex].style.opacity = '1';
      const countEl = container.querySelector('#stroke-count');
      if (countEl) {
        countEl.textContent = `${currentIndex + 1} / ${paths.length}`;
      }
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

/**
 * Setup stroke order controls event listeners
 * @param {HTMLElement} container - Container with stroke SVG and controls
 */
export function setupStrokeControls(container) {
  const prevBtn = container.querySelector('#stroke-prev');
  const nextBtn = container.querySelector('#stroke-next');
  const playBtn = container.querySelector('#stroke-play');

  let currentIndex = 0;
  let totalStrokes = container.querySelectorAll('.stroke-path').length;
  let isPlaying = false;
  let playInterval = null;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showStrokeUpTo(container, currentIndex);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalStrokes - 1) {
        currentIndex++;
        showStrokeUpTo(container, currentIndex);
      }
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        // Stop playing
        clearInterval(playInterval);
        isPlaying = false;
        playBtn.textContent = 'Play';
      } else {
        // Start playing
        isPlaying = true;
        playBtn.textContent = 'Stop';
        currentIndex = 0;
        showStrokeUpTo(container, currentIndex);

        playInterval = setInterval(() => {
          currentIndex++;
          if (currentIndex >= totalStrokes) {
            clearInterval(playInterval);
            isPlaying = false;
            playBtn.textContent = 'Play';
          } else {
            showStrokeUpTo(container, currentIndex);
          }
        }, 500);
      }
    });
  }
}
