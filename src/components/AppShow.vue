<script>
import axios from "axios";
export default {
	data() {
		return {
			character: "",
			question: "",
			message: "",
		};
	},

	components: {
		axios,
	},

	methods: {
		getAnswer() {
			axios
				.post("http://localhost:8000/api/chat", {
					nameCharacter: this.character,
					action: this.question,
				})
				.then((response) => {
					this.message = response.data.response;
				});
			console.log(this.message);
		},
	},
};
</script>

<template>
	<div class="container">
		<div class="input-charachter">
			<label>Personaggio: </label>
			<input
				v-model="character"
				placeholder="Inserisci il nome del personaggio" />
		</div>
		<div>
			<label>Domanda: </label>
			<input v-model="question" placeholder="Cosa vuoi chiedere?" />
		</div>
		<button @click="getAnswer">Ottieni Risposta</button>
		<p>{{ message }}</p>
	</div>
</template>

<style></style>
