import React from "react";
import { Link } from "react-router-dom";


const SelectedCat = (props) => {


    return ( <div className="body-container">
    {
        props.selectedSection[0].map(select => {
            // check if the object has id, to avoid loading the "category" in the dataList
            if (select.id) {
                const selection = {
                background: `url('${select.image}') no-repeat center ${select.position} / cover`   
            }  
                return <div key={select.id} style={selection} className={select.style}>
                    <Link to={`${'/' + select.category + '/' + select.link}`}>
                        <div className="selection-container">
                            <div className="menu-info">
                                <h1>{select.title}</h1>
                                <p>{select.description}</p>
                            </div>
                            <div className="menu-title">
                                <h1>{select.title}</h1>
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

export default SelectedCat;
