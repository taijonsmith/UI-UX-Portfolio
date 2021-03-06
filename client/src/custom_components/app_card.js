import React from 'react';
import './css/app_card.css';
import FALLBACK_IMAGE from '../resources/images/image-not-found.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ExternalProfile from './external_profile';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  media: {
    height: 140,
    objectFit: 'fill'
  },
});

export default function AppCard(props) {
  const classes = useStyles();
  const item_description = "This is placeholder text for the card's description. This is placeholder text for the card's description. This is placeholder text for the card's description.";
  const onMediaFallback = event => event.target.src = FALLBACK_IMAGE;

  return (
    <React.Fragment>
      <Card id="app_card" raised>
        <CardActionArea>
          {props.refreshing ? 
            (<Skeleton className={classes.media} variant="rect" animation="wave" />) :
            (<CardMedia
              component="img"
              className={classes.media}
              image={props.image ? props.image : FALLBACK_IMAGE}
              title={props.name}
              onError={onMediaFallback}
            />)
          }
          <CardContent className="card_content">
            {props.refreshing ? 
              (<React.Fragment>
                  <Skeleton animation="wave" height={10} width="80%" style={{ margin: '16px auto 12px auto' }} />
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} />
              </React.Fragment>) :
              (<React.Fragment>
                <Typography gutterBottom variant="h5" component="h2" className="card_name">
                {props.name}
                </Typography>
                <Typography className="item_description" variant="body2" component="p" noWrap>
                  {item_description}
                </Typography>
              </React.Fragment>)
            }
          </CardContent>
        </CardActionArea>
        <CardActions className="card_actions">
          {props.refreshing ? null :
            <ExternalProfile url={props.url} />
          }
        </CardActions>
      </Card>
    </React.Fragment>
  );
}