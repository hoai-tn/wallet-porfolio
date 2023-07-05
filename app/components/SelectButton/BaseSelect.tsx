"use client";
import { Children, useEffect, useRef, useState } from "react";

export const BaseSelect = ({ name, title, selectItem, children }) => {
  const btn = useRef<HTMLButtonElement>(null);
  const dropList = useRef<HTMLDivElement>(null);
  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [isOpenList]);

  //create a function in your component to handleOutsideClicks
  const handleOutsideClicks = (event: MouseEvent | "") => {
    const targetEl = event?.target || "";
    if (
      isOpenList &&
      dropList.current &&
      !dropList.current.contains(targetEl) &&
      btn.current &&
      !btn.current.contains(targetEl)
    ) {
      setIsOpenList(false);
    }
  };
  return (
    <div className="relative">
      <button
        ref={btn}
        className="flex items-center gap-x-2 px-4 py-2 rounded-full border border-[#3e3f4b]"
        onClick={() => setIsOpenList((prevState) => !prevState)}
      >
        {selectItem?.img && (
          <img src={selectItem.img} className="w-5 h-5" alt=""></img>
        )}
        <span>{selectItem?.text}</span>
        <span className="material-symbols-outlined">expand_more</span>
      </button>
      {isOpenList && (
        <div
          ref={dropList}
          className="absolute right-0 bg-surface-default py-2 mt-2 rounded z-index-1"
        >
          <div className="py-2 px-4">{name}</div>
          {children}
        </div>
      )}
    </div>
  );
};
