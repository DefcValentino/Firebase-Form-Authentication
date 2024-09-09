   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
 import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"


 /////Firebase web app config here
 const firebaseConfig = {
    apiKey: "AIzaSyAHsfa7E3_073OPbWKJ4yWl7g-G64ZZsV0",
    authDomain: "form-authentication-3b9f4.firebaseapp.com",
    databaseURL: "https://form-authentication-3b9f4-default-rtdb.firebaseio.com",
    projectId: "form-authentication-3b9f4",
    storageBucket: "form-authentication-3b9f4.appspot.com",
    messagingSenderId: "625804605572",
    appId: "1:625804605572:web:7d6d53bb7cfed14e722ad1"
};


  ///Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore();

     onAuthStateChanged(auth, (user)=> {
    const loggedInUserId = localStorage.getItem('loggedInUserId')
      if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=> {
          if(docSnap.exists()){
            const userData = docSnap.data();
            document.getElementById('loggedUserFName').innerText=userData.firstName;
            document.getElementById('loggedUserEmail').innerText=userData.email;
            document.getElementById('loggedUserLName').innerText=userData.lastName;

          }
          else{
            console.log("no document found matching id")
          }

        })
        .catch((error)=>{
          console.log("Error getting document");
        })

      }
      else{
        console.log("user id not found in the local storage")
      }
  })


  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', ()=> {
    localStorage.removeItem('loggedInUserId');
    signOut(auth).then(()=>{

      window.location.href = 'index.html';
    })

    .catch((error)=>{
      console.error('Error Signing out:', error)
    })
  })