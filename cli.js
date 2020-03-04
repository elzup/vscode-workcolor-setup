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
const green = "\u001b[32m";
const reset = "\u001b[0m";
const settingsFile = ".vscode/settings.json";

const data = cli.input[0]
  ? getManifest(cli.input[0])
  : getManifest("public/manifest.json") ||
    getManifest("static/manifest.json") ||
    false;
if (!data) {
  console.error("can not find manifest.json");
} else {
  const color = JSON.parse(data).theme_color;
  if (!fs.existsSync(".vscode")) {
    fs.mkdirSync(".vscode");
    console.log(green + ".vscode/ created" + reset);
  }
  if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, "{}");
    console.log(green + ".vscode/manifest.json created" + reset);
  }
  const currentSettings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
  const newSettings = Object.assign({}, currentSettings, {
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": color,
      "titleBar.activeForeground": "#ffffff",
      "activityBar.background": color,
      "activityBar.foreground": "#ffffff"
    }
  });

  fs.writeFileSync(settingsFile, JSON.stringify(newSettings));
  console.log("successfully setup .vscode/settings.json");
}
