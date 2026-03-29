(() => {
  const checkWebGL = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  };

  // ⚡ Bolt: Cache WebGL capability check to improve First Paint
  // 💡 What: Store the result of the expensive WebGL context creation in sessionStorage.
  // 🎯 Why: `canvas.getContext('webgl')` is a synchronous, expensive operation that delays rendering when executed in the `<head>`.
  // 📊 Impact: Improves First Paint (FP) and First Contentful Paint (FCP) on subsequent page loads by skipping the canvas context initialization.
  const hasWebGL = () => {
    try {
      const cached = sessionStorage.getItem('has-webgl');
      if (cached !== null) return cached === 'true';
    } catch (e) {}

    const result = checkWebGL();

    try {
      sessionStorage.setItem('has-webgl', String(result));
    } catch (e) {}

    return result;
  };

  if (!hasWebGL()) {
    document.documentElement.classList.add('no-webgl');
  }

  /**
   * ⚡ Bolt: Caching WebGL fallback state.
   * 💡 What: Added a flag to prevent multiple executions of the fallback logic.
   * 🎯 Why: querySelectorAll is expensive. The fallback only needs to remove immersive layers once. Repeated triggers (e.g., from an animation loop) would cause unnecessary DOM querying.
   */
  let webglFailed = false;
  window.addEventListener('error', (event) => {
    if (webglFailed) return;
    const msg = String(event?.message || '').toLowerCase();
    if (msg.includes('webgl') || msg.includes('three') || msg.includes('renderer')) {
      webglFailed = true;
      document.documentElement.classList.add('no-webgl');
      document.querySelectorAll('[data-immersive]').forEach((node) => node.remove());
    }
  });
})();
