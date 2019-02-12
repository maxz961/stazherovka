import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from '../../../axios.config'

import DeletePage from '../DeletePage'
import EditPosts from '../EditPosts'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

class PostPage extends React.Component {

    state = {
        stateData: [],
        description: '',
        title: '',
        imageFile: '',
        relogItemCard: false
    }

    propsHuckEdit = (target) => {
      this.setState({
        [target.id]: target.value
      })
    }

    saveEditPost = () => {
      const id = this.state.stateData._id

      const fd = new FormData()
      fd.append('imageFile', this.state.imageFile)
      fd.append('title', this.state.title)
      fd.append('description', this.state.description)

      axios.put(`/post/${id}`, fd)
      .then(res => {
        console.log(res)
      })
      .then(err => {
        console.log(err)
      })
    }

    editImage = (image) => {
      this.setState({
        imageFile: image
      })
    }

    deletePost = () => {
      const id = this.state.stateData._id
      axios.delete(`/post/${id}`)
      .then( res => {
        console.log(res)
        this.props.goTo('/Posts')
      })
      .then(err => {
        console.log(err)
      })
      
    }

    componentDidUpdate(prevProps) {
        const {data} = this.props
        if(data !== prevProps.data)
        this.setState({
            stateData: data
        })
    }


    render() {
        const { stateData} = this.state
  const { classes} = this.props;
  return (
    <Card>
        <h1>{stateData.description}</h1>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={`http://localhost:4000/uploads/${stateData.imageFile}`}
          title='adasdasdas'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {stateData.created_user === 'admin' ? 'Admin' : 'Users'}
          </Typography>
          <Typography component="p">
            {stateData.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

          <DeletePage deletePost={this.deletePost} />
          <EditPosts stateData={stateData} propsHuckEdit={this.propsHuckEdit} saveEditPost={this.saveEditPost} editImage={this.editImage}/>


      </CardActions>
    </Card>
    
  );
}
}


export default withStyles(styles)(PostPage);