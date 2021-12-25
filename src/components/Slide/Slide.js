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
      minHeight: '60vh',
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


const Slide = ({ slide, organizations }) => {
    const classes = useStyles();

    return (
        <Link 
            to={`/projects/show/${slide.type}/${slide.id}/${slide.code}`} 
            className="bg-green-500"
        >
            <Card 
                className={`${classes.root} flex slide-background md:w-full`}
            >
                <Grid 
                    container 
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    className="flex items-center justify-center"
                >
                      <Grid item xs={12} md={6} className="hidden p-2 lg:block">
                          <CardOranization image={slide.productImage} />
                      </Grid>
                      <Grid item xs={12} md={6} className='p-2'>
                          <CardProjectInfo project={slide} />
                      </Grid>
                  </Grid>
            </Card>
        </Link>
    );
}

export default Slide;