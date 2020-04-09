import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button, InputLabel, MenuItem, FormControl, Select, Snackbar } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MuiAlert from '@material-ui/lab/Alert';
import "./ItemDetail.css";

//for swipe function
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//for add to cart message
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//style section
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    height: 657,
    display: 'block',
    maxWidth: "100%",
    overflow: 'hidden',
    width: '100%',
    outline: 'none',
  },
  formControl: {
    minWidth: 200,
    margin: theme.spacing(0.5),
  },
  buttonStyle: {
    minWidth: '140px',
    maxWidth: '140px',
    margin: theme.spacing(0.5),
  },
}));

const ItemDetail =(props) => {
    // console.log(props)
    const [product] = useState(props.itemsLists[0][0])
    
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = product.images.length;

    // add to cart message
    const [open, setOpen] = useState(false);

    

    //modal image section
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    
    // modal add to cart section:
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");

    const handleSizeChange = (event) => {
      setSize(event.target.value)
    }

    const handleQtyChange = (event) => {
      setQty(event.target.value)
    }

    const handleSubmit = (e) => {
      //add item to cart
      props.passItem(e, size, qty, product.id)
      //added to cart message
      setOpen(true);
      e.preventDefault();
    }
    
    // Added to Cart Message (close)
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        event.preventDefault();
    };

  return (
    <div class="item-detail-container">
        <div className={classes.root}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={10000}
          >
          {product.images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} style={{background: `url('${step}') no-repeat center 50% / cover`}} />
              ) : null}
            </div>
          ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === (maxSteps - 1)}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </Button>
            }
          />
        </div>
        <div className="modal-item-container">
          <section>
            <div className="item-info">
              <h1>{product.name}</h1>
              <p className="item-number">items#: xxxxx</p>
              <p className="item-price">${(product.price).toFixed(2)} USD</p>
              <p className="item-description">{product.description}</p>
            </div>
              <form className="buy-item-info">
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="size">Size:</InputLabel>
                        <Select
                            name="size"
                            id="size"
                            size="small"
                            value={size}
                            onChange={handleSizeChange}
                        >
                            <MenuItem value={"s"}>S</MenuItem>
                            <MenuItem value={"m"}>M</MenuItem>
                            <MenuItem value={"l"}>L</MenuItem>
                            <MenuItem value={"xl"}>XL</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="quantity">Qty:</InputLabel>
                      <Select
                          name="quantity"
                          id="quantity"
                          value={qty}
                          onChange={handleQtyChange}
                      >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                <div className="add-button">
                    <span>
                      <Button onClick={handleSubmit} variant="outlined" size="small" className={classes.buttonStyle}>Add to cart</Button>
                    </span>
                    <span>
                      <Button variant="outlined" size="small" className={classes.buttonStyle}>Back</Button>
                    </span>
                </div>        
            </form>
          </section>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Added to cart!
                </Alert>
            </Snackbar>
        </div>
    </div>  //<-- item-detail-container
  );
}

export default ItemDetail;