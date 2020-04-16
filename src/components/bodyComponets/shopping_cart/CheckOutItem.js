import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Button, ButtonGroup, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeCartItem, increment, decrement } from '../../../redux/ActionCreater';
import './CheckOutItem.css';

    
    const mapDispatchToProps = {
        removeCartItem: (itemId) => (removeCartItem(itemId)),
        increment: (itemId) => (increment(itemId)),
        decrement: (itemId) => (decrement(itemId))
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
    }));

const CheckOutItem = (props) => {
    
    const classes = useStyles();

    const addQty = (itemId) => {
        props.increment(itemId);
    }

    const minusQty = (itemId) => {
        props.decrement(itemId);
    }

    const removeQty = (itemId) => {
        props.removeCartItem(itemId);

    }

    
    const itemImage = {
        background: `url('${props.item.images[0]}') no-repeat center ${props.item.position} / cover`
    }  

    return <li className="item-container">
            <div key={props.item.id} className="item-image" style={itemImage}></div>
            <div className="item-info">
                <div className="info-group">
                    <h1>{props.item.title}</h1>
                    <p className="item-number">item#: {props.item.productId}</p>
                    <p className="item-price"><span>$</span> {(props.item.price).toFixed(2)} <span>USD</span></p>
                    <p className="item-description">Size: {props.item.size}</p>
                </div>
                <div className="buttons-group">
                    <div className="buttons">
                        <div>
                            <p>qty: {props.item.quantity}</p>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button onClick={() => addQty(props.item.productId)}>+</Button>
                                <Button onClick={() => minusQty(props.item.productId)}>-</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <IconButton aria-label="delete" className={classes.margin}>
                                <DeleteIcon onClick={() => removeQty(props.item.productId)} fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </li>
}

export default connect(null, mapDispatchToProps)(CheckOutItem);