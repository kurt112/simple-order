import axios from 'axios'
import sha1 from 'sha1'
import {Description} from "../../../types";
const url:string = process.env.REACT_APP_base_url || 'https://pgi-stg.pearlpay.io/',
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

    const digest = await sha1(`${amount}${tnxid}${token}`)

    const params = {
        amount,
        tnxid,
        callback_url: url,
        digest,
        name,
        mobile,
        expires_at,
        description,
        redirect_url
    };

    await axios.post(url+generate, {
        headers:{
            'X-PearlPay-Token': token,
            'X-PearlPay-Code':code
        },
        params
    }).then(resposne => {
        console.log(resposne);
    }).catch(error => {
        console.log("hotodog")
        console.log(error);
    })

}
