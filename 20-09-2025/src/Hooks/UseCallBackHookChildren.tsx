import React from "react";

type ChildrenProps = {
  item: string;
  onSelect: (item: string) => void;
};

const UseCallBackChildren: React.FC<ChildrenProps> = ({ item, onSelect }) => {
  console.log("Child rendered:", item);

  return (
    <div
      className="container mt-4 p-2 border border-secondary rounded"
      onClick={() => onSelect(item)}
      style={{ cursor: "pointer" }}
    >
      {item}
    </div>
  );
};

export default React.memo(UseCallBackChildren);
