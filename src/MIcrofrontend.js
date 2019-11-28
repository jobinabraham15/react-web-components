// On Component mount, need to load the asset manifest
// Figure out the main.js file
// Call the renderMethod of the microfrontend
// Each Microfrontend should register a method on window thatrenders itself

import React from "react";


class Microfrontend extends React.Component {
  // static defaultProps = {
  //   document: document,
  //   window: window
  // };

  scriptIds = [];
  componentDidMount() {
    const { name, host, document } = this.props;
    // const scriptId = `micro-${name}-`;

    // if (document.getElementById(scriptId)) {
    //   this.renderMicroFrontend();
    //   return;
    // }

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
              if (document.getElementById(scriptId)) {
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
              document.head.appendChild(script);
            }
          }
          if (/.css$/.test(entry)) {
            let cssIdentifier = entry.match(/[a-zA-z0-9-]+.[a-zA-z0-9]+.css$/);

            if (cssIdentifier.length) {
              let scriptId = `micro-${name}-${cssIdentifier[0]}`;
              if (document.getElementById(scriptId)) {
                allPresentCss++;
                continue;
              }
              const link = document.createElement("link");
              link.id = scriptId;
              link.crossOrigin = "";
              link.rel = "stylesheet";
              link.type = "text/css";
              link.href = `${host}/${entry}`;
              document.head.appendChild(link);
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
    window[`render${name}`](`${name}-container`, history);
  };

  componentWillUnmount() {
    const { name } = this.props;
    window[`unmount${name}`](`${name}-container`);
    for (let i = 0; i < this.scriptIds.length; i++) {
      let elem = document.getElementById(this.scriptIds[i]);
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
