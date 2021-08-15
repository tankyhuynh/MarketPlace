import './Stepper.css'

import React, { useState } from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuillEditor from '../editor/QuillEditor';

import environment from '../../environments/environment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const HorizontalLinearStepper = (props) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [hightlight, setHightlight] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  // const [files, setFiles] = useState([])

  const variables = {
    ten: name,
    hightlight,
    content: content
    // userID: user.userData._id
  }

  const history = useHistory();

  const onEditorChange = (value) => {
      setContent(value)
      console.log(content)
  }

  // const onFilesChange = (files) => {
  //     setFiles(files)
  // }

  const onSubmit = (event) => {
    // event.preventDefault();

    setName("");
    setHightlight("");
    setContent("");

    // if (user.userData && !user.userData.isAuth) {
    //     return alert('Please Log in first');
    // }

    // props.createProject(variables);

    
    axios.post(environment.url.node + '/projects/createProject', variables)
        .then(response => {
            if (response) {
              console.log('response:', response);
                setTimeout(() => {
                    history.push('/projects')
                }, 500);
            }
        })
  }

  const getSteps = () => {
    return ['Nhập các thông tin cơ bản', 'Nhập nội dung', 'Hoàn thành'];
  }

  const renderBasicProjectInput = () => {
    return (
        <>
          <div className="flex justify-between">
              <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                  Project Name
              </label>
              <input
                  value={name} 
                  onChange={(e) => { setName(e.target.value) }}
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" 
              />
          </div>
          <div className="flex justify-between">
              <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                  Hightlight
              </label>
              <input
                  value={hightlight}
                  onChange={(e) => { setHightlight(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" 
              />
          </div>
          <div className="flex justify-between">
                  <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                    Thumbnail
                  </label>
                  <input
                      value={thumbnail}
                      onChange={(e) => { setThumbnail(e.target.value) }} 
                      id="username" 
                      type="file" 
                      className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  />
              </div>
        </>
    );
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicProjectInput() ;
      case 1:
        console.log(variables);
        return (
          <QuillEditor
              placeholder={"Start Posting Something"}
              onEditorChange={onEditorChange}
              // onFilesChange={onFilesChange}
              data={variables}
          />
        );
      case 2:
        return 'Hoàn thành';
      default:
        return 'Unknown step';
    }
  }

  const steps = getSteps();

  const isStepOptional = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if(activeStep === steps.length - 1){
      // props.onStepperFinished();
      onSubmit();
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderSteps = () => {
    return (
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
    );
  };

  const renderStepContent = () => {
    return (
        <div>
            {activeStep === steps.length ? (
                    <div>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className="stepper--btn">
                            Reset
                        </Button>
                    </div>
            ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <div className="flex gap-2 mt-4">
                            <Button 
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                className="stepper--btn"
                            >
                                Back
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                >
                                    Skip
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
           
                        </div>
                    </div>
                )}
        </div>
    
    );
  };

  return (
    <div className="">
        { renderSteps() } 
        { renderStepContent() }
    </div>
  );
}

export default HorizontalLinearStepper;