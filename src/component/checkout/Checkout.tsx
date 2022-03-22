import {Fragment, ReactElement, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import Order from './Order';
import PaymentForm from './PaymentForm';
import Review from './Review';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Stack from '@mui/material/Stack';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import {StepIconProps} from '@mui/material/StepIcon';
import {payRequestPearlPay} from '../../config/api/pearlpay-biller'
import LinearProgress from '@mui/material/LinearProgress';
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

const number = Math.floor((Math.random() * 1000000) + 1);

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://pearlpay.com/">
                PearlPay
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));


function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: ReactElement } = {
        1:  <LocalShippingIcon />,
        2:  <CreditCardIcon />,
        3:  <RateReviewIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = [
    {label: 'Order',icon: LocalShippingIcon},
    {label: 'Payment details',icon:CreditCardIcon},
    {label: 'Review your order',icon: RateReviewIcon}
];

function getStepContent(step: number, products: product, getItem: any, orders: any, total: number,changeDetails: any, detail:any, loading: any) {
    switch (step) {
        case 0:
            // @ts-ignore
            return <Order products={products} getItem={getItem} />;
        case 1:
            return <PaymentForm changeDetails={changeDetails} detail={detail}/>;
        case 2:
            return <Review items={orders} total={total} detail={detail} number={number} loading={loading}/>;
        default:
            // @ts-ignore
            throw new Error('Unknown step');
    }
}

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    })
}));


const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [items, setItem] = useState({});
    const [orders, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const [detail,setDetail] = useState({
        first_name: '',
        last_name: '',
        cellphone: ''
    })
    const [loading,setLoading] = useState(false);

    const [products] = useState<product>({
        'rice': [
            {name: 'Java Rice', price: 100, desc: '+10 In Java Coding'},
            {name: 'Adobo Rice', price: 200, desc: 'Types Of Rice'},
            {name: 'Plain Rice', price: 150, desc: 'Types Of Rice'},
            {name: 'Black Rice', price: 222, desc: 'Types Of Rice'},
            {name: 'Brown Rice', price: 130, desc: 'Types Of Rice'},
            {name: 'Grey Rice', price: 123, desc: 'Types Of Rice'}
        ],
        'dish': [
            {name: 'Sinigang', price: 123, desc: 'Types Of Dish'},
            {name: 'Adobo Rice', price: 222, desc: 'Types Of Dish'},
            {name: 'Chicken', price: 332, desc: 'Types Of Dish'},
            {name: 'Hotdog', price: 551, desc: 'Types Of Dish'},
            {name: 'Tapa', price: 132, desc: 'Types Of Dish'},
            {name: 'Lugaw', price: 123, desc: 'Types Of Dish'}
        ],
        'dessert': [
            {name: 'Creme Caramel', price: 123, desc: 'Types Of Dessert'},
            {name: 'Strawberry Cake', price: 222, desc: 'Types Of Dessert'},
            {name: 'Cake', price: 332, desc: 'Types Of Dessert'},
            {name: 'Blueberry Cake', price: 551, desc: 'Types Of Dessert'},
            {name: '8 Texture Cake', price: 132, desc: 'Types Of Dessert'},
            {name: 'Coconut', price: 123, desc: 'Types Of Dessert'}
        ],
        'drinks': [
            {name: 'Lemon', price: 123, desc: 'Types Of Water'},
            {name: 'Mango', price: 222, desc: 'Types Of Water'},
            {name: 'Water', price: 332, desc: 'Types Of Water'},
            {name: 'Salt Water', price: 551, desc: 'Types Of Water'},
            {name: 'Peach', price: 132, desc: 'Types Of Water'},
            {name: 'Orange', price: 123,desc: 'Types Of Water'}
        ]
    })

    const changeDetails = (name: any, text: String) => {
        const current = {...detail};

        // @ts-ignore
        current[name] = text;
        setDetail(current);
    }

    const getItem = (name:string, index:number) => {

        const currentState:Object = {...items};

        const productTypes = Object(products)[name];

        Object(currentState)[name] = productTypes[index]
        setItem(currentState);
        const temp:any = [];
        let total = 0;

        // eslint-disable-next-line array-callback-return
        Object.keys(currentState).map(key => {
            const product = Object(currentState)[key];
            temp.push(product);
            total += product.price;

        });

        setOrder(temp);
        setTotal(total)
    }

    const handleNext = async () => {

        if(activeStep === steps.length - 1) {
            setLoading(true);
            const date = new Date();
            date.setFullYear(99,2,1);
            await payRequestPearlPay(total,`${number}`,`${detail.first_name} ${detail.last_name}`,`${detail.cellphone}`,'',{name: 'asdfasdf'},new URL('https://simple-order-64158.web.app/'))
                .then(ignored => {
                    setLoading(false);
                });
            return;
        }
        if(activeStep+1 > 2) return;
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        if(activeStep <0) return;
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        PearlPay
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stack sx={{ width: '100%' }} spacing={4}>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel connector={<ColorlibConnector />}>
                            {steps.map((step) => (
                                <Step key={step.label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                    <Fragment>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {getStepContent(activeStep, products,getItem, orders, total,changeDetails,detail,loading)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </Fragment>
                        )}
                    </Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}