import{b as c,c as d}from"./chunk-ZF76AQ7Q.js";import{Ha as m,Ia as u}from"./chunk-BN4GBMJW.js";import"./chunk-VV4CBK2G.js";import{Jb as n,Kb as f,Qb as a,hb as l,ra as s,vb as r,zb as p}from"./chunk-M6YT24N5.js";var w=(()=>{class t extends d{previewOptions=[{field:"life",value:3e3},{field:"sticky",value:!1},{field:"rtl",value:this.config.rtl},{field:"summary",value:"some summary"},{field:"closable",value:!1},{field:"severity",options:"toastSeverities",value:"info"},{field:"icon",value:"pi pi-info"},{field:"detail",value:"some detail"},{field:"preventDuplicates",value:!1},{field:"position",options:"toastPositions",value:"top-right"}];toast={life:3e3,sticky:!1,rtl:this.config.rtl,summary:"Some Summary",closable:!1,severity:"info",icon:"pi pi-info",detail:"Some Detail",preventDuplicates:!1,position:"top-right"};onOptionChange(e){this.toast[e.field]=e.value}showToast(){this.overlayService.showToast(this.toast)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275cmp=l({type:t,selectors:[["ng-toast-page"]],features:[r],decls:2,vars:1,consts:[["component","Toast","description","Toast is used to display messages in an overlay.",3,"onOptionChange","previewOptions"],["label","Open Toast",3,"click"]],template:function(o,i){o&1&&(n(0,"ng-preview",0),a("onOptionChange",function(g){return i.onOptionChange(g)}),n(1,"ng-button",1),a("click",function(){return i.showToast()}),f()()),o&2&&p("previewOptions",i.previewOptions)},dependencies:[u,m,c],encapsulation:2})}return t})();export{w as ToastPage};
