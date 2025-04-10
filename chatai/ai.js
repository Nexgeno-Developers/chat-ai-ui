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
    const bgColor = thisScript?.getAttribute("data-bg-color") || "";
    const position = thisScript?.getAttribute("data-position") || "";
    const iconImage = thisScript?.getAttribute("data-icon-image") || "";

    let container = document.getElementById("nex-buddy-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "nex-buddy-container";
      document.body.appendChild(container);
    }

    const widgetHTML = `
      <style>
        #nex-buddy {
          position: fixed;
          bottom: 20px;
          ${position}: 20px;
          z-index: 100000;
        }

        #nex-buddy-icon {
          width: 60px;
          height: 60px;
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
          transition: transform 0.3s ease;
          padding: 0;
          overflow: hidden;
        }

        #nex-buddy-icon:hover {
          transform: scale(1.1);
        }

        #nex-buddy-content {
          display: none;
          position: absolute;
          bottom: 80px;
          ${position}: 0;
          width: 370px;
          height: 450px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          flex-direction: column;
        }

        #nex-buddy-content.active {
          display: flex;
        }

        #nex-buddy-iframe-container {
          flex-grow: 1;
          position: relative;
          height: calc(100% - 40px);
        }

        #nex-buddy-iframe-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        #nex-buddy-close {
          padding: 8px;
          background: #f1f1f1;
          border: none;
          cursor: pointer;
          font-weight: bold;
          width: 100%;
        }

        button#nex-buddy-icon img {
          width: 35px;
          height: 35px;
          object-fit: contain;
        }

        @media (max-width: 767px) {
          #nex-buddy-content {
            width: calc(100vw - 40px);
            height: 300px;
          }

          #nex-buddy-icon {
            width: 50px;
            height: 50px;
          }

          button#nex-buddy-icon img {
            width: 30px;
            height: 30px;
          }
        }
      </style>

      <div id="nex-buddy">
        <div id="nex-buddy-content">
          <button id="nex-buddy-close">Close</button>
          <div id="nex-buddy-iframe-container">
            <iframe src="https://nexgeno.in/" title="nex-buddy iframe"></iframe>
          </div>
        </div>
        <button id="nex-buddy-icon"><img src="${iconImage}" alt="Chat Icon" /></button>
      </div>
    `;

    container.innerHTML = widgetHTML;

    const widgetIcon = document.getElementById("nex-buddy-icon");
    const widgetContent = document.getElementById("nex-buddy-content");
    const closeBtn = document.getElementById("nex-buddy-close");

    widgetIcon.addEventListener("click", function () {
      widgetContent.classList.toggle("active");
    });

    closeBtn.addEventListener("click", function () {
      widgetContent.classList.remove("active");
    });

    document.addEventListener("click", function (e) {
      if (
        !widgetContent.contains(e.target) &&
        e.target !== widgetIcon &&
        !widgetIcon.contains(e.target)
      ) {
        widgetContent.classList.remove("active");
      }
    });

    function adjustIframeSize() {
      const iframeContainer = document.getElementById(
        "nex-buddy-iframe-container"
      );
      if (iframeContainer) {
        iframeContainer.style.height = "calc(100% - 40px)";
      }
    }

    adjustIframeSize();
    window.addEventListener("resize", adjustIframeSize);
  });
})();
