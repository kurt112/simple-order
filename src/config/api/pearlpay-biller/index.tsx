import axios, {AxiosProxyConfig} from 'axios'
import sha1 from 'sha1'
import {Description} from "../../../types"

const url:string = process.env.REACT_APP_base_url || '/api/v1/transactions/',
      token:string = process.env.x_pearlPay_Token || '08919f7b1e1299f74feb4309ab388d12e6e868ae',
      code:string = process.env.x_pearlPay_Code || 'PEARLPAY_TEST_BILLER',
      generate: string = process.env.biller_generate || 'api/v1/transactions/generate'

export const payRequestPearlPay = async (amount: Number,
             tnxid: String,
             name: String,
             mobile: String,
             expires_at: String,
             description: Description,
             redirect_url:  URL) => {

    // createProxyMiddleware({target: 'https://pgi-stg-ws.pearlpay.io/api/v1/transactions/generate',changeOrigin: true})


    const corsHeaders =  {
        'Access-Control-Allow-Headers': ['X-PearlPay-Token','X-PearlPay-Code'],
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'https://pgi-stg-ws.pearlpay.io',
        'X-PearlPay-Token': '08919f7b1e1299f74feb4309ab388d12e6e868ae',
        'X-PearlPay-Code': 'PEARLPAY_TEST_BILLER'
    };

    let formData = new FormData();
    const sha = await sha1(`${amount}${tnxid}08919f7b1e1299f74feb4309ab388d12e6e868ae`)
    formData.append('amount', String(amount));
    formData.append('txnid',String(tnxid));
    formData.append('callback_url','https://simple-order-64158.web.app/');
    formData.append('digest',sha);
    formData.append('name',String(name));
    formData.append('mobile',String(mobile));
    formData.append('description',String(description));
    formData.append('redirect_url',String(redirect_url));

    // const data = {
    //     'amount': amount,
    //     'txnid': String(orderID),
    //     'callback_url': 'https://simple-order-64158.web.app/',
    //     'digest':sha,
    //     'name': String(name),
    //     'mobile': String(mobile),
    //     'description': String(description),
    //     'redirect_url': String(redirect_url)
    // }
    // https://pgi-stg.pearlpay.io/MP7GIGLB0NNL3XIY7BX

    // await fetch('https://pgi-stg-ws.pearlpay.io/api/v1/transactions/generate', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'no-cors',
    //     headers: {
    //         'Access-Control-Allow-Headers': '*',
    //         'Access-Control-Allow-Methods': 'POST',
    //         'Access-Control-Allow-Origin': 'https://pgi-stg-ws.pearlpay.io',
    //         'X-PearlPay-Token': '08919f7b1e1299f74feb4309ab388d12e6e868ae',
    //         'X-PearlPay-Code': 'PEARLPAY_TEST_BILLER'
    //     },
    //     body:formData
    // }).then(response => {
    //     console.log('successs');
    //     console.log(response.body);
    // }).catch(error => {
    //     console.log("i am in error")
    //     console.log(error);
    // });

    let url = '';

    await axios.post('https://pgi-stg-ws.pearlpay.io/api/v1/transactions/generate',formData,{
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type':'application/json',
            'X-PearlPay-Code': 'PEARLPAY_TEST_BILLER',
            'X-PearlPay-Token': '08919f7b1e1299f74feb4309ab388d12e6e868ae'
        }
    }).then(response => {
        const {url} = response.data.data;

        window.open(url);
    }).catch(error => {
        console.log("hotodog")
        console.log(error);
    })




}
