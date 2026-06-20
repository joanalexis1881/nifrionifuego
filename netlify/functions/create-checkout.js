 const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

exports.handler = async () => {
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "Ni Frío Ni Fuego",
            quantity: 1,
            currency_id: "COP",
            unit_price: 99900
          }
        ],
        back_urls: {
          success: "https://nifrionifuego.netlify.app/gracias",
          failure: "https://nifrionifuego.netlify.app",
          pending: "https://nifrionifuego.netlify.app"
        },
        auto_return: "approved"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: response.init_point
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};