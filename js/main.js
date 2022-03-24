
let activeElement = null

document.getElementById('autocomplete').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].showModal()
})

document.getElementById('ok').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].close()
    autoCompleteGame()
    document.querySelector('.flexbox').dataset.result = "Completeted"
    document.querySelector('.flexbox').classList.add('completed')
})

document.getElementById('cancel').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].close()
})

for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].dataset.static != "true") tiles[i].addEventListener('click', (e) => {
        //console.log(i)
        tileChoose(i)
    })
}

for (let i = 0; i < numberPicks.length; i++) {
    if (numberPicks[i].textContent != 'X') numberPicks[i].addEventListener('click', (e) => {
        tiles[activeElement].dataset.value = numberPicks[i].textContent
        if (isCompleted()) {
            document.querySelector('.flexbox').dataset.result = "Completeted"
            document.querySelector('.flexbox').classList.add('completed')
        }
    })
    else {
        numberPicks[i].addEventListener('click', (e) => {
            tiles[activeElement].dataset.value = ''
        })
    }
}

function tileChoose(tileIndex) {
    if (activeElement || activeElement == 0) tiles[activeElement].classList.remove("active")
    tiles[tileIndex].classList.add("active")
    document.querySelector("#numberPick").style.visibility = "visible"
    activeElement = tileIndex
    disableIncorrectValues(getInValidValues(tileIndex))
}

function checkGameState() {
    do {
        console.log("asd")
        resetTiles()
        fillTiles()
    } while(!autoCompleteGame())
    resetTilesInput()
}

checkGameState()
