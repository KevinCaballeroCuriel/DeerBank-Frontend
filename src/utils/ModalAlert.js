const { Modal } = require("antd");

export const successModalAlert = (message) => {
  Modal.success({
    title: "Se realizó la operación",
    content: `${message}`,
  });
};

export const errorModalAlert = (
  message,
  title = "No se realizó la operación"
) => {
  console.log({ title });

  Modal.error({
    title,
    content: `${message}`,
  });
};
