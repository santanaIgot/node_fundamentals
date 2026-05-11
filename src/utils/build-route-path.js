// /users/:id

export function buildRoutePath(path) {
    // regex criada para identificar route parameters
    // regex é uma expressão regular que identifica um texto que segue um formato específico 
    // forma de encontrar textos

    const routeParametersRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)');

    // console.log(pathWithParams);
    // console.log(Array.from(path.matchAll(routeParametersRegex)))
    

    const newPathRegex = new RegExp(`^${pathWithParams}`)
    return newPathRegex;
}