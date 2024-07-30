import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";


const userSlice = createSlice({
    name:"users",
    initialState:userList,
    reducers:{
        addUser:(state,action) => {
            state.push(action.payload)
        },
         updateUser:(state,action) => {
              const{id,name,email} = action.payload;
              const uUser = state.find(user => user.id == id);
              if(uUser){
                uUser.name = name;
                uUser.email = email;
              }
         },
         deleteUser:(state,action) => {
            const{id} = action.payload;
            const uUser = state.find(user => user.id == id);
            if(uUser){
               
               return state.filter(f => f.id !== id);
              }

         }

    }
})
export const{addUser,updateUser,deleteUser} = userSlice.actions
export default userSlice.reducer;