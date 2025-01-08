const express = require("express");
const fs = require("fs");

// Setup
const app = express();

app.listen(3000);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));




// Get Requests
app.get("/", (req,res) => {
	res.render("index");
});
app.get("/edit/:id", (req,res) => {
	try {
		let eventJSON = JSON.parse(fs.readFileSync("public/events/"+req.params.id+".json"));
		res.render("edit/event_edit", eventData = eventJSON, newEvent = false);
	} catch(err) {
		fs.open("public/events/"+req.params.id+".json", "r", (err, file) => {
			if(err) throw err;
			res.render("edit/event_edit", eventData = {}, newEvent = true);
		});
		fs.close();
	}
});
app.get("/:id", (req,res) => {
	try {
		let eventJSON = JSON.parse(fs.readFileSync("public/events/"+req.params.id+".json"));
		res.render("eventView", eventData = eventJSON);
	} catch(err) {
		res.render("eventNotFound", {eventCode: req.params.id});
	}
});

// 404 Page
app.use((req,res) => {
	res.status(404).render("404", {
		title:"404"
	});
});