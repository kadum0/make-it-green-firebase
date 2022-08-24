






import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"

import { getFirestore, onSnapshot,
	collection, doc, getDocs, getDoc,
	addDoc, deleteDoc, setDoc,
	query, where, orderBy, serverTimestamp,
	updateDoc } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

// firebase storage; 
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, list} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js'


const makeitgreenConfig = {
    apiKey: "AIzaSyDRHNu_OxJWPAT1yRlH7cFPue04dvsG3x8",
    authDomain: "make-it-green-d951a.firebaseapp.com",
    projectId: "make-it-green-d951a",
    storageBucket: "make-it-green-d951a.appspot.com",
    messagingSenderId: "316712968744",
    appId: "1:316712968744:web:1ac99ff65f7f9ea5c5cb1d",
    measurementId: "G-PFKZZ95240"
};



const makeitgreen = initializeApp(makeitgreenConfig, 'makeitgreen')

const makeitgreenAuth = getAuth(makeitgreen)

const makeitgreendb = getFirestore(makeitgreen)




onAuthStateChanged(makeitgreenAuth, async (user)=>{
    if(user){
        // display logout
        console.log(user, user.uid)
        /////display claims; 
        user.getIdTokenResult().then(idTokenResult => {console.log(idTokenResult.claims)})

        document.querySelectorAll('.notlogged').forEach(e=>e.style.display = 'none')
        document.querySelectorAll('.logged').forEach(e=>e.style.display = 'block')
    }else{
        document.querySelectorAll('.notlogged').forEach(e=>e.style.display = 'block')
        document.querySelectorAll('.logged').forEach(e=>e.style.display = 'none')
    }
})



/////notlogged
document.querySelector('#signin').addEventListener('click', ()=>{
    signInWithEmailAndPassword(makeitgreenAuth, document.querySelector('#em').value, document.querySelector('#pw').value)
    .then((cred)=>{
        console.log(cred.user)
    })
    .catch((err)=>{
        console.log(err.message)
        document.body.innerHTML += `<h2>${err.message}, reload the page</h2>`
    })
} )


/////logged 
// send data 
// make article 
document.querySelector("#sendArticle").addEventListener("click", async (e)=>{
    // check if right data; 
    if(typeof document.querySelector("#articleTitle").value == 'string' && document.querySelector("#articleImg").files[0] && typeof document.querySelector("#articleContent").value == 'string'){
        console.log("all good")

        ////make



        // let fd = new FormData()
        // fd.append("articleTitle", document.querySelector("#articleTitle").value)
        // fd.append('articleContent', document.querySelector("#articleContent").value)
        // fd.append("articleImg", document.querySelector("#articleImg").files[0])
        // ////send 
        // await fetch("/makeArticle", {
        //     method: "POST", 
        //     body: fd
        // })
        ////emtpy 


        document.querySelector("#articleTitle").value = ''
        document.querySelector("#articleContent").value = ''
        document.querySelector("#articleImg").files[0] = null

    }else{
        console.log(typeof document.querySelector("#articleTitle").value)
        console.log(document.querySelector("#articleImg").files[0])
        console.log(document.querySelector("#articleContent").value)
    }

    // make object 

    // send object 

    // empty container and object
})


// make and send donor 
document.querySelector("#sendDonor").addEventListener("click", async (e)=>{
    // check if right data; 
    if(typeof document.querySelector("#donorName").value == 'string' && document.querySelector("#donorLogo").files[0]){
        console.log("all good")

        ////make 
        // let fd = new FormData()
        // fd.append("donorName", document.querySelector("#donorName").value)
        // fd.append("donorLogo", document.querySelector("#donorLogo").files[0])
        // document.querySelector("#donorWebsite").value?fd.append("donorWebsite", document.querySelector("#donorWebsite").value):null
        
        // console.log(fd)


        // ////send 
        // await fetch("/makeDonor", {
        //     method: "POST", 
        //     body: fd
        // })



        ////empty 


        document.querySelector("#donorName").value = ''
        document.querySelector("#donorWebsite").value = ''
        document.querySelector("#donorLogo").files[0] = null

    }else{
        console.log(typeof document.querySelector("#donorName").value)
        console.log(document.querySelector("#donorLogo").files[0])
    }

    // make object 

    // send object 

    // empty container and object
})





// trying the code 

window.addEventListener("click", (e)=>{
    console.log(document.querySelector("#articleTitle").value)
    console.log(document.querySelector("#articleContent").value)

    // console.log(document.querySelector("#articleImg").files[0])
    
})






