const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text for the logo (up to three characters):',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the color for the text (color keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['Triangle', 'Circle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the color for the shape (color keyword or hexadecimal number):',
    },
  ])