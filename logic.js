  var database = firebase.database();

//Add Trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  //Train data (temporary local storage)
  var newTrain = {
    Name: trainName,
    Destination: destination,
    First_Train: firstTrain,
    Frequency: frequency,
  };
console.log(newTrain);
  // pusj new Train data to database
  database.ref().push(newTrain);
  console.log(newTrain.Name);
  console.log(newTrain.Destination);
  console.log(newTrain.First_Train);
  console.log(newTrain.Frequency);

  alert("New Train successfully added");

  // Clear text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
});

//Upon new submission, add to database (firebase) and display in HTML
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store into variable
  var trainName = childSnapshot.val().Name;
  var destination = childSnapshot.val().Destination;
  var firstTrain = childSnapshot.val().First_Train;
  var frequency = childSnapshot.val().Frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  //reformat the info for firstTrain
  var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

  // Calculate  using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<th>").text(trainName),
    $("<th>").text(destination),
    $("<th>").text(firstTrainPretty),
    // $("<td>").text(empMonths),
    $("<th>").text(frequency),
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#displayed-data").append(newRow);
});


//train schedule calculations and using moment.js
// var tFrequency = 5;

// var firstTime = "09:00";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var pushBack1year = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(pushBack1year), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
