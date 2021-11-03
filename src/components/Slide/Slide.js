import './Slide.css'

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from "@material-tailwind/react/Card";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import CardOranization from '../CardCustom/CardOranization';
import CardProjectInfo from '../CardCustom/CardProjectInfo';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '60vw',
    },
    item: {
        height: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));


const Slide = ({ slide, index, projectImage }) => {
    const classes = useStyles();

    return (
        <Link to={`/projects/show/${slide.id}`} className="bg-green-500">
            <Card className={`${classes.root} slide-background md:w-full`}>
              <Grid container spacing={3} >
                  <Grid item xs={6} md={12}>
                      <CardOranization image={slide.productImage} />
                  </Grid>
                  <Grid item xs={6} md={12}>
                      <CardProjectInfo project={slide} />
                  </Grid>
                
              </Grid>

            </Card>
        </Link>
    );
}

export default Slide;