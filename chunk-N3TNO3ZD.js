import{a as M,b as j}from"./chunk-5DHYUC47.js";import{Aa as D,D as P,O as S,Sb as W,oa as b,ua as k,za as B}from"./chunk-GRYET4BD.js";import{Ga as s,Ha as m,Ia as f,N as u,Na as h,Q as p,R as d,S as y,bb as C,cb as i,db as T,hb as v,ka as r,kc as w,rb as g,sb as _,wa as l}from"./chunk-SPGXIA5M.js";var I=()=>["life","sticky","rtl","summary","closable","severity","icon","detail","preventDuplicates","toastPosition"],E=(()=>{class a{configService=p(k);overlayService=p(W);toast={life:3e3,sticky:!1,rtl:this.configService.get().rtl,summary:"Some Summary",closable:!1,severity:"info",icon:"pi pi-info",detail:"Some Detail",preventDuplicates:!1,position:"top-right"};showToast(){this.overlayService.showToast(this.toast)}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=d({type:a,selectors:[["ng-toast-page"]],decls:8,vars:18,consts:[[1,"container","py-6","[&_.p-card-content]:hidden","[&>*]:block","[&>*:not(:last-child)]:mb-4"],["header","Toast","subheader","Toast is used to display messages in an overlay."],[3,"header"],[3,"lifeChange","stickyChange","rtlChange","summaryChange","closableChange","severityChange","iconChange","detailChange","preventDuplicatesChange","toastPositionChange","previewItems","life","sticky","rtl","summary","closable","severity","icon","detail","preventDuplicates","toastPosition"],["label","Open Toast",3,"click"]],template:function(n,t){n&1&&(s(0,"div",0),f(1,"p-card",1),s(2,"p-panel",2),g(3,"translate"),s(4,"ng-preview-options",3),T("lifeChange",function(e){return i(t.toast.life,e)||(t.toast.life=e),e})("stickyChange",function(e){return i(t.toast.sticky,e)||(t.toast.sticky=e),e})("rtlChange",function(e){return i(t.toast.rtl,e)||(t.toast.rtl=e),e})("summaryChange",function(e){return i(t.toast.summary,e)||(t.toast.summary=e),e})("closableChange",function(e){return i(t.toast.closable,e)||(t.toast.closable=e),e})("severityChange",function(e){return i(t.toast.severity,e)||(t.toast.severity=e),e})("iconChange",function(e){return i(t.toast.icon,e)||(t.toast.icon=e),e})("detailChange",function(e){return i(t.toast.detail,e)||(t.toast.detail=e),e})("preventDuplicatesChange",function(e){return i(t.toast.preventDuplicates,e)||(t.toast.preventDuplicates=e),e})("toastPositionChange",function(e){return i(t.toast.position,e)||(t.toast.position=e),e}),m()(),s(5,"p-panel",2),g(6,"translate"),s(7,"ng-button",4),h("click",function(){return t.showToast()}),m()()()),n&2&&(r(2),l("header",_(3,13,"options")),r(2),l("previewItems",v(17,I)),C("life",t.toast.life)("sticky",t.toast.sticky)("rtl",t.toast.rtl)("summary",t.toast.summary)("closable",t.toast.closable)("severity",t.toast.severity)("icon",t.toast.icon)("detail",t.toast.detail)("preventDuplicates",t.toast.preventDuplicates)("toastPosition",t.toast.position),r(),l("header",_(6,15,"preview")))},dependencies:[B,M,P,S,b]})}return a})();var Y=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=y({type:a});static \u0275inj=u({imports:[D,j,w.forChild([{path:"",component:E}])]})}return a})();export{Y as ToastPageModule};