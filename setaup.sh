#!/bin/bash

# Create the main project folder
mkdir my-github-website
cd my-github-website

# Create HTML files
touch index.html about.html contact.html

# Create subdirectories
mkdir -p assets/images assets/videos assets/icons
mkdir css js fonts docs

# Create CSS files
touch css/main.css css/reset.css

# Create JavaScript files
touch js/app.js js/utils.js

# Create a sample font file placeholder
touch fonts/font-name.ttf fonts/font-name.woff

# Create documentation files
touch docs/README.md docs/CONTRIBUTING.md docs/LICENSE

# Create a .gitignore file
touch .gitignore

echo "Project folder structure created successfully!"
