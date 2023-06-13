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
  .then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;

    let shapeInstance;
    switch (shape) {
      case 'Triangle':
        shapeInstance = new Triangle();
        break;
      case 'Circle':
        shapeInstance = new Circle();
        break;
      case 'Square':
        shapeInstance = new Square();
        break;
      default:
        console.error('Invalid shape');
        return;
    }
    shapeInstance.setColor(shapeColor);

    const svgString = `<svg width="300" height="200">
      <text x="50%" y="50%" text-anchor="middle" fill="${textColor}">${text}</text>
      ${shapeInstance.render()}
    </svg>`;

    fs.writeFile('logo.svg', svgString, (err) => {
      if (err) {
        console.error('An error occurred while saving the SVG file:', err);
        return;
      }
      console.log('Generated logo.svg');
    });
  });