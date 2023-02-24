import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({ request, response }: HttpContextContract) {
        const book = new Book()
        book.title = request.input('title')
        book.author = request.input('author')
        book.publisher = request.input('publisher')
        book.format = request.input('format')
        book.print_length = request.input('print_length')
        book.user_id = request.input('user_id')
        try {
            await book.save()
            response.status(200).json({'msg':`book \"${book.title}\" registered`})
        } catch (error) {
            console.log(error)
            response.status(501).json({'msg':'internal server error'})
        }
    }

    public async index() {
        const books = await Book.query()
        return books
    }

    public async show({ params }: HttpContextContract) {
        try {
            const book = await Book.find(params.id)
            if (book) {
                return book
            } else {
                return("Registro no existe")
            }
        } catch (error) {
            console.log(error)            
        }
    }

    public async update({ request, params }: HttpContextContract) {
        const book = await Book.find(params.id)
        if (book) {
            book.title = request.input('title')
            book.author = request.input('author')
            if (await book.save()) {
                return {
                    "msg": "Libro actualizado correctamente",
                    book
                }
            }
            return {
                "msg": "No se pudo actualizar",
                "estado": 401
            }
        }
        return {
            "msg": "Registro no encontrado",
            "estado": 401
        }
    }
}
