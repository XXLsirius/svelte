export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/certificates": [3],
		"/certificates/certificate-edit/type=[type]&id=[id]&certificateTypeId=[certificateTypeId]&shipId=[shipId]&personId=[personId]": [4],
		"/charterers": [5],
		"/components": [6],
		"/components/card": [7],
		"/components/carousel": [8],
		"/components/checkbox-and-input": [9],
		"/components/file-attachement": [10],
		"/components/label-group": [11],
		"/components/modal": [12],
		"/components/search-input": [13],
		"/components/select": [14],
		"/components/table": [16],
		"/components/tab": [15],
		"/mariner": [17],
		"/mariner/mariner-create/id=[id]": [18],
		"/mariner/mariner-detail/id=[id]": [19],
		"/shipping": [23],
		"/shipping/shipping-create/id=[id]": [24],
		"/shipping/shipping-detail/id=[id]": [25],
		"/shipping/shipping-history": [26],
		"/ship": [20],
		"/ship/ship-create/id=[id]": [21],
		"/ship/ship-detail/id=[id]": [22],
		"/sign-in": [27],
		"/sign-up": [28],
		"/typeofcertificate": [29],
		"/waterareas": [30]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';