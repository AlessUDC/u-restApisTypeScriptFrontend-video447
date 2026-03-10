import axios from "axios"
import { DraftProductSchema } from "../types"
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
