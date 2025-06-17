export default function InputField({ label, name, type = "text", value, onChange, required, autoFocus }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
      <input
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
      />
    </div>
  );
}
