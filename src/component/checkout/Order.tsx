import {Fragment, SyntheticEvent, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
interface Props {
    products: any,
    form: any
};
const Order = ({products,form}: Props) => {
    const rices = useState(products[0].rice);
    const desserts = useState(products[0].dessert);
    const dishes = useState(products[0].dish);
    const drinks = useState(products[0].drinks);


    return <Fragment>
        <Typography variant="h6" gutterBottom>
            Online Shop
        </Typography>
        <Grid container >
            <FormControl ref={form}>
                <Grid item md={12} style={{textAlign: 'left'}} >
                    <FormLabel  id="rice">RICE</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="rice"
                        name="rice"
                    >
                        {
                            rices[0].map((rice: any,) =>{
                                return <FormControlLabel
                                    key={rice.name}
                                    value={rice.name}
                                    control={<Radio />}
                                    label={`${rice.name} - (${rice.price})`} />
                            })
                        }


                    </RadioGroup>
                </Grid>

                <Grid item md={12} style={{textAlign: 'left'}} >
                    <FormLabel  id="dish">Dish</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="dish"
                        name="dish"
                    >
                        {
                            dishes[0].map((rice: any,) =>{
                                return <FormControlLabel
                                    key={rice.name}
                                    value={rice.name}
                                    control={<Radio />}
                                    label={`${rice.name} - (${rice.price})`} />
                            })
                        }


                    </RadioGroup>
                </Grid>

                <Grid item md={12} style={{textAlign: 'left'}} >
                    <FormLabel  id="drinks">Drinks</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="drinks"
                        name="drinks"
                    >
                        {
                            drinks[0].map((rice: any,) =>{
                                return <FormControlLabel
                                    key={rice.name}
                                    value={rice.name}
                                    control={<Radio />}
                                    label={`${rice.name} - (${rice.price})`} />
                            })
                        }


                    </RadioGroup>
                </Grid>

                <Grid item md={12} style={{textAlign: 'left'}} >
                    <FormLabel  id="dessert">Dessert</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="dessert"
                        name="dessert"
                    >
                        {
                            desserts[0].map((rice: any,) =>{
                                return <FormControlLabel
                                    key={rice.name}
                                    value={rice.name}
                                    control={<Radio />}
                                    label={`${rice.name} - (${rice.price})`} />
                            })
                        }


                    </RadioGroup>
                </Grid>




            </FormControl>
    </Grid>
    </Fragment>
}

export default Order;