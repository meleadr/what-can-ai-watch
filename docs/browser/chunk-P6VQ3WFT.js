import{a as r}from"./chunk-2LPVXRX5.js";import{b as o}from"./chunk-TQPKG3M6.js";import{R as h,W as p,q as i}from"./chunk-WVRWLBOJ.js";var g=(()=>{let a=class a{constructor(t){this.http=t,this.baseURL="https://api.themoviedb.org/3"}findById(t){return this.http.get(`${this.baseURL}/tv/${t}`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}})}fetchSimilar(t,e){return this.http.get(`${this.baseURL}/tv/${t}/similar`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR",page:e?e.toString():"1"}})}fetchCastById(t){return this.http.get(`${this.baseURL}/tv/${t}/credits`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}}).pipe(i(e=>e.cast))}fetchVideoById(t){return this.http.get(`${this.baseURL}/tv/${t}/videos`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}}).pipe(i(e=>e.results[0]))}fetchTopRated(){return this.http.get(`${this.baseURL}/tv/top_rated`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}}).pipe(i(t=>t.results))}fetchPopular(){return this.http.get(`${this.baseURL}/tv/popular`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}}).pipe(i(t=>t.results))}fetchUpcoming(){return this.http.get(`${this.baseURL}/tv/on_the_air`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR"}}).pipe(i(t=>t.results))}searchByQuery(t){return this.http.get(`${this.baseURL}/search/tv`,{headers:{Authorization:`Bearer ${r.apiTmdbKey}`},params:{language:"fr-FR",query:t}}).pipe(i(e=>e.results[0]))}};a.\u0275fac=function(e){return new(e||a)(p(o))},a.\u0275prov=h({token:a,factory:a.\u0275fac,providedIn:"root"});let s=a;return s})();export{g as a};
