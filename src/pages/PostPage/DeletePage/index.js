import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import './DeletePage.css'


class DeletePage extends React.Component {

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
    this.props.deletePost() 
  }

  render() {
    const {stateData} = this.props
    const idUsers = stateData.created_user === undefined ? null : stateData.created_user._id   
    const id = window.localStorage.getItem('rr_id')
    return (
      <div>
            <IconButton aria-label="Delete" onClick={this.handleClickOpen} className='delete__butoon' id={idUsers === id ? '' : 'delete__butoon__block'}>
                <DeleteIcon fontSize="large" />
            </IconButton>

        <Dialog
          maxWidth='lg'
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Вы действительно хотите удалить свой пост?</DialogTitle>
          <DialogActions>
          <div id='Button__Add__margin'>
            <Button onClick={this.handleClose}  id='Button__add__width' color="primary">
              Cancel
            </Button>
            <Button onClick={this.openSave}  id='Button__add__width' color="primary">
              Ok
            </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeletePage;