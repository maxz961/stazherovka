import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import './AddComment.css'

class AddComment extends React.Component {

    state ={
        multiline: 'Controlled'
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      handleChangeComment = (e) => {
            this.props.saveCommentPost(e.target)
      }


    render() {
        return(
            <div className="div__post__comment">
                <form className='' noValidate autoComplete="off">
                    <TextField
                    rows='7'
                    id="textareaComm"
                    label="Оставьте комментарий"
                    placeholder="Placeholder"
                    multiline
                    className='div__post__comment'
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeComment}
                    />
                </form>
                <div className='btn__comment__post'>
                    <Button onClick={() => this.props.clickSaveCommPost()} variant="contained" color="primary" fullWidth={true}>
                        Добавить
                    </Button>
                </div>
            </div>
 
        )
    }
}

export default AddComment