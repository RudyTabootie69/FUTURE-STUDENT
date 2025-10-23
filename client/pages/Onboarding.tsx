import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");

  const options = [
    "Current Year 12 Student",
    "Parent / Caregiver of current Year 12 Student",
    "Representative of a Tertiary Institution",
    "Representative of a Secondary Institution",
  ];

  const handleSubmit = () => {
    if (selected) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-[484px]">
          <h1 className="text-2xl font-bold text-black text-center mb-12">
            Which of these best describes you?
          </h1>

          <div className="space-y-6">
            {options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 py-1 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="userType"
                    value={option}
                    checked={selected === option}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-4 h-4 border border-grey-400 rounded appearance-none checked:bg-primary-blue checked:border-primary-blue cursor-pointer transition-colors"
                  />
                  {selected === option && (
                    <svg
                      className="absolute w-3 h-3 pointer-events-none"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-base text-grey-400 font-normal">
                  {option}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full mt-12 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-blue items-center justify-center p-12">
        <div className="flex items-center justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b25a9f25196a07957d83ef28a0feaea98b4bfb78?width=1000"
            alt="Future Student Logo"
            className="w-full max-w-[500px] h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
