<template>
    <header>
        <!-- <h1>Task Tracker</h1>
         -->
         <h1>{{title}}</h1>
         <Button @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Cancel' : 'Add Task' " :color="showAddTask ? 'red' : 'green' "/>
         
         <!-- <Button text="Update Task" color="blue"/>
         <Button text="Delete Task" color="red"/> -->
    </header>
</template>

<script>
import Button from './Button'
export default ({
    name: 'Header',
    props: {
        title:{
            type:String,
            default: 'Title String'
        },
    showAddTask:Boolean
    },
    components:{
        Button
    }
})
</script>

// Only for this component
<style scoped>
header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;

}
</style>

