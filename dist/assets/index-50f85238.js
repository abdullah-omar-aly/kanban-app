(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();class g{create(r,n){const t={id:Date.now().toString(),title:r,description:n,status:"todo"};localStorage.setItem("tasks",JSON.stringify([...this.getAllTasks(),t]))}getAllTasks(){return JSON.parse(localStorage.getItem("tasks"))}getSingleTask(r){return this.getAllTasks().filter(n=>n.id===r)[0]}delete(r){const n=this.getAllTasks().filter(a=>a.id!==r);localStorage.setItem("tasks",JSON.stringify(n))}}class c{clean(){document.querySelectorAll(".dragging-container").forEach(n=>n.innerHTML="")}renderTasks(r){const n=document.querySelectorAll(".dragging-container");r.forEach(a=>{n.forEach(t=>{t.getAttribute("data-status")===a.status&&(t.innerHTML+=`
                            <div 
                                    class="task-card draggable"
                                    draggable="true" 
                                    data-id="${a.id}"
                                    ondragstart="dragCardStart(event)"
                                    ondragend="dragCardEnd(event)"  
                                    data-bs-target="#task-details-modal"
                                    data-bs-toggle="modal"    
                                >
                                    <h5>${a.title}</h5>
                                    <p>${a.description}</p>
                                </div>
            
                    `)})})}}const i=new g,l=new c;l.renderTasks(i.getAllTasks());window.deleteTask=function(e){console.log(e)};document.forms["add-new-task"].addEventListener("submit",e=>{e.preventDefault();const r=e.currentTarget.title.value,n=e.currentTarget.description.value;i.create(r,n),e.currentTarget.title.value="",e.currentTarget.description.value="",l.clean(),l.renderTasks(i.getAllTasks())});window.deleteTask=function(e){};const d=document.querySelectorAll(".dragging-container");window.showTaskDetails=function(e){console.log(history.pushState("/bodda"))};window.dragCardStart=function(e){d.forEach(r=>r.classList.add("dragging-over")),e.currentTarget.classList.add("dragging")};window.dragCardEnd=function(e){console.log(e.currentTarget),d.forEach(r=>r.classList.remove("dragging-over")),e.currentTarget.classList.remove("dragging")};d.forEach(e=>{e.addEventListener("dragover",function(r){r.preventDefault();const n=document.querySelector(".dragging"),a=u(e,r.clientY);a==null?e.appendChild(n):e.insertBefore(n,a)})});d.forEach(e=>{e.addEventListener("drop",r=>{const n=document.querySelector(".dragging");console.log(n);const a=n.getAttribute("data-id"),t=i.getAllTasks(),s=e.getAttribute("data-status");t.forEach(o=>{o.id===a&&(o.status=s)}),localStorage.setItem("tasks",JSON.stringify(t))})});function u(e,r){return[...e.querySelectorAll(".draggable:not(.dragging)")].reduce((a,t)=>{const s=t.getBoundingClientRect(),o=r-s.top-s.height/2;return o<0&&o>a.offset?{offset:o,element:t}:a},{offset:Number.NEGATIVE_INFINITY}).element}