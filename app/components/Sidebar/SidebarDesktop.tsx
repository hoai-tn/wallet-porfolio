import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./styles";
import ThemeSwitcher from "@/app/ThemeSwitcher";

const SideBar = () => {
  const [isFullSideBar, setIsFullSideBar] = useState<Boolean>(true);
  const path = usePathname();

  return (
    <div className={`${styles.wrapper} ${isFullSideBar ? "w-52" : "w-14"}`}>
      <div
        className={styles.toggleBtn}
        onClick={() => setIsFullSideBar((prevState) => !prevState)}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
          chevron_left
        </span>
      </div>
      <div className="overflow-y-auto">
        <div className="px-4">
          {isFullSideBar ? (
            <>
              <img
                className={styles.logo}
                src="https://portfolio.metamask.io/static/js/../../static/media/portfolio-logo-dark.08cc3f1d5f4b7d89668022814a47623d.svg"
                alt="MetaMask"
              />
              <img
                className="h-8 w-auto dark:hidden outline-none"
                src="https://portfolio.metamask.io/static/js/../../static/media/portfolio-logo.f352f3a0c2db26a036ed52bb46d8738f.svg"
                alt="MetaMask"
              />
            </>
          ) : (
            <img
              className="h-7 w-7 outline-none"
              src="https://portfolio.metamask.io/static/js/../../static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
              alt="MetaMask"
            />
          )}
        </div>
        <nav className="mt-[50px]">
          <ul>
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${
                  path === "/" ? styles.activeLink : ""
                }`}
              >
                {path === "/" && <div className={styles.navLinkBorder}></div>}
                <span
                  className={`material-symbols-outlined ${
                    path === "/" ? "dark:text-blue-300 text-blue-700" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  dashboard
                </span>
                {isFullSideBar && <div>Dashboard</div>}
              </Link>
            </li>
            <li>
              <Link
                href="/buy"
                className={`${styles.navLink} ${
                  path === "/buy" ? styles.activeLink : ""
                }`}
              >
                {path === "/buy" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/buy" ? "dark:text-blue-300 text-blue-700" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  add_circle
                </span>
                {isFullSideBar && <div>Buy</div>}
              </Link>
            </li>
            <li>
              <Link
                href="/swap"
                className={`${styles.navLink} ${
                  path === "/swap" ? styles.activeLink : ""
                }`}
              >
                {path === "/swap" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/swap" ? "dark:text-blue-300 text-blue-700" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  cached
                </span>
                {isFullSideBar && <div>Swap</div>}
              </Link>
            </li>
            <li>
              <Link
                href="/bridge"
                className={`${styles.navLink} ${
                  path === "/bridge" ? styles.activeLink : ""
                }`}
              >
                {path === "/bridge" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/bridge" ? "dark:text-blue-300 text-blue-700" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  conversion_path
                </span>
                {isFullSideBar && <div>Bridge</div>}
              </Link>
            </li>
            <li>
              <Link
                href="/setting"
                className={`${styles.navLink} ${
                  path === "/setting" ? styles.activeLink : ""
                }`}
              >
                {path === "/setting" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/setting"
                      ? "dark:text-blue-300 text-blue-700"
                      : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  settings
                </span>
                {isFullSideBar && <div>Setting</div>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-full mt-auto">
          <div className={styles.navLink}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              help
            </span>
            {isFullSideBar && <div>FAQ</div>}
          </div>
          <div className={styles.navLink}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              contact_support
            </span>
            {isFullSideBar && <div>Support</div>}
          </div>
          <div className="px-4 py-2 my-5 text-[#a8abbe]">
            <ThemeSwitcher />
          </div>
          <div className={styles.navLink + " border-t py-4 mb-0"}>
            {isFullSideBar && <div className="font-sm">Terms of service</div>}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              open_in_new
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
