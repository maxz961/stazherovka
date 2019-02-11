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
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

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
    open: false
  };


  fileSelectedHandler = e => {
    console.log('FILe', e.target.files[0])
    // this.setState({
    //   selectedFile: e.target.files[0]
    // })
    this.props.editImage(e.target.files[0])
  }

handleChangeEdit = (e) => {
    this.props.propsHuckEdit(e.target)           
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openSaveEdit = () => { 
    this.setState({ open: false });
    this.props.saveEditPost()
  }

  render() {
    const { classes} = this.props;

    return (
      <div>
                <Fab size='large' onClick={this.handleClickOpen} color="secondary" aria-label="Edit" className={classes.fab}>
                    <Icon fontSize="small">edit_icon</Icon>
                </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Добавление поста</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>

              <TextField
                inputProps={{ maxLength: 20 }}
                label="description"
                className='input__style'
                margin="dense"
                id="description"
                onChange={this.handleChangeEdit}
                /><br />
                <TextField
                inputProps={{ maxLength: 30 }}
                label="titile"
                type="email"
                className='input__style'
                margin="dense"
                id="titile"
                onChange={this.handleChangeEdit}
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
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.openSaveEdit} color="primary">
              Ok
            </Button>
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