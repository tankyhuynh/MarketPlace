import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';

import { red } from '@material-ui/core/colors';

import ButtonBase from '@material-ui/core/ButtonBase';

import logoImg from '../../assets/logo.png';
// import logo_dhktqd from '../../assets/logo_dhktqd.jpg';
// import logo_dhvh from '../../assets/logo_dhvh.png';
// import logo_hcmute from '../../assets/logo_hcmute.png';
// import productImg from '../../assets/iTRAK-contain-500x240.jpg';

import Grid from '@material-ui/core/Grid';
// import Card from "@material-tailwind/react/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: 345,
    height: 380,
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
  image: {
    // width: 64,
    // height: 64,
  },
  img: {
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function RecipeReviewCard({ image }) {
  const classes = useStyles();

  // const organizationsName = ["Đại học Cần Thơ", "Đại học Kinh tế quốc dân", "Đại học v"]
  // const logoList = [logoImg, logo_dhktqd, logo_dhvh, logo_hcmute];

  // const randomImage = () => {
  //   const j = Math.floor(Math.random() * ((logoList.length -1)));
  //   return logoList[j];
  // }

  return (

    // <Card className={`${classes.root} slide-background bg-red-500 `}>
        <Grid 
            container spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={12}>
                   <div className="flex items-start text-xl font-bold text-green-500">
                       Can Tho University
                   </div>
                   <div className="grid grid-cols-6 gap-4">
                     <div className="col-start-1 col-end-4 text-xs text-left">
                         This impressive paella is a perfect party dish and a fun meal to cook together with your
                         guests. Add 1 cup of frozen peas along with the mussels, if you like.
                     </div>
                     <ButtonBase 
                       className={`${classes.image} col-end-7 col-span-2`}
                     >
                       <img 
                         className={`${classes.img} `} 
                         alt="complex" 
                         src={logoImg}
                       />
                     </ButtonBase>
                 </div>
            </Grid>
          
        </Grid>
    // </Card>

    

    // <div className={classes.root}>
    //   <CardMedia
    //     className={classes.media}
    //     image={productImg}
    //     title="Paella dish"
    //   />
    //   <CardContent>
    //       <div className="flex items-start text-xl font-bold text-green-500">
    //           Can Tho University
    //       </div>
    //       <div className="grid grid-cols-6 gap-4">
    //         <div className="col-start-1 col-end-4 text-xs text-left">
    //             This impressive paella is a perfect party dish and a fun meal to cook together with your
    //             guests. Add 1 cup of frozen peas along with the mussels, if you like.
    //         </div>
    //         <ButtonBase 
    //           className={`${classes.image} col-end-7 col-span-2`}
    //         >
    //           <img 
    //             className={`${classes.img} `} 
    //             alt="complex" 
    //             src={logoImg}
    //           />
    //         </ButtonBase>
    //     </div>
    //   </CardContent>
    // </div>
  );
}
