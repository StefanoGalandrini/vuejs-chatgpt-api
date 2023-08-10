<script>
import axios from "axios";
import AppCharacter from "./AppCharacter.vue";
import {store} from "../store";

export default {
	data() {
		return {
			store,
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
					nameCharacter: this.selectedCharacter.name,
					action: this.question,
				})
				.then((response) => {
					this.answer = response.data.response;
					this.currentCharacter = this.selectedCharacter;
					// this.selectedCharacter = null;
					this.question = "";
				});
		},

		selectCharacter(character) {
			this.store.characters.forEach((char) => {
				if (char !== character) {
					char.isHidden = true;
				}
			});
			this.selectedCharacter = character;
		},

		getImageUrl(imageName) {
			return new URL(this.imageUrl + imageName.image, import.meta.url).href;
		},

		resetCharacters() {
			this.store.characters.forEach((character) => {
				character.isHidden = false;
			});
			this.selectedCharacter = null;
			this.answer = "";
			this.question = "";
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
		<div class="characters-container" :class="{noGap: selectedCharacter}">
			<div v-for="character in store.characters" :key="character.name">
				<AppCharacter
					v-if="!character.isHidden"
					:character="character"
					:imageUrl="getImageUrl(character)"
					@selected="selectCharacter" />
			</div>
		</div>

		<div class="question" v-if="selectedCharacter && !answer">
			<p>
				Hai scelto {{ selectedCharacter.name }}, cosa vuoi chiedergli di fare?
			</p>
			<input
				type="text"
				v-model="question"
				placeholder="Inserisci la tua domanda qui..."
				@keyup.enter="askQuestion" />
			<button @click="askQuestion">Chiedi</button>
		</div>

		<!-- MODAL -->
		<div class="modal" v-if="isModalOpen">
			<!-- SHOWING LOADER -->
			<div class="loading" v-if="isLoading">
				<img src="../assets/images/loader.gif" alt="Loader" />
			</div>
		</div>

		<div class="answer" v-if="answer">
			<p>« {{ answer }} »</p>

			<!-- Reset and Start again -->
			<button v-if="answer" @click="resetCharacters">Ricomincia</button>
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
		padding-top: 2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: start;
		gap: 2rem;

		&.noGap {
			gap: 0;
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
}

.question {
	text-align: center;
	max-width: 50%;
	margin-inline: auto;
	font-size: 1.5rem;
	line-height: 2rem;
	margin-bottom: 2rem;

	input {
		width: 50ch;
		margin: 1rem 1rem;
		font-size: 1rem;
		padding: 0.7rem;
		border-radius: 20px;
	}
}

.answer {
	max-width: 50%;
	margin-inline: auto;
	font-size: 1.3rem;
	line-height: 2rem;
	margin-bottom: 2rem;

	p {
		margin: 1.5rem auto;
	}
}

button {
	display: block;
	margin-inline: auto;
	font-size: 1rem;
	border: none;
	padding: 0.7rem 2rem;
	border-radius: 100px;
	background-color: $color-darkgrey;
	color: $color-grey;
	transition: all 200ms;

	&:hover {
		background-color: $color-lightgrey;
		color: white;
		box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.5);
	}
}
</style>
