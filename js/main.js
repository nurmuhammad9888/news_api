const elList = document.querySelector(".news-list");
const elListView = document.querySelector(".news-view-list");

const elTemplate = document.querySelector(".news-template").content;
const elTemplateView = document.querySelector(".news-view-template").content;
const elFragment = document.createDocumentFragment();

// FORM
const elForm = document.querySelector(".form-js");
const elInput = document.querySelector(".input-new-js");

const elLinkBtn = document.querySelectorAll(".news-nav-link");
const elLinkCountres = document.querySelectorAll(".news-countries-link");

const API_KEY = "apiKey=e6c1c3eff7be4149a78e63364d0a3a63";
const NEWS_URL = "https://newsapi.org/v2/";


async function renderFuncM(){
    try {
        const res = await fetch(`${NEWS_URL}/top-headlines?sources=techcrunch&${API_KEY}`);
        const data = await res.json()
        renderFuncView(data.articles)
    }catch (err) {
        elList.innerHTML = "Not found"
    }
}
renderFuncM()

// DEFALUT LEST 
function renderFuncView(arr){
    arr.forEach(item =>{
        const tempClone = elTemplateView.cloneNode(true);
        tempClone.querySelector(".news-view-link").href = item.url;
        tempClone.querySelector(".news-imagee").src = item.urlToImage;
        tempClone.querySelector(".news-imagee").al = item.source.name;
        tempClone.querySelector(".news-title").textContent = item.title;
        elFragment.appendChild(tempClone);
    })
    elListView.appendChild(elFragment);
}

function debounce(func) {
    let timeoutId
    return function(...arguments) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...arguments)
        }, 1500)
    }
}

urlFunc(`${NEWS_URL}everything?q=sport&sortBy=popularity&${API_KEY}`)

function doSomething() {
    const val = elInput.value;
    urlFunc(`${NEWS_URL}everything?q=${val}&${API_KEY}`)
}

const debounced = debounce(doSomething)

// FORM SUBMIT 
elForm.addEventListener("keyup", evt =>{
    evt.preventDefault();
    debounced()
})

// CLICK BTN 
elLinkBtn.forEach(item =>{
    item.addEventListener("click" , () =>{
        urlFunc(`${NEWS_URL}top-headlines?category=${item.textContent}&${API_KEY}`)
    })
})

elLinkCountres.forEach(item =>{
    item.addEventListener("click" , () =>{
        urlFunc(`${NEWS_URL}top-headlines?country=${item.dataset.id}&${API_KEY}`);
        // resetLinkFunc()
        // item.classList.add("active");
    })
})
    // function resetLinkFunc(){
    //     elLinkCountres.forEach(item =>{
    //         item.classList.remove("active");
    //     })
    // }
    
    async function urlFunc(val){
        try {
            const res = await fetch(val);
            const data = await res.json()
            renderFunc(data.articles.slice(0, 10))
        }catch (err) {
            elList.innerHTML = "Not found"
        }
    }
    
    // SEARCH RENDER LEST 
    function renderFunc(arr){
        elList.innerHTML = "";
        arr.forEach(item =>{
            const tempClone = elTemplate.cloneNode(true);
            tempClone.querySelector(".new-author").textContent = item.source.name;
            tempClone.querySelector(".news-title").textContent = item.title;
            tempClone.querySelector(".news-description").textContent = item.description;
            tempClone.querySelector(".news-url").href = item.url;
            tempClone.querySelector(".news-image").src = item.urlToImage;
            tempClone.querySelector(".news-image").alt = item.source.name;
            tempClone.querySelector(".new-time").textContent = item.publishedAt;
            elFragment.appendChild(tempClone);
        })
        elList.appendChild(elFragment);
    }
