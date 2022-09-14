



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

const publicLineConfig = {
    apiKey: "AIzaSyAF-kHhmhnZ2z6GDRhX3YK6ZeN1wQifC8M",
    authDomain: "public-line-19206.firebaseapp.com",
    projectId: "public-line-19206",
    storageBucket: "public-line-19206.appspot.com",
    messagingSenderId: "897098333489",
    appId: "1:897098333489:web:883a9eaff7711d7c4ec410",
    measurementId: "G-PLWGYD6KBC"
};

const bygreenConfig = {
    apiKey: "AIzaSyDqK1z4fd7lO9g2ISbf-NNROMd7xpxcahc",
    authDomain: "bygreen-453c9.firebaseapp.com",
    projectId: "bygreen-453c9",
    storageBucket: "bygreen-453c9.appspot.com",
    messagingSenderId: "19954598250",
    appId: "1:19954598250:web:ba57c792bdf65dbc18a513",
    measurementId: "G-265TN8HGKX"
    };




const makeitgreen = initializeApp(makeitgreenConfig, 'makeitgreen')
const publicLine = initializeApp(publicLineConfig, 'publicLine')
const bygreen = initializeApp(bygreenConfig, 'bygreen')

const makeitgreenAuth = getAuth(makeitgreen)
const publicLineAuth = getAuth(publicLine)
const bygreenAuth = getAuth(bygreen)

const makeitgreendb = getFirestore(makeitgreen)
const publicLinedb= getFirestore(publicLine)
const bygreendb = getFirestore(bygreen)


console.log(makeitgreen)
console.log(publicLine)
console.log(bygreendb)




////make objects 
        ////getting icon; icon is special object not just an image
        let conFinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-green.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });
        let conUnfinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });

        let nextCampPin = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-yellow.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });


///ui-js-data

// initialize the map; 
const map = L.map('map').setView([33.396600, 44.356579], 9); //leaflet basic map

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA'
    }).addTo(map);
    
    let control = L.Control.geocoder().addTo(map);
    

/////////public line; stuff 
let pathObjects = []
let pathList 
function displayLines (pd){
    console.log("get routes; ", pd)
    
    // Object.values(pd).forEach(e=>console.log(e.path))

    ///deploy them; store
    Object.values(pd).forEach(e => {

        let obje 


            console.log(e.path)
            obje = L.polyline(e.path, {
                // color: "red",
            }).addTo(map)
            // oldObjects.push(pathId) //dont need old objects
            // pathob.addEventListener("click", (e) => console.log(e.target))

        pathObjects.push(obje)
        obje.addEventListener("mouseover", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
        obje.addEventListener("click", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
    })


    
}
function hideLines(pd){
    pd.forEach(e=>{
        map.removeLayer(e)
    })
}
//////button that shows the lines 
document.querySelector(".displayLines").addEventListener("click", (e)=>{
    console.log(e.target.classList)

    e.target.classList.toggle("add")
    if(e.target.classList.contains("add")){
        e.target.style.background = "#ff2a2a"
        displayLines(pathList)
        // e.target.parentElement.append(suggetstMakeLinesBtn)
        document.querySelector(".suggest").style.display = "block"
    }else{
        hideLines(pathObjects)
        // e.target.style.background = "#27f060"
        e.target.style.background = '#68C451'
        // e.target.parentElement.lastElementChild.remove()
        document.querySelector(".suggest").style.display = "none"
    }
})




/////get the home data; green, red, routes
window.onload= async ()=>{

    /////firestore 

    let mapStatics = {}

    ////routes 
    let routesColl = collection(publicLinedb, 'routes')
    await getDocs(routesColl).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        mapStatics.routes = docs
        console.log(docs)
    }).catch(err=>console.log(err.message))
    pathList = mapStatics.routes
    displayLines(mapStatics.routes)

    //////red 
    let redColl = collection(bygreendb, 'tempRed')
    await getDocs(redColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log(docs)
            mapStatics.red = docs
        }).catch(err=>console.log(err.message))
    Object.values(mapStatics.red).forEach(e=>{
        // L.marker(e.coords)
        L.marker(e.coords, {
            icon: conUnfinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })
    ////green 
    let greenColl = collection(bygreendb, 'tempGreen')
    await getDocs(greenColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            mapStatics.green = docs
            console.log(docs)
        }).catch(err=>console.log(err.message))
    // insert green
    Object.values(mapStatics.green).forEach(e=>{
        // L.marker(e.coords)
        L.marker(e.coords, {
            icon: conFinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })

        // let yellowColl = collection()
        // await getDocs(yellowColl).then((data)=>{
        //     let docs = []
        //         data.docs.forEach(doc=>{
        //             docs.push({...doc.data(), id: doc.id})
        //         })
        //         mapStatics.routes = docs
        //         console.log(docs)
        //     }).catch(err=>console.log(err.message))
        
    // insert yellow 
    // Object.values(mapStatics.yellow).forEach(e=>{
    //     // L.marker(e.coords)
    //     m = L.marker(e.coords, {
    //         icon: nextCampPin, 
    //         popupAnchor: [-10, -30] 
    //     }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames}`).addTo(map)
    // })

    document.querySelector("#greenPinCounter").textContent = mapStatics.green.length
    document.querySelector("#redPinCounter").textContent = mapStatics.red.length
    document.querySelector("#routes").textContent = mapStatics.routes.length
    /////direct deploy 
    document.querySelector(".displayLines").classList.add('add')
    document.querySelector(".displayLines").background = "#ff2a2a"


    // // get articles 
    let articles = []
    let articleColl = collection(makeitgreendb, 'articles')
    await getDocs(articleColl).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        articles = docs
        console.log(docs)

            // deploy artciles; 
        // make objects; imgs 

            document.querySelector('.article-samples').innerHTML = ''
        for (let i = 0; i < 3; i++) {
            let articleTemp =  `
            <a href='/blog/${articles[i].title}' class='article'
                <div>
                        <img style='background-image:url("${articles[i].img}")'> 
                        <div class="content">
                            <h2>${articles[i].title}</h2>
                            <p>${articles[i].content}</p>
                        </div>
                </div>
            </a>
            `
            document.querySelector('.article-samples').innerHTML += articleTemp
                }


    }).catch(err=>console.log(err.message))

    console.log(articles)


    // get donors
    let donors = []
    await getDocs(collection(makeitgreendb, 'donors')).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        donors = docs
        console.log(docs)
    ///deploy donors 
        ///make elements
            document.querySelector('.donor-samples').innerHTML = ''

        for (let i = 0; i < 3; i++) {
            let donorsTemp = `
            <div class="donor">
                <img style='background-image:url("${donors[i].logo}")'> 
                <h2 class="donor-name">${donors[i].name}</h2>
            </div>
        `
        
    document.querySelector('.donor-samples').innerHTML += donorsTemp
            }
        
    // let donorsTemp = `
    //     <div class="donor">
    //     <img style='background-image:url("${donors[0].logo}")'> 
    //     <h2 class="donor-name">${donors[0].name}</h2>
    //     </div>

    //     <div class="donor">
    //     <img style='background-image:url("${donors[1].logo}")'> 
    //         <h2 class="donor-name">${donors[1].name}</h2>
    //     </div>
    //     <div class="donor">
    //     <img style='background-image:url("${donors[2].logo}")'> 
    //         <h2 class="donor-name">${donors[2].name}</h2>
    //     </div>
    // `
    //     ////insert elements
    // document.querySelector('.donor-samples').innerHTML = donorsTemp
    }).catch(err=>console.log(err.message))
    console.log(donors)
    console.log(donors[0].logo)



}

