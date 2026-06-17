exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      mensaje: "Función funcionando"
    })
  };
};