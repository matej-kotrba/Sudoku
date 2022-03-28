exports.sort = {
    byIndex: (array, sortIndex) => {
        for (var i = 0; i < array.length; i++) {
            for (var k = 0; k < array.length-1-i;k++) {
                if (+array[k][sortIndex] < +array[k+1][sortIndex]) {
                    let a = array[k]
                    let b = array[k+1]
                    array[k] = b
                    array[k+1] = a
                }
            }
        }
        return array
    },
    byAlphabetic: (array, sortIndex) => {
        let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','x','y','z']
        for (var i = 0; i < array.length; i++) {
            console.log(array[0][sortIndex].slice(1).toLowerCase())
            for (var k = 0; k < array.length-1-i;k++) {
                let a = letters.indexOf(array[k][sortIndex].slice(1).toLowerCase()) 
                let b = letters.indexOf(array[k][sortIndex].slice(1).toLowerCase()) 
                if (a > b) {
                    let value = array[k]
                    array[k] = array[k+1]
                    array[k+1] = value
                }
            }
        }
        return array
    }
}