import Button from "@/component/Button";
import TextField from "@/component/Form/TextField";
import Link from "@/component/Link";

export default function LoginPage() {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastra-se</span>

      <h3 className="w-full text-left text-xl pt-4">Bem vindo a DNC Hotel!</h3>
      <form className="w-full">
        <TextField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          className="mt-2"
          required
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Senha"
          className="mt-2"
          required
        />
        <Button appearance="primary" type="submit" className="mt-2">
          Continuar
        </Button>
      </form>
      <span className="my-2">ou</span>
      <Link href="/cadastrar" className="my-2">
        Cadastre-se
      </Link>
      <Link href="/esqueci-senha">Esqueci minha senha</Link>
    </article>
  );
}
