import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';


export default class AuthController {
  /**
   * Handle user login
   * POST /api/login
   */
  public async login({ request, response }: HttpContext) {
    // Extrair email e senha do corpo da requisição
    const { email, password } = request.only(['email', 'password']);

    try {
      console.log(email)
      // Encontrar o usuário pelo email
      const user = await User.findByOrFail('email', email);
      // Verificar a senha
      const passwordVerified = await hash.verify(user.password, password);

      if (!passwordVerified) {
        return response.unauthorized({ message: 'Credenciais inválidas' });
      }

      // Gerar um token de acesso
      const token = await User.accessTokens.create(user)
      console.log(passwordVerified);

      // Retornar o token como resposta
      return response.ok({
        message: 'Login bem-sucedido',
        token: token, // Usar `token.token` para acessar o valor do token
      });
      
    } catch (error) {
      console.log(error)
      // Tratar erros de autenticação
      return response.unauthorized({
        message: error.message,
      });
    }
  }
}
