export class Database {

    // este "#" é como se fosse um modificador de acesso de propriedades das classes no node e é um modificador de acesso privado
    // ou seja com este "#" na propriedade(ou objeto) fica privado, não conseguimos acesssar este valor 
    #database = {}

    select(table) {
        const data = this.#database[table] ?? []

        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        return data;
    }
}