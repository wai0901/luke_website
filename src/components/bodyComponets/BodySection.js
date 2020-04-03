import React from "react";
import { Link } from "react-router-dom";


import './BodySection.css';

const BodySection = (props) => {

    return (
        <div className="body-container">
            
            {
                props.home.map(select => {
                    const selection = {
                        background: `url('${select.image}') no-repeat center ${select.position}`,
                        backgroundSize: "cover"
                    }  
                    if (select.name === "sales") {
                        return <div className="page" key={select.id} style={selection} className={select.style}>
                            <div className="sales-container">
                                <div className="sales-info">
                                    <h1>{select.title}</h1>
                                    <p>{select.description}</p>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div key={select.id} style={selection} className={select.style}>
                            <Link to={"/" + select.link}>
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
export default BodySection