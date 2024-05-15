let results;
let front = document.getElementById("front");
let back = document.getElementById("back");
let i = 0;

function next_question() {
    front.innerHTML = results[i]["Q"];
    back.innerHTML = results[i]["A"];
    i++;
}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./data.csv", true);
    xhr.responseType = "text";
    xhr.onload = function() {
      results = Papa.parse(xhr.responseText, {
        header: true // set this to true if the first row contains the header names
      }).data;
    };
    xhr.send();
}