<template>
    <form>
        <div class="form-group">
            <label class="form-control-label">Question</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i data-feather="help-circle"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Votre question">
            </div>
        </div>
        <div class="mt-4">
            <button type="button" class="btn btn-block btn-primary">Ajouter</button></div>
    </form>
    <!-- Afficher questions exisdtantes -->
</template>

<style scoped>

</style>

<script>
export default class Questions extends Vue {
    questions = [
        "Comment tu t'appelles ?", "Quel âge as-tu ?", "Veux-tu niquer ta mère ?"
    ]
}
</script>