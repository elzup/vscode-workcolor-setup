#!/usr/bin/env node
"use strict";
const meow = require("meow");
const fs = require("fs");

const cli = meow(`
  Usage
    $ vscode-workcolor-setup [manifest path (detect public/, static/)]
`);

function getManifest(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return data;
  } catch {
    return false;
  }
}

const data = cli.input[0]
  ? getManifest(cli.input[0])
  : getManifest("public/manifest.json") ||
    getManifest("static/manifest.json") ||
    false;
if (!data) {
  console.error("can not find manifest.json");
} else {
  const color = JSON.parse(data).theme_color;
  const setting = {
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": color,
      "titleBar.activeForeground": "#ffffff",
      "activityBar.background": color,
      "activityBar.foreground": "#ffffff"
    }
  };
  fs.mkdirSync(".vscode");
  fs.appendFileSync(".vscode/settings.json", JSON.stringify(setting));
  console.log("successfully setup ./.vscode/settings.json");
}
