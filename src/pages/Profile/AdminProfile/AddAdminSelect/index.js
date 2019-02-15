import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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

class AddAdminSelect extends React.Component {
  state = {
    age: 'Users',
    labelWidth: 0,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.adminJump(event.target)
  };

  render() {
    return (
      <div>
        <FormControl  className="admin__select">
          <InputLabel htmlFor="age-native-helper">Статус Контроль</InputLabel>
          <NativeSelect
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input name="age" id="age-native-helper" />}
          >
            <option value={false}>Users</option>
            <option value={true}>Admin</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles)(AddAdminSelect);