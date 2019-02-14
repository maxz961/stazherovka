import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import './OpenDialog.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class DialogSelect extends React.Component {
  state = {
    open: false,
    age: ''
  };
  fileSelectedHandler = e => {
    // const image = this.props.editImage(e.target.files[0])
    // this.setState({
    //   imageFile: e.target.files[0]
    // })
    this.props.saveImgState(e.target.files[0])
  }

handleChange = (e) => {
    this.props.propsHuck(e.target)           
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.notSave()
  };

  openSave = () => {
    const target = this.state.target
    this.setState({ open: false });
    this.props.saveClick(target) 
  }

  render() {
    const { classes, nameProfile, infoProfile } = this.props;

    return (
      <div>
          <Fab onClick={this.handleClickOpen} color="secondary" aria-label="Edit" id='p__profile'>
                <Icon>edit_icon</Icon>
            </Fab><br />
        <Dialog
          maxWidth='lg'
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Редактирование пользователя</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <div id='form__margin__center'>
              <FormControl className={classes.formControl}>

              <TextField
                inputProps={{ maxLength: 20 }}
                label="Имя пользователя"
                className='input__style'
                margin="dense"
                value={nameProfile}
                id="nameProfile"
                onChange={this.handleChange}
                /><br />
                <TextField
                inputProps={{ maxLength: 20 }}
                value={this.state.description}
                label="Password"
                type="password"
                className='input__style'
                margin="dense"
                id="password"
                onChange={this.handleChange}
                /><br />
                <TextField
                inputProps={{ maxLength: 30 }}
                label="Информация пользователя"
                type="email"
                className='input__style'
                margin="dense"
                value={infoProfile}
                id="infoProfile"
                onChange={this.handleChange}
                />
                <label htmlFor="outlined-button-file">
                    <Button
                        variant="contained"
                        component="label">
                            Upload File
                        <input type="file" id='imageFile' style={{ display: "none" }} onChange={this.fileSelectedHandler} />
                    </Button>
                 </label>

              </FormControl>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
          <div id='Button__Add__margin'>
            <Button onClick={this.handleClose} color="primary" id='Button__add__width'>
              Cancel
            </Button>
            <Button onClick={this.openSave} color="primary" id='Button__add__width'>
              Ok
            </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogSelect);