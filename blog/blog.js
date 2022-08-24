

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



////get articles 
window.onload = async()=>{

    ////get data 

    let articlesColl = collection(makeitgreendb, 'articles')
    let articles
    await getDocs(articlesColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            articles = docs
            console.log(docs)
        }).catch(err=>console.log(err.message))


    console.log(artilces)
    document.querySelector("#articles").innerHTML = "" 

    Object.values(artilces).forEach(e=>{
        console.log(e)

    let article = `
    <a href='/blog/${e.title}' class='article'>
        <img style='background-image:url("${e.img}")' class='article-img'> 
    <div>
            <div class="content">
                <h2>${e.title}</h2>
                <p>${e.content}</p>
            </div>
    </div>
</a>
`
    document.querySelector("#articles").innerHTML += article
})
}

