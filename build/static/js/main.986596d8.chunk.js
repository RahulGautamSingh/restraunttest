(this.webpackJsonprestraunt=this.webpackJsonprestraunt||[]).push([[0],{11:function(e,t,c){},14:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(5),r=c.n(a),i=(c(11),c(4)),j=c.n(i),l=c(6),b=c(2),h=c(0);function d(e){return Object(h.jsx)("div",{className:"genres-holder",children:e.genre.map((function(e){return Object(h.jsx)("p",{className:"genre-item",children:e})}))})}function o(){var e=Object(n.useState)([]),t=Object(b.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)([]),r=Object(b.a)(a,2),i=r[0],o=r[1],u=Object(n.useState)(!0),O=Object(b.a)(u,2),m=O[0],x=O[1],p=Object(n.useState)(0),N=Object(b.a)(p,2),f=N[0],g=N[1],v=Object(n.useState)(9),y=Object(b.a)(v,2),S=y[0],k=y[1];function w(e,t){var c=e.name,n=t.name;return c.localeCompare(n)}function C(e,t,n){g(e),k(t),x(!0),0===c.length?o(n.slice(0,10)):o(n.slice(e,t+1)),x(!1)}return Object(n.useEffect)((function(){function e(){return(e=Object(l.a)(j.a.mark((function e(){var t,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://128.199.195.196:3001/",{headers:{Authorization:"Bearer iqi509189dxznal;,ggi"}});case 2:return t=e.sent,e.next=5,t.json();case 5:(c=e.sent).sort(w),s(c),C(0,9,c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("div",{className:"navbar",children:Object(h.jsx)("p",{children:"Explorer"})}),Object(h.jsx)("div",{className:"main",children:!m&&Object(h.jsxs)("div",{className:"table",children:[Object(h.jsx)("div",{className:"header",children:Object(h.jsx)("h1",{children:"List of Restraunts"})}),Object(h.jsx)("button",{className:"left btn",onClick:function(){C(f-10,S-10,c)},disabled:0===f,children:"Prev"}),Object(h.jsx)("button",{className:"next btn",onClick:function(){S+10>c.length?C(f+10,c.length,c):C(f+10,S+10,c)},disabled:S>=c.length-1,children:"Next"}),Object(h.jsxs)("table",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"name",children:"Name"}),Object(h.jsx)("th",{className:"city",children:"City"}),Object(h.jsx)("th",{className:"state",children:"State"}),Object(h.jsx)("th",{className:"phone",children:"Phone Number"}),Object(h.jsx)("th",{className:"genre",children:"Genre"})]}),i.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{className:"name",children:e.name}),Object(h.jsx)("td",{className:"city",children:e.city}),Object(h.jsx)("td",{className:"state",children:e.state}),Object(h.jsx)("td",{className:"phone",children:e.telephone}),Object(h.jsx)("td",{className:"genre",children:Object(h.jsx)(d,{genre:e.genre.split(",")})})]})}))]})]})})]})}r.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(o,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.986596d8.chunk.js.map