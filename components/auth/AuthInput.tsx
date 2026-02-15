"use client";

interface Props {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const AuthInput: React.FC<Props> = ({
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-neutral-700 px-4 py-3 rounded-md text-white outline-none focus:ring-2 focus:ring-red-600"
    />
  );
};

export default AuthInput;
