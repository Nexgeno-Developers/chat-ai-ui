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

    // Create audio elements for notification sounds
    const notificationSound = new Audio();
    notificationSound.src = "audio1.mp3";
    notificationSound.volume = 0.3;

    const closeSound = new Audio();
    closeSound.src = "audio1.mp3";
    closeSound.volume = 0.3;

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
          z-index: 999999;
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
            width: 18px;
        }
        #nex-buddy-close {
            position: absolute;
            top: 20px;
            right: 36px;
            z-index: 100001;
            padding: 5px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 1px solid #e5e7eb;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            background: #fff;
        }

        #nex-buddy-close:hover {
            background:${bgColor};
            border: 1px solid ${bgColor};
        }
        #nex-buddy-close:hover img{
            filter: brightness(0) invert(1);
        }

            
        #nex-buddy-icon.active {
          display: none;
        }

        button#nex-buddy-icon img {
          width: 30px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        #nex-buddy-message {
          position: fixed;
          bottom: 90px;
          ${position}: 20px;
          background: white;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          max-width: 250px;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        #nex-buddy-message-text {
          margin-right: 20px;
          text-align: center;
        }

        #nex-buddy-message-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 12px;
          right: 7px;
          width: 20px;
          height: 20px;
        }

        #nex-buddy-message-close img {
          width: 14px;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        #nex-buddy-message-close:hover img {
          opacity: 1;
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
            position: relative !important;
            z-index: 100001 ;
          }

          button#nex-buddy-icon img {
            width: 23px;
          }

          #nex-buddy-message {
            right: 12px;
            bottom: 65px;
            max-width: calc(100% - 40px);
          }
        }
      </style>

      <div id="nex-buddy">
        <div id="nex-buddy-content">
          <div id="nex-buddy-iframe-container">
            <button id="nex-buddy-close">
              <img src="https://ai.rajeshdeshmukh.co.uk/chatjs/close-icon3.png" alt="Close Icon" width="20" />
            </button>
            <iframe src="https://ai.rajeshdeshmukh.co.uk/" title="nex-buddy iframe"></iframe>
          </div>
        </div>
        <button id="nex-buddy-icon">
          <img src="${iconImage}" alt="Chat Icon" />
        </button>
        <div id="nex-buddy-message">
          <div id="nex-buddy-message-text">Hello, Can I help you?</div>
          <button id="nex-buddy-message-close">
            <img src="https://ai.rajeshdeshmukh.co.uk/chatjs/close-icon2.png" alt="Close" />
          </button>
        </div>
      </div>
    `;

    container.innerHTML = widgetHTML;

    const widgetIcon = document.getElementById("nex-buddy-icon");
    const widgetContent = document.getElementById("nex-buddy-content");
    const closeBtn = document.getElementById("nex-buddy-close");
    const message = document.getElementById("nex-buddy-message");
    const messageCloseBtn = document.getElementById("nex-buddy-message-close");
    const messageText = document.getElementById("nex-buddy-message-text");

    // Check if message was permanently closed
    const messageClosed =
      localStorage.getItem("nexBuddyMessageClosed") === "true";

    // Show message when chat is closed
    function showMessage() {
      if (!messageClosed) {
        message.style.display = "flex";
        try {
          notificationSound.currentTime = 0;
          notificationSound.play();
        } catch (e) {
          console.log("Notification sound error:", e);
        }
      }
    }

    // Hide message when chat is opened
    function hideMessage() {
      message.style.display = "none";
    }

    // Show message after 2 seconds if not permanently closed
    if (!messageClosed) {
      setTimeout(showMessage, 2000);
    }

    function openChat() {
      widgetContent.style.display = "flex";
      void widgetContent.offsetWidth;
      widgetContent.classList.add("active");
      widgetIcon.classList.add("active");
      hideMessage();
    }

    function closeChat() {
      widgetContent.classList.remove("active");
      widgetIcon.classList.remove("active");
      setTimeout(() => {
        widgetContent.style.display = "none";
      }, 300);
    }

    widgetIcon.addEventListener("click", openChat);

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeChat();
    });

    // Remove the click handler for the message since we don't want it to open chat
    message.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent any click events from bubbling
    });

    messageCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      try {
        closeSound.currentTime = 0;
        closeSound.play();
      } catch (e) {
        console.log("Close sound error:", e);
      }
      // Set flag in localStorage that message was closed (permanently)
      localStorage.setItem("nexBuddyMessageClosed", "true");
      message.style.display = "none";
    });

    document.addEventListener("click", function (e) {
      if (
        !widgetContent.contains(e.target) &&
        e.target !== widgetIcon &&
        !widgetIcon.contains(e.target)
      ) {
        closeChat();
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
