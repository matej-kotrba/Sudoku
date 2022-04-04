exports.sort = {
    byIndex: (array, sortIndex) => {
        for (var i = 0; i < array.length; i++) {
            for (var k = 0; k < array.length - 1 - i; k++) {
                if (+array[k][sortIndex] < +array[k + 1][sortIndex]) {
                    let a = array[k]
                    let b = array[k + 1]
                    array[k] = b
                    array[k + 1] = a
                }
            }
        }
        return array
    },
    byAlphabetic: (array, sortIndex) => {
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
        let index = 0
        //console.log(letters.indexOf(array[5][sortIndex].charAt(0).toLowerCase()) )
        for (var i = 0; i < array.length; i++) {
            for (var k = 0; k < array.length - 1 - i; k++) {
                let {a, b} = getString(array[k][sortIndex], array[k+1][sortIndex], letters)
                if (+a > +b) {
                    let value = array[k]
                    array[k] = array[k + 1]
                    array[k + 1] = value
                }
                index++
                index = 0
            }
        }
        return array
    }
}

function getString(a, b, letters) {
    let stringA = ''
    let stringB = ''
    let index = 0
    do {
        stringA = letters.indexOf(a.charAt(index).toLowerCase())
        stringB = letters.indexOf(b.charAt(index).toLowerCase())
        index++
    }
    while(stringA == stringB && a[index])
    return {a: stringA, b: stringB}
}