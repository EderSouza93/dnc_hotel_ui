"use server"

export async function signup(formData: FormData) {

    const payload = {
        "name": formData.get('name'),
        "email": formData.get('email'),
        "password": formData.get('password'),
        "role": formData.get('role')
    }

    console.log(payload)
}