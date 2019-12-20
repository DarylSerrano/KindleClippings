const fs = require("fs");
const path = require("path");

async function clean() {
  let buildPath = path.resolve("./dist");
  if (fs.existsSync(buildPath)) {
    const files = await fs.promises.readdir(buildPath);
    for (const filename of files) {
      fs.promises.unlink(path.resolve(buildPath, filename));
    //   console.log(filename);
    }
  }
}

clean();
