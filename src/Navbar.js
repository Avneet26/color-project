import React, { Component } from "react";
import Slider from "rc-slider";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { MenuItem, IconButton, Snackbar, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/NavbarStyles";
import "rc-slider/assets/index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {this.props.showingAllColors && (
          <div className="slider-container">
            <span>Level: {this.props.level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={this.props.level}
                min={100}
                max={900}
                step={100}
                onAfterChange={this.props.changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={this.state.format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          message={<span id="message-id">Format Changed !!</span>}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color={"inherit"}
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
