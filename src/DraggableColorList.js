import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((colors, i) => (
        <DraggableColorBox
          index={i}
          color={colors.color}
          key={colors.name}
          name={colors.name}
          handleClick={() => removeColor(colors.name)}
        />
      ))}
    </div>
  );
});
export default DraggableColorList;
