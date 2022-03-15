import {Fragment, useState, useRef} from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Order from './Order';
import PaymentForm from './PaymentForm';
import Review from './Review';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Stack from '@mui/material/Stack';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { StepIconProps } from '@mui/material/StepIcon';
import {payRequestPearlPay} from '../../config/api/pearlpay-biller'
interface Props {
    // rice: Array<Object>
};

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

    const icons: { [index: string]: React.ReactElement } = {
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

function getStepContent(step: number, products: Props,form: any) {
    switch (step) {
        case 0:
            return <Order products={products} form={form}/>;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
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
    }),
}));


const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const form = useRef(null);

    const products = useState({
        'rice': [
            {name: 'Java Rice', price: 100},
            {name: 'Adobo Rice', price: 200},
            {name: 'Plain Rice', price: 150},
            {name: 'Black Rice', price: 222},
            {name: 'Brown Rice', price: 130},
            {name: 'Grey Rice', price: 123}
        ],
        'dish': [
            {name: 'Sinigang', price: 123},
            {name: 'Adobo Rice', price: 222},
            {name: 'Chicken', price: 332},
            {name: 'Hotdog', price: 551},
            {name: 'Tapa', price: 132},
            {name: 'Lugaw', price: 123}
        ],
        'dessert': [
            {name: 'Creme Caramel', price: 123},
            {name: 'Strawberry Cake', price: 222},
            {name: 'Cake', price: 332},
            {name: 'Blueberry Cake', price: 551},
            {name: '8 Texture Cake', price: 132},
            {name: 'Coconut', price: 123}
        ],
        'drinks': [
            {name: 'Lemon', price: 123},
            {name: 'Mango', price: 222},
            {name: 'Water', price: 332},
            {name: 'Salt Water', price: 551},
            {name: 'Peach', price: 132},
            {name: 'Orange', price: 123}
        ],
    })

    const handleNext = () => {
        if(form.current !== null){
            console.log(form.current);
        }

        if(activeStep === steps.length - 1) {
            const date = new Date();
            date.setFullYear(99,2,1);
            payRequestPearlPay(400,'food','hotdog','096177134338','',{name: 'asdfasdf'},new URL('https://simple-order-64158.web.app/'))
                .then(result => {
                    console.log(result)
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
                                {getStepContent(activeStep, products, form)}
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