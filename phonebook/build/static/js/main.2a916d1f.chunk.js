(window.webpackJsonppart1=window.webpackJsonppart1||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),i=t(3),l=t.n(i),m="https://x9csh.sse.codesandbox.io/api/persons",f=function(){return l.a.get(m).then(function(e){return e.data})},s=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e){return l.a.delete("".concat(m,"/").concat(e))},b=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},h=function(e){var n=e.filter,t=e.onFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})," ")},p=function(e){var n=e.onSubmit,t=e.onNameChange,a=e.onNumberChange,o=e.newName,c=e.newNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.persons,t=e.filter,a=e.onDelete;return n.map(function(e){return e.name.toLowerCase().includes(t)?r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(n){return a(e.id,e.name)}},"delete")):null})},E=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{className:"notification"},n)},w=function(e){var n=e.errorMessage;return""===n?null:r.a.createElement("div",{className:"notification error"},n)},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),l=i[0],m=i[1],g=Object(a.useState)(""),j=Object(u.a)(g,2),O=j[0],N=j[1],C=Object(a.useState)(""),S=Object(u.a)(C,2),k=S[0],y=S[1],D=Object(a.useState)(""),x=Object(u.a)(D,2),F=x[0],I=x[1],J=Object(a.useState)(""),M=Object(u.a)(J,2),T=M[0],B=M[1];Object(a.useEffect)(function(){f().then(function(e){o(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(h,{filter:k,onFilterChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(p,{newName:l,newNumber:O,onSubmit:function(e){if(e.preventDefault(),""!==l)if(""!==O){var n=t.filter(function(e){return e.name===l});if(0===n.length)s({name:l,number:O}).then(function(e){o(t.concat(e)),m(""),N(""),I("".concat(e.name," added to the phonebook")),window.setTimeout(function(){return I("")},2500)}).catch(function(e){return console.log(e)});else if(n[0].number===O)alert("".concat(l," is already added to the phonebook"));else{if(window.confirm("".concat(l," is already added to the phonebook, replace the old number with a new one?"))){var a={name:l,number:O};b(n[0].id,a).then(function(e){o(t.map(function(t){return t.id===n[0].id?e:t})),m(""),N(""),I("Number of ".concat(e.name," changed")),window.setTimeout(function(){return I("")},2500)}).catch(function(e){B("Information of ".concat(n[0].name," has already been removed from the server"))})}}}else alert("error: missing number");else alert("error: missing name")},onNameChange:function(e){m(e.target.value)},onNumberChange:function(e){N(e.target.value)}}),r.a.createElement(E,{message:F}),r.a.createElement(w,{errorMessage:T}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(v,{persons:t,filter:k,onDelete:function(e,n){window.confirm("Delete ".concat(n,"?"))&&d(e).then(function(){return f().then(function(e){o(e)})})}}))};t(36);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.2a916d1f.chunk.js.map