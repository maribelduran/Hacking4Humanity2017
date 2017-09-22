/************* MODEL ************/
var app = {
  needs: {},
  initNeeds: function(){
    this.needs = new Needs();
  }
};

function Needs(){
 this.needs = {};
}

Needs.prototype.addNeeds = function(list){
  //build a map of key  => count entries
  list.reduce(function(map, needs){
  if (map[needs]){
    map[needs]++;
  }else{
    map[needs]=1;
  }
  return map;
 }.bind(this), this.needs);
}

//sorts needs based on the entry counts from highest to lowest and returns the keys in an array
Needs.prototype.sortNeeds = function(){
  var sorted = Object.keys(this.needs).sort(function(a,b){
    return this.needs[b] - this.needs[a];
  }.bind(this));
  return sorted;
}

/************* CONTROLLER ************/
var controller = {
  initNeeds: function(){
    app.initNeeds();
    this.getNeeds();
  },
  getNeeds: function(){
    var url = 'http://www.maribelduran.com/Hacking4Humanity2017/web/js/ShelterDictionary.JSON';
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) { 
      var shelters = JSON.parse(request.response);
      shelters.forEach(function(obj){
      var needList = obj["needs"];
      app.needs.addNeeds(needList);
      });
    }else{
       // We reached our target server, but it returned an error   
    }
    var sortedNeeds = app.needs.sortNeeds();
    view.showNeeds(sortedNeeds);
  };
  request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();
  }
};


/************* VIEW ************/
var view = {
  //object to lookup icon for each need
  
  svgIcon: {
    "baby supplies": "infant-supplies.svg",
    "baby wipes": "baby-wipes.svg",
    "bart tickets": "bart.svg",
    "blankets": "blankets.svg",
    "clothing": "shirt.svg",
    "diapers": "diaper.svg",
    "feminine hygiene": "tampon.svg",
    "furniture": "sofa.svg",
    "gift cards": "gift-card.svg",
    "laundry detergent": "detergent.svg",
    "money": "money.svg",
    "notepads": "notepad.svg",
    "pens": "pen.svg",
    "socks": "sock.svg",
    "soap": "soap.svg",
    "sticky notes": "sticky-notes.svg",
    "toilet paper": "toilet-paper.svg",
    "toothbrush/paste": "toothbrush.svg",
    "towels": "towel.svg",
    "underwear": "underwear.svg"
  },

//Creates html elements to show needs in bootstrap rows.
 showNeeds: function(needs){
  //displays top three needs in a separate bootstrap row
  var topThreeNeeds = document.getElementById("top-three-needs");
  topThreeNeeds.innerHTML = "";

  //displays the rest of the needs in another bootstrap row
  var restofNeeds = document.getElementById("rest-of-needs");
  restofNeeds.innerHTML = "";

  needs.forEach(function(item, index){
    //title case the item name
    var name = titleCase(item);

    //top three needs go in 3 columns
    if (index <= 2){
      var col_md_4 = document.createElement("div");
      col_md_4.className = "col-md-4";
      col_md_4.classList.add('col-xs-4');
      topThreeNeeds.appendChild(col_md_4);
    //the rest of needs go in 6 columns
    }else{
     var col_md_2 = document.createElement("div");
     col_md_2.className = "col-md-2";
     col_md_2.classList.add('col-sm-4', 'col-xs-6');
     restofNeeds.appendChild(col_md_2);
    }
    //create input element of type checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;
    checkbox.name = "item";
    checkbox.value = name;

    var label = document.createElement("label");
    label.htmlFor = name;

    var img = document.createElement("img");
    //default value when item not found is currently gift-card.svg
    img.src = "icons/" + (this.svgIcon[name.toLowerCase()] || "gift-card.svg");

    //append elements for top three needs
   if (index <= 2){
    col_md_4.appendChild(checkbox);
    col_md_4.appendChild(label);
    img.className = "img-check-main";
    label.appendChild(img); 
   }
   //append elements for the rest of the needs
   else{
    col_md_2.appendChild(checkbox);
    col_md_2.appendChild(label);
    img.className = "img-check";
    label.appendChild(img); 
   }
     
   var p = document.createElement("p");
   p.className = "caption";
   p.innerHTML = name;
   label.appendChild(p);

  }.bind(this));
}
};

/*********** Global variables *********/
var titleCase = function(string){
  return string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
}


/*********** Initializating list of needs for index.html *********/
controller.initNeeds();