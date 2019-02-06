import React from 'react';
import TextField from '@material-ui/core/TextField';

class FormsInputReg extends React.Component  {

    handleChange = (e) => {
        this.props.propsHuck(e.target)           
    }

    render() {
        const {isBlockEmail, isBlockName, isBlockPassword} = this.props
        return (
            <div>
                <TextField
                error={isBlockName ? true : false}
                inputProps={{ maxLength: 20 }}
                label="Name"
                className='input__style'
                margin="dense"
                id="RegisterName"
                onChange={this.handleChange}
                /><br />
                <TextField
                error={isBlockEmail ? true : false}
                inputProps={{ maxLength: 30 }}
                label="Email"
                type="email"
                className='input__style'
                margin="dense"
                id="RegisterEmail"
                onChange={this.handleChange}
                /><br />
                <TextField
                error={isBlockPassword ? true : false}
                inputProps={{ maxLength: 30 }}
                label="Password"
                type="password"
                className='input__style input__button'
                margin="dense"
                id="RegisterPassword"
                onChange={this.handleChange}
                /><br />
                </div>
        )
    }
}

export default FormsInputReg