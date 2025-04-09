document.addEventListener("DOMContentLoaded", function () {
  // Create main container
  const container = document.getElementById("website-widget-container");

  // Create widget structure
  const widgetHTML = `
                <style>
                    #website-widget {
                        position: fixed;
                        bottom: 0;
                        right: 20px;
                        width: 350px;
                        z-index: 1000;
                        font-family: Arial, sans-serif;
                    }
                    #widget-toggle {
                        position: absolute;
                        top: -45px;
                        right: 0;
                        width: 50px;
                        height: 50px;
                        border-radius: 50% 50% 0 0;
                        background: #4285f4;
                        color: white;
                        border: none;
                        font-size: 20px;
                        cursor: pointer;
                        box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    #widget-toggle:hover {
                        background: #3367d6;
                        transform: translateY(-5px);
                    }
                    #widget-content {
                        height: 0;
                        overflow: hidden;
                        background: white;
                        border-radius: 10px 10px 0 0;
                        box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
                        transition: height 0.4s cubic-bezier(0.65, 0, 0.35, 1);
                    }
                    #widget-content.active {
                        height: 450px;
                    }
                    #widget-iframe {
                        width: 100%;
                        height: calc(100% - 40px);
                        border: none;
                    }
                    #widget-close {
                        width: 100%;
                        padding: 10px;
                        background: #f1f1f1;
                        border: none;
                        border-top: 1px solid #ddd;
                        cursor: pointer;
                        font-weight: bold;
                    }
                    @media (max-width: 500px) {
                        #website-widget {
                            width: calc(100% - 40px);
                            right: 20px;
                            left: 20px;
                        }
                        #widget-content.active {
                            height: 60vh;
                        }
                    }
                </style>
                <div id="website-widget">
                    <button id="widget-toggle">↑</button>
                    <div id="widget-content">
                        <iframe id="widget-iframe" src="https://example.com" title="Embedded Content"></iframe>
                        <button id="widget-close">Close</button>
                    </div>
                </div>
            `;

  // Insert the widget HTML
  container.innerHTML = widgetHTML;

  // Get references to the dynamically created elements
  const toggle = document.getElementById("widget-toggle");
  const content = document.getElementById("widget-content");
  const closeBtn = document.getElementById("widget-close");
  let isOpen = false;

  // Toggle functionality
  toggle.addEventListener("click", function () {
    isOpen = !isOpen;
    if (isOpen) {
      content.classList.add("active");
      toggle.textContent = "↓";
      toggle.style.transform = "translateY(0)";
    } else {
      content.classList.remove("active");
      toggle.textContent = "↑";
    }
  });

  // Close button functionality
  closeBtn.addEventListener("click", function () {
    content.classList.remove("active");
    toggle.textContent = "↑";
    isOpen = false;
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (isOpen && !content.contains(e.target) && e.target !== toggle) {
      content.classList.remove("active");
      toggle.textContent = "↑";
      isOpen = false;
    }
  });
});
