import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import openSocket from "socket.io-client";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import axios from '../../../axios.config'
import './ChatItem.css'
import ChatList from '../ChatList';
import ChatConnectUsers from '../ChatConnectUsers'

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




class Chat extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            arguments: '',
            online: [],
           data: {
            name: 'User',
            message: '',
            avatar: ''
           }
        }
      }


    


    handleChangeChat = e => {
        this.setState({
            arguments: e.target.value
        })
    }

    massageChat = () => {
        const userId = window.localStorage.getItem('rr_id')   
        const message = this.state.arguments
        const data = {userId, message}
        
        // const element = document.getElementById('jump__div');
        // element.scrollIntoView({ block: 'end',  behavior: 'smooth' });

        this.socket.emit('send-from-user', data, () => {})
        this.setState({
          arguments: ''
        })
        
    }


    componentDidMount() {
        const id = window.localStorage.getItem('rr_id')
        const userId = id;
        axios.request().get(`user/${id}`)
        .then(res=>{
            console.log(res)
            this.setState({
                name: res.data.name
            })      
        })
        .then(err=>{
            console.log(err);
            
        })

        
        

        this.socket = openSocket('http://192.168.88.189:4000')
        axios.request().get('/chat').then(res=>{
            res.data.map(item =>{
              const updatedName = {
                ...this.state.data, 
                name: item.name,
                message: item.message,
                avatar: item.avatar
            }
              return this.setState({
                data: updatedName 
              })
            })   
        })
        .catch(err=>{
            console.log(err);        
        })

        this.socket.emit('username', userId)
        
        this.socket.on('new message', data => {
            const updatedName = {
                ...this.state.data, 
                name: data.name,
                message: data.message,
                avatar: data.avatar
            }
            this.setState({ data: updatedName })
            
        })

        this.socket.on('username-result', res => {
            this.setState({
                online: res
            })
        })

        this.socket.on('user left', data => {
            console.log('LEFT', data)
        })
    }




    render() {
        const {classes} = this.props
        const {online} = this.state
        return (
            <div>
                <h1 className='h1__chat'>Страница чата</h1>
                <React.Fragment>
      <CssBaseline /> 
      <div className='row'> 
      <Paper square className={classes.paper}  id='chat__list'>
        <List className={classes.list}>

            <ChatList data={this.state.data}/>

        </List>
        <div id='jump__div'></div>
      </Paper> 
      <ChatConnectUsers online={online}/>
      </div> 
      <form className='form__chat' noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
                <div className='input__chat__div'>
                <TextField
                inputProps={{ maxLength: 20 }}
                label="Message"
                className='input__chat'
                margin="dense"
                id="message"
                value={this.state.arguments}
                onChange={this.handleChangeChat}
                /><br />
                <Button type="submit"
                fullWidth={true}
                 variant="outlined" 
                 color="primary"
                 onClick={this.massageChat}>
                    Отправить
                </Button>
                </div>
                </form> 
    </React.Fragment>
            </div>
        )
    }
}

export default withStyles(styles)(Chat)