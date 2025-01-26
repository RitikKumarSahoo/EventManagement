const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_KEY)

const stripeData = {
    createAccount(email) {
        return new Promise(async(resolve,reject)=>{
            try {
                const stripeResponse = await stripe.customer.create({email})
                resolve(stripeResponse)
            } catch (error) {
                reject(error)
            }
        })
    },

    createVendor(email) {
        return new Promise(async(resolve,reject)=>
        {
            try {
                const stripeResponse = await stripe.account.create({
                    
                })
            } catch (error) {
                
            }
        })
    }

    
}