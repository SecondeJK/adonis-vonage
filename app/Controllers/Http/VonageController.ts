import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import Vonage from '@vonage/server-sdk'

export default class VonageController {
    public async index(context: HttpContextContract) {
        const text = context.request.all().text

        let response = await this.sendText(text)

        // console.log(response);

        return View.render('vonage_view', {
            textData: text,
            responseData: await this.sendText(text)
        })
    }

    public async sendText(text) {

        const vonage = new Vonage({
            apiKey: "232130c9",
            apiSecret: "mOHPMgmBQBRO8xNB"
        })

        const opts = {
          "type": "unicode"
        }

        return new Promise((resolve, reject) => { 
            vonage.message.sendSms("447451284518", "447738066610", text, opts, (err, responseData) => {
                if (err) {
                    resolve('Error')
                } else {
                    if (responseData.messages[0]['status'] === "0") {
                        resolve('Message Sent')
                    } else {
                        resolve(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })
        })
    }
}
