import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        stateData: []
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
  console.log('stateData', stateData)
  return (
    <Card>
        <h1>{stateData.description}</h1>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
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
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    
  );
}
}


export default withStyles(styles)(PostPage);