import { CFooter } from '@coreui/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


const Copyright = () => {
    return (
        <Typography variant="body2" className="text-white">
            {"Copyright © "}
            <Link to="/" className="text-white">
                Liquid Enjiniring
        </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const BottomFooter = () => {
    return (
        <CFooter className="c-footer fixed-bottom" style={{ backgroundColor: "#0f4c75", border: 'none' }}>
            <div align="center" >
                <Copyright />
            </div>
        </CFooter>
    )
}

export default BottomFooter;