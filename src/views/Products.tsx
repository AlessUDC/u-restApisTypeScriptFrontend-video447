import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"
import type { Product } from "../types"
import ProductDetails from "../components/ProductDetails"

export async function loader() {
    const products = await getProducts()
    console.log('--- loader products ---', products)
    return { products }
}

export default function Products() {
    const { products } = useLoaderData() as { products: Product[] }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-600">Productos</h1>
                <Link
                    to={'/productos/nuevo'}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-lg"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}