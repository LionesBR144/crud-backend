import Fornecedor from "#models/fornecedor";
import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";

export default class FornecedorsController {
  async save({ request, response }: HttpContext) {
    try {
        const {  email, password } = request.only(['userId', 'email', 'password']);
        
        // Verifica se userId está definido e é um valor válido
        // if (!userId) {
        //     console.log('userId is missing');
        //     return response.status(400).json({ message: 'userId is required' });
        // }

        // const user = await User.find(userId);
        // if (!user) {
        //     console.log(`User not found with userId: ${userId}`);
        //     return response.status(404).json({ message: 'User not found' });
        // }

        const fornecedor = new Fornecedor();
        fornecedor.email = email;
        fornecedor.password = password;
        // fornecedor.userId = userId;

        await fornecedor.save();

        return response.status(201).json(fornecedor);
    } catch (error) {
        console.error('Error in save method:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}


  async read({}: HttpContext) {
      return Fornecedor.query().orderBy('id', 'asc');
  }

  async readById({ request }: HttpContext) {
      const id = request.param('id');
      return Fornecedor.findOrFail(id); // `findOrFail` é usado para encontrar por ID
  }

  async update({ request, response }: HttpContext) {
      const id = request.param('id');
      const fornecedor = await Fornecedor.findOrFail(id);

      const { userId, email, password } = request.only(['userId', 'email', 'password']);

      if (userId) {
          const user = await User.find(userId);
          if (!user) {
              return response.status(404).json({ message: 'User not found' });
          }
          fornecedor.userId = userId;
      }

      fornecedor.merge({ email, password });
      await fornecedor.save();

      return response.json(fornecedor);
  }

  async delete({ request, response }: HttpContext) {
      const id = request.param('id');
      const fornecedor = await Fornecedor.findOrFail(id);
      await fornecedor.delete();

      return response.json({ message: 'Fornecedor deleted' });
  }
}