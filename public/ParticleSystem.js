/*****************************************************/
/**  Author: Chris A Vaccarello						**/
/**  Description:  A particle system for browsers 	**/
/**  Date: 6/16/16									**/
/**  Version: 1.0									**/
/**  Compatibility: FF, Chrome, IE7 and up			**/
/*****************************************************/

/**
 * Create a ParticleSystem object
 * @param {Object} cfg - Override for settings variable
 * @constructor
 */
var ParticleSystem = function ParticleSystem(cfg) {
	// aliases
	var This = this;

	/**
	 * Default settings for the entire particle system
	 * @type {Object}
	 * @property {Number} timeout - time between update intervals of entire particle system
	 * @property {Object} emitter - emitter specific settings
	 * @property {String} emitter.id - string to use to find emitter in list
	 * @property {constructor} emitter.constructor - reference to class (Ex: ParticleEmitter)
	 * @property {Boolean} emitter.active - turn emitter on/off initially
	 * @property {Number} emitter.max_particles - how many particle the emitter can emit
	 * @property {String} emitter.spawn_point - spawn point ('center' of given element, 'random' position inside element, 'none' top-left corner of given element)
	 * @property {jQuery} emitter.element - jquery element from which to spawn particles at
	 * @property {Object|Number} emitter.emit_delay - time between particle emissions (can be a single number value)
	 * @property {Number} emitter.emit_delay.min
	 * @property {Number} emitter.emit_delay.max
	 * @property {Object} emitter.direction - direction to emit particle in degrees
	 * @property {Number} emitter.direction.min - random min in degrees (0)
	 * @property {Number} emitter.direction.max - random max in degrees (360)
	 * @property {Object} emitter.offset - spawn point offset
	 * @property {Number} emitter.offset.x
	 * @property {Number} emitter.offset.y
	 * @property {Object} emitter.particle - particle specific settings
	 * @property {constructor} emitter.particle.constructor - reference to class (Ex: Particle)
	 * @property {jQuery} emitter.particle.append_to - an element to add particles to
	 * @property {String} emitter.particle.template - an html string that will be the particle
	 * @property {Number} emitter.particle.time_to_live - how long each particle will live in seconds
	 * @property {Number} emitter.particle.speed - how fast particles will move based on elapsed time in pps (pixels per second)
	 * @property {Number} emitter.particle.size - number to incrementally increase width & height by based on elapsed time in pps (pixels per second)
	 */
	var settings = $.extend(
		true,
		{
			timeout: 30,

			emitter: {
				id: '',
				constructor: ParticleEmitter,
				active: false,
				max_particles: 100,
				spawn_point: 'center',
				element: $('.p-emitter'),
				emit_delay: { min: 100, max: 100 },
				direction: { min: 0, max: 360 },
				offset: { x: 0, y: 0 },

				particle: {
					constructor: Particle,
					append_to: $('body'),
					template:
						'<div style="width: 5px; height: 5px; background-color: red; z-index: 2;"></div>',
					time_to_live: 2000,
					speed: 10,
					size: 0,
				},
			},
		},
		cfg
	);

	// array of particle emitter classes
	var particleEmitters = [];

	// initialize particle system
	var init = function () {
		// immediately start particle system infinite loop
		window.setInterval(update, settings.timeout);
	};

	// update the particle system by updating all the emitters
	var update = function () {
		var emitter;
		for (var i = 0; i < particleEmitters.length; i++) {
			emitter = particleEmitters[i];
			emitter.update();
		}
	};

	/**
	 * Find and return the emitter index in array; either by id (string) or value (number)
	 * @param id {String|Number} - id of an emitter in a list
	 * @returns {Number}
	 */
	var findEmitterIndex = function (id) {
		var eLength = particleEmitters.length;
		var emitterIndex = eLength;

		if (typeof id === 'string') {
			var matchFound = false;
			for (var e = 0; e < eLength; e++) {
				if (particleEmitters[e].id == id) {
					emitterIndex = e;
					matchFound = true;
					break;
				}
			}
		}

		if (!matchFound && console && console.error) {
			console.error('no emitter could be found for "' + id + '"');
		} else if (typeof id === 'number') {
			if (id < eLength) {
				emitterIndex = id;
			} else if (console && console.error) {
				console.error(
					'no emitter could be found at index "' + id + '"'
				);
			}
		}

		return emitterIndex;
	};

	/**
	 * find emitter in list given id (string) or index (number)
	 * @param id {String|Number} - id of an emitter in a list
	 * @see ParticleEmitter
	 * @returns {class} - a reference to the emitter class in list (Ex: ParticleEmitter)
	 */
	var getEmitter = function (id) {
		return particleEmitters[findEmitterIndex(id)];
	};

	/**
	 * Add a particle emitter to the emitter list
	 * @param {Object} [options] - optional settings of emitter
	 * @see ParticleEmitter
	 * @returns {class} - a reference to the newly created emitter class (Ex: ParticleEmitter)
	 */
	this.addEmitter = function (options) {
		// extend a copy of emitter if a cfg is given, else use default settings
		var emitter_settings = options
			? $.extend(true, $.extend(true, {}, settings.emitter), options)
			: settings.emitter;

		// OPTIMIZATION: convert direction in degrees to radians
		var radians = Math.PI / 180;
		emitter_settings.direction.min =
			emitter_settings.direction.min * radians;
		emitter_settings.direction.max =
			emitter_settings.direction.max * radians;

		// OPTIMIZATION: adjust speed & size to be in milliseconds (instead of pps - pixels per second)
		if (emitter_settings.particle.speed !== 0)
			emitter_settings.particle.speed /= 1000;
		if (emitter_settings.particle.size !== 0)
			emitter_settings.particle.size /= 1000;

		// create a Emitter object
		var Emitter = new emitter_settings.constructor(emitter_settings);

		// add emitter to array
		particleEmitters.push(Emitter);
		return Emitter;
	};

	/**
	 * Trigger emitter
	 * @param id {String|Number} - the emitter to trigger (string id or index number)
	 * @param [amt] {Number} - the length of time to trigger the emitter for
	 * @param callback {Function} - function to call when completed
	 */
	this.triggerEmitter = function (id, amt, callback) {
		var Emitter = getEmitter(id);
		Emitter.trigger(amt, callback);
	};

	/**
	 * find & toggle an emitter (on/off)
	 * @param id {String|Number} - the emitter to trigger
	 */
	this.toggleEmitter = function (id) {
		var Emitter = getEmitter(id);
		Emitter.toggle();
	};

	/**
	 * remove emitter from list using it's class ID (string) or index (number)
	 * @param [id] {String|Number} - optional ID, either a string or number
	 */
	this.removeEmitter = function (id) {
		var index = findEmitterIndex(id);
		particleEmitters[index].remove(); // call emitters remove function to clear DOM
		particleEmitters.splice(index, 1); // remove emitter from array
	};

	init();
};

/**
 * Create a ParticleEmitter object
 * @param {Object} settings
 * @constructor
 */
var ParticleEmitter = function ParticleEmitter(settings) {
	// aliases
	var This = this;

	/******************************************************************************************************************
	 **  PUBLIC VARIABLES
	 **************************************************************************************************************** */
	/**
	 * unique id of emitter (used to identify emitter in list of emitters)
	 * @type String
	 */
	this.id = settings.id;

	/**
	 * unique id of emitter (used to identify emitter in list of emitters)
	 * @type Boolean
	 */
	this._active = settings.active;

	/**
	 * Array of particle classes
	 * @type {Particle}
	 */
	this.particles = [];

	/**
	 * the element this emitter is attached to
	 * @type jQuery
	 */
	this.$element = settings.element;

	// width & height of $element
	this.width = this.$element.outerWidth();
	this.height = this.$element.outerHeight();

	/******************************************************************************************************************
	 **  PRIVATE VARIABLES
	 **************************************************************************************************************** */
	// remember timeout for trigger callback (to clear when toggling)
	var triggerCallback;

	// initial spawn point offset and position of emitter
	var spawn_position = {};

	// total delay amount
	var delay = 0;

	// elapsed time
	var time = new Date();
	var elapsed_time = time.getTime();

	/**
	 * Initialize Emitter
	 */
	var init = function () {
		// set spawn point relative to element (page offset comes in later, this is for dynamic particles, aka move with $element)
		if (settings.spawn_point == 'center') {
			// set point at center of $element + any additional offset
			spawn_position = {
				x: settings.offset.x + This.width / 2,
				y: settings.offset.y + This.height / 2,
			};
		} else {
			// set point at custom position, default to top-left corner of emitter element - aka (0, 0)
			spawn_position = { x: settings.offset.x, y: settings.offset.y };
		}
	};

	/******************************************************************************************************************
	 **  PUBLIC FUNCTIONS
	 **************************************************************************************************************** */
	// update emitter by updating all of it's particles and create/remove particles
	this.update = function () {
		var now = new Date();
		elapsed_time = now - time;
		time = now;

		// cap elapsed time (for slower computers)
		// TODO: instead of capping elapsed time, find a way to optimize for the computer (remove particles, cap max particles, increase time between emissions, etc.)
		if (elapsed_time > 500) {
			if (console && console.log) {
				console.log(
					'Particle System: Cap elapsed_time at 500 (was ' +
						elapsed_time +
						')'
				);
			}
			elapsed_time = 500;
		}

		// only create particles if emitter is active/on
		if (This._active) {
			This.createParticles(elapsed_time);
		}

		// update & remove particles based on the particles Time To Live (TTL) value
		This.updateParticles(elapsed_time);

		// reset elapsed timer
		elapsed_time = time.getTime();
	};

	/**
	 * Update and remove particles based on the particles Time To Live (TTL)
	 * @param {Number} elapsed_time
	 */
	this.updateParticles = function updateParticles(elapsed_time) {
		var p;
		for (var i = 0; i < This.particles.length; i++) {
			p = This.particles[i];
			p.update(elapsed_time);

			// call particles remove function to remove element from DOM then remove particle class from particle array
			if (p.getTTL() <= 0) {
				p.remove();
				This.particles.splice(i, 1);
				i--;
			}
		}
	};

	/**
	 * Return how much time has elapsed since the last call to this classes update method
	 * @returns {number}
	 */
	this.getElapsedTime = function getElapsedTime() {
		return elapsed_time;
	};

	/**
	 * Calculate & Return the global spawn position of particle
	 * @returns {{x: number, y: number}}
	 */
	this.getParticleSpawnPosition = function () {
		var eOffset = This.$element.offset();
		var spawn_point = {
			x: eOffset.left + spawn_position.x,
			y: eOffset.top + spawn_position.y,
		};

		if (settings.spawn_point == 'random') {
			spawn_point.x += Math.randomInt(0, This.width);
			spawn_point.y += Math.randomInt(0, This.height);
		}

		return spawn_point;
	};

	/**
	 * Create & append a particle given spawn_point and direction
	 * @param {Object} spawn_point - global coordinates to create particle at
	 * @param {Number} spawn_point.x
	 * @param {Number} spawn_point.y
	 * @param {Number} [direction] - direction in degrees, for particle to move
	 */
	this.addParticle = function addParticle(spawn_point, direction) {
		// if no direction was given, create a random direction based on settings
		if (!direction) {
			var range = settings.direction.max - settings.direction.min;
			direction = Math.random() * range + settings.direction.min;
		}

		// create a particle and append it to list
		This.particles.push(
			new settings.particle.constructor(
				settings.particle,
				spawn_point,
				direction
			)
		);
	};

	/**
	 * Create as many particles as the emit_delay & max_particles settings will allow
	 * @param {Number} elapsed_time
	 */
	this.createParticles = function createParticles(elapsed_time) {
		// find the emitters exact position to spawn particles at for this update call (changes per update if random)
		var spawn_point = This.getParticleSpawnPosition();

		// calculate the emit_delay amount for this update call (either a random amount between min/max or a standard number)
		var emit_delay =
			settings.emit_delay.min || settings.emit_delay.max
				? Math.random() *
						(settings.emit_delay.max - settings.emit_delay.min) +
				  settings.emit_delay.min
				: settings.emit_delay;

		// create as many particles as the delay & max particle count will allow based on time since last update
		if (This.particles.length < settings.max_particles) {
			delay -= elapsed_time;
			while (delay <= 0) {
				delay += emit_delay;

				// create & append a particle at the given global coordinates and the direction (in degrees)
				This.addParticle(spawn_point);
			}
		}
	};

	/**
	 * Trigger this emitter for some amount of time
	 * @param amt {Number} - how long to emit particles for
	 * @param callback {Function|Callback} - function to call when completed
	 */
	this.trigger = function (amt, callback) {
		// set this emitter to active state
		This._active = true;

		// setup a delay callback to disable the emitter
		triggerCallback = window.setTimeout(function () {
			This._active = false;
			if (callback) {
				callback.call();
			}
		}, amt);
	};

	// Turn this emitter on/off
	this.toggle = function () {
		This._active = !This._active;

		// clear call back when toggling
		if (triggerCallback) {
			window.clearTimeout(triggerCallback);
		}
	};

	// Remove all the particles from this emitter so the emitter itself can be removed
	this.remove = function () {
		var p;
		for (var i = 0; i < This.particles.length; i++) {
			p = This.particles[i];
			p.remove();
			This.particles.splice(i, 1);
			i--;
		}
	};

	init();
};

/**
 * Create a Particle object
 * @param settings
 * @param {Object} spawn_point - x, y spawn point of particle
 * @param {Number} spawn_point.x - x position
 * @param {Number} spawn_point.y - y position
 * @param {Number} direction - direction in radians of particle
 * @constructor
 */
var Particle = function Particle(settings, spawn_point, direction) {
	// aliases
	var This = this;

	/******************************************************************************************************************
	 **  PUBLIC VARIABLES
	 **************************************************************************************************************** */
	/**
	 * particle DOM element
	 * @type jQuery
	 */
	this.$element;

	// shortcuts for coordinates, direction, speed, & size of particle
	this.coordinates = { x: spawn_point.x, y: spawn_point.y };
	this.speed = settings.speed;
	this.size = settings.size;
	this.width = null;
	this.height = null;

	/******************************************************************************************************************
	 **  PRIVATE VARIABLES
	 **************************************************************************************************************** */
	// OPTIMIZATION: move amount based on speed and direction
	var moveX = This.speed * Math.cos(direction);
	var moveY = This.speed * -Math.sin(direction);

	// how long the particle will exist before it's removal
	var ttl = settings.time_to_live;

	var init = function () {
		// create a DOM object given a template
		This.$element = $(settings.template).css('visibility', 'hidden');

		// append particle element to an element on the page
		This.$element.appendTo(settings.append_to);

		// get width and height of element for positioning purposes
		This.width = This.$element.width();
		This.height = This.$element.height();

		// convert the global spawn_point coordinates into their appropriate local coordinates
		var local_coords = settings.append_to.offset();
		This.coordinates = {
			x: This.coordinates.x - local_coords.left,
			y: This.coordinates.y - local_coords.top,
		};

		// setup some initial values for the particle, such as position absolute and make visible
		This.$element.css({
			position: 'absolute',
			top: This.coordinates.y - This.height / 2 + 'px',
			left: This.coordinates.x - This.width / 2 + 'px',
			visibility: 'visible',
		});
	};

	/******************************************************************************************************************
	 **  PUBLIC FUNCTIONS
	 **************************************************************************************************************** */
	/**
	 * @param {Number} elapsed_time - how long since the emitter/particle was last updated
	 */
	this.update = function (elapsed_time) {
		// adjust particles time to live value (life time)
		This.reduceTTL(elapsed_time);

		// adjust particles coordinates
		This.move(elapsed_time);

		// adjust width & height based on size increase/decrease setting
		This.width += This.size * elapsed_time;
		This.height += This.size * elapsed_time;

		// update/render element
		This.$element.css({
			top: This.coordinates.y - This.width / 2 + 'px',
			left: This.coordinates.x - This.height / 2 + 'px',
			width: This.width + 'px',
			height: This.height + 'px',
		});
	};

	/**
	 * Get this particles remaining Time To Live
	 * @returns {Number}
	 */
	this.getTTL = function () {
		return ttl;
	};

	/**
	 * reduce the particles life based on elapsed time
	 * @param elapsed_time
	 */
	this.reduceTTL = function (elapsed_time) {
		ttl -= elapsed_time;
	};

	/**
	 * moves particle based on speed, direction, and elapsed time
	 * @param elapsed_time
	 */
	this.move = function (elapsed_time) {
		This.coordinates.x += moveX * elapsed_time;
		This.coordinates.y += moveY * elapsed_time;
	};

	// Remove this particle element from the DOM
	this.remove = function () {
		This.$element.remove();
	};

	init();
};
