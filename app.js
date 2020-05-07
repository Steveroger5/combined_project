const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const axios = require('axios').default;
const ejs=require("ejs");
const lodash=require("lodash");
const URL="https://api.covid19api.com/summary";
const URL2="https://coronavirus-19-api.herokuapp.com/countries";
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//****************************



//******************************


//***************************
app.get("/",function(req,res){
  //*************************************
  var labele=[];
  var piedata2=[];
  var top_gnames=[];
  var global_top_card_data;
  var top_gcountry=[];
  var usedtop_gcountry=[];
  var top_grecover=[];
  var top_gconfirmed=[];
  var top_gdeaths=[];
  var perMillionCases=[];
  var specific_india_top_card_data=[];
  const india_top_card_dat=[];
  //******************************************
  axios.get(URL2)
  .then(function(response){
     for(var i=0;i<11;i++){
          perMillionCases.push(response.data[i]);
     }
     console.log(perMillionCases[1].testsPerOneMillion);    //do not delete this
  })
  .catch(function(error){
    console.log(error);
  })
  axios.get(URL)
    .then(function (response) {
      global_top_card_data=response.data.Global;
      var india_top_card_date=response.data.Countries;
      india_top_card_date.forEach(function(item){
        if(item.Country === "India"){
          specific_india_top_card_data=item;
        }
      })
      top_gcountry=india_top_card_date;
      // india_top_card_data.forEach(function(country){
      //   if(country.Country==="United States of America"||country.Country==="Italy"||country.Country==="France"||country.Country==="United Kingdom"||country.Country==="Spain"){
      //     if(country.Country==="United States of America"){
      //       labele.push('USA');
      //     }
      //     else if(country.Country==="United Kingdom"){
      //       labele.push('UK');
      //     };
      //     top_gcountry.push(country.TotalConfirmed);
      // }});
      top_gcountry.sort(function(a,b){return b.TotalConfirmed-a.TotalConfirmed});
      for(var i=0;i<5;i++){
        piedata2.push(top_gcountry[i]);
      }
      for(var i=0;i<10;i++){
        usedtop_gcountry.push(top_gcountry[i]);
        top_gconfirmed.push(top_gcountry[i].TotalConfirmed);
        top_grecover.push(top_gcountry[i].TotalRecovered);
        top_gdeaths.push(top_gcountry[i].TotalDeaths);
      }
      res.render("index",{global_top_card_data:global_top_card_data,
        forindia:specific_india_top_card_data,
        india_top_card_data:india_top_card_date,
        piedata:piedata2,
        bar_confirm:top_gconfirmed,
        bar_recover:top_grecover,
        bar_death:top_gdeaths,
        bar_name:usedtop_gcountry,
        perMillionCases:perMillionCases
      })
    })
    .catch(function (error) {
      console.log(err);
    });
});







app.listen(3000,function(){
  console.log("server up at 3000");
});
