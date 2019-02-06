import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
// import decode from 'jwt-decode';

const styles = theme => ({

});


class TextFields extends React.Component {

    state = {
        LoginName: '',
        LoginEmail: '',
        LoginPassword: '',
        isBlockNameLog: false,
        isBlockEmailLog: false,
        isBlockPasswordLog: false
    }


    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})

    }


    handleSubmit = () => {

        const {LoginEmail, LoginName, LoginPassword} = this.state
        const validEmail = LoginEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(LoginEmail.length === 0 || validEmail === null) {
            this.setState({ isBlockEmailLog: true})
        } 
        if(LoginEmail.length > 0 && validEmail !== null) {
            this.setState({ isBlockEmailLog: false})
        } 
        if(LoginName.length < 4) {
            this.setState({ isBlockNameLog: true})
        }
        if(LoginName.length >= 4) {
            this.setState({ isBlockNameLog: false})
        }
        if(LoginPassword.length < 6) {
            this.setState({ isBlockPasswordLog: true})
        }
        if(LoginPassword.length >= 6) {
            this.setState({ isBlockPasswordLog: false})
        }

        let data = {
            name: this.state.LoginName,
            email: this.state.LoginEmail,
            password: this.state.LoginPassword,
        }
        axios.post('http://localhost:4000/login', data)
        .then((response) => {
            console.log('LOG', response)
            window.localStorage.setItem('rr_login', response.data.token)
            this.props.checkLogin(response.data.token)
            // const decoded = decode(response.data.token)
            // console.log('DECODE', decoded)

        })
        .then((error) => {
            console.log(error)
        })
    }

  render() {
    console.log('TOKEN', window.localStorage.getItem('rr_login'));
    const { classes } = this.props;
    const {LoginName, LoginEmail, LoginPassword, isBlockNameLog, isBlockEmailLog, isBlockPasswordLog} = this.state

    return (
        <div className='Tabs__style'>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
                <TextField
                error = {isBlockNameLog ? true : false}
                inputProps={{ maxLength: 20 }}
                label="Name"
                className='input__style'
                margin="dense"
                value={LoginName}
                id="LoginName"
                onChange={this.handleChange}
                /><br />
                <TextField
                error = {isBlockEmailLog ? true : false}
                inputProps={{ maxLength: 30 }}
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                value={LoginEmail}
                id="LoginEmail"
                onChange={this.handleChange}
                /><br />
                <TextField
                error = {isBlockPasswordLog ? true : false}
                inputProps={{ maxLength: 30 }}
                label="Password"
                type="password"
                className='input__style'
                margin="dense"
                value={LoginPassword}
                id="LoginPassword"
                onChange={this.handleChange}
                /><br />
                <Button type="submit"
                 variant="outlined" 
                 color="primary"
                 onClick={this.handleSubmit}>
                    Вход
                </Button>
            </form>
            </div>
    );
  }
}


export default withStyles(styles)(TextFields);