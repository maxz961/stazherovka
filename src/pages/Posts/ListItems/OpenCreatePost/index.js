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

import axios from '../../../../axios.config'
import './OpenCreatePost.css'

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
    selectedFile: null,
    title: '',
    description: '',
    isTitleErr: false,
    isDescriptionErr: false

  };


  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })          
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.notSave()
  };

  openSave = () => { 


    const {title, description} = this.state


        if(title.length < 4) {
            this.setState({ isTitleErr: true})
        }
        if(title.length >= 4) {
            this.setState({ isTitleErr: false})
        }
        if(description.length < 6) {
            this.setState({ isDescriptionErr: true})
        }
        if(description.length >= 6) {
            this.setState({ isDescriptionErr: false})
        }

        if(description.length >= 6 && title.length >= 4) {
        const fd = new FormData()
        fd.append('imageFile', this.state.selectedFile)
        fd.append('title', this.state.title)
        fd.append('description', this.state.description)

        axios.request().post('/post', fd)
        .then(res => {
          console.log(res)
          this.props.saveClick()
        })
        .then(err => {
          console.log(err)
        })
        this.setState({ open: false });
      }
    }

  

  render() {
    const {isTitleErr, isDescriptionErr} = this.state
    const { classes} = this.props;
    const token = window.localStorage.getItem('rr_login')

    return (
      <div>
                <div className={token === null ? 'block__none' : ''} id='add__icon' onClick={this.handleClickOpen}>
                    <Fab color="primary" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </div>
        <Dialog
          maxWidth='lg'
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className='open__dialogtext'>Добавление поста</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <div id='form__margin__center'>
              <FormControl className={classes.formControl} >

              <TextField
                error = {isTitleErr ? true : false}
                inputProps={{ maxLength: 30 }}
                label="title"
                type="email"
                className='input__style'
                margin="dense"
                id="title"
                onChange={this.handleChange}
                />

              <TextField
                error = {isDescriptionErr ? true : false}
                inputProps={{ maxLength: 100 }}
                label="description"
                className='input__style'
                margin="dense"
                id="description"
                onChange={this.handleChange}
                /><br />
                <label htmlFor="outlined-button-file">
                    <Button
                        variant="contained"
                        component="label">
                            Upload File
                        <input type="file" style={{ display: "none" }} onChange={this.fileSelectedHandler} />
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