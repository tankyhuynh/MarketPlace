import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 380
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
  const classes = useStyles();

  return (
    <div className={`${classes.root} flex justify-around`}>
      <CardContent className="flex flex-col justify-around">
        <div className="text-lg font-medium text-left text-green-500">
           { project.name }
        </div>
        <div className="flex gap-4 text-xs text-left">
            <div 
              dangerouslySetInnerHTML={{ __html: 
                renderUuDiem(project.shortDescription) 
                  ? renderUuDiem(project.shortDescription).substring(0, 300) 
                  : '' 
                }}  
            />
        </div>
      </CardContent>
    </div>
  );
}
