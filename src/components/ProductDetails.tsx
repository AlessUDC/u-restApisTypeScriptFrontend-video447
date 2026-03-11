import { Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    console.log('desde action con ProductDetails :p', params.id)

    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>

            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>

            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'}
                            rounded-lg p-2 text-xs uppercase font-bold w-full
                            border-[0.5px] border-black-100 hover:cursor-pointer
                        `}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>

            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 hover:bg-indigo-900 transition-colors duration-300 ease-in-out text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                    >Editar</button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de eliminar el producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 hover:bg-red-800 transition-colors duration-300 ease-in-out text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}