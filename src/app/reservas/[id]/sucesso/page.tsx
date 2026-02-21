import { getReservationById } from "@/app/api/reservations/actions";
import Link from "@/component/Link";
import UserDetail from "@/component/UserDetail/server";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SolicitacaoReservaPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservation = await getReservationById(Number(params.id));
  const { hotel } = reservation;

  return (
    <div className="flex flex-col w-full max-w-lg my-24 px-8">
      <section className="w-ful">
        <Link href="/reservas">Voltar</Link>
      </section>
      <section className="flex mt-2 flex-col">
        <article className="w-full">
          <h1 className="font-bold text-4xl">
            Sua solicitação de reserva na {hotel.name} foi enviada!
          </h1>
          <UserDetail user={hotel.owner} />
          <hr className="mt-4" />
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">
              Enviamos a solicitação de reserva para o anfitrião!
            </h3>
            <span className="mt-4">
              Estamos aguardando o anfitrião aprovar sua reserva na {hotel.name}
              , em breve você receberá atualizações a sua solicitação.
            </span>
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{hotel.address}</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default SolicitacaoReservaPage;
