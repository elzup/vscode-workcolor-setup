const child_process = require("child_process");
const fs = require("fs");

afterEach(() => {
  child_process.execSync("(cd __tests__ && rm -rf .vscode)");
});
beforeEach(() => {
  child_process.execSync("(cd __tests__ && rm -rf .vscode)");
});

it("vscodeWorkcolorSetup", () => {
  child_process.execSync("(cd __tests__ && sh ../lib/index.sh)");
  const res = fs.readFileSync("./__tests__/.vscode/settings.json", "utf-8");
  expect(res).toMatchInlineSnapshot(`
    "{ \\"workbench.colorCustomizations\\": { \\"titleBar.activeBackground\\": , \\"titleBar.activeForeground\\": \\"#000000\\" } }
    "
  `);
});
