import * as http from "http";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from "fs";
import { readFile, access } from "fs/promises";

async function main() {
  try {
    const fileTemplatePath = new URL(
      yargs(hideBin(process.argv)).argv["template-path"],
      import.meta.url
    );
    const dataPath = new URL(
      yargs(hideBin(process.argv)).argv["data-path"],
      import.meta.url
    );
    let newTemplate = "";

    if (!fileTemplatePath) {
      throw new Error(
        "Path parameter not specified, try --template-path=your_path"
      );
    }

    if (!dataPath) {
      throw new Error(
        "Path parameter not specified, try --data-path=your_path"
      );
    }

    await access(fileTemplatePath, fs.constants.W_OK)
      .then(async () => {
        newTemplate = await getNewTemplate(fileTemplatePath, dataPath);
      })
      .catch((err) => {
        throw err;
      });

    startServer(newTemplate);
  } catch (err) {
    console.error(err);
  }
}

const startServer = (template) => {
  const server = http.createServer(async (req, res) => {
    res.end(template);
  });

  server.listen(3000, () => {
    console.log("Server started at 3000");
  });
};

const getNewTemplate = async (templatePath, dataPath) => {
  try {
    let template = await readFile(
      new URL(templatePath, import.meta.url),
      "utf-8"
    );
    const data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }));

    for (const [k, v] of Object.entries(data)) {
      template = template.replace(`{${k}}`, v);
    }

    return template;
  } catch (err) {
    throw err;
  }
};

main().catch(() => process.exit(0));
