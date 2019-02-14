import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import baseApiUrl from '../../../../baseaApiUrl'
import './ListItem.css'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

function ListItem(props) {
  const { classes, title, image, description, created_user} = props;
  console.log('img', image)
  
  return (
    <Card className='list__item'>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={ image ? `${baseApiUrl}/uploads/${image}` : 'http://levogrin.com/wp-content/themes/levon/img/template/default/default-image.png'}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <p>{created_user === 'admin' ? 'Admin' : 'Users'}</p>
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
   
    </Card>
  );
}

export default withStyles(styles)(ListItem);