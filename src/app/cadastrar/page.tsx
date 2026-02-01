import Button from "@/component/Button";
import ImageField from "@/component/Form/ImageField";
import RadioGroup from "@/component/Form/RadioGroup";
import TextField from "@/component/Form/TextField";
import Link from "@/component/Link";
import { signup } from "../api/auth/signup/route";

const CadastrarPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <form className="w-full" action={signup}>
        <ImageField
            name="avatar"
            label="Selecionar foto"
            id="avatar"
        />
        <TextField
            label="Digite o nome completo"
            type="text"
            id="name"
            name="name"
            className="mt-2"
            required
        />
        <TextField
            label="E-mail"
            type="email"
            id="email"
            name="email"
            className="mt-2"
            required
        />
        <TextField
            label="Senha"
            type="password"
            id="password"
            name="password"
            className="mt-2"
            required
        />
        <TextField
            label="Confirmar senha"
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="mt-2"
            required
        />
        <RadioGroup
            options={[
                {label: 'Sim', value: 'ADMIN', id: 'yes'},
                {label: 'Não', value: 'USER', id: 'no'}
            ]}
            name="role"
            label="Você deseja anunciar hospedagens?"
            className="my-2"
        />
        <Button appearance="primary" type="submit" className="mt-2">
            Cadastrar-se
        </Button>
      </form>
      <span className="mt-2">ou</span>
      <Link href="/login" className="my-2">
        Já possuo um cadastro
      </Link>
    </section>
  );
};

export default CadastrarPage;
