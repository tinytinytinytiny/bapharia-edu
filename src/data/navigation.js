export default [
	{
		title: 'Home',
		url: '/',
		icon: import('@assets/icons/bapharia.svg?raw')
	},
	{
		title: 'World Map',
		url: '/map',
		icon: import('@assets/icons/msq.svg?raw')
	},
	{
		title: 'Guides',
		url: '/guides',
		icon: import('@assets/icons/guide.svg?raw'),
		children: 'guides/'
	},
	{
		title: 'Test',
		url: '/test',
		icon: import('@assets/icons/bapharia.svg?raw')
	}
];