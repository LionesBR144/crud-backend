
import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";
import hash from "@adonisjs/core/services/hash";

export default class UserController {
  public async index({ response }: HttpContext) {
    // Lista todos os usuários e preenche a relação com fornecedores
    const users = await User.query()
      .preload('fornecedores')
      .orderBy('id', 'asc');

    // Retorna os dados dos usuários em formato JSON
    return response.json(users);
  }

  public async store({ request, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password']);

    // Hash the password
    const hashedPassword = await hash.make(password);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return response.status(201).json(user);
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    return response.json(user);
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const { fullName, email, currentPassword, newPassword } = request.only(['fullName', 'email', 'currentPassword', 'newPassword']);

    // Verify the current password if provided
    if (currentPassword && !(await hash.verify(user.password, currentPassword))) {
      return response.status(401).json({ message: 'Current password is incorrect' });
    }

    if (newPassword) {
      // Update the password with the new hash if provided
      user.password = await hash.make(newPassword);
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    await user.save();
    return response.json(user);
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    await user.delete();
    return response.status(204).json(null);
  }


  public async getUserFornecedores({ params, response }: HttpContext) {
    const userId = params.id;
  
    try {
      const user = await User
        .query()
        .where('id', userId)
        .preload('fornecedores', (fornecedorQuery) => {
          fornecedorQuery.select('email', 'createdAt');
        })
        .firstOrFail();
  
      const result = {
        fullName: user.fullName,
        fornecedores: user.fornecedores.map(fornecedor => ({
          fornecedorEmail: fornecedor.email,
          createdAt: fornecedor.createdAt,
        })),
      };
  
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: 'User not found or error loading fornecedores', error: error.message });
    }
  }

}