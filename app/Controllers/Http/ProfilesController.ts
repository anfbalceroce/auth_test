import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async register({ request, response }: HttpContextContract) {
        const description = request.input('description')
        const profile = new Profile()
        profile.description = description
        try {
            await profile.save()
            response.status(200).json({'msg':'profile registered'})
        } catch (error) {
            console.log(error)
            response.status(501).json({'msg':'internal server error'})
        }
    }
}
