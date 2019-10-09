<template>
    <div>
        <input v-model="task.name">
        <button v-if="task.name⎄ !== ''" v-on:click="update">Save</button>
        <button v-on:click="deleteTask(task.id)">Delete</button>
    </div>
</template>

<script>
    export default {
        name: "Task",
        props: ['deleteTask', 'updateTask', 'task'],
        methods: {
            async update() {
                await this.updateTask(this.task.id, this.task.name)
            }
        }
    }
</script>

<style scoped>

</style>