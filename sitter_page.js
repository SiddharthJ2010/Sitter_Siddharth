const firebaseConfig = {
    apiKey: "AIzaSyCtn10gzRwgZgzGtTLsmlJtG6P-2FvhQbk",
    authDomain: "practice-f0c22.firebaseapp.com",
    databaseURL: "https://practice-f0c22-default-rtdb.firebaseio.com",
    projectId: "practice-f0c22",
    storageBucket: "practice-f0c22.appspot.com",
    messagingSenderId: "809646310097",
    appId: "1:809646310097:web:7fb63e37c292eed936bbf0"
  };
  

  firebase.initializeApp(firebaseConfig);

  user_name=localStorage.getItem("user_name")
  room_name=localStorage.getItem("room_name")

  document.getElementById("user_name").innerHTML="Welcome "+user_name+"!"

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "sitter_page.html;"
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room Name - " + Room_names);
   row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
   document.getElementById("output").innerHTML += row;

   //End code
   });});}
getData();

function add_Room()
{
    room_name = document.getElementById("room_name").value;


    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room"
    })

    localStorage.setItem("room_name", room_name);

    window.location = "sitter_page.html";
}

function send()
{
      msg=document.getElementById("msg").value ;
      firebase.database().ref(room_name).push ({
            name:user_name,
            message:msg,
            like:0
      });

      document.getElementById("msg").value = "";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
