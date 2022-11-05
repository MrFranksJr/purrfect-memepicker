import { catsData } from '/data.js'
const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")

emotionRadios.addEventListener('change', function (e) {
    let selectedRadio = document.getElementById(e.target.id).parentElement
    let allHighlights = document.getElementsByClassName('highlight')
    for (let element of allHighlights) {
        element.classList.toggle('highlight')
    }
    selectedRadio.classList.toggle('highlight')
})


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