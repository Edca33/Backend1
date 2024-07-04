import fs from 'node:fs'

class ProductManager {
    constructor(path){
        this.path= path;
        this.productList = [];
    }

    async getProductById(id){
        await this.getProductList();

        return this.productList.find (product => product.id === id);
    }

    async getProductList(){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.productList = [... JSON.parse(list).data] 
        return [... this.productList]
    }
    
    async addProduct(product){
        await this.getProductList();
        const newProduct = {
            id: '1',
            title: 'bloodborne',
            code: '48418',
            description: 'Enfrenta a tus pesadillas',
            price: 100.25,
            status: true,
            stock: 30
        }
        const newProduct2 = {
            id: '2',
            title: 'GRAND THEFT AUTO',
            code: '78684',
            description: 'Los santos, la ciudad del pecado',
            price: 124,
            status: true,
            stock: 58
        }
        const newProduct3 = {
            id: '3',
            title: 'Dark souls II',
            code: '59247',
            description: 'Preparate para morir',
            price: 210.25,
            status: true,
            stock: 10
        }
        const newProduct4 = {
            id: '4',
            title: 'the last of us 1',
            code: '2345',
            description: 'Perdura y sobrevive',
            price: 285.5,
            status: true,
            stock: 65
        }
        const newProduct5 = {
            id: '5',
            title: 'Driveclub',
            code: '6225',
            description: 'Arranquen los motores velocistas!',
            price: 102.10,
            status: true,
            stock: 20
        }
        

        this.productList.push(newProduct)
        this.productList.push(newProduct2)
        this.productList.push(newProduct3)
        this.productList.push(newProduct4)
        this.productList.push(newProduct5)
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList}));
    }
}

export default ProductManager