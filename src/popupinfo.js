import React from "react";
import ReactDOM from "react-dom";
import Some from "./Some";
export default class PopUpInfo extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({ mode: "open" });

    // Create spans
    var wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    var icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    var info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    var text = this.getAttribute("data-text");
    info.textContent = text;

    // Insert icon
    var imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.png";
    }

    var img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    var style = document.createElement("style");
    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    shadow.appendChild(style);
    // shadow.appendChild(wrapper);
    // wrapper.appendChild(icon);
    // wrapper.appendChild(info);
    ReactDOM.render(<Some />, shadow);
  }

  updateTextContent(elem) {
    setTimeout(() => {
      const shadow = elem.shadowRoot;
      shadow.querySelector(".info").textContent = "Changed on connected";
    }, 10000);
  }
  connectedCallback() {
    console.log("Custom square element added to page.");
    // this.updateTextContent(this);
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      "Custom square element attr changed.",
      name,
      oldValue,
      JSON.parse(JSON.stringify(newValue))
    );
    ReactDOM.render(<Some name={newValue} />, this.shadowRoot);
  }
}
