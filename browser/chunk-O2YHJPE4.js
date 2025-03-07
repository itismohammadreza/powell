import{a as f,c as g,k as d,qa as y}from"./chunk-LXGU3335.js";import{a as i,b as n,ba as u,ha as l,ta as h,x as m}from"./chunk-CVYA6TWS.js";var c=class{http=l(g);envService=l(y);baseUrl=this.envService.apiUrl;_get(r,t=null){return this.http.get(`${this.baseUrl}/${r}`,n(i({},t),{params:this.getHttpParams(t?.params)}))}_post(r,t,e=null){return this.http.post(`${this.baseUrl}/${r}`,t,n(i({},e),{params:this.getHttpParams(e?.params)}))}_put(r,t,e=null){return this.http.put(`${this.baseUrl}/${r}`,t,n(i({},e),{params:this.getHttpParams(e?.params)}))}_patch(r,t,e=null){return this.http.patch(`${this.baseUrl}/${r}`,t,n(i({},e),{params:this.getHttpParams(e?.params)}))}_delete(r,t=null){return this.http.delete(`${this.baseUrl}/${r}`,n(i({},t),{params:this.getHttpParams(t?.params)}))}_customRequest(r,t,e=null,s=null){switch(t.toLowerCase()){case"get":case"delete":return this.http[t.toLowerCase()](r,n(i({},s),{params:this.getHttpParams(s?.params)}));case"post":case"put":case"patch":return this.http[t.toLowerCase()](r,e,n(i({},s),{params:this.getHttpParams(s?.params)}))}}_getFormData(r,t=[]){let e=new FormData;for(let s in r){let o=r[s];if(Array.isArray(o))for(let p=0;p<o.length;p++)e.append(s+"["+p+"]",o[p]);else if(typeof o=="object"&&t.indexOf(s)===-1)if(o instanceof Date)o.setHours(0,-o.getTimezoneOffset(),0,0),e.append(s,o.toISOString());else for(let p in o)e.append(`${s}[${p}]`,o[p]);else e.append(s,o)}return e}getHttpParams(r){let t=new f;return r&&Object.keys(r).map(e=>{t=t.set(e,r[e])}),t}};var x=(()=>{class a extends c{endpoint="auth";_currentUser;router=l(d);set currentUser(t){this._currentUser=t}get currentUser(){return this._currentUser}getProfile(){let t=this._get(`${this.endpoint}/self`);return m(t)}hasPermission(t){if(!t||!t.length)return!0;let e=this.currentUser.permissions;return Array.isArray(t)?e.some(s=>t.includes(s)):e.includes(t)}login(t){let e=this._post(`${this.endpoint}/login`,t);return m(e)}register(t){let e=this._post(`${this.endpoint}/register`,t);return m(e)}logout(){localStorage.removeItem("token"),this.router.navigateByUrl("/auth/login")}hasToken(){return!!localStorage.getItem("token")}static \u0275fac=(()=>{let t;return function(s){return(t||(t=h(a)))(s||a)}})();static \u0275prov=u({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var L=(()=>{class a extends c{endpoint="photos";get(){let t=this._get(this.endpoint,{params:{_start:0,_limit:20}});return m(t)}getCustomers(t){let e=this._customRequest("https://www.primefaces.org/data/customers","GET",null,{params:t});return m(e)}static \u0275fac=(()=>{let t;return function(s){return(t||(t=h(a)))(s||a)}})();static \u0275prov=u({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();export{x as a,L as b};
