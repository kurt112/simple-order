import axios from 'axios'
import sha1 from 'sha1'
import {Description} from "../../../types";
const url:string = process.env.REACT_APP_base_url || '/api/v1/transactions/',
      token:string = process.env.x_pearlPay_Token || '08919f7b1e1299f74feb4309ab388d12e6e868ae',
      code:string = process.env.x_pearlPay_Code || 'PEARLPAY_TEST_BILLER',
      generate: string = process.env.biller_generate || 'api/v1/transactions/generate'
// axios.defaults.baseURL = 'https://pgi-stg-ws.pearlpay.io';
export const payRequestPearlPay = async (amount: Number,
             tnxid: String,
             name: String,
             mobile: String,
             expires_at: String,
             description: Description,
             redirect_url:  URL) => {

    let formData = new FormData();

    const orderID =Math.round((Math.random() * 1000));
    const sha = await sha1(`${amount}${String(orderID)}08919f7b1e1299f74feb4309ab388d12e6e868ae`)
    formData.append('amount', String(amount));
    formData.append('txnid',String(orderID));
    formData.append('callback_url','https://simple-order-64158.web.app/');
    formData.append('digest',sha);
    console.log(sha);
    // formData.append('name',String(name));
    // formData.append('mobile',String(mobile));
    // formData.append('description',String(description));
    // formData.append('redirect_url',String(redirect_url));

    const data = {
        'amount': amount,
        'txnid': String(orderID),
        'callback_url': 'https://simple-order-64158.web.app/',
        'digest':sha,
        'name': String(name),
        'mobile': String(mobile),
        'description': String(description),
        'redirect_url': String(redirect_url)
    }
    // https://pgi-stg.pearlpay.io/MP7GIGLB0NNL3XIY7BX


    await axios.post('https://pgi-stg-ws.pearlpay.io/api/v1/transactions/generate',formData,{
        headers:{
            'X-PearlPay-Token': '08919f7b1e1299f74feb4309ab388d12e6e868ae',
            'X-PearlPay-Code': 'PEARLPAY_TEST_BILLER'
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log("hotodog")
        console.log(error);
    })

    // window.open("https://pgi-ws.pearlpay.io/api/v1/transactions/"+sha);


}
