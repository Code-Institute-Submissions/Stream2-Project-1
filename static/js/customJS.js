/*********************************************************************************
  This section is to change the chart sizes based on media queries to enhance the
  responsiveness of the site to the end user devices.

  It is set up to be consistent with bootstraps default setting to provide a 
  consistent experience for the end user.
**********************************************************************************/

//Bar Chart 'Transfer Spending'
var barChartWidth;
var barChartHeight;

//Row Chart 'Value of Seasonal Transfers'
var seasonalFeesHeight;
var seasonalFeesWidth;

//Row Chart 'League Sold To'
var SoldToHeight;
var SoldToWidth;

//Row Chart 'League Sold From'
var SoldFromHeight;
var SoldFromWidth;

//To specify size (length) of table
//25 rows xs/sm, 50 rows md/lg
var datatableSize;

//To track the device size (for orientiation checking)
var device_size;

/***************************************************/
/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
/***************************************************/
if (window.matchMedia("(min-width: 1200px)").matches) {

	device_size = "Large";

    barChartWidth = 790;
    barChartHeight = 235;

    seasonalFeesWidth = 540;
    seasonalFeesHeight = 235;

    SoldToWidth = 430;
    SoldToHeight = 150;

    SoldFromWidth = 430;
    SoldFromHeight = 150;

    datatableSize = "Big";
}


/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if (window.matchMedia("(min-width: 992px)").matches) {

    device_size = "Medium";

    barChartWidth = 1000;
    barChartHeight = 230;

    datatableSize = "Big";

    seasonalFeesWidth = 985;
    seasonalFeesHeight = 250;

    SoldToWidth = 730;
    SoldToHeight = 150;

    SoldFromWidth = 730;
    SoldFromHeight = 150;
}


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
else if (window.matchMedia("(min-width: 768px)").matches) {

    device_size = "Small";

    barChartWidth = 750;
    barChartHeight = 200;

    datatableSize = "Small";

    seasonalFeesWidth = 720;
    seasonalFeesHeight = 200;

    SoldToWidth = 475;
    SoldToHeight = 150;

    SoldFromWidth = 475;
    SoldFromHeight = 150;
}


/***********************************************/
/* very Small devices (phones less than 768px) */
/*                 col-xs-*                    */
/***********************************************/
else if (window.matchMedia("(max-width: 767px)").matches) {

    device_size = "Very Small";

    barChartWidth = 565;
    barChartHeight = 170;

    datatableSize = "Small";

    seasonalFeesWidth = 545;
    seasonalFeesHeight = 210;

    SoldToWidth = 545;
    SoldToHeight = 150;

    SoldFromWidth = 545;
    SoldFromHeight = 150;


    //Alert to tell users for best orientation
    if(window.innerHeight > window.innerWidth){ 

      alert("To be presented correctly on small mobile devices the charts need to viewed in landscape. Due to this the charts have been removed from your current portrait view. When you change your device orientation to landscape, the charts will automatically reload."); 


    }


}



/******************************************************************************************************************************************************* 	
	Design decision was to make output as responsive as possible (inc graph resizing for different devices) but the pay-off is that a reload is required.
  	As reload only takes around 5 seconds and users are unlikly to repeatedly switch device orientation it was deemed the better approach.

	To track the device size for orientiation checking, if size changes on orientation change then need to reload page to reformat the layout.
	Only want to target specific instances where it has shown to be an issue (rather than reload on devices it isn't required) to avoid impact on user.
********************************************************************************************************************************************************/
$(window).on("orientationchange", function() {

    //if an iPhone is turned from portrait to landscape
    if (device_size == "Very Small"){
        //always want it to reload
        location.reload();
    }
    //if an iPad is turned from portrait to landscape
    if (device_size == "Small" && screen.width > 991) {
        location.reload();
    }
    //if an iPad is turned from landscape to portrait
    if (device_size == "Medium" && screen.width < 992) {
        location.reload();
    }
    //if an iPadPro is turned from portrait to landscape
    if (device_size == "Medium" && screen.width > 1199) {
        location.reload();
    }
    //if an iPadPro is turned from landscape to portrait
    if (device_size == "Large" && screen.width < 1200) {
        location.reload();
    }
});
