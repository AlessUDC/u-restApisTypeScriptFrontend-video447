import { Link } from "react-router-dom";

export default function Products() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-600">Productos</h1>
            <Link
                to={'/productos/nuevo'}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-lg"
            >
                Agregar Producto
            </Link>
        </div>
    )
}
