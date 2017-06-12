
//Queuing data so it all loads before 'makeGraph' is invoked 
queue()
   .defer(d3.json, "data/FootyData.json")
   .await(makeGraphs);


function makeGraphs(error, footballData) {

  //console.log(footballData);
  //var count = 0;

   var footyData = footballData;
  //Get dates in a state they will be recognised as dates
  var parseDate = d3.time.format("%d/%m/%Y").parse;
    footyData.forEach(function(d) {
      //count = count +1;
      d.date = parseDate(d.date);
      d.Year = d.date.getFullYear();
      //console.log(count);
      //console.log(d.player_name);
  });

  //creating a cross filter instance
  var ndx = crossfilter(footyData);
  //print_filter("footyData");    


  //helper function to print out filter
  function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }


  // Required Dimensions
  // -------------------
  // Transfer Window
  var transfer_windowDim = ndx.dimension(function(d) {return d.transfer_window;});
  // League Moving FROM Dim
  var league_moving_fromDim = ndx.dimension(function(d) {return d.league_moving_from;});
  // Club Moving FROM Dim
  var club_moving_fromDim = ndx.dimension(function(d) {return d.club_moving_from;});
  // League Moving TO Dim
  var club_moving_toDim = ndx.dimension(function(d) {return d.club_moving_to;});
  // Club Moving To Dim
  var club_moving_toDim = ndx.dimension(function(d) {return d.club_moving_to;});
  // Fee
  var feeDim = ndx.dimension(function(d) {return d.fee;});  
  // Use crossfilter to get views of the data for X axis (date) and Y axis (hits)
  var dateDim = ndx.dimension(function(d) {return d.date;});
  

  // Groups total fees (incoming and outgoing) for each club for range in data
  // Gauges overall activity
  // MAYBE SCATTERPLOT WITH CHANGING CIRCLE SIZE WOULD BE GOOD?
  var feeDateDim_filter = dateDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("feeDateDim_filter");  

  //Getting max and min values for time based chart
  var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;

    var chartTransfer = dc.lineChart("#chart-line-overall-transfer-spend");
  //var chartTransfer = dc.scatterPlot("#chart-line-transfer");
  chartTransfer
       .width(800)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(feeDateDim_filter)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .yAxisLabel("Amount Spent (£'s)")
       .xAxisLabel("Year")
       .yAxis().ticks(4);

    // Grouping for year data
  var yearDim  = ndx.dimension(function(d) {return +d.Year;});
  var year_total = yearDim.group().reduceSum(function(d) {return d.fee;});
  
  //Associate chart with HTML element
  var yearPieChart = dc.pieChart("#piechart-year");
  //criteria for pie chart
  yearPieChart
    .width(190)
    .height(190)
    .slicesCap(4)
    .innerRadius(50)
      .dimension(yearDim)
      .group(year_total);




  var seasonDim  = ndx.dimension(function(d) {return d.season;});
  //print_filter("seasonDim");  
  var season_totals = seasonDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("season_total"); 

  //Working out the total amount of seasons in group so can range/slices can be dynamically managed
  var amountOfSeasons = ndx.groupAll().reduceCount(function(d) {return d.season;}).value();
  //console.log(clubTotal2);

  //Associate chart with HTML element
  var seasonPieChart = dc.pieChart("#piechart-season");
  //criteria for pie chart
  seasonPieChart
    .width(190)
    .height(190)
    .slicesCap(amountOfSeasons)
    .innerRadius(50)
      .dimension(seasonDim)
      .group(season_totals);

  

  var clubMovTooDim  = ndx.dimension(function(d) {return d.club_moving_to;});
  //print_filter("clubDim");
  var clubMovTooGroup = clubMovTooDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("clubGroup");  

  //Working out the total amount of clubs in group so can range/slices can be dynamically managed
  var amountOfclubsMovToo = ndx.groupAll().reduceCount(function(d) {return d.club_moving_to;}).value();
  //console.log(clubTotal2);

  //Associate chart with HTML element
  var clubsMovTooPieChart = dc.pieChart("#piechart-clubsMovToo");
  //criteria for pie chart
  clubsMovTooPieChart
    .width(190)
    .height(190)
    .slicesCap(amountOfclubsMovToo)
    .innerRadius(50)
      .dimension(clubMovTooDim)
      .group(clubMovTooGroup);



      //THIS IS WHICH CLUBS HAVE SOLD TO THE DIV (In MONETRY TERMS)
  var leagueMovToDim  = ndx.dimension(function(d) {return d.league_moving_to;});
  //print_filter("leagueDim");
  var leagueMovToGroup = leagueMovToDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("leagueGroup");  

  //Associate chart with HTML element
  var leagueMovToPieChart = dc.pieChart("#piechart-leagueMovTo");
  //criteria for pie chart
  leagueMovToPieChart
    .width(190)
    .height(190)
    .slicesCap(3)
    .innerRadius(50)
      .dimension(leagueMovToDim)
      .group(leagueMovToGroup);


    
  var windowDim  = ndx.dimension(function(d) {return d.transfer_window;});
  //print_filter("leagueDim");
  var windowGroup = windowDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("leagueGroup");  

  //Associate chart with HTML element
  var windowPieChart = dc.pieChart("#piechart-window");
  //criteria for pie chart
  windowPieChart
    .width(190)
    .height(190)
    .slicesCap(2)
    .innerRadius(50)
      .dimension(windowDim)
      .group(windowGroup);


  var clubMovFromDim  = ndx.dimension(function(d) {return d.club_moving_from;});
  //print_filter("clubMovFromDim");
  var clubMovFromGroup = clubMovFromDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("clubMovFromGroup"); 

  //Working out the total amount of clubs in group so can range/slices can be dynamically managed
  var amountOfclubsMovFrom = ndx.groupAll().reduceCount(function(d) {return d.club_moving_from;}).value();

  //Associate chart with HTML element
  var clubMovFromPieChart = dc.pieChart("#piechart-clubMovFrom");
  //criteria for pie chart
  clubMovFromPieChart
    .width(190)
    .height(190)
    .slicesCap(amountOfclubsMovFrom)
    .innerRadius(50)
      .dimension(clubMovFromDim)
      .group(clubMovFromGroup);




//-----------------------------------------------------------------------------------------


  //Got amount of transfers and also top 10
  var clubMovFromGroupCount = clubMovFromDim.group().reduceCount();
  var clubMovFromGroupCount = clubMovFromGroupCount.top(Infinity).splice(1,clubMovFromGroupCount.top(Infinity).length);
  //Top 10 of array as 'top()' won't work again after be used once (guess object change?)
  var clubMovFromGroupTop10 = clubMovFromGroupCount.splice(0,10);
  print_filter("clubMovFromGroupTop10");


 //Associate chart with HTML element
  var clubMovFromPieChartTop10 = dc.pieChart("#piechart-clubMovFromTop10");
  //criteria for pie chart
  clubMovFromPieChartTop10
    .width(190)
    .height(190)
    .slicesCap(amountOfclubsMovFrom)
    .innerRadius(50)
      .dimension(clubMovFromDim)
      .group(clubMovFromGroup);








    dc.renderAll();
}