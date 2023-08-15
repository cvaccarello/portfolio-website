import Route from '@ember/routing/route';

var chart_options = {
	elements: {
		point: {
			radius: 4,
		},
	},
	scale: {
		color: '#ff0000',
		gridLines: {
			color: '#D8D8D8',
		},
		angleLines: {
			color: '#D8D8D8',
		},
		ticks: {
			min: 0,
			max: 10,
		},
	},
	legend: {
		display: false,
	},
};

var my_skills = [
	{
		labels: [
			'Javascript',
			'HTML',
			'CSS',
			'PHP',
			'Java',
			'Node',
			'C++',
			'C#',
			'Python',
			'SQL',
			'NOSQL',
		],
		datasets: [
			{
				backgroundColor: 'rgba(158,122,194,0.2)',
				borderColor: 'rgba(158,122,194,1)',
				pointBackgroundColor: 'rgba(158,122,194,1)',
				pointBorderColor: 'rgba(255,255,255,1)',
				pointHoverBackgroundColor: 'rgba(255,255,255,1)',
				pointHoverBorderColor: 'rgba(158,122,194,1)',
				data: [9, 10, 10, 2, 3, 9, 3, 2, 4, 5, 5],
			},
		],
		options: chart_options,
	},
	{
		labels: [
			'Electron',
			'Express',
			'Ember',
			'Backbone',
			'React',
			'Bootstrap',
			'Selenium',
			'Handlebars',
		],
		datasets: [
			{
				backgroundColor: 'rgba(46,109,176,0.2)',
				borderColor: 'rgba(46,109,176,1)',
				pointBackgroundColor: 'rgba(46,109,176,1)',
				pointBorderColor: 'rgba(255,255,255,1)',
				pointHoverBackgroundColor: 'rgba(255,255,255,1)',
				pointHoverBorderColor: 'rgba(46,109,176,1)',
				data: [10, 8, 3, 4, 3, 4, 4, 9],
			},
		],
		options: chart_options,
	},
	{
		labels: [
			'Git',
			'Balsamiq',
			'WebStorm',
			'Jira',
			'Confluence',
			'Slack',
			'Asana',
			'Google',
		],
		datasets: [
			{
				backgroundColor: 'rgba(98,156,68,0.2)',
				borderColor: 'rgba(98,156,68,1)',
				pointBackgroundColor: 'rgba(98,156,68,1)',
				pointBorderColor: 'rgba(255,255,255,1)',
				pointHoverBackgroundColor: 'rgba(255,255,255,1)',
				pointHoverBorderColor: 'rgba(98,156,68,1)',
				data: [10, 9, 9, 6, 6, 8, 5, 8],
			},
		],
		options: chart_options,
	},
];

// array of organization history
var my_history = [
	{
		name: 'Brandgage LLC',
		title: 'Lead Full Stack Developer',
		date: {
			from: 2016,
			to: 2023,
		},
		accomplishments: [
			'Lead a small team of developers to create web & desktop applications for clients, using Node & Electron',
			'Created 3D websites using a variety of performance enhancing tricks for maximum cross-environment & cross-browser compatibility',
			'Worked heavily with project management using Asana, Slack, and Harvest',
		],
	},
	{
		name: 'Wombat Security Technologies',
		title: 'Front End Developer / UI Designer',
		date: {
			from: 2012,
			to: 2016,
		},
		accomplishments: [
			'Created mockups, prototypes, and designs for numerous web apps and other interactive UI components; guided by agile processes.',
			'Created initial Automated QA Framework; built on top of Selenium for visual front end testing.',
			'Created responsive front end Interactive Cybersecurity Training Courses.',
			'Applied 508 Compliant HTML.',
			'Gathered user feedback to improve designs.',
			'Heavy use of numerous Atlassian products, primarily Jira & Confluence.',
		],
	},
	{
		name: 'TwoCastle Software',
		title: 'Software Engineer (Unpaid Internship)',
		date: {
			from: 2010,
			to: 2012,
		},
		accomplishments: [
			'Constructed 3D spaceship and weapon models in Blender, graphics included.',
			'Created OpenGL shaders.',
			'Programmed scripts for Blender to export 3D models.',
			'Created mockups for game play and features.',
		],
	},
	{
		name: 'Shawnee State University',
		title: 'College Graduate',
		date: {
			from: 2007,
			to: 2012,
		},
		accomplishments: [
			"Bachelor's Degree in Game Programming & Design.",
			'Studied C++, C#, Python, Java, Javascript, HTML, & CSS.',
			'Created Game in Python, called "Disintegris"; a Tetris-like game.',
			'Developed an educational AI contest game in Python for Shawnee State University’s Artificial Intelligence class.  Students would compete to program a better AI spaceship using a variety of unique techniques.',
		],
	},
	{
		name: 'Pine-Richland High School',
		title: 'High School Graduate',
		date: {
			from: 2003,
			to: 2007,
		},
		accomplishments: [
			'Started studying C++, PHP, Javascript, HTML, & CSS.',
			'Studied QBasic freshman year',
			'Created an educational HTML and JavaScript board game; this game taught Anglo-Saxon literature and medieval culture.',
		],
	},
];

export default class Index extends Route {
	model() {
		return {
			my_skills,
			my_history,
		};
	}
}
