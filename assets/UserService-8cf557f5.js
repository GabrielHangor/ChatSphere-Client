import{b4 as a,b1 as e}from"./index-3634b305.js";class c{static async createUser(s){await a.post("/users",s),await e.login({email:s.email,password:s.password})}static async getAllUsers(){const{data:s}=await a.get("/users");return s}static async getUsersByName(s){const{data:t}=await a.get(`/users/${s}`);return t}}export{c as U};