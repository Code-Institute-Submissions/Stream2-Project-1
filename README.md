# Code Institute Stream 2 Project

## Overview
This site is my Code Institute end of Stream 2 (Back end) project. It aims to demonstrate an ability to code and deploy a database driven website that follows good practice. The website can be viewed at https://infinite-lake-67936.herokuapp.com/ and has the dual purpose of covering examination requirements while also illustrating my level of knowledge/competency to prospective employers.

The project looks to simplify the data based around data on the website  <a href="http://www.transferleague.co.uk/" target="_blank">Transfer League</a>. 
Transfer League is a static website which provides a detailed granular view of the data. The need this site fulfils is the need to present a broader, higher level view of the Premier League and Championship transfer data and provide an interactive interface where users can drill down into the data. 

## Key Functionality of the project
- DC.js functionality, enabling response graphs, charts and values to be displayed. 

- Custom functionality for responsiveness:
	- HTML layout and Graphs are responsive to different devices (unlike default DC.js graphs).
	- Page reload on mobile device orientation change to allow layout/graphs to be updated to the appropriate device size without a manual refresh.
	- A prompt for users that try to view the charts in portrait on very small mobile devices that they need to view in landscape.
	- The data chart sets the amount of rows depending on device type.
	- The data chart is sorted by fee, with the highest fee being at the top.

- Custom functionality for appearance:
	- Default graph colour scheme overwritten to give a consistent shades of blue in graphs (rather than going from Blue to Orange as per default)
	- Page loader (holding screen) implemented to improve user experience so that the data is fully loaded and graphs/table fully populated before being presented to user.


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
- I used a general bootstrap layout and responsive menu but where applicable I changed the default Bootstrap div elements as HTML5 semantic elements for improved usability.
- The a loader is based on https://www.w3schools.com/howto/howto_css_loader.asp, but I developed mine to hide the full page and gracefully fade out when the D3 data has loaded.
 - Code supplied by Timmy O'Mahony (my mentor) to get the overal value shown for 'Total Transfer Spend to show 'B' for Billions rather than 'G' for Gig.

## How was the project deployed
The project has been managed locally and deployed to GitHub (to host code) and Heroku (to run code) on a regular basis, with the current site viewable on Heroku at https://infinite-lake-67936.herokuapp.com/.

## How was the project tested

### Testing code quality
I validated the HTML used through https://validator.w3.org

### Functional Testing and Testing the Responsive Design:
The testing that was carried out is outlined in the accompanying documentation.
