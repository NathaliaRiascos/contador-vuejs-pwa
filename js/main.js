const app = Vue.createApp({
    data(){
        return {
            title: "Contador App - Vue",
            count: 0,
        }
    },
    methods: {
        modCount(instruction = "add"){
              
            if(this.count > 0 && instruction === 'dis')this.count -= 1;     
            if(instruction === 'add') this.count += 1;      
        }
    }
})