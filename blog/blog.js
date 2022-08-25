

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



    const articleContent = {}

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

            console.log(articles)
            document.querySelector("#articles").innerHTML = "" 

            Object.values(articles).forEach(e=>{
                console.log(e)

                // html based 

            let article = `
            <a class='article'>
                    <img style='background-image:url("${e.img}")' class='article-img'> 
                <div>
                        <div class="content">
                            <h2 class='title'>${e.title}</h2>
                            <p class='content'>${e.content}</p>
                        </div>
                    <button class='readmore'>read more </button>

                </div>
            </a>
        `
            document.querySelector("#articles").innerHTML += article



        // // elements based 
        // let maindiv = document.createElement("a")
        // maindiv.classList.add('article')
        // let articleImg = document.createElement("img")
        // articleImg.classList.add('article-img')
        // articleImg.style.backgroundImage = `url(${e.img})`
        // let contentDiv = document.createElement('div')
        // contentDiv.classList.add("content")
        // let articleH2 = document.createElement("h2")
        // articleH2.classList.add("title")
        // articleH2.textContent = e.title
        // let articleP = document.createElement('p')
        // articleP.classList.add('content')
        // articleP.textContent = e.content
        // let readMoreBtn = document.createElement('button')
        // readMoreBtn.classList.add("readmore")
        // readMoreBtn.textContent = 'read more'
        // contentDiv.append(articleH2, articleP, readMoreBtn)
        // maindiv.append(articleImg, contentDiv)

        // document.querySelector("#articles").append(maindiv)


            // document.querySelectorAll('.article').forEach(e=>{
            //     e.addEventListener("click", (ee)=>{
            //         console.log(ee.target)
            //     })
            // })


            document.querySelectorAll('.readmore').forEach(e=>{
                e.addEventListener("click", (ee)=>{
                    console.log(ee.target.parentElement.parentElement)
                    console.log(ee.target.parentElement.parentElement.querySelector('.article-img').style['background-image'])


                    document.querySelector("#articleTitle").textContent = ee.target.parentElement.parentElement.querySelector('.title').textContent
                    document.querySelector("#articleImg").setAttribute("style", "background-image:" + ee.target.parentElement.parentElement.querySelector('.article-img').style['background-image']) 
                    document.querySelector("#articleContent").textContent= ee.target.parentElement.parentElement.querySelector('.content').textContent


                    // setTimeout(() => {
                    //     window.location.replace(`http://127.0.0.1:5500/projects-development-mode/make-it-green/4-makeitgreen-firebase/article/`);
                        
                    // }, 3000);

                    document.querySelector("#articles").style.display='none'
                    document.querySelector("#articlePage").style.display = 'block'
                })
            })

                // document.querySelector(".readmore").addEventListener('click', (e)=>{
                // // 
                // // 
                // // 
                // // articleContent = {title: e.target.children}

                // })

        })


        }).catch(err=>console.log(err.message))
}

/////or export it here 
// let articleContentto 
// export const articleContenttoex = articleContent

// window.onclick = ()=>{
//     console.log(articleContent)
// }


////href='/blog/${e.title}'

///////article link onlcick to make a variable and export it to the article
/// page; that the article page will import the variable object and use it to
/// make the contnet ???



