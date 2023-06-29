import React, { useState } from "react";
import { BaseSelect } from "./BaseSelect";

export const Currencies = () => {
  const [selectItem, setSelectItem] = useState({ text: "USD", value: 0 });

  const lists = [
    {
      text: "USD",
      value: 0,
      img: "https://portfolio.metamask.io/static/js/../../static/media/usd.ff931bcb60d151a6d87362fe655ee6ad.svg",
      description: "US Dollar",
    },
    {
      text: "VND",
      value: 1,
      img: "https://portfolio.metamask.io/static/js/../../static/media/vnd.388133d4419b012f8fe38af63d257694.svg",
      description: "Vietnamese đồng",
    },
  ];
  return (
    <BaseSelect selectItem={selectItem} name="Popular currencies">
      {lists.map((list) => (
        <div
          key={list.value}
          className=" w-56 flex items-center justify-between px-4 py-1 mb-1 hover:bg-gray-900 cursor-pointer"
          onClick={() => {
            setSelectItem(list);
          }}
        >
          <div className="flex gap-x-1 items-center">
            {list.img && <img src={list.img} className="w-5 h-5" alt=""></img>}
            <div>
              <div>{list.text}</div>
              <div>{list.description}</div>
            </div>
          </div>
          {list.value === selectItem.value && (
            <div>
              <span className="material-symbols-outlined">done</span>
            </div>
          )}
        </div>
      ))}
    </BaseSelect>
  );
};
