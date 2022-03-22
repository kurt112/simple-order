import axios from 'axios'
import {Description} from "../../../types"

const url = process.env.NODE_ENV === 'development'? 'http://localhost:3001': 'https://simple-order-backend-pearlpay.herokuapp.com'
export const payRequestPearlPay = async (amount: Number,
             tnxid: String,
             name: String,
             mobile: String,
             expires_at: any,
             description: Description,
             redirect_url:  URL) => {

    await axios.post(url+'/pay',{
        data: {
            amount:  String(amount),
            txnid: String(tnxid),
            callback_url: 'https://simple-order-64158.web.app/',
            name: String(name),
            mobile: String(mobile),
            description: String(description),
            redirect_url: String(redirect_url),
            expires_at
        }
    }).then(response => {
        const {url} = response.data;
        window.open(url);
    }).catch(error => {
        console.log(error);
    })




}
