const fs = require("fs/promises");
const ejs = require("ejs");

const templatePath = "./template.ejs";
const outputFolder = "./dist";

// Read the EJS template content only once
let templateContent;

async function readTemplate() {
  try {
    templateContent = await fs.readFile(templatePath, "utf8");
  } catch (error) {
    console.error(`Error reading the template: ${error.message}`);
  }
}

async function fetchActivityData() {
  try {
    const response = await fetch("https://www.boredapi.com/api/activity");
    if (!response.ok) {
      throw new Error("API request failed.");
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching activity data: ${error.message}`);
    return null;
  }
}


async function generatePage(pageNumber) {
  try {
    if (!templateContent) {
      console.error(
        "Template content not available. Make sure to read the template first."
      );
      return;
    }

    const pageData = await fetchActivityData();
    if (!pageData) {
      console.error("Activity data not available. Skipping page generation.");
      return;
    }

    const { activity, type, participants, price, key, accessibility } =
      pageData;

    const data = { activity, type, participants, price, key, accessibility };

    // Render the EJS template with the data
    const renderedPage = ejs.render(templateContent, data);

    // Write the rendered page to a file in the output folder
    const fileName = `page${pageNumber}.html`;
    await fs.writeFile(`${outputFolder}/${fileName}`, renderedPage);

    console.log(`Page ${pageNumber} generated successfully.`);
  } catch (error) {
    console.error(`Error generating page ${pageNumber}: ${error.message}`);
  }
}

// Main function to generate <100 unique pages
async function generatePages() {
  try {
    if (!templateContent) {
      console.error(
        "Template content not available. Make sure to read the template first."
      );
      return;
    }

    // Check if the output directory exists, if not, create it
    try {
      await fs.access(outputFolder);
    } catch (error) {
      await fs.mkdir(outputFolder, { recursive: true });
    }
    const numberOfPages = 10;
    const pageGenerationPromises = Array.from(
      { length: numberOfPages },
      (_, i) => generatePage(i + 1)
    );

    await Promise.all(pageGenerationPromises);
  } catch (error) {
    console.error(`Error generating pages: ${error.message}`);
  }
}

// Read the template content and then start generating pages
readTemplate().then(() => generatePages());
