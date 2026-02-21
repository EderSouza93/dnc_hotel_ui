import { getHotelDetail } from "@/app/api/hotels/actions";
import DetailPage from "@/component/DetailPage";
import { getFormattedPrice } from "@/helpers/format/money";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HotelBookingForm from "./HotelBookingForm";
import UserDetail from "@/component/UserDetail/server";

const HotelDetail = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotel = await getHotelDetail(Number(params.id));
  console.log(hotel);
  return (
    <DetailPage
      previousPage="/"
      title={hotel.name}
      image={{
        src: hotel.image ?? "/no-hotel.jpg",
        alt: `Foto do hotel ${hotel.name}`,
      }}
      asideContainer={{
        title: <>{getFormattedPrice(hotel.price)}&nbsp;noite</>,
        children: <HotelBookingForm hotel={hotel} />,
      }}
    >
      <UserDetail user={hotel.owner} />
      <hr className="mt-4" />
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Endereço</h3>
        <span className="mt-4">{hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Sobre este espaço</h3>
        <span className="mt-4">{hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default HotelDetail;
