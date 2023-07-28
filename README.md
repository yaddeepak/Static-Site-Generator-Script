# Static-Site-Generator-Script

# Overview

This project is a simple static site generator script written in JavaScript (Node.js) that generates unique pages using data fetched from an API. The pages are generated using the EJS templating engine and are hosted on GitHub Pages. The main objectives of this project are:

1. Generate <100 unique pages dynamically.
2. Use a templating engine (EJS) to develop the UI.
3. Customize the UI using unique data from an API.
4. Host the generated pages on GitHub Pages.

# Getting Started

# Prerequisites

Before running the generator script, make sure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- npm (Node Package Manager)

# Installation

1. Clone the repository to your local machine:
   
2. Install the project dependencies:

# Usage

To generate the pages and host them on GitHub Pages, follow these steps:

1. Run the generator script:
This script will fetch data from the API, generate unique pages, and store them in the `dist` folder.

2. Host on GitHub Pages:

- Create a new GitHub repository for this project.
- Push the generated `dist` folder to the repository.
- Go to the repository settings on GitHub, scroll down to the "GitHub Pages" section, and choose the "master branch" as the source.


To achieve a 100 Lighthouse score, the following optimizations were made to the generated pages:

- Images and assets were optimized for size and performance.
- CSS and JavaScript files were minified and bundled.


# Implementation

Import Required Modules:
The script starts by importing the necessary modules: fs/promises and ejs.

Define Template Path and Output Folder:
The script defines two constants: templatePath and outputFolder, which represent the file path of the EJS template and the output folder for generated pages, respectively.

Initialize templateContent:
The templateContent variable is declared to store the content of the EJS template. It will be initialized when the script reads the template file.

readTemplate() Function:
This function reads the content of the EJS template from the specified templatePath file using fs.readFile. 

fetchActivityData() Function:
This function fetches data from the "https://www.boredapi.com/api/activity" API using the fetch() function. It then converts the response to JSON format using response.json() and returns the data. 

generatePage(pageNumber) Function:
This function generates a single page using the EJS template and unique data fetched from the API. It first checks if the templateContent is available; if not, it logs an error message and returns. Next, it calls the fetchActivityData() function to get the unique data for the page. If the data is not available, it logs an error message and returns.


generatePages() Function:
This function is the main entry point of the script. It first checks if the templateContent is available; if not, it logs an error message and returns. 
The function generates 10 unique pages by calling the generatePage() function 10 times, each with a unique pageNumber.


The script generates unique pages by fetching different activity data from the API for each page. It uses EJS as the templating engine to populate the data into the HTML template and creates 10 pages in the ./dist folder.





