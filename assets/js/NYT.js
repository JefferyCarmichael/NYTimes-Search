
//Base url
 var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

 //NYT api -key.
 var parameter = {"api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"};


//Execute is search button is clicked.
$("#startSearch").on("click",function(event){
    event.preventDefault();

console.log("start");
//Get search data from form and add to parameter.
parameter.q = $("#search").val().trim();
console.log("q: "+parameter.q);

//Get beginning date from form.
var begin_date = $("#startYear").val().trim();
//Get ending date from form.
var end_date = $("#endYear").val().trim();

//If beginning date and end date are present, get dates and add them to parameter,  else skip it.
if(begin_date && end_date){
    parameter.begin_date = begin_date;
    parameter.end_date = end_date;

    console.log("begin_date: " +parameter.begin_date);
    console.log("end_date: " +parameter.end_date );
}
console.log(parameter);

var url = apiUrl + $.param(parameter);

console.log(url);

$.ajax({
    url: url,
    method:"get"
}).then(function(results){
    console.log(results);
    // console.log(results.response.docs[0].headline.main )
    postArticles(results);
}).catch(function(err){
    throw err;
});

});

function postArticles(results){
    $("#results").empty();
  
    // console.log(results.response.docs[i].headline.main )
// console.log("results: "+ results.response.docs[0].headline );
var listArticle =$("<ul>");
//Get number of records requested.
var  records = $("#records").val().trim();
console.log(records)
for(var i =0; i< records; i++){
  
var listItems =$("<li>");

    listItems.append("<h5>"+"<b>" + results.response.docs[i].headline.main+"</b>"+"</h5>");
    listItems.append("<p>" + results.response.docs[i].snippet+"</p>");
    listItems.append("<a href =" + "'" + results.response.docs[i].web_url+"'" +">" +results.response.docs[i].web_url+"</a>");
    listArticle.append(listItems);
$("#results").append(listArticle);
}

}

//Clears result field.
function clear(){
    $("#results").empty();
    $("#results").html("<i class='fas fa-minus-circle blank'> Empty</i>")
}

$("#clearSearch").on("click",function(event){
    event.preventDefault();
   clear();
});