import React from 'react';
import './help.css'


const Help = ({helpContent}) => {

    return (
        <div className="help-container">
            <div className="cards-container">
                {
                    helpContent.map((info, index) => 
                        <div key={index} className="card">
                            <h3>{info.title}</h3>
                            <p>
                            {
                                info.content.map((sentence, i) => <span key={i} className="sentence">{sentence}<br /></span>)
                            }
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Help;