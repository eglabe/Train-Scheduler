$("#standard-time").html(moment().format("hh:mm:ss"));
$("#military-time").html(moment().format("HH:mm:ss"));

// Initialize Firebase
var config = {
apiKey: "AIzaSyAsCGHC0nOCZiyvLc3Bnc46zMgEMeK0_MA",
authDomain: "train-scheduler-147a8.firebaseapp.com",
databaseURL: "https://train-scheduler-147a8.firebaseio.com",
storageBucket: "train-scheduler-147a8.appspot.com",
messagingSenderId: "749265162273"
};
firebase.initializeApp(config);

// Initial variables, to be set by user
var db = firebase.database();

var train = "";
var destination = "";
var firstTime = "";
var frequency = 0;

// Capture button click
$("#add-train").on("click", function(event) {

	event.preventDefault();

	train = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTime = $("#first-train").val().trim();
	frequency = $("#frequency").val().trim();

  // Code for the database push
  db.ref().push({

  	train: train,
  	destination: destination,
  	firstTime: firstTime,
  	frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });	
});

// Firebase watcher + initial loader
db.ref().on("child_added", function(childSnapshot) {

	var tName = childSnapshot.val().train;
	var tDestination = childSnapshot.val().destination;
	var tTime = childSnapshot.val().firstTime;
	var tFrequency = childSnapshot.val().frequency;

	console.log("---------- train math -----------")
	var firstTimeConverted = moment(tTime, "HH:mm");
	console.log("converted " + firstTimeConverted);

	var currentTime = moment().format("HH:mm");
	console.log("current time " + currentTime);

	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + timeDiff);

	var remainder = timeDiff % tFrequency;
	console.log("remainder " + remainder);

	var minTillTrain = tFrequency - remainder;
	console.log("Minutes till train: " + minTillTrain);

	var nextTrain = moment().add(minTillTrain, "minutes");
	console.log("Next train arrives: " + moment(nextTrain).format("HH:mm"));
	console.log("----------^train math^-----------");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + 
  	tName + "</td><td>" + 
  	tDestination + "</td><td>" +
  	tFrequency + "</td><td>" + 
  	moment(nextTrain).format("HH:mm") + "</td><td>" + 
  	minTillTrain 
  	// + "</td><td>" +
  	// "<button id='remove-btn'>Remove</button>" 
  	+ "</td></tr>");

  console.log("-------from database----------------")
  console.log(tName);
  console.log(tDestination);
  console.log(tTime);
  console.log(tFrequency);
  console.log(childSnapshot.val().dateAdded);

});

// $("#remove-btn").on("click", function(event) {

// db.ref().child().remove();

// });