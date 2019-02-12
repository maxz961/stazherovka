import React from 'react'
import ItemCard from './ItemCard';
import axios from '../../axios.config'


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
    axios.put(`/post/${idPost}/comment/${id}`, {content})
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
    axios.delete(`/post/${idPost}/comment/${id}`)
    .then((response) => {
      console.log(response)
    })
    .then((error) => {
        console.log(error)
    })
  }

  get_post = (id, token) => {
    axios.get(`/posts/${id}`, token)
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
  console.log('STATECOMM', this.state)
  // const fd = new FormData()
  // fd.append('content', this.state.textareaComm)

  const content = this.state.textareaComm
  axios.post(`/post/${id}/comment`, {content})
    .then((response) => {
        console.log(response)
    })
    .then((error) => {
        console.log(error)
    })
}


goTo = (page) => {
  this.props.history.push(page)
}

  componentDidMount() {
    const id = this.props.match.params.post
    console.log('IDCOM', id)
    const token = window.localStorage.getItem('rr_login');
    this.get_post(id, token)
    
  }

  render() {
    const {data, comments} = this.state
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
        <AddComment saveCommentPost={this.saveCommentPost} clickSaveCommPost={this.clickSaveCommPost}/>
      </div>
    )
  }
}

export default PostPage