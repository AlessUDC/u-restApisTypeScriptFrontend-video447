import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }

    await addProduct(data)

    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-600">Registrar Producto</h1>
                <Link
                    to={'/'}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-lg shadow-sm"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'
            >
                {/* Crear producto, no existe prop porque el producto aún no existe */}
                <ProductForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
