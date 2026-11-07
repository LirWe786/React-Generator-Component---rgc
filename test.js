function validateFileName(componentName) {
    const strg = componentName
    let arr = strg.split('')
    let fsrtSymbol = arr[0].toUpperCase()
    arr[0] = fsrtSymbol;

    return arr.join('')
}

console.log(validateFileName('component'))