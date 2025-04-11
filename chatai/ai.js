(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Get the script element that contains this code
    const scripts = document.getElementsByTagName("script");
    let thisScript = null;

    for (let i = 0; i < scripts.length; i++) {
      if (
        scripts[i].src.includes("ai.js") ||
        scripts[i].innerHTML.includes("nex-buddy-container")
      ) {
        thisScript = scripts[i];
        break;
      }
    }

    // Get customizable attributes with defaults
    const bgColor = thisScript?.getAttribute("data-bg-color") || "#005fff";
    const position = thisScript?.getAttribute("data-position") || "right";
    const iconImage = thisScript?.getAttribute("data-icon-image") || "chat.png";

    let container = document.getElementById("nex-buddy-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "nex-buddy-container";
      document.body.appendChild(container);
    }

    const widgetHTML = `
      <style>
        body {
          display: block;
          margin: 0px;
        }
        
        #nex-buddy {
          position: fixed;
          bottom: 20px;
          ${position}: 20px;
          z-index: 100000;
        }

        #nex-buddy-icon {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-color: ${bgColor};
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 0;
          overflow: hidden;
          position: relative;
        }

        #nex-buddy-icon:hover {
          transform: scale(1.1);
        }

        #nex-buddy-content {
          position: absolute;
          bottom: 0px;
          ${position}: 0;
          height: 570px;
          background: rgb(255, 255, 255);
          overflow: hidden;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px;
          width: 416px;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
          transition: 
            opacity 0.25s ease-out,
            transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
          pointer-events: none;
          display: none;
        }

        #nex-buddy-content.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          display: flex;
        }

        #nex-buddy-iframe-container {
          flex-grow: 1;
          position: relative;
          height: 100%;
        }

        #nex-buddy-iframe-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        

        button#nex-buddy-close img {
            width: 14px;
        }
        #nex-buddy-close {
            position: absolute;
            top: 20px;
            right: 10px;
            z-index: 100001;
            padding: 5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${bgColor};
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        #nex-buddy-icon.active {
          display: none;
        }

        button#nex-buddy-icon img {
          width: 30px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @media (max-width: 767px) {
          #nex-buddy-content {
            width: 100vw;
            height: 100vh;
            bottom: 0;
            ${position}: 0;
            border-radius: 0;
            transform: translateY(10%);
          }

          #nex-buddy-content.active {
            transform: translateY(0);
          }

          #nex-buddy {
            ${position}: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: ${
              position === "right" ? "flex-end" : "flex-start"
            };
            padding: 10px;
            box-sizing: border-box;
          }

          #nex-buddy-icon {
            width: 45px;
            height: 45px;
            position: relative;
            z-index: 100001;
          }

          button#nex-buddy-icon img {
            width: 23px;
          }
        }
      </style>

      <div id="nex-buddy">
        <div id="nex-buddy-content">
          <div id="nex-buddy-iframe-container">
            <button id="nex-buddy-close">
              <img src="close-icon.png" alt="Close Icon" width="20" />
            </button>
            <iframe src="https://attariclasses.in/" title="nex-buddy iframe"></iframe>
          </div>
        </div>
        <button id="nex-buddy-icon">
          <img src="${iconImage}" alt="Chat Icon" />
        </button>
      </div>
    `;

    container.innerHTML = widgetHTML;

    const widgetIcon = document.getElementById("nex-buddy-icon");
    const widgetContent = document.getElementById("nex-buddy-content");
    const closeBtn = document.getElementById("nex-buddy-close");

    widgetIcon.addEventListener("click", function () {
      widgetContent.style.display = "flex";
      // Trigger reflow to enable animation
      void widgetContent.offsetWidth;
      widgetContent.classList.add("active");
      widgetIcon.classList.add("active");
    });

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      widgetContent.classList.remove("active");
      widgetIcon.classList.remove("active");
      setTimeout(() => {
        widgetContent.style.display = "none";
      }, 300);
    });

    document.addEventListener("click", function (e) {
      if (
        !widgetContent.contains(e.target) &&
        e.target !== widgetIcon &&
        !widgetIcon.contains(e.target)
      ) {
        widgetContent.classList.remove("active");
        widgetIcon.classList.remove("active");
        setTimeout(() => {
          widgetContent.style.display = "none";
        }, 300);
      }
    });

    function adjustIframeSize() {
      const iframeContainer = document.getElementById(
        "nex-buddy-iframe-container"
      );
      if (iframeContainer) {
        iframeContainer.style.height = "100%";
      }
    }

    adjustIframeSize();
    window.addEventListener("resize", adjustIframeSize);
  });
})();
