const button_elem = document.getElementById('search_word')
const input_elem = document.querySelector('#search_input')
const word_details_elem = document.querySelector('.word_details')
const word_name_elem = document.querySelector('.word_name')
const pronun_audio_elem = document.querySelector('.pronun_audio')
const pronun_icon_elem = document.querySelector('.pronun_icon')
const phonetics_text_elem = document.querySelector('.phonetics_text')
const meanings_elem = document.querySelector('.meanings')
const error_container_elem = document.querySelector('.error_container')

async function getDictData(search_word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search_word}`


    try {
        word_details_elem.style.display = 'flex'
        error_container_elem.style.display = 'none'
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // getting data from api and converting into json

        const json = await response.json()
        const wordDetails = json[0]
        console.log(wordDetails)

        // changing word name
        word_name_elem.innerText = wordDetails.word

        // changing audio
        pronun_audio_elem.querySelector('source').setAttribute('src', wordDetails.phonetics[0].audio?wordDetails.phonetics[0].audio:wordDetails.phonetics[1].audio)
        pronun_audio_elem.load()

        phonetics_text_elem.innerText = wordDetails.phonetics[0].text

        // meanings
        const meanings = wordDetails.meanings
        // console.log(meanings)

        let meanings_length = meanings.length
        let details = ''
        for (let index = 0; index < meanings_length; index++) {
            details += `<details1>
                                <summary class="partOfSpeech">${meanings[index].partOfSpeech
                }</summary>
                                <span class="antonyms">Antonyms: ${meanings[index].antonyms
                }</span><br>
                                <span class="synonyms">Synonyms: ${meanings[index].synonyms
                }</span>
                                <h2>Definitions</h2>
                                <ul class="definitions_${index}">
                                    
                                </ul>
                            </details1>`
            // console.log(details)
        }
        meanings_elem.innerHTML = details

        for (let index = 0; index < meanings_length; index++) {
            let definitions_ul_elem = document.querySelector(`.definitions_${index}`)
            let definition_elem = ''
            
            meanings[index].definitions.map(item => {
                definition_elem += `<li>${item.definition}</li>`
            })
            definitions_ul_elem.innerHTML = definition_elem
        }

        // const word_name = document.createElement('span')
        // word_name.classList.add('text','word_name')
        // word_name.innerText = wordDetails.word

        // word_details_elem.appendChild(word_name)

    } catch (error) {
        console.log(error)
        error_container_elem.style.display = 'inline-block'
        word_details_elem.style.display = 'none'
    }


}

getDictData('aeroplane')

button_elem.addEventListener('click', () => {
    getDictData(input_elem.value)
})

pronun_icon_elem.addEventListener('click', () => {
    pronun_audio_elem.play()
})