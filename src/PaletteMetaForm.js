import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.emojiPicker = this.emojiPicker.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  emojiPicker() {
    this.setState({
      stage: "emoji",
    });
    console.log(this.state.stage);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  savePalette = (emoji) => {
    console.log(emoji.native);
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
  };
  render() {
    const { newPaletteName } = this.state;

    return (
      <div>
        <Dialog
          open={this.state.stage === "emoji"}
          onClose={this.props.hideForm}
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker
            native={true}
            title="Palette Emoji"
            onSelect={this.savePalette}
          />
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.props.hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.emojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a new name for your Beautiful Palette. Make Sure
                it's unique
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
