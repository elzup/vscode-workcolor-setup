#!/bin/sh
mkdir -p .vscode
COLOR=cat public/manifest.json |jq .theme_color
echo '{ "workbench.colorCustomizations": { "titleBar.activeBackground": '$COLOR', "titleBar.activeForeground": "#000000" } }' >> .vscode/settings.json
echo -e "lookup \e[4m./.vscode/settings.json\e[0m"