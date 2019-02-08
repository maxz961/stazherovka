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
import AddIcon from '@material-ui/icons/Add';

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
    this.setState({ open: false });
    this.props.saveClick() 
  }

  render() {
    const { classes} = this.props;

    return (
      <div>
          {/* <Fab onClick={this.handleClickOpen} color="secondary" aria-label="Edit" id='p__profile'>
                <Icon>edit_icon</Icon>
            </Fab><br /> */}
                <div  id='add__icon' onClick={this.handleClickOpen}>
                    <Fab color="primary" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </div>
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
                onChange={this.handleChange}
                /><br />
                <TextField
                inputProps={{ maxLength: 30 }}
                label="titile"
                type="email"
                className='input__style'
                margin="dense"
                id="titile"
                onChange={this.handleChange}
                />
                {/* <TextField
                inputProps={{ maxLength: 30 }}
                label="image"
                className='input__style'
                margin="dense"
                id="image"
                onChange={this.handleChange}
                /> */}
                <label htmlFor="outlined-button-file">
                    <Button
                        variant="contained"
                        component="label">
                            Upload File
                        <input type="file" style={{ display: "none" }}/>
                    </Button>
                 </label>

              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.openSave} color="primary">
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