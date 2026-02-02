import Button from "@/component/Button";
import TextField from "@/component/Form/TextField";
import Link from "@/component/Link";
import Image from "next/image";
import { signup } from "../api/auth/signup/route";

const EsqueciSenhaPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Recuperar senha</span>
      <form className="w-full flex flex-col items-center justify-center" action={signup}>
        <Image
          src="/forgot-password.svg"
          alt="Ilustração esqueci minha senha"
          width={172}
          height={167}
          className="mt-6"
        />
        <TextField
          label="E-mail"
          type="email"
          id="email"
          name="email"
          className="mt-6"
          required
        />
        <Button appearance="primary" type="submit" className="mt-8">
          Enviar e-mail
        </Button>
      </form>
      <span className="mt-2">ou</span>
      <Link href="/login" className="my-2">
        Cancelar
      </Link>
    </section>
  );
};

export default EsqueciSenhaPage;
