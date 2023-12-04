// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;

//             // method #1:  insert with JS
//             document.getElementById("name-goes-here").innerText = userName;    

//             //method #2:  insert using jquery
//             //$("#name-goes-here").text(userName); //using jquery

//             //method #3:  insert using querySelector
//             //document.querySelector("#name-goes-here").innerText = userName

//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getNameFromAuth(); //run the function

//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

            // figure out what day of the week it is today
            const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const d = new Date();
            let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            readQuote(day);
            insertNameFromFirestore();
            displayCardsDynamically("hikes");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();


// Insert name function using the global variable "currentUser"
function insertNameFromFirestore() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}
// Comment out the next line (we will call this function from doAll())
// insertNameFromFirestore();

function readQuote(day) {
    db.collection("quotes").doc(day)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(dayDoc => {                                                               //arrow notation
            console.log("current document data: " + dayDoc.data());                          //.data() returns data object
            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

            //Here are other ways to access key-value data fields
            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
            //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
        })
}
// readQuote("tuesday");        //calling the function

// this fucncrtino ist jyst tested some fake hike data

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code: "BBYA",
        name: "Parking Lot A", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "Full",
        details: "Accessible Parking, Motorcylce Area",
        length: 10,          //number value
        hike_time: 60,       //number value
        lat: 49.25240573955513,
        lng: -122.99937079258694,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hikesRef.add({
        code: "BBYB",
        name: "Parking Lot B", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "Busy",
        details: "N/A",
        length: 10.5,      //number value
        hike_time: 80,     //number value
        lat: 49.25204066616602,
        lng: -122.99825499535372,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    hikesRef.add({
        code: "BBYD",
        name: "Parking Lot D", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "Vacant",
        details: "Accessible Parking, Pay Station",
        length: 8.2,        //number value
        hike_time: 120,     //number value
        lat: 49.248329660179316,
        lng: -122.99925640279429,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    hikesRef.add({
      code: "BBYE",
      name: "Parking Lot E", //replace with your own city?
      city: "Burnaby",
      province: "BC",
      level: "Full",
      details: "Carshare Parking",
      length: 10,          //number value
      hike_time: 60,       //number value
      lat: 49.24901577828027,
      lng: -122.99837663870316,
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
  hikesRef.add({
    code: "BBYF",
    name: "Parking Lot F", //replace with your own city?
    city: "Burnaby",
    province: "BC",
    level: "Full",
    details: "Accessible Parking",
    length: 10,          //number value
    hike_time: 60,       //number value
    lat: 49.247314689881904,
    lng: -122.99869926231959,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});
hikesRef.add({
  code: "BBYN",
  name: "Parking Lot N", //replace with your own city?
  city: "Burnaby",
  province: "BC",
  level: "Busy",
  details: "Pay Station",
  length: 10,          //number value
  hike_time: 60,       //number value
  lat: 49.2447230116984,
  lng: -123.00251872815622,
  last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});
hikesRef.add({
  code: "BBYQ",
  name: "Parking Lot Q", //replace with your own city?
  city: "Burnaby",
  province: "BC",
  level: "Vacant",
  details: "Carshare Parking",
  length: 10,          //number value
  hike_time: 60,       //number value
  lat: 49.2542336214432,
  lng: -123.0030943972222,
  last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection)
    .orderBy("hike_time")  //sort by name
    // .limit(2)              //limit to 3 hikes
    .get()   //the collection called "hikes"
        .then(allHikes => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allHikes.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hikeLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //assigning the uniqle id to the bookmarrk icon
                //attatching the onclick, calling callback fucntion with hike's id
                newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                newcard.querySelector('i').onclick = () => saveBookmark(docID);
                "Length: " + doc.data().length + " km <br>" +
                    "Duration: " + doc.data().hike_time + "min <br>" +
                    "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(docID)) {
                       document.getElementById('save-' + docID).innerText = 'bookmark';
                    }
              })
                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

// displayCardsDynamically("hikes");  //input param is the name of the collection


//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveBookmark(hikeDocID) {
    // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
    currentUser.update({
        // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
        // This method ensures that the ID is added only if it's not already present, preventing duplicates.
        bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeDocID)
    })
        // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
        .then(function () {
            console.log("bookmark has been saved for" + hikeDocID);
            var iconID = 'save-' + hikeDocID;
            //console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}


