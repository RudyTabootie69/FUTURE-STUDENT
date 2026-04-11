type ProfileSelectOption = {
  label: string;
  value: string;
};

type ProfileSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ProfileSelectOption[];
  className?: string;
};

export function ProfileSelect({
  label,
  value,
  onChange,
  options,
  className,
}: ProfileSelectProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-black">{label}</label>
      <select
        className="w-full rounded-lg border border-[#1A1818] bg-bg-soft px-3 py-2.5 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
