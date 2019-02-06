import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    age: '',
  };

//   handleChange = name => event => {
//     this.setState({ [name]: Number(event.target.value) });
//   };

handleChange = (e) => {
    this.props.propsHuck(e.target)           
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openSave = () => {
    this.setState({ open: false });
    this.props.saveClick() 
  }

  render() {
    const { classes, nameProfile, infoProfile } = this.props;

    return (
      <div>
          <Fab onClick={this.handleClickOpen} color="secondary" aria-label="Edit" id='p__profile'>
                <Icon>edit_icon</Icon>
            </Fab><br />
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Редактирование пользователя</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
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
                inputProps={{ maxLength: 30 }}
                label="Информация пользователя"
                type="email"
                className='input__style'
                margin="dense"
                value={infoProfile}
                id="infoProfile"
                onChange={this.handleChange}
                />

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