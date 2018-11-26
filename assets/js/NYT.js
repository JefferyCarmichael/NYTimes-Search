
//Base url
 const apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

 //NYT api -key.
 const parameter = {"api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"};
 
 //No search done yet
 let resultAvail = 0;

//Execute is search button is clicked.
$("#startSearch").on("click",(event)=>{
    event.preventDefault();

console.log("start");
//Get search data from form and add to parameter.
parameter.q = $("#search").val().trim();
console.log("q: "+parameter.q);

//Get beginning date from form.
const begin_date = $("#startYear").val().trim();
//Get ending date from form.
const end_date = $("#endYear").val().trim();

//If beginning date and end date are present, get dates and add them to parameter,  else skip it.
if(begin_date && end_date){
    parameter.begin_date = begin_date;
    parameter.end_date = end_date;

    console.log("begin_date: " +parameter.begin_date);
    console.log("end_date: " +parameter.end_date );
}
console.log(parameter);

const url = apiUrl + $.param(parameter);

console.log(url);

$.ajax({
    url: url,
    method:"get"
}).then((results)=>{
    console.log(results);
    // console.log(results.response.docs[0].headline.main )
    postArticles(results);
}).catch((err)=>{
    throw err;
});

});

function postArticles(results){
    if(resultAvail===0){
    $("#results").empty();
    }
 // console.log(results.response.docs[i].headline.main )
// console.log("results: "+ results.response.docs[0].headline );
const listArticle =$("<ul>");
//Get number of records requested.
const  records = $("#records").val().trim();
console.log(records)
for(let i =0; i< records; i++){
  //post article to web page.
var listItems =$("<li>");

    listItems.append("<h5>"+"<b>" + results.response.docs[i].headline.main+"</b>"+"</h5>");
    listItems.append("<p>" + results.response.docs[i].snippet+"</p>");
    listItems.append("<a href =" + "'" + results.response.docs[i].web_url+"'" +">" +results.response.docs[i].web_url+"</a>");
    listArticle.append(listItems);
$("#results").prepend(listArticle);
}
resultAvail =1;
}

//Clears result field.
function clear(){
    $("#results").empty();
    $("#results").html("<i class='fas fa-minus-circle blank'> Empty</i>")
    resultAvail=0;
}

$("#clearSearch").on("click",(event)=>{
    event.preventDefault();
   clear();
});