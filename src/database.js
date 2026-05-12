import fs from "node:fs/promises"


// randomUUID => gera id unicos 
// para se trabalhar com arquivos fisicos no node usamos o fs do node 
export class Database {

    // este "#" é como se fosse um modificador de acesso de propriedades das classes no node e é um modificador de acesso privado
    // ou seja com este "#" na propriedade(ou objeto) fica privado, não conseguimos acesssar este valor 
    #database = {}

    #persist(){
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }

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

        this.#persist();

        return data;
    }


    delete(table, id){
        console.log("🚀 ~ Database ~ delete ~ table:", table)
        console.log("🚀 ~ Database ~ delete ~ id:", id)
        const rowIndex = this.#database[table].findIndex(row => {
            return row.id == id;
        })

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}