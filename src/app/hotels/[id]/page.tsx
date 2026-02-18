import { getHotelDetail } from "@/app/api/hotels/actions";

type Params = {
  id: string;
};

type HotelDetailProps = {
  params: Params;
};

const HotelDetail = async ({ params }: HotelDetailProps) => {
  const hotel = await getHotelDetail(Number(params.id));
  console.log({ hotel });
  return <div>Detalhe do Hotel</div>;
};

export default HotelDetail;
