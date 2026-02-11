import Button from "@/component/Button";
import TextField from "@/component/Form/TextField";
import Link from "@/component/Link";
import ImageField from "@/component/Form/ImageField";
import Pagination from "@/component/Pagination";
import Alert from "@/component/Alert";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession();
  if (!session?.user) redirect("/login")
  return(
    <section>
      pagina principal
      <Button>clique em mim</Button>
      <Button appearance="secondary">clique em mim</Button>
      <Link href="/teste">Ir para teste</Link>
      <TextField label="Nome completo" id="full_name" name="full_name" />
      <ImageField label="Selecione a foto" id="profile_picture" name="profile_picture"/>
      <Pagination currentPage={1} destination="/" totalPages={100} />
      <Alert type="success">Esse é um feedback de sucesso</Alert>
      <Alert type="danger">Falha na operação, tente novamennte</Alert>
    </section>
  ) 
}
