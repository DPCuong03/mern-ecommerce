import { Check } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: " Contains uppercase lettter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /[0-9]/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <>
              <Check className="size-4 text-green-500 mr-2" />
            </>
          ) : (
            <>
              <Check className="size-4 text-gray-500 mr-2" />
            </>
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {" "}
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const getStrength = (pass) => {
  let strength = 0;
  if (pass.length >= 6) strength++;
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
  if (pass.match(/\d/)) strength++;
  if (pass.match(/[^a-zA-Z\d]/)) strength++;
  return strength;
};

const getStrengthText = (strength) => {
  switch (strength) {
    case 0:
      return "Very weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    default:
      return "Strong";
  }
};

const getColor = (strength) => {
  switch (strength) {
    case 0:
      return "bg-red-500";
    case 1:
      return "bg-red-400";
    case 2:
      return "bg-yellow-500";
    case 3:
      return "bg-yellow-400";
    default:
      return "bg-green-500";
  }
};

const PasswordStrengthMeter = ({ password }) => {
  const strength = getStrength(password);
  const strengthText = getStrengthText(strength);
  const color = getColor(strength);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{strengthText}</span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300
            ${index < strength ? color : "bg-gray-700"}
          `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
