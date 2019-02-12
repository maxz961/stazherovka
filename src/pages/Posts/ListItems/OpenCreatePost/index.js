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
    description: ''

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
    const fd = new FormData()
    fd.append('imageFile', this.state.selectedFile)
    fd.append('title', this.state.title)
    fd.append('description', this.state.description)

    axios.post('/post', fd)
    .then(res => {
      console.log(res)
    })
    .then(err => {
      console.log(err)
    })
    this.setState({ open: false });
  }

  render() {
    const { classes} = this.props;

    return (
      <div>
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
                inputProps={{ maxLength: 30 }}
                label="title"
                type="email"
                className='input__style'
                margin="dense"
                id="title"
                onChange={this.handleChange}
                />

              <TextField
                inputProps={{ maxLength: 20 }}
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