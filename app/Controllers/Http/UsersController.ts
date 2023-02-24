import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async register({ request, auth, response }: HttpContextContract) {
        const id = request.input('id')
        const checkID = await User.find(id)
        if (checkID === null) {
            const user = new User()
            user.id = id
            user.id_type = request.input('id_type')
            user.first_names = request.input('first_names')
            user.last_names = request.input('last_names')
            user.email = request.input('email')
            user.password = request.input('password')
            user.profile_id = request.input('profile_id')
            user.address = request.input('address')
            user.neighborhood = request.input('neighborhood')
            user.municipality = request.input('municipality')
            user.department = request.input('department')

            try {
                await user.save();
                const token = await auth.use("api").login(user, {
                    expiresIn: "30 mins"
                })
                response.status(200).json({'msg':'usere created', token})

            } catch (error) {
                console.log(error)
                response.status(501).json({'msg':'internal server error'})
            }
        } else {
            response.status(400).json({'msg':'user id already exists'})
        }
    }

    public async login({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        try {
            const token = await auth.use("api").attempt(email, password, {
                expiresIn: "30 mins"
            })
            response.status(200).json({"msg": "user logged in", token})
        } catch (error) {
            return response.unauthorized('invalid credentials')
        }
    }
}
