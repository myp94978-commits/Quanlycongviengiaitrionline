function Select({ options, labelKey, valueKey, name, value, onChange }) {
  return (
    <select
      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">-- Chọn --</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
export default Select;
