import { reactive } from "vue";

export const store = reactive({
	characters: [
		{
			name: "Aragorn",
			image: "aragorn.png",
			isHidden: false,
		},
		{
			name: "Arwen",
			image: "arwen.png",
			isHidden: false,
		},
		{
			name: "Frodo",
			image: "frodo.png",
			isHidden: false,
		},
		{
			name: "Galadriel",
			image: "galadriel.png",
			isHidden: false,
		},
		{
			name: "Gandalf",
			image: "gandalf.png",
			isHidden: false,
		},
		{
			name: "Gollum",
			image: "gollum.png",
			isHidden: false,
		},
		{
			name: "Legolas",
			image: "legolas.png",
			isHidden: false,
		},
		{
			name: "Sauron",
			image: "sauron.png",
			isHidden: false,
		},
	],
});
