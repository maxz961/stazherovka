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
    open: false,
    title: '',
    description: ''
  };


  fileSelectedHandler = e => {
    this.props.editImage(e.target.files[0])
    console.log('IMG',e.target.files[0])
  }

handleChangeEdit = (e) => {
    this.props.propsHuckEdit(e.target)
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
    this.props.saveEditPost()
  }

  componentDidUpdate(prevProps) {
    const {stateData} = this.props
    if(stateData !== prevProps.stateData)
    this.setState({
        title: stateData.title, description: stateData.description
    })
}

  render() {
    const { classes, stateData} = this.props;
    const idUsers = stateData.created_user === undefined ? null : stateData.created_user._id   
    const id = window.localStorage.getItem('rr_id')

    return (
      <div>
                <Fab size='large' onClick={this.handleClickOpen} color="secondary" aria-label="Edit" className={classes.fab}
                 id={idUsers === id ? '' : 'delete__butoon__block'}
                 >
                    <Icon fontSize="small">edit_icon</Icon>
                </Fab>
        <Dialog
          maxWidth='lg'
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Редактирование поста</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <div id='form__margin__center'>
              <FormControl className={classes.formControl}>

              <TextField
                inputProps={{ maxLength: 30 }}
                value={this.state.title}
                label="title"
                type="email"
                className='input__style'
                margin="dense"
                id="title"
                onChange={this.handleChangeEdit}
                />

              <TextField
                inputProps={{ maxLength: 20 }}
                value={this.state.description}
                label="description"
                className='input__style'
                margin="dense"
                id="description"
                onChange={this.handleChangeEdit}
                /><br />
                <label htmlFor="outlined-button-file">
                    <Button
                        variant="contained"
                        component="label">
                            Upload File
                        <input value='' type="file" id='imageFile' style={{ display: "none" }} onChange={this.fileSelectedHandler} />
                    </Button>
                 </label>

              </FormControl>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
          <div id='Button__Add__margin'>
            <Button onClick={this.handleClose}  id='Button__add__width' color="primary">
              Cancel
            </Button>
            <Button onClick={this.openSaveEdit}  id='Button__add__width' color="primary">
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