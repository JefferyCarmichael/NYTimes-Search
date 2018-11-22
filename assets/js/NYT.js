
$("#startSearch").on("click",function(){

    var  URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

console.log("start");

var searchText = $("#search").val().trim();

console.log("search: "+searchText);

var  records = $("#records").val().trim();

console.log("records: " +records);

var startYear = $("#startYear").val().trim();

console.log("startYear: " +startYear);

var endYear = $("#endYear").val().trim();

console.log("endYear: " +endYear);

});