import React from "react";
import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TextField from '@material-ui/core/TextField';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


function Footer() {

    return(
        <div className="footer-container">
            <ul className="footer-links">
                <li><HelpOutlineIcon style={{ fontSize: 22 }}>Filled</HelpOutlineIcon> <span>help</span></li>
                <li><ChatBubbleOutlineIcon style={{ fontSize: 22 }}>Filled</ChatBubbleOutlineIcon> <span>contact us</span></li>
            </ul>
            <div className="social-group">
                <a href="#"><FacebookIcon style={{ fontSize: 22 }}>Filled</FacebookIcon></a>
                <a href="#"><InstagramIcon style={{ fontSize: 22 }}>Filled</InstagramIcon></a>
                <a href="#"><YouTubeIcon style={{ fontSize: 22 }}>Filled</YouTubeIcon></a>
            </div>  
            <div className="newsletter">
                <div>
                    <form  noValidate autoComplete="off">
                        <TextField 
                            id="standard-basic"
                            label="e-mail" 
                            size="small"
                            margin="dense"
                            helperText="sign up for newsletter"
                            positions="right"
                            color="secondary"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer;