
//Queuing data so it all loads before 'makeGraph' is invoked 
queue()
   .defer(d3.json, "data/FootyData.json")
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
  var transfer_windowDim = ndx.dimension(function(d) {return d.transfer_window;});
  var league_moving_fromDim = ndx.dimension(function(d) {return d.league_moving_from;});
  var league_moving_toDim = ndx.dimension(function(d) {return d.league_moving_to;});
  var club_moving_toDim = ndx.dimension(function(d) {return d.club_moving_from;});
  var club_moving_fromDim = ndx.dimension(function(d) {return d.club_moving_to;});
  var feeDim = ndx.dimension(function(d) {return d.fee;});  
  var dateDim = ndx.dimension(function(d) {return d.date;});
  var yearDim  = ndx.dimension(function(d) {return +d.Year;});  


  /*  ----------------------------------------------------------------------------------------------

      Linear chart showing ALL tranfer activity involving Premiership and Championship league teams

      ---------------------------------------------------------------------------------------------- */
 
  //Generates a view of    
  var feeDateDim_filter = dateDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("feeDateDim_filter");  

  //Getting max and min values for time based chart
  var minDate = dateDim.bottom(1)[0].date;
  var maxDate = dateDim.top(1)[0].date;

  /* 
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
   */

  var chartTransfer = dc.barChart("#chart-bar-overall-transfer-spend");
  //var chartTransfer = dc.scatterPlot("#chart-line-transfer");
  chartTransfer
       .width(900)
       .height(300)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(feeDateDim_filter)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       //'Gap' put in for bar chart
       .gap(65)
       .yAxisLabel("Amount Spent (£'s)")
       .xAxisLabel("Year")
       .yAxis().ticks(5);






  // Returns a result of all tranfers fees based on year
  // Grouping for year data
  var year_total = yearDim.group().reduceSum(function(d) {return d.fee;});
  //Working out the total amount of unique years in group so range/slices can be dynamically managed
  var amountOfYears = ndx.groupAll().reduceCount(function(d) {return d.Year;}).value();
  //print_filter("amountOfYears");

  //Associate chart with HTML element
  var yearPieChart = dc.pieChart("#piechart-year");
  //criteria for pie chart
  yearPieChart
    .width(190)
    .height(190)
    .slicesCap(amountOfYears)
    .innerRadius(50)
    .dimension(yearDim)
    .group(year_total);



  var seasonDim  = ndx.dimension(function(d) {return d.season;});
  //print_filter("seasonDim");  
  var season_totals = seasonDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("season_total"); 

  //Working out the total amount of unique seasons in group so can range/slices can be dynamically managed
  var amountOfSeasons = ndx.groupAll().reduceCount(function(d) {return d.season;}).value();
  //print_filter("amountOfSeasons");
  //console.log("Amount of season: "+amountOfSeasons);

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
  //print_filter("clubMovTooDim");
  var clubMovTooGroup = clubMovTooDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("clubMovTooGroup");  

  //Working out the total amount of unique clubs in group so range/slices can be dynamically managed
  var amountOfclubsMovToo = ndx.groupAll().reduceCount(function(d) {return d.club_moving_to;}).value();
  //console.log(amountOfclubsMovToo);

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

  //Working out the total amount of unique clubs in group so range/slices can be dynamically managed
  var amountOfclubsMovFrom = ndx.groupAll().reduceCount(function(d) {return d.club_moving_from;}).value();
  //console.log(amountOfclubsMovFrom);

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




  var clubMovFromGroupCount = clubMovFromDim.group();
  print_filter("clubMovFromGroupCount");

  var clubMovFromGroupCountPieChart = dc.pieChart("#piechart-clubMovFromCount");
  clubMovFromGroupCountPieChart
    .width(190)
    .height(190)
    .slicesCap(amountOfclubsMovFrom)
    .innerRadius(50)
    .dimension(clubMovFromDim)
    .group(clubMovFromGroupCount);  


 /* --------------------------------------------------------------------------------------------- */
  var clubMovFromGroupCountTop10 = clubMovFromDim.group().top(10);
  print_filter("clubMovFromGroupCountTop10");
  
 //Associate chart with HTML element
  var clubMovFromPieChartCountTop10PieChart = dc.pieChart("#piechart-clubMovFromCountTop10");
  //criteria for pie chart
  clubMovFromPieChartCountTop10PieChart
    .width(190)
    .height(190)
    .slicesCap(10)
    .innerRadius(50)
    .dimension(clubMovFromDim)
    .group(clubMovFromGroupCountTop10);  
 




    dc.renderAll();
}