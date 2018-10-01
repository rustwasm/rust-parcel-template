#!/usr/bin/env node
const { spawn } = require("child_process");
const fs   = require("fs");

let folderName = '.';

if (process.argv.length >= 3) {
  folderName = process.argv[2];   
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

const clone = spawn("git", ["clone", "https://github.com/rustwasm/rust-parcel-template.git", folderName]);

clone.on("close", (code) => {
  if (code !== 0) {
    handleError("install", code);
  } else {
    console.log("🦀Rust + 🕸 WebAssembly + 📦Parcel = ❤️");
    
    const install = spawn('npm', ['install'], { cwd: folderName });
    install.on("close", (code) => {
      if (code !== 0) {
        handleError("install", code);
      } else {
        console.log(" Installed dependencies ✅ ");
      }
    });
  }
});

function handleError(type, errCode) {
    console.error()
    process.exit(code);
}
