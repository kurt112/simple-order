import {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
interface Props {
    changeDetails: any,
    detail: any
}
const PaymentForm = ({changeDetails,detail}: Props) => {
    return  <Fragment>
        <Typography variant="h6" gutterBottom>
            Payment method
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    onChange={(e) => changeDetails('first_name', e.target.value)}
                    value={detail.first_name}
                    id="firstName"
                    label="First Name"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    onChange={(e) => changeDetails('last_name', e.target.value)}
                    value={detail.last_name}
                    required
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    onChange={(e) => changeDetails('cellphone', e.target.value)}
                    value={detail.cellphone}
                    required
                    id="cellphone"
                    label="Mobile Number"
                    fullWidth
                    variant="standard"
                />
            </Grid>


        </Grid>
    </Fragment>
}

export default PaymentForm;

