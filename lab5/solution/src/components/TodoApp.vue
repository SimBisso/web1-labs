<template>
    <div>
        <h2>New Task</h2>
        <input v-model="taskInput" placeholder="Enter task">
        <button v-if="taskInput !== ''" v-on:click="createTask">Save</button>
        <h2>My tasks</h2>
        <task
            v-for="task of tasks"
            v-bind:key="task.id"
            v-bind:task="task"
            v-bind:deleteTask="deleteTask"
            v-bind:updateTask="updateTask"
        >
        </task>
    </div>
</template>

<script>
    import * as api from '@/scripts/api';
    import Task from '@/components/Task';

    export default {
        name: "TodoApp",
        components: {
            Task
        },
        data: () => ({
            taskInput: '',
            tasks: []
        }),

        methods: {
            async createTask() {
                try {
                    const newTask = await api.createTask(this.taskInput);
                    this.taskInput = '';
                    this.tasks.push(newTask);
                } catch (e) {
                    alert(e)
                }
            },

            async deleteTask(id) {
                try {
                    await api.deleteTask(id);
                    const taskIndex = this.tasks.findIndex( task => task.id === id );
                    this.tasks.splice(taskIndex, 1);
                } catch (e) {
                    alert(e)
                }
            },

            async updateTask(id, newName) {
                try {
                    await api.updateTask(id, newName);
                    const taskIndex = this.tasks.findIndex( task => task.id === id );
                    this.tasks[taskIndex].name = newName
                } catch (e) {
                    alert(e);
                }
            }
        },

        async created() {
            try {
                this.tasks = await api.getTasks();
            } catch (e) {
                alert(e);
            }
        }
    }
</script>

<style scoped>

</style>