import{a as q,b as z}from"./chunk-MFZUUSS7.js";import{a as E}from"./chunk-JBFC2EKY.js";import{c as L,e as $}from"./chunk-LZ3G22DJ.js";import"./chunk-P6VQ3WFT.js";import"./chunk-2LPVXRX5.js";import"./chunk-TQPKG3M6.js";import{E as A,F as R,p as P,q as j,r as k}from"./chunk-N6GDSHB3.js";import{$ as C,Aa as S,Db as y,Ea as n,Eb as b,Fb as B,Ib as o,Jb as d,Kb as I,Va as _,X as g,Xa as p,_a as M,aa as l,bb as D,cb as F,db as w,eb as a,fb as m,gb as f,ob as T,q as v,qa as x,wb as u,xb as h}from"./chunk-WVRWLBOJ.js";var G=()=>({width:"300px"}),H=t=>["/series",t];function J(t,e){if(t&1&&f(0,"img",4),t&2){let c=T();p("alt",c.series().name)("src","https://media.themoviedb.org/t/p/w600_and_h900_bestv2"+c.series().poster_path,S)("width","10000")}}var O=(()=>{let e=class e{constructor(){this.series=x.required()}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=l({type:e,selectors:[["app-series-card"]],inputs:{series:[C.SignalBased,"series"]},standalone:!0,features:[y],decls:7,vars:14,consts:[[1,"card","flex","justify-content-center","cursor-pointer"],[3,"header","subheader","routerLink"],["pTemplate","header"],[1,"flex","justify-content-end"],[3,"alt","src","width"]],template:function(i,r){i&1&&(a(0,"div",0)(1,"p-card",1),o(2,"percent"),_(3,J,1,3,"ng-template",2),a(4,"sub",3),u(5),o(6,"date"),m()()()),i&2&&(n(),M(b(11,G)),p("header",r.series().name)("subheader",d(2,6,r.series().vote_average/10))("routerLink",B(12,H,r.series().id)),n(4),h(I(6,8,r.series().first_air_date,"dd-MM-yyyy")))},dependencies:[z,q,A,j,k,R,$],changeDetection:0});let t=e;return t})();function K(t,e){if(t&1&&f(0,"app-series-card",2),t&2){let c=e.$implicit;p("series",c)}}var fe=(()=>{let e=class e{constructor(){this.manager=g(E),this.route=g(L)}ngOnInit(){this.title$=this.route.data.pipe(v(s=>s.title))}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=l({type:e,selectors:[["app-series-list"]],standalone:!0,features:[y],decls:7,vars:5,consts:[[1,"text-primary","text-center","font-bold","m-3"],[1,"flex","flex-wrap","justify-content-around","gap-3","mx-3"],[3,"series"]],template:function(i,r){i&1&&(a(0,"h1",0),u(1),o(2,"async"),m(),a(3,"div",1),F(4,K,1,1,"app-series-card",2,D),o(6,"async"),m()),i&2&&(n(),h(d(2,1,r.title$)),n(3),w(d(6,3,r.manager.list$)))},dependencies:[P,O],changeDetection:0});let t=e;return t})();export{fe as SeriesListComponent};