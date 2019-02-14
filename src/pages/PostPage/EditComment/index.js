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


handleChangeEditComm = (e) => {
    this.props.propsHuckEditComm(e.target)           
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openSaveEditComm = () => { 
    this.setState({ open: false });
    this.props.openSaveEditComm()
  }

  render() {
    const { classes, author} = this.props;
    const id = window.localStorage.getItem('rr_id')

    return (
      <div>
                <Fab 
                size='large' onClick={this.handleClickOpen}
                 color="secondary" aria-label="Edit" className={classes.fab}
                  id={author === id ? '' : 'delete__butoon__block'}
                  >
                    <Icon fontSize="small">edit_icon</Icon>
                </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='lg'
        >
          <DialogTitle className='open__dialogtext'>Редактирование коментария</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl fullWidth={true} className={classes.formControl}>
                    <TextField
                    rows='7'
                    id="textareaComm"
                    label="Оставьте комментарий"
                    placeholder="Placeholder"
                    multiline
                    className='div__post__comment'
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeEditComm}
                    />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
          <div id='Button__Add__margin'>
            <Button onClick={this.handleClose} color="primary" id='Button__add__width'>
              Cancel
            </Button>
            <Button onClick={this.openSaveEditComm} color="primary" id='Button__add__width'>
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