import express from 'express';
import ProductManager from './Class/productManager.js';
import { __dirname } from './utils.js';
import path from 'path';
import CartManager from './Class/cartManager.js';
 

const cartManager = new CartManager(path.join(__dirname, 'data', 'carrito.json'));

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager(__dirname + '/data/product.json');


app.post('/', async (req, res) => {
    //console.log('entro a al post')
    const newProduct = req.body
    req.body.price
    await productManager.addProduct(newProduct)
    //console.log('ya se creo el .json o deberia')
    res.status(201).json({ message: 'Añadido!!' })
})


app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productFind = await productManager.getProductById(id);
    if (productFind) {
        res.status(200).json({ resultado: productFind });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const productoActualizar = req.body;

    res.status(200).json({ message: 'El producto ha sido actualizado' });
});

app.get('/', async (req, res) => {
    //console.log('entro a al post')
    const productList = await productManager.getProductList()
    //console.log('ya se creo el .json o deberia')
    res.status(201).json({ resultado: productList })
})

app.post('/api/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);


        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await cartManager.addProductToCart(cartId, productId);

        res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(8080, () => {
    console.log('SERVIDOR PUESTO EN LINEA, ALOJADO EN EL PUERTO 8080')
})


