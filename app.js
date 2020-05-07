const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const axios = require('axios').default;
const ejs=require("ejs");
const URL="https://api.covid19api.com/summary";

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var global_top_card_data;
var india_top_card_data=[];
var labele=[];
var piedata2=[];
app.get("/",function(req,res){
  var labele=[];
  var piedata2=[];
  axios.get(URL)
    .then(function (response) {
      global_top_card_data=response.data.Global;
      india_top_card_data=response.data.Countries;
      india_top_card_data.forEach(function(country){
        if(country.Country==="United States of America"||country.Country==="Italy"||country.Country==="France"||country.Country==="United Kingdom"||country.Country==="Spain"){
          if(country.Country==="United States of America"){
            labele.push('USA');
            piedata2.push(country.TotalConfirmed);
          }
          else if(country.Country==="United Kingdom"){
            labele.push('UK');
            piedata2.push(country.TotalConfirmed);
          }
          else{
          labele.push(country.Country);
          piedata2.push(country.TotalConfirmed);}
        }
      })
      console.log(labele);
      console.log(piedata2);
      res.render("index",{global_top_card_data:global_top_card_data,india_top_card_data:india_top_card_data,piedata:piedata2,labels:labele})
    })
    .catch(function (error) {
      console.log(error);
    });
});







app.listen(3000,function(){
  console.log("server up at 3000");
});
