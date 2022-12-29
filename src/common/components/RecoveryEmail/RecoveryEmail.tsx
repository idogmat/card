const prodUrl = process.env.REACT_APP_FRONT_URL + "/#/recovery/$token$";
const devUrl = process.env.REACT_APP_FRONT_DEV_URL + "/#/recovery/$token$";
const recoveryUrl = process.env.NODE_ENV === "development" ? devUrl : prodUrl;
console.log(devUrl);
console.log(prodUrl);
console.log(process.env);
export const recoveryEmail = `<div style="padding: 15px">
Password recovery
<a href=${recoveryUrl}>
link</a></div>`;
