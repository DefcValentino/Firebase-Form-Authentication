
// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
 import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"


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

  function showMessage(message, signUpMessage) {
    var messageDiv=document.getElementById(signUpMessage);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

const signUp = document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup'); 
   

    const auth = getAuth();
    const db = getFirestore();


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Succesfully', 'signUpMessage');


        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
        })
        .catch((error)=>{
            console.error("error writing document", error);
        })

    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
            
        }
        else{
            showMessage('Unable to create user', 'signUpMessage');
        }
    }) 

});


const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
     
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })