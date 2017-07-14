
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

//To track the device size for orientiation checking
var device_size;


/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
if (window.matchMedia("(min-width: 1200px)").matches) {

    device_size = "Large";
    console.log("Large Device");

    barChartWidth = 700;
    barChartHeight = 250;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";

    //Setting the table to have less columns for small screen sizes
    datatableSize = "Big";

    seasonalFeesWidth = 500;
    seasonalFeesHeight = 250;

    movToWidth = 400;
    movToHeight = 150;


    movFromWidth = 400;
    movFromHeight = 150;

    //Setting the table to have less columns for small screen sizes
    datatableSize = "Big";
}



/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if (window.matchMedia("(min-width: 992px)").matches) {

    device_size = "Medium";
    console.log("Medium Device");


    barChartWidth = 985;
    barChartHeight = 230;
    barChartYTicks = 5;
    barChartYAxisLabel = "Millions (£)";

    //Setting the table to have less columns for small screen sizes
    datatableSize = "Big";

    seasonalFeesWidth = 985;
    seasonalFeesHeight = 250;

    movToWidth = 730;
    movToHeight = 150;


    movFromWidth = 730;
    movFromHeight = 150;


}


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
else if (window.matchMedia("(min-width: 768px)").matches) {

    device_size = "Small";   
    console.log("Small Device");
 
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

    device_size = "Very Small";
    console.log("VERY Small Device");

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
    movToHeight = 150;


    movFromWidth = 600;
    movFromHeight = 150;

}


//To track the device size for orientiation checking, if size changes on orientation change then need to reload page to reformat layout.
//Only want to target specific instances where it has shown to be an issue (rather than reload everytime) to avoid impact on user.
//Design decision was to make output as responsive as possible (graph resizing for device) but the pay-off is that this reload is required
//on occassion. As reload only taakes around 5 seconds and users are unlikly to repeatedly switch device orientation it was deemed the 
//better approach.
$(window).on("orientationchange",function(){
    //if an iPad is turned from portrait to landscape
    if (device_size == "Small" && screen.width > 991){
        location.reload();
    }
    //if an iPad is turned from landscape to portrait
    if (device_size == "Medium" && screen.width < 992){
        location.reload();
    }
    //if an iPadPro is turned from portrait to landscape
    if (device_size == "Medium" && screen.width > 1199){
        location.reload();
    }
    //if an iPadPro is turned from landscape to portrait
    if (device_size == "Large" && screen.width < 1200){
        location.reload();
    }
});