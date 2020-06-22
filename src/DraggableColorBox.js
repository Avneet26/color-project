import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/DraggableBoxStyles";

const DraggableColorBox = SortableElement(
  ({ classes, name, color, handleClick }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
);
export default withStyles(styles)(DraggableColorBox);
