import { catsData } from '/data.js'
const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const closeBtn = document.getElementById("meme-modal-close-btn")
const modal = document.getElementById("meme-modal")

//eventListener
getImageBtn.addEventListener('click', renderCat)
emotionRadios.addEventListener('change', highlightCheckedOption)
closeBtn.addEventListener('click', closeModal)

//highlight an option when selected
function highlightCheckedOption(e) {
    let allHighlights = document.getElementsByClassName('highlight')
    for (let element of allHighlights) {
        element.classList.toggle('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.toggle('highlight')
}

//function called by get-image, gets all matching cats from data.js
function getMatchingCatsArray() {
    const checkedBox = document.querySelector('input[type="radio"]:checked')
        const checkedEmotion = checkedBox.value
        const isGif = document.getElementById('gifs-only-option').checked 
        const matchingCats = catsData.filter(function(cat){
            if (isGif) {
                return cat.isGif && cat.emotionTags.includes(checkedEmotion)
            }
            else {
                return cat.emotionTags.includes(checkedEmotion)
            }
        })
        return matchingCats
}

function getSingleCat() {
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1) {
        return catsArray[0]
    }
    else {
        return catsArray[Math.floor(Math.random()* catsArray.length)]
    }
    
}

function renderCat() {
    const checkedBox = document.querySelector('input[type="radio"]:checked')
    if (checkedBox) {
        const singleCat = getSingleCat()
        const innerModal = document.getElementById("meme-modal-inner")
        innerModal.innerHTML = `
            <img src="images/${singleCat.image}" alt="${singleCat.alt}" class="cat-img">
        `
        modal.style.display = "flex"
    }
}

function closeModal() {
    modal.style.display = "none"
}

//get all emotions from the cats array into an emotions array
function getEmotionsArray(cats) {
    const allEmotions = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            allEmotions.push(emotion)
        }
    }
    const uniqueEmotions = [...new Set(allEmotions)];
    return uniqueEmotions
}

//get emotionsarray and return radios
function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let htmlString = ""
    for (let emotion of emotions) {
        htmlString += `
                        <div class="radio">
                        <label for="${emotion}">${emotion}</label>
                        <input type="radio" id="${emotion}" value="${emotion}" name="emotion-radios">
                        </div>
                        `
    }
    emotionRadios.innerHTML = htmlString
}

renderEmotionsRadios(catsData)