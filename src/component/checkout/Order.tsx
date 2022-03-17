import {FC, Fragment} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
interface content {
    name: string,
    price: number,
    desc: string
}

interface product {
    rice: content[],
    dish: content[],
    drinks: content[],
    dessert: content[]
}

interface Content {
    products: product,
    getItem: (name:string, index: number) => void
}
const Order: FC<Content> = ({products,getItem}) => {

    const {rice,dish,drinks,dessert} = products

    return <Fragment>
        <Typography variant="h6" gutterBottom>
            Online Shop
        </Typography>
        <Grid container >
            <FormControl>
                <Grid item md={12} style={{textAlign: 'left'}} >
                    <FormLabel  id="rice">RICE</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="rice"
                        name="rice"
                    >
                        {
                            rice.map((rice: any,index:number) =>{
                                return <FormControlLabel
                                    onClick={() => getItem('rice', index)}
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
                            dish.map((dish: any, index:number) =>{
                                return <FormControlLabel
                                    onClick={() => getItem('dish',index)}
                                    key={dish.name}
                                    value={dish.name}
                                    control={<Radio />}
                                    label={`${dish.name} - (${dish.price})`} />
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
                            drinks.map((drink: any,index:number) =>{
                                return <FormControlLabel
                                    onClick={() => getItem('drinks',index)}
                                    key={drink.name}
                                    value={drink.name}
                                    control={<Radio />}
                                    label={`${drink.name} - (${drink.price})`} />
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
                            dessert.map((rice: any, index: number) =>{
                                return <FormControlLabel
                                    onClick={() => getItem('dessert',index)}
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