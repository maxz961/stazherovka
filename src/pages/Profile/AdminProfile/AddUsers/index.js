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

import './AddUsers.css'

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
    isBlockEmail: false,
    isBlockName: false,
    isBlockPassword: false

  };

  adminJump = (target) => {
    
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
    const {name, email, password} = this.state

        const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        
        if(email.length === 0 || validEmail === null) {
            this.setState({ isBlockEmail: true})
        } 
        if(email.length > 0 && validEmail !== null) {
            this.setState({ isBlockEmail: false})
        } 
        if(name.length < 4) {
            this.setState({ isBlockName: true})
        }
        if(name.length >= 4) {
            this.setState({ isBlockName: false})
        }
        if(password.length < 6) {
            this.setState({ isBlockPassword: true})
        }
        if(password.length >= 6) {
            this.setState({ isBlockPassword: false})
        }
    if(validEmail !== null && name.length >= 4 && password.length >= 6) {
    this.setState({ open: false });
    this.props.AddUsersAdmin(name, email, password)
    }
  }



  render() {
    const { classes} = this.props;
    const {isBlockName, isBlockEmail, isBlockPassword } = this.state

    return (
      <div>
                <Fab  onClick={this.handleClickOpen} color="secondary" aria-label="Add" id='add__admin__button'>
                    <AddIcon id='icon__span'/>
                 </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Добавление Юзера</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <div id='form__margin__center'>
              <FormControl className={classes.formControl}>

              <TextField
                error={isBlockName ? true : false}
                inputProps={{ maxLength: 30 }}
                label="Name"
                type="text"
                className='input__style'
                margin="dense"
                id="name"
                onChange={this.handleChangeAdmin}
                />

              <TextField
                error={isBlockEmail ? true : false}
                inputProps={{ maxLength: 20 }}
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                id="email"
                onChange={this.handleChangeAdmin}
                /><br />
                <TextField
                error={isBlockPassword ? true : false}
                inputProps={{ maxLength: 20 }}
                value={this.state.description}
                label="Password"
                type="password"
                className='input__style'
                margin="dense"
                id="password"
                onChange={this.handleChangeAdmin}
                /><br />

              </FormControl>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
          <div id='Button__Add__margin'>
            <Button onClick={this.handleClose} color="primary" id='Button__add__width'>
              Cancel
            </Button>
            <Button onClick={this.openSaveEdit} color="primary" id='Button__add__width'>
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