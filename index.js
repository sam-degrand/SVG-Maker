const inquirer = require('inquirer');
const fs = require('fs');

function generateLogoSVG(text, textColor, shapeColor, shapeType) {
    let shapeSVG;
  
    if (shapeType === 'circle') {
      shapeSVG = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
    } else if (shapeType === 'triangle') {
      shapeSVG = `<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}" />`;
    } else if (shapeType === 'square') {
      shapeSVG = `<rect x="56" y="56" width="188" height="126" fill="${shapeColor}" />`;
    }
  
    const svgCode = `
      <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none" />
        ${shapeSVG}
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="${textColor}" font-size="60">${text}</text>
      </svg>
    `;
  
    return svgCode;
  }
  
// Prompt the user for input and generate the logo
inquirer
  .prompt([
    // Prompt for text input
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo (up to three characters):',
    },
    // Prompt for text color input
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color:',
    },
    // Prompt for shape color input
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color:',
    },
    // Prompt for shape selection input
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
  ])
  .then((answers) => {
    const { text, textColor, shapeColor, shape } = answers;

    // Generate the SVG code for the logo
    const logoSVG = generateLogoSVG(text, textColor, shapeColor, shape);

    // Save the SVG code to a file
    fs.writeFile('logo.svg', logoSVG, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  });
