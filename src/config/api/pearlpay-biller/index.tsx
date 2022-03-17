import axios, {AxiosProxyConfig} from 'axios'
import sha1 from 'sha1'
import {Description} from "../../../types"

const url:string = process.env.REACT_APP_base_url || 'https://pgi-stg-ws.pearlpay.io/api/v1/transactions/generate',
      token:string = process.env.x_pearlPay_Token || '08919f7b1e1299f74feb4309ab388d12e6e868ae',
      code:string = process.env.x_pearlPay_Code || 'PEARLPAY_TEST_BILLER'

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

    await axios.post(url,formData,{
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type':'application/json',
            'X-PearlPay-Code': code,
            'X-PearlPay-Token': token
        }
    }).then(response => {
        const {url} = response.data.data;

        window.open(url);
    }).catch(error => {
        console.log("hotodog")
        console.log(error);
    })




}
