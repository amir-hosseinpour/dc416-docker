/**
 * Device detection utility for DC416 website
 * - Detects device type based on screen size and user agent
 * - Sets appropriate classes on HTML element
 */

(function() {
  // Device type detection
  function detectDeviceType() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;
    
    // Default to desktop
    let deviceType = 'desktop';
    
    // Check for tablets first using both size and user agent
    const isTabletByUA = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent);
    const isTabletBySize = (width <= 1024 && width > 600) || 
                          (width > height && height > 480 && height <= 1024);
    
    if (isTabletByUA || isTabletBySize) {
      deviceType = 'tablet';
    } 
    // Then check for mobile
    else if (width <= 600 || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      // Check if it's a very small mobile device
      if (width <= 320) {
        deviceType = 'tiny-mobile';
      } else {
        deviceType = 'mobile';
      }
    }
    
    // Add the appropriate class to the HTML element
    document.documentElement.classList.remove('desktop', 'tablet', 'mobile', 'tiny-mobile');
    document.documentElement.classList.add(deviceType);
    
    // Also add data attribute for potential CSS usage
    document.documentElement.setAttribute('data-device', deviceType);
    
    return deviceType;
  }
  
  // Initial detection
  const deviceType = detectDeviceType();
  console.log('Device detected:', deviceType);
  
  // Update on resize
  window.addEventListener('resize', function() {
    detectDeviceType();
  });
  
  // Also update on orientation change for mobile/tablet
  window.addEventListener('orientationchange', function() {
    detectDeviceType();
  });
})();
