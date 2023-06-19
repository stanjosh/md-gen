#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
const currentPath = new URL(".", import.meta.url);

async function buildReadme() {
  await inquirer
    .prompt(questions)
    .then((answers) => {
      var mdFile = buildTemplate(answers);
      console.info(mdFile);
      if (answers.saveFile) {
        mdWriteFile(mdFile, answers.title);
      }
    })
    .then((mdFile) => {
      return mdFile;
    });
}

async function mdWriteFile(mdFile, title) {
  var filename = `${title}-readme.md`;
  fs.writeFile(filename, mdFile, (err) => {
    if (err) console.log(err);
  });
  console.info(`Your file is saved as ${filename} in ${currentPath}`);
}

function buildTemplate(answers) {
  return `# ${answers.title}\n`
	+ `${answers.license 
		? `${mdLicenses[answers.license]}\n` 
		: ""
	}`
	
	+`${answers.desc 
		? `## Description\n${answers.desc}\n` 
		: ""
	}`
	
	+`${answers.features 
		? `## Features\n${answers.features}\n` 
		: ""
	}`
	+`${answers.contents
		? `## Table of Contents\n`
		+`${answers.install ? `- [Installation](#installation)\n` : ""}` 
		+`${answers.usage ? `- [Usage](#usage)\n` : ""}`
		+`${answers.credits ? `- [Credits](#credits)\n` : ""}` 
		+`${answers.license ? `- [License](#license)\n` : ""}` 
		: ""
	}`
	+`${answers.install 
		? `## Installation\n${answers.install}\n`
		: ""
	}`
	+`${answers.usage 
		? `## Usage\n${answers.usage}\n`
		: ""
    }`
	+`${answers.credits
      ? `## Credits\n${answers.credits}\n`
      : ""
  	}`

	+`${answers.githubUser
		? `##Questions\n${answers.githubUser}\n`
		: ""
	}`

	+`${Boolean(answers.githubUser, answers.githubLink)
		? `[${answers.githubUser}](${answers.githubLink})\n`
      	: ""
  	}`

  	+`${answers.contribution
		? `## How to contribute\n${answers.contribution}\n`
      	: ""
  	}`
	
	+`${answers.tests
		? `## Tests\n${answers.tests}\n`
      	: ""
  	}`

	+`\n---\n`
	+`${answers.license
		? `## License\n${mdLicenses[answers.license]} This project uses the ${answers.license} license.\n`
		: ""
  	}`

	;
}

var questions = [
  {
    name: "title",
    message: "What is the title of this project?",
    validate: Boolean,
  },
  {
    name: "desc",
    message: "What is the description of this project?",
  },
  {
    type: "confirm",
    name: "contents",
    message: "Would you like to include a table of contents?",
  },
  {
    name: "install",
    message: "Enter any installation instructions for this project:",
  },
  {
    name: "usage",
    message: "Enter usage instructions for this project:",
  },
  {
    name: "credits",
    message: "Enter the credits for this project:",
  },
  {
    type: "list",
    name: "license",
    choices: ["GNU GPLv3", "The Unlicense", "MIT"],
    message: "Which license would you like this project to fall under?",
  },
  {
    name: "features",
    message: "What are some important features of this project:",
  },
  {
    name: "contributions",
    message: "How should people contribute to this project?",
  },
  {
    name: "tests",
    message: "Are there any instructions for testing the project?",
  },
  {
    name: "githubUser",
    message: "Your github username:",
  },
  {
    name: "githubLink",
    message: "Your github profile url:",
  },
  {
    type: "confirm",
    name: "saveFile",
    message: "Would you like to save your file to " + currentPath + "?",
  },
];

var mdLicenses = {
  MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
  "GNU GPLv3":
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
  "The Unlicense":
    "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
};

buildReadme();
