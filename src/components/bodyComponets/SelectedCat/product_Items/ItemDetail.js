import React, {useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button, Snackbar} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchAddCartItem } from '../../../../redux/ActionCreater';
import EmptyFieldMessage from './empty_field_message/EmptyFieldMessage';
import ItemForm from './item_form/ItemForm';
import "./ItemDetail.css";

const mapStateToProps = state => {
  return {
    item: state,
    loading: state.items.loading
  }
}

const mapDispatchToProps = {
  fetchAddCartItem: (fetchData) => (fetchAddCartItem(fetchData))
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
    const handleSubmit = e => {
      
      let fetchData = { product, size, qty }
      
      if (size && qty) {
        props.fetchAddCartItem(fetchData);
        
        return setOpen(true);
      } else {
        setModalOpen(true);
      } 
      e.preventDefault();
    }

    // set empty field warming modal close
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
          <ItemForm 
            handleSizeChange={handleSizeChange}
            handleQtyChange={handleQtyChange}
            handleSubmit={handleSubmit}
            size={size}
            qyt={qty}
            loading={props.loading}
          />
          </section>
          <EmptyFieldMessage 
              modalOpen={modalOpen}
              handleModalClose={handleModalClose}
            />
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