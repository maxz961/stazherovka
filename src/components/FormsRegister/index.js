import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import FormsInputReg from '../FormsInputReg'
import './Forms.css'

const styles = theme => ({

});


class TextFields extends React.Component {

    state = {
        RegisterName: '',
        RegisterEmail: '',
        RegisterPassword: '',
        isBlockEmail: false,
        isBlockName: false,
        isBlockPassword: false
    }

    handleChange = (target) => {
        this.setState({ [target.id]: target.value})

    }

    handleSubmit = () => {
        const {RegisterEmail, RegisterName, RegisterPassword} = this.state
        const validEmail = RegisterEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(RegisterEmail.length === 0 || validEmail === null) {
            this.setState({ isBlockEmail: true})
        } 
        if(RegisterEmail.length > 0 && validEmail !== null) {
            this.setState({ isBlockEmail: false})
        } 
        if(RegisterName.length < 4) {
            this.setState({ isBlockName: true})
        }
        if(RegisterName.length >= 4) {
            this.setState({ isBlockName: false})
        }
        if(RegisterPassword.length < 6) {
            this.setState({ isBlockPassword: true})
        }
        if(RegisterPassword.length >= 6) {
            this.setState({ isBlockPassword: false})
        }



        let data = {
            name: this.state.RegisterName,
            email: this.state.RegisterEmail,
            password: this.state.RegisterPassword,
        }
        console.log(this.state)
        axios.post('http://localhost:4000/registration', data)
        .then((response) => {
            console.log('REG', response)
        })
        .then((error) => {
            console.log(error)
        })
        // this.props.clickHistory()
    }

  render() {
    const {isBlockEmail, isBlockName, isBlockPassword} = this.state
    const { classes } = this.props;
    

    return (
        <div className='Tabs__style'>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
  
                <FormsInputReg propsHuck={this.handleChange} isBlockEmail={isBlockEmail} isBlockName={isBlockName} isBlockPassword={isBlockPassword}/>

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
