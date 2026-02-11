"use server"
import axios from '@/api';
import { decryptToken } from '@/helpers/decryptToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User, UserProfile } from '@/types/User';
import { getHotelByOwner } from '../hotels/actions';

export async function getProfile(): Promise<UserProfile> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login')

    const { id } = decryptToken(accessToken)

    const { data } = await axios.get<User>(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (data.role === 'ADMIN') {
        const hotels = await getHotelByOwner();

        if (hotels) {
            return { ...data, hotels }
        }

        return data;
    } else {
        const [reservation] = await getReserva
    }
}