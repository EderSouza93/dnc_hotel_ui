import Button from "@/component/Button";
import TextField from "@/component/Form/TextField";
import Link from "@/component/Link";
import ImageField from "@/component/Form/ImageField";
import Pagination from "@/component/Pagination";


export default function Home() {
  return(
    <section>
      pagina principal
      <Button>clique em mim</Button>
      <Button appearance="secondary">clique em mim</Button>
      <Link href="/teste">Ir para teste</Link>
      <TextField label="Nome completo" id="full_name" name="full_name" />
      <ImageField label="Selecione a foto" id="profile_picture" name="profile_picture"/>
      <Pagination currentPage={1} destination="/" totalPages={100} />
    </section>
  ) 
}
