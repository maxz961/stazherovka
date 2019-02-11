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

  get_post = (id, token) => {
    axios.get(`/posts/${id}`, token)
    .then((response) => {
        this.setState({
          ...this.state, data: response.data
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
  console.log('STATECOMM', this.state)
  const id = this.props.match.params.post
  const fd = new FormData()
  fd.append('content', this.state.textareaComm)
  axios.post(`/post/${id}/comment`)
    .then((response) => {
        console.log(response)
    })
    .then((error) => {
        console.log(error)
    })
}

get_allcomment = (id) => {
  axios.get(`/post/${id}/comments`)
  .then((response) => {
      console.log('AllComment',response)
      this.setState({
        ...this.state, comments: response.data
      })
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
    const token = window.localStorage.getItem('rr_login');
    this.get_post(id, token)
    this.get_allcomment(id)
    
  }

  render() {
    const {data, comments} = this.state
    const itemComment = comments.map((item) => {
      return <CommentList key={item._id} item={item}/>
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