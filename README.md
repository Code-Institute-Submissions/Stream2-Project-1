# Code Institute Stream 2 Project

## Overview
This code is for a site that is required for the Code Institute end of Stream 2 (Back end) project. It is to demonstrate an ability to code and deploy a database driven website that follows good practice. The website has the dual purpose of covering examination requirements while also illustrating my level of knowledge/competency to prospective employers.


## Key Functionality of the project
- DC.js functonality, enabling response graphs, charts and values to be displayed. 

- Custom functionality for responsiveness:
	- HTML layout and Graphs are responsive to different devices (unlike default DC.js graphs).
	- Page reload on mobile device oritentiation change to allow layout/graphs to be updated to the appropriate device size without a manual refresh.
	- A prompt for users that try to view the charts in portrait on very small mobile devices that they need to view in landscape.
	- The data chart sets the amount of rows depending on device type (25 for very small or small, 50 for medium or large).
	- The data chart is sorted by fee, with the highest fee being at the top.

## Project Coding
#### Technologies used
- HTML
- CSS
	- [Bootstrap](http://getbootstrap.com/)
- JavaScript 
	- [DC.js](https://dc-js.github.io/dc.js)
	- [D3.js](https://d3js.org/)
	- [Crossfilter](http://square.github.io/crossfilter/)
- Database
	- [MongoDB](https://www.mongodb.com/)
- Python
	- [Flask](http://flask.pocoo.org/)


#### 3rd party code used:
- I used a general bootstrap layout and responsive menu, but where applicable, I changed the default Bootstrap div elements as HTML5 semantic elements for improved usability.

## How was the project deployed
The project has been managed locally and deployed to GitHub (to host code) and Heroku (to run code) on a regular basis, with the current site able to be viewed on Heroku at https://infinite-lake-67936.herokuapp.com/.

## How was the project tested

### Testing code quality
I validated the HTML used through https://validator.w3.org but an aspect of the framwork syntax did conforming to HTML standards: href="{{ url_for ('static', filename='abc')}}" and on the data page a warning was given regarding a section not having a heading, but the decision not to have one was a design choice not an oversight.

### Testing Responsive Design:
I have tested the website, across different devices, different browsers and different Operating Systems, to ensure that the site adapts cleanly/neatly to the different device criteria, summary of what I tested is below (limited to what I had available):
- iPhone: Firefox, Chrome, Opera
- Samsung phone: Firefox, Chrome, Opera
- iPad: Firefox, Chrome, Opera
- Laptop Win10: Firefox, Chrome, Opera
- Desktop OS X Mavericks: Firefox, Chrome, Opera

### Functional Testing
The key elements of the testing were the different aspects of the "user story", which in essence was checking that the functionality that the user would need to use to achieve their goal, in this case looking at my photos and finding out a bit about me) worked, so I checked: 
 - The navigation links (small and large menus)
 - External links (on homepage and about page)
 - Each graph filter
 - Each graph reset button
 - Main rest button
 - Chart ordering (highest fee first)
