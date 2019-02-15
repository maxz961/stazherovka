import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from '../../../axios.config'

import baseApiUrl from '../../../baseaApiUrl'
import DeletePage from '../DeletePage'
import EditPosts from '../EditPosts'
import './ItemCard.css'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
    maxWidth: '500px',
    margin: '0 auto',
    height: 'auto'
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
      fd.append('description', this.state.description )

      const img = this.state.imageFile
      console.log('FILE', img.toString())
      console.log('BINAR', fd.get('imageFile'))


      axios.request().put(`/post/${id}`, fd)
      .then(res => {
        console.log(res)
        this.props.saveEditUpdate()
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
      axios.request().delete(`/post/${id}`)
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
      console.log('IMGIMG', this.state.stateData)
        const { stateData} = this.state
  const { classes} = this.props;
  return (
    <Card> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={stateData.imageFile ? `${baseApiUrl}/uploads/${stateData.imageFile}` : 'http://levogrin.com/wp-content/themes/levon/img/template/default/default-image.png'}
          title='adasdasdas'
        />
        <div className='Text__CARD'>
        <h1>{stateData.title}</h1>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {stateData.created_user === 'admin' ? 'Admin' : 'Users'}
          </Typography>
          <Typography component="p">
            {stateData.description}
          </Typography>
        </CardContent>
        </div>
      </CardActionArea>
      <CardActions>

          <DeletePage deletePost={this.deletePost} stateData={stateData}/>
          <EditPosts stateData={stateData} propsHuckEdit={this.propsHuckEdit} saveEditPost={this.saveEditPost} editImage={this.editImage}/>
          <Button type="submit"
                 variant="outlined" 
                 color="primary"
                 onClick={() => this.props.goTo('/Posts')}>
                    Назад
                </Button>


      </CardActions>
    </Card>
    
  );
}
}


export default withStyles(styles)(PostPage);