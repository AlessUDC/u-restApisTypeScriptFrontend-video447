import axios from "axios"
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types"
import { safeParse } from "valibot"

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {
        console.log("--- addProduct: DATA INPUT ---")
        console.log(data)

        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        console.log("--- addProduct: VALIBOT RESULT ---")
        console.log(result)

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            console.error('--- addProduct: VALIBOT ERROR ---')
            console.error(result.issues)
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Datos no válidos al obtener productos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Datos no válidos al obtener productos')
        }

    } catch (error) {
        console.log(error)
    }
}