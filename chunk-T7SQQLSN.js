import{a as D,b as I}from"./chunk-5DHYUC47.js";import{D as F,O as M,Sa as G,Ta as j,l as P,m as c,n as W,o as E,oa as L,p as q,r as v,s as R,t as B,ua as N,x as T}from"./chunk-GRYET4BD.js";import{Ga as d,Ha as s,Ia as p,N as _,Q as u,R as b,S as w,bb as C,cb as o,db as S,hb as g,ka as a,kc as y,rb as f,sb as h,wa as l}from"./chunk-SPGXIA5M.js";var O=()=>["label","labelWidth","hint","rtl","showRequiredStar","fixLabelPos","followConfig","disabled","readonly"],z=()=>({required:"error"}),V=(()=>{class r{configService=u(N);form=new E({c1:new q(null,[P.required])});binding;label="label";labelWidth=100;hint="";rtl=this.configService.get().rtl;showRequiredStar=this.configService.get().showRequiredStar;labelPos=this.configService.get().fixLabelPos;followConfig=this.configService.get().followConfig;disabled=!1;readonly=!1;static \u0275fac=function(t){return new(t||r)};static \u0275cmp=b({type:r,selectors:[["ng-editor-page"]],decls:9,vars:29,consts:[[1,"container","py-6","[&_.p-card-content]:hidden","[&>*]:block","[&>*:not(:last-child)]:mb-4"],["header","Editor","subheader","Editor is rich text editor component based on SubEditor."],[3,"header"],[3,"labelChange","labelWidthChange","hintChange","rtlChange","showRequiredStarChange","fixLabelPosChange","followConfigChange","disabledChange","readonlyChange","previewItems","label","labelWidth","hint","rtl","showRequiredStar","fixLabelPos","followConfig","disabled","readonly"],[3,"formGroup"],["formControlName","c1",3,"validation","label","labelWidth","hint","rtl","showRequiredStar","labelPos","followConfig","disabled","readonly"]],template:function(t,e){t&1&&(d(0,"div",0),p(1,"p-card",1),d(2,"p-panel",2),f(3,"translate"),d(4,"ng-preview-options",3),S("labelChange",function(i){return o(e.label,i)||(e.label=i),i})("labelWidthChange",function(i){return o(e.labelWidth,i)||(e.labelWidth=i),i})("hintChange",function(i){return o(e.hint,i)||(e.hint=i),i})("rtlChange",function(i){return o(e.rtl,i)||(e.rtl=i),i})("showRequiredStarChange",function(i){return o(e.showRequiredStar,i)||(e.showRequiredStar=i),i})("fixLabelPosChange",function(i){return o(e.labelPos,i)||(e.labelPos=i),i})("followConfigChange",function(i){return o(e.followConfig,i)||(e.followConfig=i),i})("disabledChange",function(i){return o(e.disabled,i)||(e.disabled=i),i})("readonlyChange",function(i){return o(e.readonly,i)||(e.readonly=i),i}),s()(),d(5,"p-panel",2),f(6,"translate"),d(7,"form",4),p(8,"ng-editor",5),s()()()),t&2&&(a(2),l("header",h(3,23,"options")),a(2),l("previewItems",g(27,O)),C("label",e.label)("labelWidth",e.labelWidth)("hint",e.hint)("rtl",e.rtl)("showRequiredStar",e.showRequiredStar)("fixLabelPos",e.labelPos)("followConfig",e.followConfig)("disabled",e.disabled)("readonly",e.readonly),a(),l("header",h(6,25,"preview")),a(2),l("formGroup",e.form),a(),l("validation",g(28,z))("label",e.label)("labelWidth",e.labelWidth)("hint",e.hint)("rtl",e.rtl)("showRequiredStar",e.showRequiredStar)("labelPos",e.labelPos)("followConfig",e.followConfig)("disabled",e.disabled)("readonly",e.readonly))},dependencies:[G,v,c,W,R,B,D,F,M,L]})}return r})();var le=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=w({type:r});static \u0275inj=_({imports:[j,T,I,y.forChild([{path:"",component:V}])]})}return r})();export{le as EditorPageModule};