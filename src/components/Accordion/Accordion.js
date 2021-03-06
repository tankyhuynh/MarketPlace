import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  const renderList = () => {
    return props.data.map((item, index) => {
      return (
        <div key={index}>
          <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">
                  { item.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    { item.answer }
                </Typography>
              </AccordionDetails>
          </Accordion>
        </div>
      )
    })
  }

  return (
    <div className={classes.root}>
        { renderList() }
    </div>
  );
}
