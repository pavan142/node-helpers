// sample usage node trim-telegraf-config.js ./telgraf.conf
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function isWhiteSpace(char) {
  return (char === " " || char === "\t" || char === "\n")
}

function getFirstNonEmptyChar(string) {
  for (let i = 0; i < string.length; i++) {
    if (!isWhiteSpace(string[i]))
      return string[i]
  }
  return undefined
}

function isACommentOrEmptyLine(string) {
  let firstChar = getFirstNonEmptyChar(string);
  if (firstChar === undefined || firstChar === "#") {
    return true;
  }
  return false;
}

function TrimComments() {
  let inputFile = process.argv[2];

  if (inputFile == undefined) {
    console.log("Please Provide input file")
    return;
  }

  inputFile = path.resolve(inputFile);
  inputDir = path.dirname(inputFile);
  inputFileName = path.basename(inputFile);
  outputFileName = "trimmed-" + inputFileName;
  outputFile = path.join(inputDir, outputFileName);
  console.log(inputFile, outputFile);

  inputData = fs.readFileSync(inputFile);
  outputData = "";

  var lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });

  lineReader.on('line', function (line) {
    if (!isACommentOrEmptyLine(line)) {
      outputData += line + "\n";
    }
  });
  lineReader.on('close', () => {
    console.log(outputData);
    fs.writeFileSync(outputFile, outputData);
  })

}

TrimComments();
