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
import AddAdminSelect from '../AddAdminSelect'
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
    name: '',
    email: '',
    password: '',
    imageFile: '',
    target: this.props.isAdmin
  };

  adminJump = (target) => {
    console.log('TARGET2', target.value);
    
    this.setState({
      target: target.value
    })
  }


  fileSelectedHandler = e => {
    this.setState({
      imageFile: e.target.files[0]
    })
  }

  handleChangeAdmin = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })           
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openSaveEdit = () => { 
    
    this.setState({ open: false });
    const {name, email, password, imageFile, target} = this.state
    this.props.AddUsersAdmin(this.props.id, target, name, email, password, imageFile)
  }


  render() {
    const { classes} = this.props;

    return (
      <div>
                <Fab  onClick={this.handleClickOpen} color="secondary" aria-label="Add" id='add__admin__button'>
                    <AddIcon />
                 </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Редактирование поста</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>

              <TextField
                inputProps={{ maxLength: 30 }}
                value={this.state.title}
                label="name"
                type="text"
                className='input__style'
                margin="dense"
                id="name"
                onChange={this.handleChangeAdmin}
                />

              <TextField
                inputProps={{ maxLength: 20 }}
                value={this.state.description}
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                id="email"
                onChange={this.handleChangeAdmin}
                /><br />
                <TextField
                inputProps={{ maxLength: 20 }}
                value={this.state.description}
                label="Password"
                type="password"
                className='input__style'
                margin="dense"
                id="password"
                onChange={this.handleChangeAdmin}
                /><br />
                <AddAdminSelect adminJump={this.adminJump}/>
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