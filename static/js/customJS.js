
/*  This is to change the chart sizes based on media queries 
    match up with bootstrap for now, just for ease of use */

/***********************************************/
/* very Small devices (phones, 768px to 991px) */
/*                 col-xs-*                    */
/***********************************************/
if (window.matchMedia("(max-width: 767px)").matches) {

  //Alert to tell users for best orientation
  if(window.innerHeight > window.innerWidth){ 
      alert("The charts are best viewed in landscape mode on small mobile devices"); 
    }

    barChartWidth = 350;
    barChartHeight = 120;
    barChartYTicks = 5
    barChartYAxisLabel = "Millions (£)"

}





var barChartWidth;
var barChartHeight;


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
if (window.matchMedia("(min-width: 768px)").matches) {

    barChartWidth = 350;
    barChartHeight = 120;
    barChartYTicks = 5
    barChartYAxisLabel = "Millions (£)"

}


/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if (window.matchMedia("(min-width: 992px)").matches) {
    barChartWidth = 700;
    barChartHeight = 190;
}

/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
else if (window.matchMedia("(min-width: 1200px)").matches) {
    barChartWidth = 700;
    barChartHeight = 190;
}