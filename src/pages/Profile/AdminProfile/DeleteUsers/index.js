import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


class DeleteUsers extends React.Component {

  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openSave = () => { 
    this.setState({ open: false });
    this.props.deleteUsers(this.props.id) 
  }

  render() {
    return (
      <div>
            <IconButton aria-label="Delete" onClick={this.handleClickOpen} className='delete__butoon'  id='delete__users'>
                <DeleteIcon fontSize="large" />
            </IconButton>

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Вы действительно хотите удалить этого пользователя?</DialogTitle>

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

export default DeleteUsers;