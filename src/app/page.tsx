import Button from "@/component/Button";
import Link from "@/component/Link";


export default function Home() {
  return(
    <section>
      pagina principal
      <Button>clique em mim</Button>
      <Button appearance="secondary">clique em mim</Button>
      <Link href="/teste">Ir para teste</Link>
    </section>
  ) 
}
