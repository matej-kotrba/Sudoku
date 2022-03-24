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

function fillTiles() {
    for (let i = 0; i < SIZE * SIZE; i++) {
        let div = document.getElementsByClassName('flexbox-child')[i]

        if (Math.random() > 0.8) {
            // div.dataset.value = `${Math.round(Math.random() * 8 + 1)}`
            div.dataset.value = getNumberSetup(getInValidValues(i))
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

function getInValidValues(index) {
    let array = []
    for (let j = 0; j < SIZE; j++) {
        if (tiles[j + Math.floor(index / SIZE) * SIZE].dataset.value != '') array.push(tiles[j + Math.floor(index / SIZE) * SIZE].dataset.value)
    }
    for (let k = 0; k < SIZE; k++) {
        if (tiles[k * SIZE + Math.floor(index % SIZE)].dataset.value != '') array.push(tiles[k * SIZE + Math.floor(index % SIZE)].dataset.value)
    }

    for (let i = 0; i < SIZE; i++) {
        let vzorec = tiles[(i % 3 + Math.floor(i / 3) * SIZE) + Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3].dataset.value
        if (vzorec != '') array.push(vzorec)
    }
    var validValuesArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    for (let i of array) {
        if (validValuesArray.indexOf(i) != -1) validValuesArray.splice(validValuesArray.indexOf(i), 1)
    }
    return validValuesArray
}

function getNumberSetup(array) {
    let value = null
    value = Math.round(Math.random() * 8 + 1)
    for (let i in array) {
        if (array[i] == value) return value
    }
    return getNumberSetup(array)
}

// COMMANDS ////////////////////////

function disableIncorrectValues(array) {
    for (let i = 0; i < SIZE; i++) {
        numberPicks[i].style.display = "none"
    }
    for (let i of array) {
        numberPicks[i - 1].style.display = "inline-block"
    }
    return
}

function autoCompleteGame() {
    let index = 0;
    while (index < SIZE ** 2 && tiles[index].dataset.value != '') index++
    if (index >= SIZE ** 2) return true
    var array = getInValidValues(index);
    for (let i in array) {
        tiles[index].dataset.value = `${array[i]}`
        if (autoCompleteGame()) return true
    }
    tiles[index].dataset.value = '';
    return false
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
    if (autoCompleteGame()) {
        document.querySelector('.flexbox').dataset.result = "Completeted"
        document.querySelector('.flexbox').classList.add('completed')
        document.getElementById('dialogPost').showModal()
        document.getElementById('body').value = 15
        document.getElementById('human').value = "NO"
    }
})

document.getElementById('cancel').addEventListener('click', (e) => {
    document.getElementsByTagName('dialog')[0].close()
})

document.getElementById('restart').addEventListener('click', (e) => {
    checkGameState()
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
            document.getElementById('dialogPost').showModal()
            document.getElementById('body').value = "15"
            document.getElementById('human').value = "YES"
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
    document.querySelector('.flexbox').dataset.result = ""
    document.querySelector('.flexbox').classList.remove('completed')
    resetTiles()
    fillTiles()
    while (!autoCompleteGame()) {
        console.log("Reseting values")
        resetTiles()
        fillTiles()
    }
    resetTilesInput()
}

checkGameState()
