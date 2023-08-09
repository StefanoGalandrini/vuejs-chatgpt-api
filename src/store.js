import { reactive } from "vue";

export const store = reactive({
	characters: [
		{
			name: "Aragorn",
			image: "aragorn.png",
		},
		{
			name: "Arwen",
			image: "arwen.png",
		},
		{
			name: "Galadriel",
			image: "galadriel.png",
		},
		{
			name: "Gandalf",
			image: "gandalf.png",
		},
		{
			name: "Gollum",
			image: "gollum.png",
		},
		{
			name: "Legolas",
			image: "legolas.png",
		},
		{
			name: "Sauron",
			image: "sauron.png",
		},
	],
});
