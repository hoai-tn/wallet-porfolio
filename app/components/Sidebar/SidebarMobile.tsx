"use client";
import { useState } from "react";
import styles from "./styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarMobile = () => {
  const path = usePathname();

  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div className="md:hidden w-full bg-surface-default p-4">
      <div className=" flex justify-between items-center">
        <div
          className="cursor-pointer"
          onClick={() => setToggleNav((prevState) => !prevState)}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div>
          <img
            className="h-8 w-auto hidden dark:flex outline-none"
            src="https://portfolio.metamask.io/static/js/../../static/media/portfolio-logo-dark.08cc3f1d5f4b7d89668022814a47623d.svg"
            alt="MetaMask"
          />
        </div>
        <div>
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
      <div className={toggleNav ? "fixed inset-0 bg-black" : "hidden"}>
        <div className="flex p-4 border-b border-[#3e3f4b]">
          <div className="cursor-pointer" onClick={() => setToggleNav(false)}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className="mx-auto">
            <img
              className="h-8 w-auto hidden dark:flex outline-none"
              src="https://portfolio.metamask.io/static/js/../../static/media/portfolio-logo-dark.08cc3f1d5f4b7d89668022814a47623d.svg"
              alt="MetaMask"
            />
          </div>
        </div>
        <nav className="mt-[50px]">
          <ul>
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${
                  path === "/" ? styles.activeLink : ""
                }`}
                onClick={() => setToggleNav(false)}
              >
                {path === "/" && <div className={styles.navLinkBorder}></div>}
                <span
                  className={`material-symbols-outlined ${
                    path === "/" ? "text-blue-300" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  dashboard
                </span>
                <div>Dashboard</div>
              </Link>
            </li>
            <li>
              <Link
                href="/buy"
                className={`${styles.navLink} ${
                  path === "/buy" ? styles.activeLink : ""
                }`}
                onClick={() => setToggleNav(false)}
              >
                {path === "/buy" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/buy" ? "text-blue-300" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  add_circle
                </span>
                <div>Buy</div>
              </Link>
            </li>
            <li>
              <Link
                href="/swap"
                className={`${styles.navLink} ${
                  path === "/swap" ? styles.activeLink : ""
                }`}
                onClick={() => setToggleNav(false)}
              >
                {path === "/swap" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/swap" ? "text-blue-300" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  cached
                </span>
                <div>Swap</div>
              </Link>
            </li>
            <li>
              <Link
                href="/bridge"
                className={`${styles.navLink} ${
                  path === "/bridge" ? styles.activeLink : ""
                }`}
                onClick={() => setToggleNav(false)}
              >
                {path === "/bridge" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/bridge" ? "text-blue-300" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  conversion_path
                </span>
                <div>Bridge</div>
              </Link>
            </li>
            <li>
              <Link
                href="/setting"
                className={`${styles.navLink} ${
                  path === "/setting" ? styles.activeLink : ""
                }`}
                onClick={() => setToggleNav(false)}
              >
                {path === "/setting" && (
                  <div className={styles.navLinkBorder}></div>
                )}
                <span
                  className={`material-symbols-outlined ${
                    path === "/setting" ? "text-blue-300" : ""
                  }`}
                  style={{ fontSize: 18 }}
                >
                  settings
                </span>
                <div>Setting</div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t border-[#3e3f4b]">
          <div className={styles.navLink}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              help
            </span>
            <div>FAQ</div>
          </div>
          <div className={styles.navLink}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              contact_support
            </span>
            <div>Support</div>
          </div>
          <div className="px-4 py-2 my-5 text-[#a8abbe]">
            <div>Switch</div>
          </div>
          <div className={styles.navLink + " border-t border-[#3e3f4b] py-4 mb-0"}>
            <div className="font-sm">Terms of service</div>
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
export default SidebarMobile;
