const SIZE = 9

//if(!autoCompleteGame()) document.querySelector('.flexbox').dataset.result = "This game of Sudoku cant be solved !"

const flexbox = document.querySelector('.flexbox')

function createFlexbox() {
    for (let i = 0; i < SIZE * SIZE; i++) {
        let div = document.createElement('div')
        div.classList.add("flexbox-child")
        flexbox.append(div)
        if ((i+1) % 3 == 0 && (i+1) % 9 != 0) {
            let space = document.createElement('div')
            space.classList.add('space')
            flexbox.append(space)
        }
        if ((i+1) >= 27 && (i+1) % 27 == 0 && (i+1) < SIZE**2) {
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
        let vzorec=tiles[(i % 3 + Math.floor(i / 3) * SIZE) + Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3)*3].dataset.value
        if (vzorec != '') array.push(vzorec)
    }
    var validValuesArray = ["1","2","3","4","5","6","7","8","9"]
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