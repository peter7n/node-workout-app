function updateRow() {
	var req = new XMLHttpRequest();

	// Build the object to send
	var payload = {name: null, reps: null, weight: null, date: null, lbs: null, id:null};
	payload.name = document.getElementById("name").value;
	payload.reps = document.getElementById("reps").value;
	payload.weight = document.getElementById("weight").value;
	payload.date = document.getElementById("date").value;
	payload.lbs = document.getElementById("lbs").value;
	payload.id = document.getElementById("id").value;

	req.open("POST", "http://52.89.230.63:3000/update", true);
	req.setRequestHeader('Content-Type', 'application/json');

	req.addEventListener("load", function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			console.log(response);
			window.location.href = "/";	// Go back to index.html
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});

	req.send(JSON.stringify(payload));
	event.preventDefault();
}
