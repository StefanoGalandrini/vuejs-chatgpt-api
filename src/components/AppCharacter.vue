<script>
export default {
	props: ["character", "imageUrl"],

	methods: {
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

<style></style>
