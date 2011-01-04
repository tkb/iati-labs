var iatitable = "#iatitable";
var tablexslt = "xslt/record.xslt.xml";
var tabs = "#tabs";
var activityheaderRow = "#iatitable tbody tr:first-child";
var expandbuttons = ".activityexpand";
var expandtext = "+";
var collapsetext = "-";
var expandicon = "images/iatiplus.png";
var collapseicon = "images/iatiminus.png";
var collapseAllButton = ".collapseall";
var expandAllButton = ".expandall";
var defaultQuery =  "/data/dfid/RW";


function loadTableData(){
    $(iatitable).xslt( tablexml, tablexslt );
}

function expand(button){
    button.attr("alt", collapsetext).attr("src",collapseicon).parents('tr').siblings().fadeIn('fast');
}

function collapse(button){
    button.attr("alt", expandtext).attr("src",expandicon).parents('tr').siblings().fadeOut('fast');
}

function collapseAll(){
    collapse($(expandbuttons));
}

function expandAll(){
    expand($(expandbuttons));
}


function toggleActivity(){
    var mode = $(this).attr("alt");
    if (mode == expandtext){
        expand($(this));
    }else{
        collapse($(this));
    }
}

function loadTab(event, ui){
    if ($(ui.tab).find('spa').html()){
        loadTableData();
    }
}



function updateDescription(source, country) {
    var descriptionText = "IATI Data";
    var countryName;
    var sourceName;

    var join = " for " ;
    if ( source != "any" ) {
        sourceName = getSourceName(source);
        if (sourceName == "undefined" || sourceName == "") {
            sourceName = source;
        }
        descriptionText += " for " + sourceName;
        join = " in ";
    }
    if ( country != "any" ) {
        countryName = getCountryName(country);
        if (countryName == "undefined" || countryName == "") {
            countryName = country;
        }
        descriptionText += join + countryName;
    }
    $('#table_title').html(descriptionText);
}

function getSource(queryString) {
    var pat=/.*\/(\w+)\/(\w+)/; 
    return queryString.replace(pat, "$1");
}


function getCountry(queryString) {
    var pat=/.*\/(\w+)\/(\w+)/; 
    return queryString.replace(pat, "$2");
}

$(function(){
    $(tabs).tabs({ fx: { opacity: 'toggle'}});
    $(tabs).bind('tabsload', loadTab);
    $(collapseAllButton).click(collapseAll);
    $(expandAllButton).click(expandAll);
    $(expandbuttons).live('click',toggleActivity);
    tablexml = $.query.get('data');
    if (tablexml == "") {
        tablexml = defaultQuery;
    }
    loadTableData();
    updateDescription(getSource(tablexml), getCountry(tablexml));
});
