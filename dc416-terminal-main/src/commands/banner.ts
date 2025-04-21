import command from '../../config.json' assert {type: 'json'};

const createBanner = () : string[] => {
  const banner : string[] = [];
  banner.push("<br>")
  
  // Check screen sizes with new tablet breakpoint
  const isTabletScreen = window.innerWidth <= 1024 && window.innerWidth > 600;
  const isMobileScreen = window.innerWidth <= 600 && window.innerWidth > 320;
  const isVerySmallScreen = window.innerWidth <= 320;
  
  // Use appropriate ASCII art based on screen size
  let asciiArt;
  if (isVerySmallScreen) {
    // For very small screens, use tiny ASCII
    asciiArt = command.tinyAscii;
  } else if (isMobileScreen) {
    // For mobile screens, use mobile ASCII
    asciiArt = command.mobileAscii;
  } else {
    // For tablet and desktop, use the full ASCII art
    asciiArt = command.ascii;
  }
  
  // Add a container div with appropriate class
  const containerClass = isVerySmallScreen ? 'ascii-art-container tiny-view' : 
                         isMobileScreen ? 'ascii-art-container mobile-view' :
                         isTabletScreen ? 'ascii-art-container tablet-view' : 'ascii-art-container';
  
  // Add a wrapper to better control scaling
  banner.push(`<div class="${containerClass}" style="display:block;overflow:hidden;">`);
  
  asciiArt.forEach((ele) => {
    let bannerString = "";
    //this is for the ascii art
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === " ") {
        bannerString += "&nbsp;";
      } else {
        bannerString += ele[i];
      }
    }
    
    // Add class for extra bold styling
    let eleToPush = `<pre class="extra-bold">${bannerString}</pre>`;
    banner.push(eleToPush);
  });
  
  banner.push('</div>');
  banner.push("<br>");
  
  // Different message based on screen size
  if (isVerySmallScreen) {
    banner.push("Type <span class='command'>'help'</span> for commands");
  } else if (isMobileScreen) {
    banner.push("Type <span class='command'>'help'</span> for commands list");
  } else if (isTabletScreen) {
    banner.push("Welcome to WebShell");
    banner.push("Type <span class='command'>'help'</span> for available commands.");
  } else {
    banner.push("Welcome to WebShell v1.0.0");
    banner.push("Type <span class='command'>'help'</span> for a list of all available commands.");
    banner.push(`Type <span class='command'>'repo'</span> to view the GitHub repository or click <a href='${command.repoLink}' target='_blank'>here</a>.`);
  }
  
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();

// Add resize listener to update banner when window is resized
window.addEventListener('resize', () => {
  // Simplified resize handling
});
