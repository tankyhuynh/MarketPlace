import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import logoImg from '../../assets/logo.png';
import Grid from '@material-ui/core/Grid';

export default function RecipeReviewCard({ image }) {

  // const organizationsName = ["Đại học Cần Thơ", "Đại học Kinh tế quốc dân", "Đại học v"]
  // const logoList = [logoImg, logo_dhktqd, logo_dhvh, logo_hcmute];

  // const randomImage = () => {
  //   const j = Math.floor(Math.random() * ((logoList.length -1)));
  //   return logoList[j];
  // }

  return (

    // <Card className={`${classes.root} slide-background bg-red-500 `}>
        <Grid 
            container 
            spacing={3}
        >
            <CardContent className="flex flex-col justify-between gap-2 ">
                   <div className="flex text-xl font-bold text-center text-green-500">
                       Can Tho University
                   </div>
                   {/* <div className="grid grid-cols-6 gap-4"> */}
                   <div className="flex flex-col justify-between gap-4">
                     {/* <div className="col-start-1 col-end-4 text-xs text-left"> */}
                     <div className="text-xs text-left ">
                         This impressive paella is a perfect party dish and a fun meal to cook together with your
                         guests. Add 1 cup of frozen peas along with the mussels, if you like.
                     </div>
                        {/* <CardMedia
                          className={`${classes.media}`}
                          image={logoImg}
                          title="Paella dish"
                        /> */}
                        <div className="items-center self-center col-span-1 my-4">
                            <img 
                                src={logoImg} 
                                alt="random imgee" 
                                className="object-cover object-center w-full my-2 rounded-lg max-h-64" 
                            />     
                        </div>  
                 </div>
            </CardContent>
          
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
