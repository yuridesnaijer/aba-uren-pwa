import{r as o,o as h,c as g,w as t,a as e,d as c,g as $,h as I,b as O,i as L,m as A}from"./index-11d1685b.js";import{a as T,_ as C,b as S,L as F}from"./_plugin-vue_export-helper-d5f747ca.js";const J={name:"AddTravelOptionForm",data(){return{travelOption:{label:"",value:""}}},methods:{addTravelOption(){const l=JSON.parse(window.localStorage.getItem(T)||"")||[],n={...this.travelOption,value:parseFloat(this.travelOption.value)};window.localStorage.setItem(T,JSON.stringify([...l,n])),this.$emit("onSave")}}};function R(l,n,w,y,d,V){const m=o("v-text-field"),p=o("v-col"),r=o("v-row"),u=o("v-btn"),f=o("v-container"),s=o("v-form");return h(),g(s,null,{default:t(()=>[e(f,null,{default:t(()=>[e(r,null,{default:t(()=>[e(p,null,{default:t(()=>[e(m,{modelValue:d.travelOption.label,"onUpdate:modelValue":n[0]||(n[0]=i=>d.travelOption.label=i),label:"label"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(p,null,{default:t(()=>[e(m,{type:"number",modelValue:d.travelOption.value,"onUpdate:modelValue":n[1]||(n[1]=i=>d.travelOption.value=i),label:"afstand"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(u,{onClick:V.addTravelOption,color:"primary",block:!0},{default:t(()=>[c("toevoegen")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}const j=C(J,[["render",R]]),q={name:"AddClientForm",data(){return{client:""}},methods:{addClient(){const l=JSON.parse(window.localStorage.getItem(S)||"")||[];window.localStorage.setItem(S,JSON.stringify([...l,this.client])),this.$emit("onSave")}}};function H(l,n,w,y,d,V){const m=o("v-text-field"),p=o("v-col"),r=o("v-row"),u=o("v-btn"),f=o("v-container"),s=o("v-form");return h(),g(s,null,{default:t(()=>[e(f,null,{default:t(()=>[e(r,null,{default:t(()=>[e(p,null,{default:t(()=>[e(m,{modelValue:d.client,"onUpdate:modelValue":n[0]||(n[0]=i=>d.client=i),label:"label"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(u,{onClick:V.addClient,color:"primary",block:!0},{default:t(()=>[c("toevoegen")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}const P=C(q,[["render",H]]),Y={required:l=>l?!0:"Verplicht veld"},B=$({components:{AddClientForm:P,AddTravelOptionForm:j,VueDatePicker:I},data:function(){return{isTravelOptionFormOpen:!1,isClientFormOpen:!1,rules:[Y.required],travelOptions:[],clients:[],hourEntry:{client:void 0,date:void 0,startTime:void 0,endTime:void 0,travelOption:void 0}}},created(){this.updateTravelOptions(),this.updateClients()},methods:{updateTravelOptions(){this.travelOptions=JSON.parse(window.localStorage.getItem(T)||"")||[]},updateClients(){this.clients=JSON.parse(window.localStorage.getItem(S)||"")||[]},onTravelOptionAdded(){this.isTravelOptionFormOpen=!1,this.updateTravelOptions()},onClientAdded(){this.isClientFormOpen=!1,this.updateClients()},reset(){this.hourEntry={client:void 0,date:void 0,startTime:void 0,endTime:void 0,travelOption:void 0}},addHours(){const l=JSON.parse(window.localStorage.getItem(F)||"")||[];window.localStorage.setItem(F,JSON.stringify([...l,{...this.$data.hourEntry}])),this.reset()}},computed:{isFormValid(){return!Object.values(this.hourEntry).includes(void 0)}}}),D={class:"text-pink text-h6"},G=O("label",{for:"date"},"datum:",-1),K=O("label",{for:"startTime"},"Starttijd:",-1),z=O("label",{for:"endTime"},"Eindtijd:",-1),M=O("label",{for:"travel"},"Reis:",-1);function W(l,n,w,y,d,V){const m=o("v-icon"),p=o("v-card-title"),r=o("v-select"),u=o("v-btn"),f=o("AddClientForm"),s=o("v-card-text"),i=o("v-card"),E=o("v-dialog"),v=o("v-col"),_=o("v-row"),b=o("VueDatePicker"),k=o("AddTravelOptionForm"),N=o("v-form"),U=o("v-container");return h(),g(U,{class:"pb-16"},{default:t(()=>[e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[e(i,null,{default:t(()=>[e(p,null,{default:t(()=>[O("span",D,[c(" Uren schrijven "),e(m,{icon:"mdi-pencil"})])]),_:1}),e(s,null,{default:t(()=>[e(N,{ref:"form",onSubmit:L(l.addHours,["prevent"])},{default:t(()=>[e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[e(r,{rules:l.rules,modelValue:l.hourEntry.client,"onUpdate:modelValue":n[0]||(n[0]=a=>l.hourEntry.client=a),label:"client",items:l.clients,variant:"outlined",density:"compact"},null,8,["rules","modelValue","items"]),e(E,{modelValue:l.isClientFormOpen,"onUpdate:modelValue":n[1]||(n[1]=a=>l.isClientFormOpen=a)},{activator:t(({props:a})=>[e(u,A({size:"small",variant:"outlined"},a),{default:t(()=>[c("Client toevoegen")]),_:2},1040)]),default:t(()=>[e(i,null,{default:t(()=>[e(s,null,{default:t(()=>[e(f,{onOnSave:l.onClientAdded},null,8,["onOnSave"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[G,e(b,{"auto-apply":!0,required:"",id:"date",placeholder:"datum",modelValue:l.hourEntry.date,"onUpdate:modelValue":n[2]||(n[2]=a=>l.hourEntry.date=a),"enable-time-picker":!1},null,8,["modelValue"])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[K,e(b,{required:"",id:"startTime",modelValue:l.hourEntry.startTime,"onUpdate:modelValue":n[3]||(n[3]=a=>l.hourEntry.startTime=a),"time-picker":"",teleport:!0},null,8,["modelValue"])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[z,e(b,{required:"",id:"endTime",modelValue:l.hourEntry.endTime,"onUpdate:modelValue":n[4]||(n[4]=a=>l.hourEntry.endTime=a),"time-picker":"",teleport:!0},null,8,["modelValue"])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(v,null,{default:t(()=>[M,e(r,{rules:l.rules,id:"travel",modelValue:l.hourEntry.travelOption,"onUpdate:modelValue":n[5]||(n[5]=a=>l.hourEntry.travelOption=a),label:"reis",items:l.travelOptions,"return-object":!0,"item-title":"label","item-value":"value",variant:"outlined",density:"compact"},null,8,["rules","modelValue","items"]),e(E,{modelValue:l.isTravelOptionFormOpen,"onUpdate:modelValue":n[6]||(n[6]=a=>l.isTravelOptionFormOpen=a)},{activator:t(({props:a})=>[e(u,A({size:"small",variant:"outlined"},a),{default:t(()=>[c("reisoptie toevoegen")]),_:2},1040)]),default:t(()=>[e(i,null,{default:t(()=>[e(s,null,{default:t(()=>[e(k,{onOnSave:l.onTravelOptionAdded},null,8,["onOnSave"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(u,{disabled:!l.isFormValid,class:"mt-8",color:"primary",type:"submit",block:!0},{default:t(()=>[c("toevoegen")]),_:1},8,["disabled"])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Z=C(B,[["render",W]]);export{Z as default};