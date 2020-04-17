import React, {useState} from 'react';
import { LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, Modal, Backdrop, Fade} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MuiAlert from '@material-ui/lab/Alert';
import { addCartItem } from '../../../../redux/ActionCreater';
import "./ItemDetail.css";

const mapStateToProps = state => {
  console.log(state)
  return {
    item: state,
    loading: state.items.loading
  }
}

const mapDispatchToProps = {
  addCartItem: (item, size, qty) => (addCartItem(item, size, qty))
}

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ItemDetail =(props) => {
    const [product] = useState(props.itemsLists[0])
    
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = product.images.length;

    // add to cart warning message
    const [modalOpen, setModalOpen] = useState(false);

    // add to cart message
    const [open, setOpen] = useState(false);

    // for back button
    const history = useHistory();

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
    
    // add to cart
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");

    const handleSizeChange = (event) => {
      setSize(event.target.value)
    }

    const handleQtyChange = (event) => {
      setQty(event.target.value)
    }

    //add item to cart
    //warning message
    const handleSubmit = (e) => {
      console.log(e)
      if (size && qty) {
        props.addCartItem(product, size, qty);
        
        return setOpen(true);
      } else {
        setModalOpen(true);
      } 
      e.preventDefault();
    }

    const handleModalClose = () => {
      setModalOpen(false);
    };
    
    // Added to Cart Message (close)
      const handleClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
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
                <img className={classes.img} style={{background: `url('${step}') no-repeat center 50% / cover`}} alt=""/>
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
        <div className="add-item-container">
          <section>
            <div className="item-info">
              <h1>{product.name}</h1>
              <p className="item-number">items#: {product.productId}</p>
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
                    <Button type="button" onClick={handleSubmit} variant="outlined" size="small" className={classes.buttonStyle}>Add to cart</Button>
                  </span>
                  <span>
                    <Button onClick={() => history.goBack()} variant="outlined" size="small" className={classes.buttonStyle}>Back</Button>
                  </span>
              </div>  
              <div className="loading-container">
                {props.loading && 
                  <div>
                    <p className="loading">Loading...(Demo)</p>
                  </div>
                }
              </div> 
            </form>
          </section>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={modalOpen}
              onClose={handleModalClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={modalOpen}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Oops!</h2>
                  <p id="transition-modal-description">Please select the size and quantity.</p>
                </div>
              </Fade>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Added to cart!
                </Alert>
            </Snackbar>
        </div>
    </div>  //<-- item-detail-container
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);