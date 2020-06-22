import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import Navbar from "./Navbar";
import styles from "./styles/PaletteStyles";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { classes } = this.props;
    const { paletteName, emoji } = this.props.palette;
    const colorBoxes = this.props.palette.colors[
      this.state.level
    ].map((color) => (
      <ColorBox
        background={color[this.state.format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${this.props.palette.id}/${color.id}`}
        showFullPalette
      />
    ));
    return (
      <div>
        <div className={classes.Palette}>
          <Navbar
            level={this.state.level}
            handleChange={this.changeFormat}
            changeLevel={this.changeLevel}
            showingAllColors
          />
          <div className={classes.colors}>{colorBoxes}</div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
