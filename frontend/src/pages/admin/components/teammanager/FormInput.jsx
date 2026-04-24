export default function FormInput({
  label,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>

      <input
        {...props}
        className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${className}`}
      />
    </div>
  );
}