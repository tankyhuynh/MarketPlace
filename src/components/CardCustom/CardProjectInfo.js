import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const renderUuDiem = (uuDiems) => {
  if(uuDiems){
     if(Array.isArray(uuDiems)){
          let uuDiemStr = '';
          uuDiems.map(uuDiem => {
              return uuDiemStr += uuDiem;
          })

          if(uuDiemStr.length > 100){
              var shortUuDiem = uuDiemStr.substring(0, 100) + "...";
              return shortUuDiem;
          }
     }
     return uuDiems;
  }
};

export default function RecipeReviewCard({ project }) {

  return (
    <Grid container spacing={3} >
      <CardContent className="flex flex-col justify-between gap-2 ">
        <div className="text-lg font-medium text-left text-green-500 ">
           { project.name }
        </div>
        <div className="items-center self-center col-span-1 my-4">
            {/* <CardMedia
              className={classes.media}
              image={project.productImage}
              title="Paella dish"
            /> */}
            <img 
                src={project.productImage} 
                alt="random imgee" 
                className="object-cover object-center w-full my-2 rounded-lg max-h-64" 
            />   
        </div>
        <div className="hidden gap-4 text-xs text-left lg:flex">
            <div 
              dangerouslySetInnerHTML={{ __html: 
                renderUuDiem(project.shortDescription) 
                  ? renderUuDiem(project.shortDescription).substring(0, 300) 
                  : '' 
                }}  
            />
        </div>
      </CardContent>
    </Grid>
  );
}
