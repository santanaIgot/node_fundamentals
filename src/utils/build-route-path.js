// /users/:id

export function buildRoutePath(path) {
    // regex criada para identificar route parameters
    // regex é uma expressão regular que identifica um texto que segue um formato específico 

    const routeParametersRegex = /:([a-zA-z]+)/g
    return console.log(Array.from(path.matchAll(routeParametersRegex)));
}