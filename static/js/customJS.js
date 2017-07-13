
/*  This is to change the chart sizes based on media queries 
    match up with bootstrap for now, just for ease of use */


var barChartWidth;
var barChartHeight;

var seasonalFeesHeight;
var seasonalFeesWidth;

var movToHeight;
var movToWidth;

var movFromHeight;
var movFromWidth;

var datatableSize;

/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
if (window.matchMedia("(min-width: 1200px)").matches) {
    barChartWidth = 700;
    barChartHeight = 190;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";

    //Setting the table to have less columns for small screen sizes
    datatableSize = "Big";
}



/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if (window.matchMedia("(min-width: 992px)").matches) {
    barChartWidth = 950;
    barChartHeight = 230;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";

    //Setting the table to have less columns for small screen sizes
    datatableSize = "Big";

    seasonalFeesWidth = 950;
    seasonalFeesHeight = 250;

    movToWidth = 710;
    movToHeight = 150;


    movFromWidth = 710;
    movFromHeight = 150;


}


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
else if (window.matchMedia("(min-width: 768px)").matches) {

    barChartWidth = 750;
    barChartHeight = 200;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";

     //Setting the table to have less columns for small screen sizes
    datatableSize = "Small";

    seasonalFeesWidth = 720;
    seasonalFeesHeight = 200;

    movToWidth = 525;
    movToHeight = 150;


    movFromWidth = 525;
    movFromHeight = 150;


}




/***********************************************/
/* very Small devices (phones, 768px to 991px) */
/*                 col-xs-*                    */
/***********************************************/
else if (window.matchMedia("(max-width: 767px)").matches) {

  //Alert to tell users for best orientation
  if(window.innerHeight > window.innerWidth){ 
      alert("The charts are best viewed in landscape mode on small mobile devices"); 
    }

    //Bar chart
    barChartWidth = 650;
    barChartHeight = 170;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";
    //Setting the table to have less columns for small screen sizes
    datatableSize = "Small";

    seasonalFeesWidth = 600;
    seasonalFeesHeight = 210;

    movToWidth = 600;
    movToHeight = 170;


    movFromWidth = 600;
    movFromHeight = 170;






}