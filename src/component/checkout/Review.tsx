import  {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import LinearProgress from "@mui/material/LinearProgress";

const payments = [
    { name: 'PearlPay', detail: 'PearlPay' }
];

const Review = (items: any) => {
    return <Fragment>
        <Typography variant="h6" gutterBottom>
            Order summary
        </Typography>

        <Typography variant="h2" gutterBottom>
            {items.number}
        </Typography>
        {items.loading? <LinearProgress />: null}
        <br/>
        <List disablePadding>
            {items.items.map((item:any) => (
                <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={item.name} secondary={item.desc} />
                    <Typography variant="body2">{item.price}</Typography>
                </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {'₱ ' +items.total}
                </Typography>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Customer Name
                </Typography>
                <Typography gutterBottom>{`${items.detail.first_name} ${items.detail.last_name}`}</Typography>
                <Typography gutterBottom>{items.detail.cellphone}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Payment details
                </Typography>
                <Grid container>
                    {payments.map((payment) => (
                        <Fragment key={payment.name}>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{payment.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{payment.detail}</Typography>
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Fragment>
}

export default  Review;
