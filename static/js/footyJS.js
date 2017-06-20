
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
      //A minor issue within the transfer_window data causing to an 'undefined' to be returned and causing crossfilter to fall 
      //over, rather than trawling the 3K rows of data to find it for this small project, am using fix:
      //https://stackoverflow.com/questions/35119862/maximum-call-stack-size-exceeded-crossfilter
  var transfer_windowDim = ndx.dimension(function(d) {return d.transfer_window;});
  var league_moving_fromDim = ndx.dimension(function(d) {return d.league_moving_from;});
  var league_moving_toDim = ndx.dimension(function(d) {return d.league_moving_to;});
  var club_moving_fromDim = ndx.dimension(function(d) {return d.club_moving_from;});
  var club_moving_toDim = ndx.dimension(function(d) {return d.club_moving_to;});
  var feeDim = ndx.dimension(function(d) {return d.fee;});  
  var dateDim = ndx.dimension(function(d) {return d.date;});
  var seasonDim  = ndx.dimension(function(d) {return d.season;});

  //var yearDim  = ndx.dimension(function(d) {return +d.Year;});  


  /*  ----------------------------------------------------------------------------------------------

      Linear chart showing ALL tranfer activity involving Premiership and Championship league teams

      ---------------------------------------------------------------------------------------------- */
 
  //Group fee's paid by date    
  var feeDateDim_filter = dateDim.group().reduceSum(function(d) {return d.fee;});
  //Getting max and min values for time based chart
  var minDate = dateDim.bottom(1)[0].date;
  var maxDate = dateDim.top(1)[0].date;
  //Associate graph with HTML anchor and define chart 
  var chartTotalFees = dc.barChart("#bar-chart-overall-transfer-spend");
  chartTotalFees
       .width(document.getElementById('bar-chart-overall-transfer-spend').clientWidth)
       .height(document.getElementById('bar-chart-overall-transfer-spend').clientheight) 
//       .width(barWidth)
//       .height(barHeight)       
       .margins({top: 10, right: 50, bottom: 30, left: 80})
       .dimension(dateDim)
       .group(feeDateDim_filter)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .brushOn(false)
       .ordinalColors(['#e41a1c']) //Line colour
       .yAxisLabel("Amount Spent (£'s)")
       .xAxisLabel("Year")
       .yAxis().ticks(5);


  //Associate graph with HTML anchor and define chart 
  var seasonalAmount = seasonDim.group().reduceCount(function(d) {return d.fee;});
  var chartSeasonalAmounts = dc.pieChart("#piechart-seasonal-total-amount");
  chartSeasonalAmounts
    .width(120)
    .height(120)
    .innerRadius(10)
    .ordinalColors(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628']) //Segment colour
    .dimension(seasonDim)
    .group(seasonalAmount);



   var totalFeesSeasonal = ndx.groupAll().reduceSum(function (d) {
       return d.fee;
   });

   var chartTotalSpend = dc.numberDisplay("#total-transfer-spend");
   chartTotalSpend
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalFeesSeasonal)
       .formatNumber(d3.format(".3s"));

   

//Associate chart with HTML element
  var seasonalFees = seasonDim.group().reduceSum(function(d) {return d.fee;});
  var chartSeasonalFees = dc.rowChart("#rowchart-seasonal-total-fees");
  chartSeasonalFees
    .width(490)
    .height(190)
    .dimension(seasonDim)
    .group(seasonalFees)
    .xAxis().ticks(5)
    
   var totalFees = ndx.groupAll().reduceSum(function (d) {
       return d.fee;
   });




  var transferWindow_totals = transfer_windowDim.group().reduceSum(function(d) {return d.fee;});
  //print_filter("season_total"); 

  //Associate chart with HTML element
  var windowPieChart = dc.pieChart("#piechart-window");
  //criteria for pie chart
  windowPieChart
    .width(190)
    .height(190)
    .innerRadius(50)
    .dimension(transfer_windowDim)
    .group(transferWindow_totals);



  var leagueMovToDim  = ndx.dimension(function(d) {return d.league_moving_to;});
  var leagueMovToGroup = leagueMovToDim.group().reduceCount(function(d) {return d.fee;});
  var leagueMovToPieChart = dc.pieChart("#piechart-leagueMovTo");
  //criteria for pie chart
  leagueMovToPieChart
    .width(190)
    .height(190)
    .innerRadius(50)
    .dimension(leagueMovToDim)
    .group(leagueMovToGroup);


  var leagueMovFromDim  = ndx.dimension(function(d) {return d.league_moving_from;});
  var leagueMovFromGroup = leagueMovFromDim.group().reduceCount(function(d) {return d.fee;});
  var leagueMovFromPieChart = dc.pieChart("#piechart-leagueMovFrom");
  //criteria for pie chart
  leagueMovFromPieChart
    .width(190)
    .height(190)
    .innerRadius(50)
    .dimension(leagueMovFromDim)
    .group(leagueMovFromGroup);


/*
  var preTeamsDimGrp = preTeamsDim.group();

     selectField = dc.selectMenu('#menu-select')
       .dimension(preTeamsDim)
       .group(preTeamsDimGrp);
*/

    dc.renderAll();
}