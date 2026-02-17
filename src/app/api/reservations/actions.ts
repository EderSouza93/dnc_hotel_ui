"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "@/api";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import { getHotelDetail } from "../hotels/actions";
import { Hotel } from "@/types/Hotel";

export async function reserveHotelById(prevState: any, formData: FormData) {
    let reservationId;

    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');

    try {
        const payload = {
            hotelId: Number(formData.get('hotelId')),
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
        }

        const { data } = await axios.post('/reservation', payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        reservationId = data.id;
    } catch (error) {
        console.error({error})
        return {...prevState, message: 'Não foi possivel realizar a reserva', error: true}
    }

    redirect(`/reservas/${reservationId}/sucesso`)
}

export async function getReservationById(id: number): Promise<Reservation> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');

    const { data } = await axios.get(`/reservations/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const hotel = await getHotelDetail(data.hotelId)

    return { ...data, hotel };
}

export async function getReservationByUser(): Promise<Reservation[]> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');

    const { data } = await axios.get('/reservations/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (data.length) {
        const reservations = await Promise.all(data.map(async (reservation: Reservation) => {
            const hotel = await getHotelDetail(reservation.hotelId);
            return { ...reservation, hotel}
        }));

        return reservations
    }

    return data;
}

export async function getReservationByHotel(hotel:Hotel): Promise<Reservation[]> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');

    const { data } = await axios.get(`/reservations/hotel/${hotel.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (data.length) {
        const reservations = data.map((reservation: Reservation) => {
            return { ...reservation, hotel }
        });

        return reservations
    }

    return data;
}

export async function updateReservationStatus(reservationId: number, status: ReservationStatus) {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');

    const { data } = await axios.patch(`/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${accessToken}`}
    });

    return data;
}