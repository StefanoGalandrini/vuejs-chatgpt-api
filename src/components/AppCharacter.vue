<script>
export default {
	props: ["character", "imageUrl"],

	methods: {
		handleClick() {
			this.$emit("selected", this.character);
		},

		handleClick() {
			this.$emit("selected", this.character);
		},
	},
};
</script>

<template>
	<div class="characters" @click="handleClick">
		<div class="character">
			<div class="image">
				<img :src="imageUrl" :alt="character.name" />
			</div>
		</div>
		<p class="character-name">{{ character.name }}</p>
	</div>
</template>

<style lang="scss" scoped>
@import "../style.scss";

.characters {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1rem;
	cursor: pointer;

	.character {
		width: 8rem;
		height: 8rem;
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
</style>
