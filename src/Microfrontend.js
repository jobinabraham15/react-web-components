// On Component mount, need to load the asset manifest
// Figure out the main.js file
// Call the renderMethod of the microfrontend
// Each Microfrontend should register a method on window thatrenders itself

import React from "react";

class Microfrontend extends React.Component {
  static defaultProps = {
    document: document,
    window: window
  };

  shadow = null;

  scriptIds = [];
  componentDidMount() {
    const { name, host, document } = this.props;
    let root = document.querySelector("micro-container");
    if (root) this.shadow = root.shadowRoot;
    // const scriptId = `micro-${name}-`;

    // if (document.getElementById(scriptId)) {
    //   this.renderMicroFrontend();
    //   return;
    // }

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          console.log("load triggered");
          navigator.serviceWorker.register(`${host}/service-worker.js`, {scope:`${window.location.origin}/stafffing/`}).then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        let entryScripts = manifest.entrypoints;
        
        console.log("Got Manifest", entryScripts, this.props.host);
        let entryScriptLength = entryScripts.length;
        let loaded = 0;
        let allPresent = 0;
        let allPresentCss = 0;
        let jsLength = 0;
        for (let i = 0; i < entryScripts.length; i++) {
          let entry = entryScripts[i];
          if (/.js$/.test(entry)) {
            jsLength++;
            let scriptIdentifier = entry.match(
              /[a-zA-z0-9-]+.[a-zA-z0-9]+.js$/
            );
            if (scriptIdentifier.length) {
              let scriptId = `micro-${name}-${scriptIdentifier[0]}`;
              if (this.shadow.getElementById(scriptId)) {
                allPresent++;
                continue;
              }
              const script = document.createElement("script");
              script.id = scriptId;
              script.crossOrigin = "";
              script.src = `${host}/${entry}`;
              script.onload = () => {
                loaded++;
                this.scriptIds.push(scriptId);
                console.log("entryScriptLength", entryScriptLength, loaded);
                if (loaded === jsLength) {
                  this.renderMicroFrontend();
                }
              };
              this.shadow.appendChild(script);
            }
          }
          if (/.css$/.test(entry)) {
            let cssIdentifier = entry.match(/[a-zA-z0-9-]+.[a-zA-z0-9]+.css$/);

            if (cssIdentifier.length) {
              let scriptId = `micro-${name}-${cssIdentifier[0]}`;
              if (this.shadow.getElementById(scriptId)) {
                allPresentCss++;
                continue;
              }
              const link = document.createElement("link");
              link.id = scriptId;
              link.crossOrigin = "";
              link.rel = "stylesheet";
              link.type = "text/css";
              link.href = `${host}/${entry}`;
              this.shadow.appendChild(link);
            }
          }
        }
        if (allPresent === jsLength) {
          this.renderMicroFrontend();
        }
      });
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;
    console.log(" name, window, history ",  name, window, history );
    window[`render${name}`](this.shadow, `${name}-container`, history);
  };

  componentWillUnmount() {
    const { name } = this.props;
    window[`unmount${name}`](`${name}-container`);
    for (let i = 0; i < this.scriptIds.length; i++) {
      let elem = this.shadow.getElementById(this.scriptIds[i]);
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    }
  }

  render() {
    return <main id={`${this.props.name}-container`}></main>;
  }
}

export default Microfrontend;
