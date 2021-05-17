import React, { useState } from "react";

type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  selections: Item[];
  query: string;
  onSelectionChanged: (items: Item[]) => void;
  onQueryChanged: (query: string) => void;
};

// Based on https://tailwindcomponents.com/component/multi-select
const Select: React.VFC<Props> = ({ items, selections, query, onSelectionChanged, onQueryChanged }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = () => setIsExpanded(!isExpanded);

  const onSelect = (item: Item) => {
    const newSelections = [...selections, item];
    toggle();
    onSelectionChanged(newSelections);
  };

  const onUnselect = (item: Item) => {
    const newSelections = selections.filter((w) => w.value !== item.value);
    onSelectionChanged(newSelections);
  };

  const onUnselectWithToggle = (item: Item) => {
    const newSelections = selections.filter((w) => w.value !== item.value);
    toggle();
    onSelectionChanged(newSelections);
  };

  const onChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onQueryChanged(e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center h-auto mx-auto">
      <div className="w-full px-4">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
              <div className="flex flex-wrap">
                {selections.map((item) => (
                  <div
                    key={item.value}
                    className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded text-blue-700 bg-blue-100 border border-blue border-blue-300"
                  >
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">{item.label}</div>
                    <div className="flex flex-auto flex-row-reverse">
                      <div
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => onUnselect(item)}
                        onKeyPress={() => onUnselect(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-grow">
                <input
                  className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  placeholder=""
                  value={query}
                  onChange={onChanged}
                />
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  type="button"
                  onClick={toggle}
                  onKeyPress={toggle}
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                >
                  {isExpanded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="7 13 12 18 17 13" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isExpanded ? (
            <div
              className="absolute shadow bg-white z-40 w-full left-0 rounded overflow-y-auto"
              style={{ maxHeight: "300px", top: "52px" }}
            >
              <div className="flex flex-col w-full">
                {items.map((item, i) => {
                  const isFirst = i === 0;
                  const isLast = i === items.length - 1;
                  const isSelected = selections.includes(item);

                  const outsideClassNames = [
                    "cursor-pointer",
                    "w-full",
                    "border-gray-100",
                    "border-b",
                    "hover:bg-blue-100",
                  ];
                  if (isFirst) {
                    outsideClassNames.push("rounded-t");
                  }
                  if (isLast) {
                    outsideClassNames.push("rounded-b");
                  }

                  const insideClassNames = [
                    "flex",
                    "w-full",
                    "items-center",
                    "p-2",
                    "pl-2",
                    "border-transparent",
                    "border-l-2",
                    "relative",
                  ];
                  if (isSelected) {
                    insideClassNames.push("border-blue-600");
                  } else {
                    insideClassNames.push("hover:border-blue-600");
                  }

                  return (
                    <div
                      key={item.label}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => (isSelected ? onUnselectWithToggle(item) : onSelect(item))}
                      onKeyPress={() => (isSelected ? onUnselectWithToggle(item) : onSelect(item))}
                      className={outsideClassNames.join(" ")}
                    >
                      <div className={insideClassNames.join(" ")}>
                        <div className="w-full items-center flex">
                          <div className="mx-2 leading-6">{item.label}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Select;
