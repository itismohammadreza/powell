import{b as J}from"./chunk-5DHYUC47.js";import{D as q,O as z,S as B,T as H,a as C,b as V,oa as G}from"./chunk-GRYET4BD.js";import{Ca as h,Da as P,Ea as O,Fa as b,Ga as a,Ha as d,Ia as s,La as y,N as u,Na as E,Oa as m,Q as I,R as g,S as _,Sb as k,Ua as L,Ub as W,Va as $,Wa as x,Xa as S,Za as F,ab as Q,ba as T,da as M,ib as D,ka as p,kc as A,lb as j,rb as N,sb as R,ua as r,wa as c,za as w}from"./chunk-SPGXIA5M.js";var Z=["anchor"],ee=(e,i,t,n)=>({$implicit:e,index:i,first:t,last:n}),te=e=>({width:e});function ne(e,i){e&1&&y(0)}function ie(e,i){if(e&1&&r(0,ne,1,0,"ng-container",2),e&2){let t=i.$implicit,n=i.$index,o=i.$count,l=m();c("ngTemplateOutlet",l.templateMap.content)("ngTemplateOutletContext",j(2,ee,t,n,n===0,n===o-1))}}function oe(e,i){e&1&&y(0)}function re(e,i){if(e&1&&r(0,oe,1,0,"ng-container",3),e&2){let t=m(2);c("ngTemplateOutlet",t.templateMap.loading)}}function le(e,i){if(e&1&&r(0,re,1,1,"ng-container"),e&2){let t=m();h(t.loading?0:-1)}}function ae(e,i){if(e&1&&s(0,"p-progressSpinner"),e&2){let t=m(2);w(D(2,te,t.spinnerWidth))}}function pe(e,i){if(e&1&&r(0,ae,1,4,"p-progressSpinner",4),e&2){let t=m();h(t.loading?0:-1)}}var K=(()=>{class e{el=I(M);data;spinnerWidth="40px";scrolled=new T;anchor;templates;loading;templateMap={};observer;ngAfterContentInit(){this.templates.forEach(t=>{let n=t.getType();this.templateMap[n]=t.templateRef}),this.observer=new IntersectionObserver(([t])=>{this.loading||t.isIntersecting&&(this.showLoading(),this.scrolled.emit(this.hideLoading))},{root:this.isHostScrollable()?this.el.nativeElement:null}),this.observer.observe(this.anchor.nativeElement)}showLoading=()=>{this.loading=!0};hideLoading=()=>{this.loading=!1};isHostScrollable(){let t=window.getComputedStyle(this.el.nativeElement);return t.getPropertyValue("overflow")==="auto"||t.getPropertyValue("overflow-y")==="scroll"}ngOnDestroy(){this.observer.disconnect()}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=g({type:e,selectors:[["ng-infinite-scroll"]],contentQueries:function(n,o,l){if(n&1&&L(l,C,4),n&2){let f;x(f=S())&&(o.templates=f)}},viewQuery:function(n,o){if(n&1&&$(Z,7),n&2){let l;x(l=S())&&(o.anchor=l.first)}},inputs:{data:"data",spinnerWidth:"spinnerWidth"},outputs:{scrolled:"scrolled"},decls:7,vars:1,consts:[["anchor",""],[1,"loading"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngTemplateOutlet"],[3,"style"]],template:function(n,o){n&1&&(O(0,ie,1,7,"ng-container",null,P),a(2,"div",1),r(3,le,1,1)(4,pe,1,1),d(),s(5,"div",null,0)),n&2&&(b(o.data),p(3),h(o.templateMap.loading?3:4))},dependencies:[B,k],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]     .loading{text-align:center}"]})}return e})();var U=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=_({type:e});static \u0275inj=u({imports:[H,W,V]})}return e})();function se(e,i){if(e&1&&(a(0,"p"),F(1),d()),e&2){let t=i.$implicit,n=i.index;p(),Q("",n+1," - ",t,"")}}function me(e,i){e&1&&s(0,"i",6)}var X=(()=>{class e{list=[];ngOnInit(){this.initListLazy()}initListLazy(){setTimeout(()=>{this.list.push(...this.generateList())},2e3)}onScroll(t){setTimeout(()=>{this.list.push(...this.generateList()),t()},2e3)}generateList(){return Array.from(Array(20).keys(),()=>"item")}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=g({type:e,selectors:[["ng-infinite-scroll-page"]],decls:7,vars:4,consts:[[1,"container","py-6","[&_.p-card-content]:hidden","[&>*]:block","[&>*:not(:last-child)]:mb-4","[&_.p-panel-content]:overflow-scroll","[&_.p-panel-content]:max-w-[500px]"],["header","InfiniteScroll","subheader","InfiniteScroll is a container to implement infinitely loading data."],[3,"header"],[3,"scrolled","data"],["ngTemplate","content"],["ngTemplate","loading"],[1,"pi","pi-spinner","pi-spin","h3"]],template:function(n,o){n&1&&(a(0,"div",0),s(1,"p-card",1),a(2,"p-panel",2),N(3,"translate"),a(4,"ng-infinite-scroll",3),E("scrolled",function(f){return o.onScroll(f)}),r(5,se,2,2,"ng-template",4)(6,me,1,0,"ng-template",5),d()()()),n&2&&(p(2),c("header",R(3,2,"preview")),p(2),c("data",o.list))},dependencies:[K,C,q,z,G]})}return e})();var ke=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=_({type:e});static \u0275inj=u({imports:[U,J,A.forChild([{path:"",component:X}])]})}return e})();export{ke as InfiniteScrollPageModule};