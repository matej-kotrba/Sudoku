function disableIncorrectValues(array) {
    for (let i = 0; i < SIZE; i++) {
        numberPicks[i].style.display = "inline-block"
    }
    for (let i of array) {
        numberPicks[i-1].style.display = "none"
    }
    return
} 

function autoCompleteGame() {
    let index = 0;
    while (index < SIZE**2 && tiles[index].dataset.value != '') index++
    if (index >= SIZE**2) return true
    var array = getInValidValues(index);
    for (let i in array) {
        tiles[index].dataset.value = `${array[i]}`
        if (autoCompleteGame()) return true 
    }
    tiles[index].dataset.value = '';
    return false
}

function isCompleted() {
    for (let i = 0; i < tiles.length-1; i++) {
        console.log(i)
        if (tiles[i].dataset.value == '') return false
    }
    return true
}
