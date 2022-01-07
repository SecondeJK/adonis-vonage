import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TextMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (request.all().text === 'text') {
      response.abort('cannot send text')
    }

    await next()
  }
}
