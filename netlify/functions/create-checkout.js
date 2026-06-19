const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

exports.handler = async () => {
  try {
    const preference = {
      items: [
        {
          title: "Ni Frío Ni Fuego",
          quantity: 1,
          currency_id: "COP",
          unit_price: 49000
        }
      ],

      back_urls: {
        success: "https://nifrionifuego.netlify.app/gracias",
        failure: "https://nifrionifuego.netlify.app/",
        pending: "https://nifrionifuego.netlify.app/"
      },

      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: response.body.init_point
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};