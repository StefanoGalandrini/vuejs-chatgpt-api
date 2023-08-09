<script>
import axios from "axios";
import AppCharacter from "./AppCharacter.vue";
import {store} from "../store";

export default {
	data() {
		return {
			store,
			character: "",
			question: "",
			answer: "",
			selectedCharacter: null,
			isLoading: false,
			isModalOpen: false,
			imageUrl: "../assets/images/",
		};
	},

	components: {
		axios,
		AppCharacter,
	},

	methods: {
		getAnswer() {
			axios
				.post("http://localhost:8000/api/chat", {
					nameCharacter: this.character,
					action: this.question,
				})
				.then((response) => {
					this.answer = response.data.response;
				});
			return this.answer;
		},

		selectCharacter(character) {
			this.selectedCharacter = character;
		},

		getImageUrl(imageName) {
			return new URL(this.imageUrl + imageName.image, import.meta.url).href;
		},
	},
};
</script>

<template>
	<!-- <div class="container">
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
		<p>{{ answer }}</p>
	</div> -->

	<header>
		<div class="header-text">
			<h1>Quote from a Bot</h1>
			<p>
				Seleziona un personaggio, chiedigli cosa fare<br />e ascolta la sua
				risposta
			</p>
		</div>
	</header>

	<main>
		<div class="characters-container">
			<AppCharacter
				v-for="character in this.store.characters"
				:key="character.name"
				:character="character"
				:imageUrl="getImageUrl(character)"
				@selected="selectCharacter" />
		</div>

		<div v-if="selectedCharacter">
			<p>Hai scelto {{ selectedCharacter.name }}, qual è la tua domanda?</p>
			<input
				type="text"
				v-model="question"
				placeholder="Inserisci la tua domanda qui..." />
			<button @click="askQuestion">Chiedi</button>
		</div>

		<!-- LOADER -->
		<div class="loading" v-if="isLoading">
			<img src="../assets/images/loader.gif" alt="Loader" />
		</div>

		<!-- MODAL -->
		<div class="modal" v-if="isModalOpen">
			<div class="modal-box">
				<button class="modal-close" @click="closeModal">X</button>
				<div class="modal-content">
					<h2></h2>
					<p></p>
					<code></code>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap");

// Variables
$color-darkred: #620000;
$color-bgred: #7c3e3e;
$color-lightred: #9e8f8f;
$color-grey: #8c8cdf;
$color-overlay: rgba(197, 177, 123, 0.8);

// Reset
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

// General
html {
	font-family: "Space Grotesk", sans-serif;
	background-color: $color-bgred;
	color: $color-darkred;
}

// Header
header {
	background-color: $color-grey;
	color: $color-darkred;

	.header-text {
		max-width: 50vw;
		margin: 0 auto;
		text-align: center;
		padding: 1.5rem;
	}
}

// Main
main {
	background-color: $color-bgred;
	color: white;

	.characters-container {
		max-width: 60vw;
		margin-inline: auto;
		padding: 2rem 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: start;
		gap: 2rem;
	}

	.characters {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
		cursor: pointer;

		.character {
			width: 10rem;
			height: 10rem;
			background-color: $color-lightred;
			border: 2px solid $color-darkred;
			border-radius: 50%;
			overflow: hidden;
		}

		.image {
			overflow: hidden;

			img {
				width: 100%;
			}
		}
	}
}

// Loader
.loading {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $color-overlay;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 100px;
	}
}

.loading-hidden {
	display: none;
}

// Modal
.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $color-overlay;
	color: $color-darkred;
	z-index: 999;

	h2 {
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.modal-box {
		position: relative;
		background-color: #ffffff;
		padding: 20px;
		border: 2px solid $color-darkred;
		max-width: 35rem;
		margin: 1.5rem auto;
	}

	.modal-close {
		background-color: $color-grey;
		height: 36px;
		width: 36px;
		border-radius: 50%;
		border: 2px solid $color-darkred;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		position: absolute;
		top: 12px;
		right: 12px;
	}
}

.modal-hidden {
	display: none;
}
</style>
