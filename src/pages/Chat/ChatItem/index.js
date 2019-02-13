import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import openSocket from "socket.io-client";

import axios from '../../../axios.config'
import './ChatItem.css'
import ChatList from '../ChatList';




const styles = theme => ({

});


class Chat extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            arguments: '',
           data: {
            name: 'User',
            message: ''
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
        this.socket.emit('send-from-user', data, () => {})
        
    }


    componentDidMount() {
        const id = window.localStorage.getItem('rr_id')
        axios.get(`user/${id}`)
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
        console.log('SOKET', this.socket);
        console.log('KKY');
        axios.get('/chat').then(res=>{
            console.log('ITEM', res);   
        })
        .catch(err=>{
            console.log(err);        
        })
        
        this.socket.on('new message', data => {
            console.log('DATA', data)
            const updatedName = {
                ...this.state.data, 
                name: data.name,
                message: data.message
            }
            this.setState({ data: updatedName })
            
        })
    }
    render() {
        console.log('soket',this.data)
        return (
            <div>
                <h1 className='h1__chat'>Страница чата</h1>
                {/* <ChatList data={this.state.data}/> */}
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
            </div>
        )
    }
}

export default Chat