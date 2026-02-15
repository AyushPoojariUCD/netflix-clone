interface Props {
  placeholder: string;
  type: string;
}

const AuthInput: React.FC<Props> = ({ placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-neutral-700 px-4 py-3 rounded-md text-white outline-none focus:ring-2 focus:ring-red-600"
    />
  );
};

export default AuthInput;
