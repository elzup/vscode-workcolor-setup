const child_process = require("child_process");
const fs = require("fs");

afterEach(() => {
  child_process.execSync("(cd __tests__ && rm -rf .vscode)");
});
beforeEach(() => {
  child_process.execSync("(cd __tests__ && rm -rf .vscode)");
});

test("vscodeWorkcolorSetup", () => {
  child_process.execSync("(cd __tests__ && node ../cli.js)");
  const res = fs.readFileSync("./__tests__/.vscode/settings.json", "utf-8");
  expect(res).toMatchInlineSnapshot(
    `"{\\"workbench.colorCustomizations\\":{\\"titleBar.activeBackground\\":\\"#abcdef\\",\\"titleBar.activeForeground\\":\\"#ffffff\\",\\"activityBar.background\\":\\"#abcdef\\",\\"activityBar.foreground\\":\\"#ffffff\\"}}"`
  );
});

test("vscodeWorkcolorSetup with override", () => {
  child_process.execSync("(cd __tests__ && mkdir .vscode)");
  child_process.execSync(
    `(cd __tests__ && echo '{ "abc": 100 }' > .vscode/settings.json)`
  );
  child_process.execSync("(cd __tests__ && node ../cli.js)");
  const res = fs.readFileSync("./__tests__/.vscode/settings.json", "utf-8");
  expect(res).toMatchInlineSnapshot(
    `"{\\"abc\\":100,\\"workbench.colorCustomizations\\":{\\"titleBar.activeBackground\\":\\"#abcdef\\",\\"titleBar.activeForeground\\":\\"#ffffff\\",\\"activityBar.background\\":\\"#abcdef\\",\\"activityBar.foreground\\":\\"#ffffff\\"}}"`
  );
});
