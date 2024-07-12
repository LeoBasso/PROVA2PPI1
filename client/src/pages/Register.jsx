import { useForm } from "react-hook-form";
import { createUser } from "../queries/users/users";
import SubmitButton from "../components/Buttons/SubmitButton";
import ClearButtonForm from "../components/Buttons/ClearButtonForm";
import { Link } from "react-router-dom";
import { CreateUserSchema } from "../schemas/CreateUserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRow from "../components/Form/FormRow";

function Register() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(CreateUserSchema),
  });

  const handlerCreateUser = async (user) => {
    await createUser(user);
    reset();
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#09090b]"
      onSubmit={handleSubmit(handlerCreateUser)}
    >
      <div className="w-full max-w-sm p-4 bg-gray-400 border border-gray-500 rounded-lg shadow-md sm:p-6 md:p-8">
        <h5 className="text-xl font-medium text-gray-900">
          Registre o novo usuário na plataforma
        </h5>
        <br />
        <FormRow
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Nome"
          control={control}
          hasError={JSON.stringify(errors.name?.message)}
        />
        <br />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          placeholder="teste@teste.com"
          control={control}
          hasError={JSON.stringify(errors.email?.message)}
        />
        <br />
        <FormRow
          type="password"
          name="password"
          labelText="Senha"
          placeholder="*********"
          control={control}
          hasError={JSON.stringify(errors.password?.message)}
        />
        <br />
        <div className="relative inline-flex items-center justify-center">
          <ClearButtonForm onClick={() => reset()} />
          <SubmitButton label="Registrar" />
        </div>
        {/* <div className="text-sm font-medium text-black mt-4 ">
          Já registrado?
          <Link
            className="text-orange-700 hover:underline ml-2"
            onClick={() => reset()}
            to="/login"
          >
            Faça Login
          </Link>
        </div> */}
      </div>
    </form>
  );
}

export default Register;
