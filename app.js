"use strict";

var StoreGetRandom;
var listOfObjects = [];
var Hour = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
function locations(
  name,
  avg,
  maxNumberOfCust,
  minNumberOfCust,
  NoOfcust,
  CookiesPerHour
) {
  this.name = name;
  this.avg = avg;
  this.maxNumberOfCust = maxNumberOfCust;
  this.minNumberOfCust = minNumberOfCust;
  this.NoOfcust = NoOfcust;
  this.CookiesPerHour = CookiesPerHour;
  this.totalOfCookies = 0;
  listOfObjects.push(this);
}

locations.prototype.RandomNo = function () {
  for (var i = 0; i < Hour.length; i++) {
    StoreGetRandom = getRandom(this.maxNumberOfCust, this.minNumberOfCust);
    this.NoOfcust.push(StoreGetRandom);
  }
};

locations.prototype.NoOfcookies = function () {
  for (var i = 0; i < Hour.length; i++) {
    var numberOfcookies = Math.floor(this.avg * this.NoOfcust[i]);

    this.CookiesPerHour.push(numberOfcookies);
    this.totalOfCookies += numberOfcookies;
  }
};

locations.prototype.render = function () {
  var table = document.getElementById("getTable");
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  tr.appendChild(td);
  table.appendChild(tr);
  td.textContent = this.name;

  for (var i = 0; i < this.CookiesPerHour.length; i++) {
    var td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = this.CookiesPerHour[i] + " cookies";
  }
  var totalDailyCookies = document.createElement("td");
  tr.appendChild(totalDailyCookies);
  totalDailyCookies.textContent = this.totalOfCookies + "cookies";
};

function creatTable() {
  var ParentElement = document.getElementById("salmon");
  var table = document.createElement("table");
  ParentElement.appendChild(table);
  table.setAttribute("id", "getTable");
}

function headerOfTable() {
  var tr = document.createElement("tr");
  var space = document.createElement("th");
  tr.appendChild(space);
  for (var i = 0; i < Hour.length; i++) {
    var th = document.createElement("th");
    th.textContent = Hour[i];
    tr.appendChild(th);
  }
  var dailyTotal = document.createElement("th");
  tr.appendChild(dailyTotal);
  dailyTotal.textContent = "Daily Location total";
  var table = document.getElementById("getTable");
  table.appendChild(tr);
}

creatTable();
headerOfTable();

var Seattle = new locations("Seattle", 6.3, 65, 23, [], []);
var Tokyo = new locations("Tokyo", 1.2, 24, 3, [], []);
var Dubai = new locations("Dubai", 3.7, 38, 11, [], []);
var Paris = new locations("Paris", 2.3, 38, 20, [], []);
var Lima = new locations("Lima", 4.6, 16, 2, [], []);


function getRandom(maxNumberOfCust, minNumberOfCust) {
  var randomValue = Math.random();
  return Math.floor(
    randomValue * (maxNumberOfCust - minNumberOfCust + 1) + minNumberOfCust
  );
}

for (var i = 0; i < listOfObjects.length; i++) {
  listOfObjects[i].RandomNo();
  listOfObjects[i].NoOfcookies();
  listOfObjects[i].render();
}
/*function footerRow() {
  var table = document.getElementById("getTable");
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  table.appendChild(tr);
  tr.appendChild(td);
  td.textContent = "Total";

  for (var i = 0; i < Hour.length; i++) {
    var td = document.createElement("td");
    for (var x = 0; x < listOfObjects.length; x++) {
      tr.appendChild(td);
      td.textContent = totalOfCookies;
    }
  }
}
footerRow();*/

var addNewcity = document.getElementById("Theform");
addNewcity.addEventListener("submit", addCity);

function addCity(event) {
  event.preventDefault();

  var nameOfcity = event.target.NameofCity.value;
  var maxNumberOfCustomer = event.target.MaxCust.value;
  var minNumberOfCustomer = event.target.MinCust.value;
  var avgNumberOfCookies = event.target.AvgCook.value;
  var newCity = new locations(
    nameOfcity,
    maxNumberOfCustomer,
    minNumberOfCustomer,
    avgNumberOfCookies
  );
  newCity.RandomNo();
  newCity.NoOfcookies();
  newCity.render();
  console.log(newCity);
}
