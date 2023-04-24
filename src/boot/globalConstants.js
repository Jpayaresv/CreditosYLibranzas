const Constants = {
  SERVER_URL: process.env.API,
};
Constants.install = function (Vue) {
  Vue.prototype.$getConst = (key) => {
    return Constants[key];
  };
};

export default Constants;
