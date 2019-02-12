import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import axios from '../../../../axios.config'
import './TabUsers.css'

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class BottomAppBar extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/admin/users')
        .then(res=>{
            console.log('users',res);
            this.setState({
                users: res.data.users
            })
        })
        .then(err=>{
            console.log(err);
            
        })
    }
render() {
  const { classes } = this.props;
  const {users} = this.state
  console.log(users);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Таблица Юзеров
        </Typography>
        <List className={classes.list}>
          {users.map(({ email, _id, name, isAdmin }) => (
            <Fragment key={_id}>
              <ListItem button id='list__item'>
                {/* <ListItemText primary={email} secondary={name}/><br /> */}
                <h2 className='list__text'>Name: {name}</h2><br />
                <p className='list__text'>Status: {isAdmin ? 'ADMIN' : 'USERS'}</p><br />
                <p className='list__text'>Email: {email}</p><br />
              </ListItem>
            </Fragment>
          ))}
        </List>

      </Paper>
    </React.Fragment>
  );
}
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);