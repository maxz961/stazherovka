import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({

});


class TextFields extends React.Component {

    state = {
        LoginName: '',
        LoginEmail: '',
        LoginPassword: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})

    }

    handleSubmit = () => {
        console.log(this.state)
        // window.localStorage.setItem('rr_login', this.state.LoginName)
        // this.props.checkLogin()
        console.log('local', localStorage)
        fetch('http://localhost:4000/login', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            }, 
            body: JSON.stringify({ name: this.state.LoginName, password: this.state.LoginPassword, email: this.state.LoginEmail }) 
}) 
    }

  render() {
    const { classes } = this.props;
    const {LoginName, LoginEmail, LoginPassword} = this.state

    return (
        <div className='Tabs__style'>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
                <TextField
                label="Name"
                className='input__style'
                margin="dense"
                value={LoginName}
                id="LoginName"
                onChange={this.handleChange}
                /><br />
                <TextField
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                value={LoginEmail}
                id="LoginEmail"
                onChange={this.handleChange}
                /><br />
                <TextField
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