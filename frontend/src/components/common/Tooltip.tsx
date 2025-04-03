import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useDarkMode } from "../../hooks/useDarkMode";

const Tooltip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Popover className="relative flex items-center">
      <PopoverButton className="focus:outline-none">{children}</PopoverButton>
      <PopoverPanel
        className={`absolute z-50 w-60 p-2 rounded-lg shadow-lg text-sm transition-opacity duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {content}
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        />
      </PopoverPanel>
    </Popover>
  );
};

export default Tooltip;
