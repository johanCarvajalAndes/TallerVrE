const playwright = require("playwright");
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { options } = config;

const fs = require("fs");

async function executeTest() {
  let resultInfo = [];
  let datetime = new Date().toISOString().replace(/:/g, ".");

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }
  const data = await compareImages(
    fs.readFileSync(`./cypress/screenshots/paletta.spec.js/imagen1.png`),
    fs.readFileSync(`./cypress/screenshots/paletta.spec.js/imagen2.png`),
    options
  );
  // console.log(data.misMatchPercentage);
  //resultInfo
  resultInfo.push({
    isSameDimensions: data.isSameDimensions,
    dimensionDifference: data.dimensionDifference,
    rawMisMatchPercentage: data.rawMisMatchPercentage,
    misMatchPercentage: data.misMatchPercentage,
    diffBounds: data.diffBounds,
    analysisTime: data.analysisTime,
    rutefileV1: `./cypress/screenshots/paletta.spec.js/imagen1.png`,
    rutefileV2: `./cypress/screenshots/paletta.spec.js/imagen2.png`,
    resultInfoVR: `results/${datetime}/compare.png`,

  });
  //console.log(resultInfo);
  await fs.writeFileSync(
    `results/${datetime}/compare.png`,
    data.getBuffer()
  );

  await fs.writeFileSync(`report.html`, createReport(datetime, resultInfo));

  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("Execution finished. Check the report under the results folder");
  return resultInfo;
}

(async () => console.log(await executeTest()))();

function browser(b) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>${b.scenario}</h2>
        <p>Data: ${JSON.stringify(b)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Ghost 3.0.0</span>
        <img class="img2" src="${b.rutefileV1}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Ghost 3.42.5</span>
        <img class="img2" src="${b.rutefileV2}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${
          b.resultInfoVR
        }" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(datetime, resInfo) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
            <a href="${config.url}"> Ghost 3.3.0 vs Ghost 3.42.5</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${resInfo.map((b) => browser(b))}
            </div>
        </body>
    </html>`;
}
