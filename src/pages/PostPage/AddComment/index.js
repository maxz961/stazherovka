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

      toGo = () => {
          this.props.toGoLogin('/Login')
      }


    render() {
        const token = window.localStorage.getItem('rr_login')
        const {textareaComm} = this.props
        if(token) {
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
                    value={textareaComm}
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
    else {
      return (
           <div>
               <h1 className='add__centertext__log'>Войдите что бы написать комментарий</h1>
               <div className='btn__notlogged'>
                    <Button onClick={() => this.toGo()} variant="contained" color="primary" fullWidth={true}>
                        Войти
                    </Button>
                </div>
        </div>
      )
    }
    }
}

export default AddComment