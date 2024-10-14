import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
    async save({request}: HttpContext) {
        return await Product.create(request.body());
    }

    async read({}: HttpContext) {
        return Product.query().orderBy('id', 'asc');
    }

    readById({request}: HttpContext) {
        const id = request.param('id');
        return Product.findBy({
            id
        })
    }

    async update({ request }: HttpContext) {
        const id = request.param('id');
        const product = await Product.findOrFail(id);
        product.merge(request.body());
        await product.save();
        return product;
    }

    async delete({ request }: HttpContext) {
        const id = request.param('id');
        const product = await Product.findOrFail(id);
        await product.delete();
        return {
            message: 'Produto deletado'
        };
    }
}