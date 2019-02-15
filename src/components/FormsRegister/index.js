import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from '../../axios.config'
import FormsInputReg from '../FormsInputReg'
import SnackbarContent from '@material-ui/core/SnackbarContent';

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
        isBlockPassword: false,
        isBlock: false
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


if(validEmail !== null && RegisterName.length >= 4 && RegisterPassword.length >= 6) {
        let data = {
            name: this.state.RegisterName,
            email: this.state.RegisterEmail,
            password: this.state.RegisterPassword,
        }
        axios.request().post('/registration', data)
        .then(response => {
                if(response) {
                console.log(response.status)
                this.props.goTo('/Login')
            }
            else {
                this.setState({
                    isBlockEmail: true, isBlockName:true, isBlockPassword: true, isBlock: true
                })
            }
        })
        .catch(error => {
            console.log('HI', error.response)
        })
    }
}

  render() {
    const {isBlockEmail, isBlockName, isBlockPassword, isBlock} = this.state
    const { classes } = this.props;
    

    return (
        <div className='Tabs__style'>
        <SnackbarContent
        id={isBlock ? '' : 'hide__err'}
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
        
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
  
                <FormsInputReg propsHuck={this.handleChange} isBlockEmail={isBlockEmail} isBlockName={isBlockName} isBlockPassword={isBlockPassword}/>
                <div className='input__style'>
                <Button type="submit"
                 fullWidth={true}
                 variant="outlined" 
                 color="primary"
                 onClick={this.handleSubmit}>
                    Регестрация
                </Button>
                </div>
            </form>
            </div>
    );
  }
}


export default withStyles(styles)(TextFields);
