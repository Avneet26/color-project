import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckItem from "@material-ui/icons/Check";
import CloseItem from "@material-ui/icons/Close";
import styles from "./styles/PaletteListStyles";
import { Avatar } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deletingId: "",
    };
  }
  openDialog = (id) => {
    this.setState({ open: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ open: false, deletingId: "" });
  };

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  };
  render() {
    const { palettes, classes, deletePalette } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition classNames="fade" timeout={3000} key={palette.id}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  // handleDelete={this.props.deletePalette}
                  openDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={this.state.open}
          aria-labelledby="delete-diaogue"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">Are you Sure ?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ background: blue[100], color: blue[600] }}>
                  <CheckItem></CheckItem>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ background: red[100], color: red[600] }}>
                  <CloseItem></CloseItem>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
