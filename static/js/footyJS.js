
/* Noddy text change to allow for another Heroku update to see if last one was corrupted or if something actually wrong */

//Queuing data so it all loads before 'makeGraph' is invoked 
queue()
   .defer(d3.json, "/footy/projectdata")
   .await(makeGraphs);


function makeGraphs(error, footballData) {

  var footyData = footballData;
  //Get dates in a state they will be recognised as dates
  var parseDate = d3.time.format("%d/%m/%Y").parse;
    footyData.forEach(function(d) {
      d.date = parseDate(d.date);
      d.Year = d.date.getFullYear();
      //console.log(d.date.getFullYear());
      //console.log(d.player_name);
  });


  //creating a cross filter instance
  var ndx = crossfilter(footyData);
  //print_filter("footyData");    


  //Enables the results of crossfilter filters to be output to the concsole log
  function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }

  // Dimensions:
  // -----------
  var transferWindowDim = ndx.dimension(function(d) {return d.transfer_window;});
  var league_moving_fromDim = ndx.dimension(function(d) {return d.league_moving_from;});
  var league_moving_toDim = ndx.dimension(function(d) {return d.league_moving_to;});
  var club_moving_fromDim = ndx.dimension(function(d) {return d.club_moving_from;});
  var club_moving_toDim = ndx.dimension(function(d) {return d.club_moving_to;});
  var player_name = ndx.dimension(function(d) {return d.player_name;});
  var feeDim = ndx.dimension(function(d) {return +d.fee;});  
  var dateDim = ndx.dimension(function(d) {return d.date;});
  var seasonDim  = ndx.dimension(function(d) {return d.season;});


  /*  ----------------------------------------------------------------------------------------------

      Linear chart showing ALL tranfer activity involving Premiership and Championship league teams

      ---------------------------------------------------------------------------------------------- */
 

  //Group fee's paid by date    
  var feeDateDim_filter = dateDim.group().reduceSum(function(d) {return d.fee/1000000;});
  //Getting max and min values for time based chart
  var minDate = dateDim.bottom(1)[0].date;
  var maxDate = dateDim.top(1)[0].date;
  //Associate graph with HTML anchor and define chart 


  var chartTotalFees = dc.barChart("#bar-chart-overall-transfer-spend");
  chartTotalFees
       .width(barChartWidth)
       .height(barChartHeight)       
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(feeDateDim_filter)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .brushOn(false)
       .ordinalColors(['#002b80']) //Line colour
       .yAxisLabel(barChartYAxisLabel)
       .xAxisLabel("Year")
       .yAxis().ticks(barChartYTicks);





   var totalFeesSeasonal = ndx.groupAll().reduceSum(function (d) {
       return d.fee;
   });



//---------------------------------------------------------
// Code supplied by Timmy
//---------------------------------------------------------
    var UK = d3.locale({
  "decimal": ".",
  "thousands": ",",
  "grouping": [3],
  "currency": ["£", ""],
  "dateTime": "%a %b %e %X %Y",
  "date": "%m/%d/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});


// Getting M, B thousands etc.
// https://github.com/d3/d3/issues/2241

formatSi = UK.numberFormat("$.2s");

function formatAbbreviation(x) {
  var s = formatSi(x);
  switch (s[s.length - 1]) {
    case "G": return s.slice(0, -1) + "B";
  }
  return s;
}

 var chartTotalSpend = dc.numberDisplay("#total-transfer-spend");
 chartTotalSpend
     .formatNumber(formatAbbreviation)
     .valueAccessor(function (d) {
         return d;
     })
     .group(totalFeesSeasonal);  

//For hidden chart that is made visible in xs view
var chartTotalSpend_xs = dc.numberDisplay("#total-transfer-spend-xs");
 chartTotalSpend_xs
     .formatNumber(formatAbbreviation)
     .valueAccessor(function (d) {
         return d;
     })
     .group(totalFeesSeasonal);  


//---------------------------------------------------------
   

//Associate chart with HTML element
  var seasonalFees = seasonDim.group().reduceSum(function(d) {return d.fee/1000000000;});
  var chartSeasonalFees = dc.rowChart("#rowchart-seasonal-total-fees");
  chartSeasonalFees
    .width(seasonalFeesWidth)
    .height(seasonalFeesHeight)
    .margins({top: 10, left: 15, right: 15, bottom: 40})
    .ordinalColors(['#b3ccff','#80aaff','#4d88ff','#1a66ff','#004de6','#003cb3','#002b80'])
    .dimension(seasonDim)
    .group(seasonalFees)
    .xAxis().ticks(4);
    
   var totalFees = ndx.groupAll().reduceSum(function (d) {
       return d.fee;
   });

    

  var transferWindow_totals = transferWindowDim.group().reduceCount(function(d) {return d.fee;});
  //print_filter("season_total"); 

  //Associate chart with HTML element
  var windowPieChart = dc.pieChart("#piechart-window");
  //criteria for pie chart
  windowPieChart
    .width(150)
    .height(150)
    .innerRadius(25)
    .ordinalColors(['#80aaff','#003cb3'])
    .dimension(transferWindowDim)
    .group(transferWindow_totals);



  var leagueMovToDim  = ndx.dimension(function(d) {return d.league_moving_to;});
  var leagueMovToGroup = leagueMovToDim.group().reduceCount(function(d) {return d.fee;});
  var leagueMovToRowChart = dc.rowChart("#rowchart-leagueMovTo");
  leagueMovToRowChart
    .width(movToWidth)
    .height(movToHeight)
    .margins({top: 10, left: 15, right: 15, bottom: 40})    
    .ordinalColors(['#80aaff','#1a66ff','#003cb3'])
    .dimension(leagueMovToDim)
    .group(leagueMovToGroup)
    .xAxis().ticks(5);


  var leagueMovFromDim  = ndx.dimension(function(d) {return d.league_moving_from;});
  var leagueMovFromGroup = leagueMovFromDim.group().reduceCount(function(d) {return d.fee;});
  var leagueMovFromRowChart = dc.rowChart("#rowchart-leagueMovFrom");
  //criteria for pie chart
  leagueMovFromRowChart
    .width(movFromWidth)
    .height(movFromHeight)
    .margins({top: 10, left: 15, right: 15, bottom: 40})    
    .ordinalColors(['#80aaff','#1a66ff','#003cb3'])
    .dimension(leagueMovFromDim)
    .group(leagueMovFromGroup)
    .xAxis().ticks(5);




//Needed to get comma's into fee amounts
var formatInCommas = d3.format(",");




//Zero filing dates for table aesthetics
function zeroFillDay(dd){
  if(dd<10){
    dd='0'+dd;
  } 
  return dd;  
}

//Zero filing dates for table aesthetics
function zeroFillMonth(mm){
  if(mm<10){
    mm='0'+mm;
  } 
  return mm;  
}



//This is set in customJS to enable a different table to be shown depending on screen size
//var datatableBig = dc.dataTable("#dc-data-table"); 
//var datatableSmall = dc.dataTable("#dc-data-table"); 
if (datatableSize == "Big"){
  datatableBig = dc.dataTable("#dc-data-table");
  datatableBig
   //.dimension(feeDateDim_filter2)
   .dimension(feeDim)
   .group( function(d){return ''; })  // an empty string
   .sortBy(function(d){ return d.fee; })
   //size of the data table in rows, this needs to be automatic...
   .size(50)
  // create the columns dynamically
   .columns([
       function (d) {
           return zeroFillDay(d.date.getDate()) + "/" + zeroFillMonth((d.date.getMonth() + 1)) + "/" + d.date.getFullYear();
       },
       function (d) {
           return d.player_name;
       },
       function (d) {
           return "£" + formatInCommas(+d.fee);
       },
       function (d) {
           return d.club_moving_from;
       },
       function (d) {
           return d.league_moving_from;
       },
       function (d) {
           return d.club_moving_to;
       },
       function (d) {
           return d.league_moving_to;
       }       
   ])
   .order(d3.descending);

}
else {
  datatableSmall = dc.dataTable("#dc-data-table");
  datatableSmall
   .dimension(feeDim)
   .group( function(d){return ''; })  // an empty string
   .sortBy(function(d){ return d.fee; })
   //size of the data table in rows, this needs to be automatic...
   //.size(3000)
  // create the columns dynamically
   .columns([
       function (d) {
           return zeroFillDay(d.date.getDate()) + "/" + zeroFillMonth((d.date.getMonth() + 1)) + "/" + d.date.getFullYear();
       },
       function (d) {
           return d.player_name;
       },
       function (d) {
           return "£" + formatInCommas(+d.fee);
       },
       function (d) {
           return d.club_moving_from;
       },
       function (d) {
           return d.club_moving_to;
       },
   ])
   .order(d3.descending);
}


    dc.renderAll();


    //Adding Axis labels to the row charts AFTER they have been built by DC.JS
    //Code idea taken from:
    //https://stackoverflow.com/questions/21114336/how-to-add-axis-labels-for-row-chart-using-dc-js-or-d3-js
    function AddXAxis(chartToUpdate, displayText)
    {
        chartToUpdate.svg()
          .append("text")
          .attr("class", "x-axis-label")
          .attr("text-anchor", "middle")
          .attr("x", chartToUpdate.width()/2)
          .attr("y", chartToUpdate.height()-3.5)
          .text(displayText);
    }

    AddXAxis(chartSeasonalFees, "Billions (£)");
    AddXAxis(leagueMovToRowChart, "Amount of Players");
    AddXAxis(leagueMovFromRowChart, "Amount of Players");




var resetAllFilters = function() {
  dc.filterAll();
  dc.redrawAll();
  return false;
};

var resetTransferWinFilter = function() {
  transferWindowDim.filterAll();
  windowPieChart.filter(null);
  dc.redrawAll();
  return false;
};



var resetSeasonFilter = function() {
  seasonDim.filterAll();
  seasonDim.filter(null);  
  dc.redrawAll();
  return false;
};

//League Sold To
var resetMoveToFilter = function() {
  leagueMovToDim.filterAll();
  dc.redrawAll();
  return false;
};

//League Sold From
var resetMoveFromFilter= function() {
  leagueMovFromDim.filterAll();
  dc.redrawAll();
  return false;
};


//jQuery click event to manage button presses
$('#reset-all').click(resetAllFilters);
$('#reset-season').click(resetSeasonFilter);
$('#reset-window').click(resetTransferWinFilter);
$('#reset-moveTo').click(resetMoveToFilter);
$('#reset-moveFrom').click(resetMoveFromFilter);

}



 
