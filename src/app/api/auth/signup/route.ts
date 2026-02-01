"use server"

import axios from "@/api";

export async function signup(formData: FormData) {
    const avatar = formData.get('avatar') as any;
    const formDataAvatar = new FormData()
    formDataAvatar.set('avatar', avatar)

    const payload = {
        "name": formData.get('name'),
        "email": formData.get('email'),
        "password": formData.get('password'),
        "role": formData.get('role')
    }

    const { data } = await axios.post('/users', payload)
    const { data: { access_token } } = await axios.post('/auth/login', {
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (avatar) {
        const avatarData = axios.post('/avatar', formDataAvatar, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log({ data, access_token, avatarData })
    }

}