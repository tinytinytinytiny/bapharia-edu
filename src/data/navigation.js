export default [
	{
		title: 'nav.home',
		url: '/',
		icon: import('@assets/icons/home.svg?raw')
	},
	{
		title: 'nav.classes',
		url: '/classes',
		icon: import('@assets/icons/double-sword.svg?raw'),
		children: 'classes/'
	},
	{
		title: 'nav.guides',
		url: '/guides',
		icon: import('@assets/icons/info.svg?raw'),
		children: 'guides/'
	}
];