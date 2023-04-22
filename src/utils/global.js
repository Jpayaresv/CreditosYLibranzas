import { Notify } from "quasar";
import { useI18n } from "vue-i18n";

const createBase64Image = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const showNotify = (mensaje, tipo) => {
  if (tipo === "success") {
    Notify.create({
      type: "positive",
      message: mensaje,
      timeout: 4000,
      html: true,
    });
  } else if (tipo === "info") {
    Notify.create({
      type: "info",
      message: mensaje,
      timeout: 4000,
      html: true,
    });
  } else if (tipo === "warning") {
    Notify.create({
      type: "warning",
      message: mensaje,
      timeout: 4000,
      html: true,
    });
  } else {
    Notify.create({
      type: "negative",
      message: mensaje,
      timeout: 4000,
      html: true,
    });
  }
};

const getSelectedString = (registros) => {
  const { t } = useI18n();
  return registros === 0
    ? ""
    : `${registros} ` +
        t(`Record${registros > 1 ? "s" : ""}`) +
        " " +
        t(`Selected`);
};

export { createBase64Image, showNotify, getSelectedString };
