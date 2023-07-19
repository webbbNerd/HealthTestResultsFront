import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

(()=>{let lastCookie=document.cookie;const expando='_cookie';let nativeCookieDesc=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');Object.defineProperty(Document.prototype,expando,nativeCookieDesc);Object.defineProperty(Document.prototype,'cookie',{enumerable:true,configurable:true,get(){return this[expando]},set(value){this[expando]=value;let cookie=this[expando];if(cookie!==lastCookie){try{let detail={oldValue:lastCookie,newValue:cookie};this.dispatchEvent(new CustomEvent('cookiechange',{detail:detail}));channel.postMessage(detail)}finally{lastCookie=cookie}}}});const channel=new BroadcastChannel('cookie-channel');channel.onmessage=(e)=>{lastCookie=e.data.newValue;document.dispatchEvent(new CustomEvent('cookiechange',{detail:e.data}))}})();