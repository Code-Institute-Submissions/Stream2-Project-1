# Code Institute Stream 2 Project

## Overview
This code is for a site which is required for the Code Institute end of Stream 2 (Back end) project. It is to demonstrate an ability to code and deploy a database driven website that follows good practice. The website can be viewed at https://infinite-lake-67936.herokuapp.com/ and has the dual purpose of covering examination requirements while also illustrating my level of knowledge/competency to prospective employers.

The project is looks to simplify data based around data on the website  <a href="http://www.transferleague.co.uk/" target="_blank">Transfer League</a>. 
Transfer League is a static website which provides a detailed granular view of the data. The need this site fullfills is the need to present a broader, higher level view of the Premier League and Championship transfer data and provide an interactive interface where uses could drill down into the data. In essence I wanted to use the some of the data but present a different and interactive perspective.

## Key Functionality of the project
- DC.js functonality, enabling response graphs, charts and values to be displayed. 

- Custom functionality for responsiveness:
	- HTML layout and Graphs are responsive to different devices (unlike default DC.js graphs).
	- Page reload on mobile device oritentiation change to allow layout/graphs to be updated to the appropriate device size without a manual refresh.
	- A prompt for users that try to view the charts in portrait on very small mobile devices that they need to view in landscape.
	- The data chart sets the amount of rows depending on device type.
	- The data chart is sorted by fee, with the highest fee being at the top.

- Custom functionality for appearance:
	- Default graph colour scheme overwritten to give a consistent shades of blue in graphs (rather than going from Blue to Orange as per default)


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
I validated the HTML used through https://validator.w3.org but their were two exceptions. The first was one aspect of the flask framwork syntax didn't conform to HTML standards: href="{{ url_for ('static', filename='abc')}}" which showed as an error. The second was the data page recieved a warning due to an HTML section not having a heading, but the decision not to have one was a design choice not an oversight.

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
