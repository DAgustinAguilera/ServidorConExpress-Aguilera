const { response } = require('express')
const fs = require('fs')
const { json } = require('stream/consumers')

class ProductManager{
    constructor() {
        this.product= []
        this.id = 0
    }

    async getProducts() {
        let res = await fs.promises.readFile('./products.json', 'utf-8')
        return res
    }

    addProducts (title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los paramaetros deben resivir un valor")
        }

        else if (!this.product.some((p) => p.code === code)) {
            let newProduct = {title, description, price, thumbnail, code, stock};
            this.product.push(newProduct);
            console.log(`${title} se agrego correctamente a la lista`)
            this.id+=1
            newProduct.id=this.id

           fs.promises.writeFile('./products.json',JSON.stringify(this.product, null, 2), 'utf-8')
            .then(res => {
                console.log('Promise:', res)
            })
            .catch(err =>{

            })

        }
        else {
            console.log(`Ya existe un libro con el codigo ${code}`)
        }
    }

    async getProductsById(id) {
        let res = await fs.promises.readFile('./products.json', 'utf-8')
            
            let response = JSON.parse(res)
            let productId = response.find((p) => p.id === id);

            if(productId){
                return productId;
            }
            else {
                console.log(`No hay ningun producto con el id ${id}`)
            }


    }

    updateProduct(id,campo,modif) {
        this.product.map((p) =>{
            if(p.id == id){
                p[campo] = modif
            }
        })
    }
    deleteProduct(id) {
        this.product.map((p) =>{
            if(p.id == id){
                this.product.pop(p)
            }
        })
    }
}

module.exports = ProductManager

const product = new ProductManager  
// product.addProducts("","Magos",20000,"imagen","HP",4)
// product.addProducts("harry potter2","Magos",22000,"imagen","HP2",3)
// product.addProducts("harry potter3","Magos",19000,"imagen","HP3",1)

// // console.log(product.getProducts())

// product.deleteProduct(2)
// // console.log(product.getProducts())

// // addProducts (title, description, price, thumbnail, code, stock)



