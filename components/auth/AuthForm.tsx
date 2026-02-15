import AuthInput from "./AuthInput";

interface Props {
  variant: "login" | "signup";
}

const AuthForm: React.FC<Props> = ({ variant }) => {
  return (
    <div className="flex flex-col gap-4">

      {variant === "signup" && (
        <AuthInput placeholder="Username" type="text"/>
      )}

      <AuthInput placeholder="Email" type="email"/>

      <AuthInput placeholder="Password" type="password"/>

      <button className="bg-red-600 py-3 text-white rounded-md mt-4 hover:bg-red-700">
        {variant === "login" ? "Login" : "Sign Up"}
      </button>

    </div>
  );
};

export default AuthForm;
