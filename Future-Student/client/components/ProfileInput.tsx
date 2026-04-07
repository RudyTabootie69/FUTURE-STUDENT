type ProfileInputProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
};

export function ProfileInput({
  label,
  value,
  onChange,
  type = "text",
  className,
}: ProfileInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-black">{label}</label>
      <input
        type={type}
        className="w-full rounded-lg border border-[#1A1818] bg-bg-soft px-3 py-2.5 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
