import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import axios from '../../../../axios.config'
import './TabUsers.css'
import EditUsers from '../EditUsers';
import AddUsers from '../AddUsers';
import DeleteUsers from '../DeleteUsers'


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
        users: [],
        file: '',
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        newAdmin: false
    }

    componentDidMount() {
        axios.request().get('/admin/users')
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

    saveUsersAdmin = (id, target, name, email, password, imageFile) => {
      const newAdmin = target === 'true' ? true : false
      console.log('save', id, newAdmin, name, email, password, imageFile)


      const fd = new FormData()
      
      fd.append('name', name)
      fd.append('password', password)
      fd.append('email', email)
      fd.append('isAdmin', newAdmin)
      fd.append('imageFile', imageFile)


      axios.request().put(`user/${id}`, fd)
      .then(res =>{
        console.log(res)
        this.componentDidMount()
      })
      .then(err=>{
        console.log(err)
      })
      
    }

    deleteUsers = (id) => {
      console.log('удалили')
      axios.request().delete(`user/${id}`)
      .then(res=>{
        console.log(res);
        this.componentDidMount()
      })
      .then(err=>{
        console.log(err);
        
      })


    }

    AddUsersAdmin = ( name, email, password) => {  
      const data = {
        name: name,
        email: email,
        password: password
      }
      axios.request().post(`/registration`, data)
      .then(res =>{
        console.log(res)
        this.componentDidMount()
      })
      .then(err=>{
        console.log(err)
      })

    }


render() {
  const { classes } = this.props;
  const {users} = this.state
  console.log(users);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper} id='chat__list'>
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
                <p className='list__text'>Email: {email}</p>
                <EditUsers id={_id} isAdmin={isAdmin} saveUsersAdmin={this.saveUsersAdmin}/>
                <DeleteUsers id={_id} deleteUsers={this.deleteUsers} />
              </ListItem>
              
            </Fragment>
            
          ))}
        </List>
        
      </Paper>
      <AddUsers AddUsersAdmin={this.AddUsersAdmin} />
      
    </React.Fragment>
  );
}
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);