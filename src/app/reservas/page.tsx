import { Reservation } from "@/types/Reservation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { STATUS } from "@/helpers/format/dictionary/status";
import { getReservationByUser } from "../api/reservations/actions";
import Link from "@/component/Link";
import DetailListItem from "@/component/DetailListItem";

type ReduceReservations = {
  pending: Reservation[];
  approved: Reservation[];
  cancelled: Reservation[];
};

const ReservasPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservations = await getReservationByUser();

  console.log({ reservations });
  const { pending, approved, cancelled } =
    reservations.reduce<ReduceReservations>(
      (prev, current) => {
        if (current.status === STATUS.PENDING) {
          return { ...prev, pending: [...prev.pending, current] };
        } else if (current.status === STATUS.APPROVED) {
          return { ...prev, approved: [...prev.approved, current] };
        } else if (current.status === STATUS.CANCELLED) {
          return { ...prev, cancelled: [...prev.cancelled, current] };
        } else {
          return prev;
        }
      },
      { pending: [], approved: [], cancelled: [] },
    );

  return (
    <div className="py-20">
      <Link href="/perfil" className="my-10">
        Voltar
      </Link>
      <h1 className="font-bold text-4xl">Minhas reservas</h1>
      <span className="flex text-2xl font-bold mt-12">Próximas reservas</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas anteriores</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas canceladas</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {cancelled.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
    </div>
  );
};

export default ReservasPage;
