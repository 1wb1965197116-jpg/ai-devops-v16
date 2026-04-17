const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET);

module.exports = {

  createCheckout: async (email) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1
      }],
      customer_email: email,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    return session.url;
  }

};
