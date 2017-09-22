/*********** Model *********/
var results = {
  shelters: new ShelterList()
}

function ShelterList(){
  this.shelters = [];
}

ShelterList.prototype.addShelter = function(name, wishlist, needs, website){
  this.shelters.push(new Shelter(name, wishlist, needs, website));
}

//Sorts shelters in decreasing order based on number of items needed
ShelterList.prototype.sortShelters = function(){
  var filteredShelters = this.shelters.sort(function(s1, s2){
    return s1.needs.length > s2.needs.length;
  });
  this.shelters.reverse();
  return this.shelters;
}

ShelterList.prototype.getShelters = function(){
 return this.shelters;
}

function Shelter(name, wishlist, needs, website){
  this.name = name;
  this.wishlist = wishlist;
  this.needs = needs;
  this.website = website;
}

/*********** Controller *********/
var controller = {
 /*Will retrieve the items as needs from the url query string 
  and retrieve the shelters that need these items*/
  getShelterResults: function(){
    var needs = view.getURLParamsAll("item");
    view.showSelectedNeeds(needs);
    controller.retrieveShelters(needs);
  },
  retrieveShelters: function(userSelections){
    var url = 'http://www.maribelduran.com/Hacking4Humanity2017/web/js/ShelterDictionary.JSON';
    this.getRequest(userSelections, url).then(function(response){
      var shelters = JSON.parse(response);
      shelters.forEach(function(obj){
        var shelterNeeds = capitalizeNeeds(obj.needs);
        var userSelectedNeeds = capitalizeNeeds(userSelections);
        //check to see if there is at least one matching need 
        if (findOne(shelterNeeds, userSelectedNeeds)){
          // if there as least one matching need, find the interescting needs
          var commonNeeds = userSelectedNeeds.filter(function(n){
              return shelterNeeds.indexOf(n) !== -1;
          });
          results.shelters.addShelter(obj.shelter, obj.wishList, commonNeeds, obj.website);
        }
      });
      //sort and show shelters
       results.shelters.sortShelters(); 
       var shelterList = results.shelters.sortShelters(); 
       view.postShelters(shelterList);
    },function(error) {
      console.error("Failed!", error);
    })
  },
  getRequest:function(needs, url){
    return new Promise(function(resolve,reject){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
     if (request.status >= 200 && request.status < 400)  { // Success!
        resolve(request.response);
      }else{
        if (request.status == 404){
           resolve(request.response);
        }
        reject(Error(request.statusText)); // We reached our target server, but it returned an error
       }
      };
      request.onerror = function() {
      reject(Error("Network Error"));  // There was a connection error of some sort
      };
    request.send();
 });
}
};


/*********** View *********/
var view = {
  /*Parameters for the Share Dialog in Facebook SDk*/
  fbShareDialogParams: {
    method: 'share',
    display: 'popup',
    mobile_iframe: true,
    href: 'http://www.maribelduran.com/Hacking4Humanity2017/web/index.html',
    picture: 'https://raw.githubusercontent.com/maribelduran/Hacking4Humanity2017/master/web/images/EmpowerHerSF_square.png',
    description: 'I am fighting against Human Trafficking by helping women shelters in SF. Come join the movement.',
    caption: 'EMPOWERHER:SF',
    quote: 'Be the change that you wish to see in the world.” -Gandhi',
 },
  setUpEventListeners: function(){
   var btn_share_fb=document.getElementById("btn-share-fb");
   btn_share_fb.addEventListener("click", function(){
      FB.ui(this.fbShareDialogParams, function(response) {});
   }.bind(this));
  },
  getURLParamsAll: function(name){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    if (hash[0] == name){
     var item = decodeURIComponent(hash[1]).replace("+", " ");
     vars.push(item);
    }
  }
  return vars;
 },
 /*Creates elements to show shelters in each shelter-card.*/
 postShelters: function(shelter){
  var shelterList = document.getElementById("shelter-list");
  //clear current elements in the shelter-list div
  shelterList.innerHTML = ""; 
  shelter.forEach(function(s){
   
    var col_md_4 = document.createElement("div");
    col_md_4.className = "col-md-4";
    col_md_4.classList.add('col-sm-6');
    shelterList.appendChild(col_md_4); 

    var shelterCard = document.createElement("div");
    shelterCard.className = "shelter-card";
    col_md_4.appendChild(shelterCard); 

    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    shelterCard.appendChild(wrapper); 

    var cardImg = document.createElement("div");
    cardImg.className = "card-img";
    wrapper.appendChild(cardImg); 

    var card_img_src = document.createElement("img");
    card_img_src.className = "card-img_src";
    card_img_src.classList.add('center-block');
    /*This will be updated in the future with corresponding shelter images */
    card_img_src.src = "images/shelter.png"
    cardImg.appendChild(card_img_src); 

    var h4 = document.createElement("h4");
    h4.id = "shelterName"
    h4.className = "name";
    h4.innerHTML = s.name;
    wrapper.appendChild(h4); 

    var p = document.createElement("p");
    var needStr = "";
    s.needs.forEach(function(item){
        needStr += item + ", ";
    });
    p.innerHTML = "Needs: " + needStr.substr(0,needStr.length-2);
    wrapper.appendChild(p); 

    var a = document.createElement("a");
    a.href = s.website;
    a.target  = "_blank";
    a.className = "btn";
    a.classList.add('donateBtn');
    a.innerHTML ="Donate"
    wrapper.appendChild(a); 
 });
},
showSelectedNeeds: function(needs){
  if( needs[0] !== "undefined" && needs[0] !== undefined){
    document.getElementById("shelterNeedsSelection").innerHTML = needs.join(', ');
  }else{
     document.getElementById("description").innerHTML = "You did not select any items.";
  }
 }
};

/*********** Global functions *********/
var findOne = function (haystack, arr) {
  return arr.some(function (v) {
    return haystack.indexOf(v) >= 0;
    });
};

var capitalizeNeeds = function(needs){
  var titledCase =  needs.map(function(str){
      return str.replace(/\b\w/g, function(l){ return l.toUpperCase() });
  });
  return titledCase;
}

/*********** Runs when document is ready *********/
$(document).ready(function () {
  controller. getShelterResults();
  view.setUpEventListeners();
  $("#myModal").modal("show");
});