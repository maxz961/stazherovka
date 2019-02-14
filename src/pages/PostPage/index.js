import React from 'react'
import ItemCard from './ItemCard';
import axios from '../../axios.config'
import {Redirect } from 'react-router'


import CommentList from './CommentList'
import AddComment from './AddComment'
import './PostPage.css'


class PostPage extends React.Component {

  state = {
    data: [],
    comments: [],
    textareaComm: ''
  }

  propsHuckEditComm = (target) => { 
    this.setState({
      [target.id]: target.value
    })
  }

  openSaveEditComm = (id) => {
    console.log('Редактирование комментария', this.state.textareaComm)
    const content = this.state.textareaComm
    const idPost = this.props.match.params.post
    axios.request().request().put(`/post/${idPost}/comment/${id}`, {content})
    .then((response) => {
      console.log(response)
    })
    .then((error) => {
        console.log(error)
    })
  }

  deleteComm = (id) => {
    console.log('Удаление коментария', id)
    const idPost = this.props.match.params.post
    axios.request().delete(`/post/${idPost}/comment/${id}`)
    .then((response) => {
      console.log(response)
      this.componentDidMount()
    })
    .then((error) => {
        console.log(error)
    })
  }

  get_post = (id) => {
    axios.request().get(`/posts/${id}`)
    .then((response) => {
      console.log(response)
      console.log('GET_ITEM', response.data.comments)
        this.setState({
          ...this.state, data: response.data, comments: response.data.comments
        })
    })
    .then((error) => {
        console.log(error)
    })
}

saveCommentPost = (target) => {
  this.setState({
    [target.id]: target.value
  })
}

clickSaveCommPost = () => {
  const id = this.props.match.params.post
  const content = this.state.textareaComm
  axios.request().post(`/post/${id}/comment`, {content})
    .then((response) => {
        console.log(response)
        this.componentDidMount()
        this.setState({
          textareaComm: ''
        })
    })
    .then((error) => {
        console.log(error)
    })
}


goTo = (page) => {
  this.props.history.push(page)
}

toGoLogin = (loginpage) => {
  this.props.history.push(loginpage)
}

  componentDidMount() {
    console.log('ZAPUSK');
    
    const id = this.props.match.params.post
    this.get_post(id)
  }

  render() {
    const {data, comments, textareaComm} = this.state
    const itemComment = comments.map((item) => {
      return <CommentList 
              key={item._id} item={item} deleteComm={this.deleteComm}
              openSaveEditComm={this.openSaveEditComm} propsHuckEditComm={this.propsHuckEditComm}
              />
    })
    return (
      <div className='post__page__body'>
        <ItemCard goTo={this.goTo} data={data}/>
        <div className='comment__list'>
        {comments.length > 0 ? itemComment : <h1>Нет комментариев</h1>}
        </div>
        <AddComment toGoLogin={this.toGoLogin} textareaComm={textareaComm} saveCommentPost={this.saveCommentPost} clickSaveCommPost={this.clickSaveCommPost}/>
      </div>
    )
  }
}

export default PostPage