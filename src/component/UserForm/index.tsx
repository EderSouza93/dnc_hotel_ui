"user client";
import PasswordFields from "@/app/cadastrar/PasswordFields";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import RadioGroup from "../Form/RadioGroup";
import Button from "../Button";
import Alert from "../Alert";
import { useFormState } from "react-dom";
import { signup } from "@/app/api/auth/signup/actions";
import 