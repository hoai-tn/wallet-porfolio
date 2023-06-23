import Link from "next/link";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
const SideBar = () => {
  return (
    <div className="h-screen bg-surface-default py-5 pt-8">
      {/* <img
        className="h-7 w-7 outline-none"
        src="https://portfolio.metamask.io/static/js/../../static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
        alt="MetaMask"
      /> */}
      <img
        className="h-8 w-auto hidden dark:flex outline-none"
        src="https://portfolio.metamask.io/static/js/../../static/media/portfolio-logo-dark.08cc3f1d5f4b7d89668022814a47623d.svg"
        alt="MetaMask"
      />
      <nav className="mt-8">
        <ul>
          <li>
            <span className="material-symbols-outlined">nature_people</span>
            <Link href="/about">Dashboard</Link>
          </li>
          <li>Buy</li>
          <li>Swap</li>
          <li>Bridge</li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
