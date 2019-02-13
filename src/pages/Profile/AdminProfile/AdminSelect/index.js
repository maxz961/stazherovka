import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import './AdminSelect.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class AdminSelect extends React.Component {
  state = {
    age: 'Users',
    labelWidth: 0,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.adminJump(event.target)
    console.log('TARGET', event.target.value)
  };

  render() {
    const {isAdmin} = this.props
    return (
      <div>
        <FormControl  className="admin__select">
          <InputLabel htmlFor="age-native-helper">Статус Контроль</InputLabel>
          <NativeSelect
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input name="age" id="age-native-helper" />}
          >
            <option value={isAdmin}>{isAdmin === true ? 'Admin' : 'Users'}</option>
            <option value={isAdmin === true ? false : true}>{isAdmin === true ? 'Users' : 'Admin'}</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles)(AdminSelect);
