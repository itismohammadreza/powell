import{b as g,c as u}from"./chunk-ZF76AQ7Q.js";import{Ha as c,Ia as f}from"./chunk-BN4GBMJW.js";import"./chunk-VV4CBK2G.js";import{Jb as t,Kb as p,Qb as a,hb as r,ra as n,vb as s,zb as d}from"./chunk-M6YT24N5.js";var O=(()=>{class i extends u{previewOptions=[{field:"header",value:"Dialog"},{field:"draggable",value:!1},{field:"resizable",value:!1},{field:"modal",value:!0},{field:"position",options:"dialogPositions",value:"center"},{field:"blockScroll",value:!1},{field:"closeOnEscape",value:!1},{field:"dismissableMask",value:!1},{field:"closable",value:!0},{field:"showHeader",value:!0},{field:"maximizable",value:!0},{field:"rtl",value:this.config.rtl},{field:"content",value:"Some content inside dialog."}];dialog={header:"Dialog",draggable:!1,resizable:!1,modal:!0,position:"center",blockScroll:!1,closeOnEscape:!1,dismissableMask:!1,closable:!0,showHeader:!0,maximizable:!0,rtl:this.config.rtl,content:"Some content inside dialog."};onOptionChange(e){this.dialog[e.field]=e.value}showDialog(){this.overlayService.showDialog(this.dialog)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=n(i)))(o||i)}})();static \u0275cmp=r({type:i,selectors:[["ng-dialog-page"]],features:[s],decls:2,vars:1,consts:[["component","Dialog","description","Dialog is a container to display content in an overlay window.",3,"onOptionChange","previewOptions"],["label","Open Dialog",3,"click"]],template:function(l,o){l&1&&(t(0,"ng-preview",0),a("onOptionChange",function(v){return o.onOptionChange(v)}),t(1,"ng-button",1),a("click",function(){return o.showDialog()}),p()()),l&2&&d("previewOptions",o.previewOptions)},dependencies:[f,c,g],encapsulation:2})}return i})();export{O as DialogPage};
