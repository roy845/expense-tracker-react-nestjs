import { Switch } from "@headlessui/react";

interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
}

const RecurringSwitch: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="font-medium">Recurring Transaction</label>
    <Switch
      checked={value}
      onChange={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
        value ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </Switch>
  </div>
);

export default RecurringSwitch;
