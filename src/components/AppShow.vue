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
			currentCharacter: null,
		};
	},

	components: {
		axios,
		AppCharacter,
	},

	methods: {
		askQuestion() {
			this.isLoading = true;
			this.isModalOpen = true;

			// Call API for the answer
			this.getAnswer().then(() => {
				this.isLoading = false;
				this.isModalOpen = false;
			});
		},

		getAnswer() {
			return axios
				.post("http://localhost:8000/api/chat", {
					nameCharacter: this.selectCharacter.name,
					action: this.question,
				})
				.then((response) => {
					this.answer = response.data.response;
					this.currentCharacter = this.selectCharacter;
					this.selectedCharacter = null;
					this.question = "";
				});
		},

		selectCharacter(character) {
			this.selectedCharacter = character;
		},

		getImageUrl(imageName) {
			return new URL(this.imageUrl + imageName.image, import.meta.url).href;
		},
	},

	computed: {
		displayedCharacters() {
			if (!this.currentCharacter) {
				return this.store.characters;
			}
			return this.store.characters.filter(
				(character) => character.name === this.currentCharacter.name,
			);
		},
	},
};
</script>

<template>
	<header>
		<div class="header-text">
			<h1>Quote from a Bot</h1>
			<p>
				Seleziona un personaggio, chiedigli cosa fare<br />e leggi la sua
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
			<p>
				Hai scelto {{ selectedCharacter.name }}, cosa vuoi chiedergli di fare?
			</p>
			<input
				type="text"
				v-model="question"
				placeholder="Inserisci la tua domanda qui..." />
			<button @click="askQuestion">Chiedi</button>
		</div>

		<!-- MODAL -->
		<div class="modal" v-if="isModalOpen">
			<!-- SHOWING LOADER -->
			<div class="loading" v-if="isLoading">
				<img src="../assets/images/loader.gif" alt="Loader" />
			</div>
		</div>

		<div v-if="answer">
			<h2>Risposta</h2>
			<p>{{ answer }}</p>
		</div>
	</main>
</template>

<style lang="scss" scoped>
@import "../style.scss";
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
		gap: 1rem;
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
