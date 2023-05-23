import * as React from 'react';
import '../style/Table.scss';
import { Typography, AppBar, CssBaseline } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Table = () => {
    return ( 
        <div className='table'>
            <Typography variant='h1'>
                Papiez hój
            </Typography>

            <PhotoCamera/>
            <AcUnitIcon/>


        </div>
     );
}
 
export default Table;