export default [
	{
		title: 'nav.home',
		url: '/',
		icon: import('@assets/icons/bapharia.svg?raw')
	},
	{
		title: 'nav.classes',
		url: '/classes',
		icon: import('@assets/icons/msq.svg?raw'),
		children: 'classes/'
	},
	{
		title: 'nav.guides',
		url: '/guides',
		icon: import('@assets/icons/guide.svg?raw'),
		children: 'guides/'
	}
];