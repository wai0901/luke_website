import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";


let product = {}

const Items = (props) => {


  //To grab the list based on the id from user clicked
  const getId = (id) => {
    props.itemsLists[0].map(list => {
        if (list.id === id) {
            return product = {...list}
        }
      }  
    ) 
  }

  return ( <div className="body-container">
    {
      props.itemsLists[0].map(select => {
        // check if the object has id, to avoid loading the "category" in the dataList
        if (select.id) {
            const selection = {
            background: `url('${select.images[0]}') no-repeat center ${select.position} / cover`   
        }  
        return <div key={select.id} style={selection} className={select.style}  onClick={() => {getId(select.id);}}>
            <Link to={'/' + `${select.main}` + '/' + `${select.category}` + '/' + `${select.id}`}>
              <div className="items-container">
                  <div className="items-info">
                      <h1>{select.title}</h1>
                      <p>{select.description}</p>
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