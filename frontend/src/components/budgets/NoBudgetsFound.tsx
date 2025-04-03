import { MdOutlineSearchOff } from "react-icons/md";

const NoBudgetsFound = () => (
  <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
    <MdOutlineSearchOff className="mx-auto text-6xl mb-4" />
    <p className="text-xl font-semibold">No Budgets Found</p>
    <p className="mt-2">Try adjusting your filters or search keywords.</p>
  </div>
);

export default NoBudgetsFound;
