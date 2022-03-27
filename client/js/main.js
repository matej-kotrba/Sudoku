// SETUP

const SIZE = 9

//if(!autoCompleteGame()) document.querySelector('.flexbox').dataset.result = "This game of Sudoku cant be solved !"

const flexbox = document.querySelector('.flexbox')

function createFlexbox() {
    for (let i = 0; i < SIZE * SIZE; i++) {
        let div = document.createElement('div')
        div.classList.add("flexbox-child")
        flexbox.append(div)
        if ((i + 1) % 3 == 0 && (i + 1) % 9 != 0) {
            let space = document.createElement('div')
            space.classList.add('space')
            flexbox.append(space)
        }
        if ((i + 1) >= 27 && (i + 1) % 27 == 0 && (i + 1) < SIZE ** 2) {
            let space = document.createElement('div')
            space.classList.add('space-vert')
            flexbox.append(space)
        }
    }
    return
}

createFlexbox()

const tiles = document.getElementsByClassName('flexbox-child')
const numberPicks = document.getElementsByClassName('numberChoise')

function createTilesArray() {
    let array = []
    for (var i = 0; i < tiles.length; i++) {
        (tiles[i].dataset.value != '') ? array.push(+(tiles[i].dataset.value)) : array.push(0)
    }
    return array
}

function fillTiles() {
    for (let i = 0; i < SIZE * SIZE; i++) {
        let div = document.getElementsByClassName('flexbox-child')[i]

        if (Math.random() > 0.8) {
            // div.dataset.value = `${Math.round(Math.random() * 8 + 1)}`
            div.dataset.value = getNumberSetup(getInValidValues(i, createTilesArray()))
            div.dataset.static = "true"
        }
        else div.dataset.value = ''
    }
    return
}

function resetTiles() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].dataset.value = ''
        delete tiles[i].dataset.static
    }
}

function resetTilesInput() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].dataset.static != 'true') tiles[i].dataset.value = ''
    }
}

////////////////////////////////

function getInValidValues(index, tilesArray) {
    var validValuesArray = [true, true, true, true, true, true, true, true, true]
    for (let j = 0; j < SIZE; j++) {
        if (tilesArray[j + Math.floor(index / SIZE) * SIZE] != 0) validValuesArray[+(tilesArray[j + Math.floor(index / SIZE) * SIZE]) - 1] = false
    }
    for (let k = 0; k < SIZE; k++) {
        if (tilesArray[k * SIZE + Math.floor(index % SIZE)] != 0) validValuesArray[+(tilesArray[k * SIZE + Math.floor(index % SIZE)]) - 1] = false
    }

    for (let i = 0; i < SIZE; i++) {
        let vzorec = tilesArray[(i % 3 + Math.floor(i / 3) * SIZE) + Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3]
        if (vzorec != 0) validValuesArray[+vzorec - 1] = false
    }
    return validValuesArray
}

function getNumberSetup(array) {
    let value = null
    value = Math.round(Math.random() * 8 + 1)
    for (let i in array) {
        if (array[i] && +i+1 == value) return value
    }
    return getNumberSetup(array)
}

// COMMANDS ////////////////////////

function disableIncorrectValues(array) {
    for (let i = 0; i < SIZE; i++) {
        numberPicks[i].style.display = "none"
    }
    for (let i in array) {
       if (array[i]) numberPicks[i].style.display = "inline-block"
    }
    return
}

function autoCompleteGame(tilesArray) {
    let index = 0;
    while (index < SIZE ** 2 && tilesArray[index] != 0) index++
    if (index >= SIZE ** 2) {
        convertArrayToTiles(tilesArray)
        return true
    }
    var array = getInValidValues(index, tilesArray);
    for (let i in array) {
        if (array[i]) {
            tilesArray[index] = +i+1
            if (autoCompleteGame(tilesArray)) return true
        }
    }
    tilesArray[index] = 0;
    return false
}

function convertArrayToTiles(tilesArray) {
    for (var i in tilesArray) {
        tiles[i].dataset.value = tilesArray[i]
    }
    return
}

function isCompleted() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].dataset.value == '') return false
    }
    return true
}


// MAIN //////////////

let activeElement = null

document.getElementById('autocomplete').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].showModal()
})

document.getElementById('ok').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].close()
    let points = checkScore()
    if (autoCompleteGame(createTilesArray())) {
        document.querySelector('#numberPick').style.visibility = "hidden"
        document.querySelector('.flexbox').dataset.result = "Completeted"
        document.querySelector('.flexbox').classList.add('completed')
        document.getElementById('dialogPost').showModal()
        document.getElementById('body').value = points
        document.getElementById('human').value = "NO"
    }
})

document.getElementById('cancel').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].close()
})

document.getElementById('dontsend').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[1].close()
})

document.getElementById('restart').addEventListener('click', (e) => {
    checkGameState()
})

for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].dataset.static != "true") tiles[i].addEventListener('click', (e) => {
        //console.log(i)
        if (tiles[i].dataset.static != "true") tileChoose(i)
    })
}

for (let i = 0; i < numberPicks.length; i++) {
    if (numberPicks[i].textContent != 'X') numberPicks[i].addEventListener('click', (e) => {
        tiles[activeElement].dataset.value = numberPicks[i].textContent
        document.querySelector('#score').innerHTML = 'Score: '+checkScore()
        if (isCompleted()) {
            document.querySelector('.flexbox').dataset.result = "Completeted"
            document.querySelector('.flexbox').classList.add('completed')
            document.getElementById('dialogPost').showModal()
            document.getElementById('body').value = "15"
            document.getElementById('human').value = "YES"
        }
    })
    else {
        numberPicks[i].addEventListener('click', (e) => {
            tiles[activeElement].dataset.value = ''
            document.querySelector('#score').innerHTML = 'Score: '+checkScore()
        })
    }
}

// Concludes for each filled tile

function checkScore() {
    let score = 0;
    for (var i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].dataset.value != '' && tiles[i].dataset.static != "true") score++
    }
    return score
}

function tileChoose(tileIndex) {
    if (activeElement || activeElement == 0) tiles[activeElement].classList.remove("active")
    tiles[tileIndex].classList.add("active")
    document.querySelector("#numberPick").style.visibility = "visible"
    activeElement = tileIndex
    disableIncorrectValues(getInValidValues(tileIndex, createTilesArray()))
}

function checkGameState() {
    document.querySelector('.flexbox').dataset.result = ""
    document.querySelector('.flexbox').classList.remove('completed')
    resetTiles()
    fillTiles()
    while (!autoCompleteGame(createTilesArray())) {
        console.log("Reseting values")
        resetTiles()
        fillTiles()
    }
    resetTilesInput()
}

checkGameState()
