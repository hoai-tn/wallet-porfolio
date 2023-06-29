import { Currencies } from "./SelectButton/CurrenciesSelect";
import { GasSelect } from "./SelectButton/GasSelect";

const NavBar = () => {
  return (
    <div className="flex items-center">
      <div className="flex gap-x-4 items-center">
        <div className="text-2xl font-bold">Dashboard</div>
      </div>
      <div className="flex ml-auto items-center gap-x-5 mr-5">
        <div>
          <input
            className="bg-default border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="search for the token..."
          />
        </div>
        <div>
          <Currencies />
        </div>
        <div>
          <GasSelect />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
