interface UserTypeSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function UserTypeSelector({
  options,
  selected,
  onChange,
}: UserTypeSelectorProps) {
  return (
    <div className="space-y-4 mb-8">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 py-1 cursor-pointer group"
        >
          {/* Custom radio — peer pattern fixes the broken appearance-none approach */}
          <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
            <input
              type="radio"
              name="userType"
              value={option}
              checked={selected === option}
              onChange={(e) => onChange(e.target.value)}
              className="peer sr-only"
            />
            <span className="w-4 h-4 rounded-full border border-grey-400 peer-checked:border-primary-blue transition-colors" />
            <span className="absolute w-2 h-2 rounded-full bg-primary-blue scale-0 peer-checked:scale-100 transition-transform" />
          </span>
          <span className="text-base text-grey-400 font-normal group-hover:text-black transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
