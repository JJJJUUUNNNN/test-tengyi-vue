import { defineStore } from 'pinia';

export const useMapStore = defineStore({
  id: 'map',
  state: ()=> ({
    color: '#dc143c',
    position: [],
    height: null,
  }),
  getters: {
    
  },
  actions: {
   addPosition(position){
    this.position.push(position)
   },
   setColor(color){
    this.color=color
   }
  },
});
