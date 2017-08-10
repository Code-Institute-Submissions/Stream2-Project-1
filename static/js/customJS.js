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
var datatableSize;

/********************************************************/
/* Very Large devices (large desktops 1400px and above) */
/*                    col-lg-*                          */
/********************************************************/
if (window.matchMedia("(min-width: 1400px)").matches) {

    barChartWidth = 790;
    barChartHeight = 235;

    seasonalFeesWidth = 540;
    seasonalFeesHeight = 235;

    SoldToWidth = 430;
    SoldToHeight = 150;

    SoldFromWidth = 430;
    SoldFromHeight = 150;

    datatableSize = 50;
    //window.alert("Min screen size of 1400");
}


/***************************************************/
/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
/***************************************************/
else if ((window.matchMedia("(min-width: 1200px)").matches)  && (window.matchMedia("(max-width: 1399px)").matches)) {

    barChartWidth = 730;
    barChartHeight = 235;

    seasonalFeesWidth = 510;
    seasonalFeesHeight = 235;

    SoldToWidth = 400;
    SoldToHeight = 150;

    SoldFromWidth = 400;
    SoldFromHeight = 150;

    datatableSize = 50;
    //window.alert("Min screen size of 1200, Max 1399");    
}




/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if ((window.matchMedia("(min-width: 992px)").matches)  && (window.matchMedia("(max-width: 1199px)").matches)) {
    barChartWidth = 1000;
    barChartHeight = 230;

    datatableSize = "Big";

    seasonalFeesWidth = 985;
    seasonalFeesHeight = 250;

    SoldToWidth = 730;
    SoldToHeight = 150;

    SoldFromWidth = 730;
    SoldFromHeight = 150;

    datatableSize = 25;
    //window.alert("Min screen size of 992, Max 1199");    
}


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
else if ((window.matchMedia("(min-width: 768px)").matches)  && (window.matchMedia("(max-width: 991px)").matches)) {
    barChartWidth = 750;
    barChartHeight = 200;

    datatableSize = "Small";

    seasonalFeesWidth = 720;
    seasonalFeesHeight = 200;

    SoldToWidth = 475;
    SoldToHeight = 150;

    SoldFromWidth = 475;
    SoldFromHeight = 150;

    datatableSize = 15;
    //window.alert("Min screen size of 768, Max 991");    
}


/*******************************************************************/
/* very Small devices (phones less than 768px but larger than 580) */
/*                 col-xs-*                    */
/*******************************************************************/
else if ((window.matchMedia("(min-width: 581px)").matches)  && (window.matchMedia("(max-width: 767px)").matches)) {

    barChartWidth = 630;
    barChartHeight = 170;

    datatableSize = "Small";

    seasonalFeesWidth = 630;
    seasonalFeesHeight = 210;

    SoldToWidth = 630;
    SoldToHeight = 150;

    SoldFromWidth = 630;
    SoldFromHeight = 150;

    datatableSize = 10;

    //window.alert("Min screen size of 581, Max 767");    

    //Alert to tell users for best orientation
    if(window.innerHeight > window.innerWidth){ 
      alert("To be presented correctly on small mobile devices the charts need to viewed in landscape. Due to this the charts will be removed from your current portrait view. When you change your device orientation to landscape, the charts will automatically reload."); 
    }
}


/***********************************************/
/* very Small devices (phones less than 580px) */
/*                 col-xs-*                    */
/***********************************************/
else if (window.matchMedia("(max-width: 580px)").matches) {

    //window.alert("Max screen size of 580");    

    barChartWidth = 565;
    barChartHeight = 170;

    datatableSize = "Small";

    seasonalFeesWidth = 545;
    seasonalFeesHeight = 210;

    SoldToWidth = 540;
    SoldToHeight = 150;

    SoldFromWidth = 540;
    SoldFromHeight = 150;

    datatableSize = 10;

    //Alert to tell users for best orientation
    if(window.innerHeight > window.innerWidth){ 
      alert("To be presented correctly on small mobile devices the charts need to viewed in landscape. Due to this the charts will be removed from your current portrait view. When you change your device orientation to landscape, the charts will automatically reload."); 
    }
}


/******************************************************************************************************************************************************* 	
	Design decision was to make output as responsive as possible (inc graph resizing for different devices) but the pay-off is that a reload is required.
  	As reload only takes around 5 seconds and users are unlikly to repeatedly switch device orientation it was deemed the better approach.
********************************************************************************************************************************************************/
$(window).on("orientationchange", function() {
       location.reload();
});



window.alert("Window Width detected" +$(window).width());


