/*-------- Function definitions --------*/

function renderTable(res) {
  for (var i = 0; i < res.length; i++) {
    newRow = document.createElement("tr");

    for (var prop in res[i]) {
      if (prop != "id") {
        newCell = document.createElement("td");
        newCell.textContent = res[i][prop];
        newRow.appendChild(newCell);
      }
    }
    // Add buttons and hidden fields
    newCell = document.createElement("td");
    newCell.innerHTML = '<form method="post" onsubmit="deleteRow()"><input type="hidden" name="id" value="' + res[i].id + '" /><input type="submit" name="delete" value="delete" /></form>';
    newRow.appendChild(newCell);

    newTable.appendChild(newRow);
  }
  // document.body.appendChild(newTable);
}

function renderRow(res) {
  console.log("Row is: " + res);

  var req = new XMLHttpRequest();
  req.open("POST", "http://52.89.230.63:3000/getrow", true);
  req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log("response from getrow: " + JSON.stringify(response));
      renderTable(response);  // render table after response is received
    }
    else
      console.log("Error in network request: " + request.statusText);
  })

  console.log("sending payload: " + JSON.stringify(payload2));
  req.send(JSON.stringify(res));  // send row ID
}

function getRows() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://52.89.230.63:3000/get", true);
  // req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      renderTable(response);
      // console.log(response);
    }
    else {
      console.log("Error in network request: " + request.statusText);
    }});

  req.send(null);
}

function addRow() {
  // Add event listener to Add button
  document.getElementById("add").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    // Build the object to send
    var payload = {name: null, reps: null, weight: null, date: null, lbs: null};
    payload.name = document.getElementById("name").value;
    payload.reps = document.getElementById("reps").value;
    payload.weight = document.getElementById("weight").value;
    payload.date = document.getElementById("date").value;
    payload.lbs = document.getElementById("lbs").value;

    document.getElementById("output").textContent = JSON.stringify(payload);

    req.open("POST", "http://52.89.230.63:3000/post", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        renderRow(response);
      }
      else {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req.send(JSON.stringify(payload));
    event.preventDefault();
  })
}

function deleteRow() {
  console.log("Delete clicked!");
  event.preventDefault();
  }

/*-------- Main Method --------*/

var newTable = document.createElement("table");
var newRow;
var newHeader;
var newCell;

// Create header row
newRow = document.createElement("tr");

newHeader = document.createElement("th");
newHeader.textContent = "Exercise";
newRow.appendChild(newHeader);
newHeader = document.createElement("th");
newHeader.textContent = "Reps";
newRow.appendChild(newHeader);
newHeader = document.createElement("th");
newHeader.textContent = "Weight";
newRow.appendChild(newHeader);
newHeader = document.createElement("th");
newHeader.textContent = "Date";
newRow.appendChild(newHeader);
newHeader = document.createElement("th");
newHeader.textContent = "Lbs=1";
newRow.appendChild(newHeader);

newTable.appendChild(newRow);
document.body.appendChild(newTable);

// Get initial table data from server and render the table
getRows();

// document.addEventListener("DOMContentLoaded", addRow);
document.addEventListener("DOMContentLoaded", addRow);
