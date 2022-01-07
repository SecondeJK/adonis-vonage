import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import Vonage from '@vonage/server-sdk'

export default class VonageController {
    public async index(context: HttpContextContract) {
        const text = context.request.all().text

        let response = await this.sendText(text)

        return View.render('vonage_view', {
            textData: text,
            responseData: response
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

        let apiResponse = "test test test";

        await vonage.message.sendSms("447451284518", "447738066610", text, opts, (err, responseData) => {
            if (err) {
                apiResponse = 'Error'
                // console.log('Error!')
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    // console.log(responseData)
                    // console.log('Message Sent')
                    apiResponse = 'Message Sent'
                } else {
                    // console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    apiResponse = `Message failed with error: ${responseData.messages[0]['error-text']}`;
                }
            }
        })

        return apiResponse
    }
}
