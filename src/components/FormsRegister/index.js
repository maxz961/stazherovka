import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { Router, Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import './Forms.css'

const styles = theme => ({

});


class TextFields extends React.Component {

    state = {
        RegisterName: '',
        RegisterEmail: '',
        RegisterPassword: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})

    }

    handleSubmit = () => {
        let data = {
            name: this.state.RegisterName,
            email: this.state.RegisterName,
            password: this.state.RegisterName,
        }
        console.log(this.state)
        axios.post('http://localhost:4000/registration', data)
        .then((res) => {
            console.log(res)
        })
        .then((err) => {
            console.log(err)
        })
        this.props.history.push('/Login')
    }

  render() {
    const { classes } = this.props;
    const {RegisterName, RegisterEmail, RegisterPassword} = this.state

    return (
        <div className='Tabs__style'>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
                <TextField
                label="Name"
                className='input__style'
                margin="dense"
                value={RegisterName}
                id="RegisterName"
                onChange={this.handleChange}
                /><br />
                <TextField
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                value={RegisterEmail}
                id="RegisterEmail"
                onChange={this.handleChange}
                /><br />
                <TextField
                label="Password"
                type="password"
                className='input__style input__button'
                margin="dense"
                value={RegisterPassword}
                id="RegisterPassword"
                onChange={this.handleChange}
                /><br />
                <Button type="submit"
                 variant="outlined" 
                 color="primary"
                 onClick={this.handleSubmit}>
                    Регестрация
                </Button>
            </form>
            </div>
    );
  }
}


export default withStyles(styles)(TextFields);
