let results;

function loadText(results) {
    let text = "";
    for (let i = 0; i <= results.length; i++) {
        text = text + results[i]["Q"] + " – " + results[i]["A"] + "\n";
    }

    document.getElementById("list").innerHTML = text;
    console.log(results);
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

    loadText(results);
}

