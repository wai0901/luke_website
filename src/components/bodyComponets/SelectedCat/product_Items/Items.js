import React from "react";
import { Link } from "react-router-dom";
import "./Items.css";


const Items = (props) => {


  return ( <div className="body-container">
    {
      props.itemsLists[0].map(select => {
        // check if the object has id, to avoid loading the "category" in the dataList
        if (select.id) {
            const selection = {
            background: `url('${select.images[0]}') no-repeat center ${select.position} / cover`   
        }  
        return <div key={select.id} style={selection} className={select.style}  >
            <Link to={`${'/' + select.main + '/' + select.category + '/' + select.id}`}>
              <div className="items-container">
                  <div className="items-info">
                      <h1>{select.title}</h1>
                      <p><span>$</span> {(select.price.toFixed(2))} <span>USD</span></p>
                  </div>
              </div>
            </Link>
          </div>              
        } 
      })
    } 
    </div> 
  )  
}

export default Items;