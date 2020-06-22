import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
    console.log(this.state);
  }
  gatherShades(palette, colorToFIlterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFIlterBy)
      );
    }

    return shades.slice(1);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { classes } = this.props;
    const colorBox = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
        showFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBox}
          <div className={classes.goBack}>
            <Link to={`/palette/${this.props.palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
