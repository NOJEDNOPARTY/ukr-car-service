const common = {
	init: () => {
		common.preloader();
		common.main();
		common.animation();
		common.slider();
	},
	preloader: () => window.addEventListener('DOMContentLoaded', () => setTimeout(() => {
		document.body.classList.add('preloaded');
	}, 400)),
	main: () => {
		const body = document.body;
		const header = document.querySelector('.header');
		const headerTopHeight = document.querySelector('.header-top').offsetHeight;
		const setFixedHeader = () => window.scrollY > headerTopHeight
			? header.classList.add('fixed')
			: header.classList.remove('fixed');
		document.addEventListener('scroll', setFixedHeader);
		setFixedHeader();

		const btnSelect = document.querySelectorAll('.btn-select-trigger');
		btnSelect.forEach(btn => btn.addEventListener('click', () => {
			const menu = btn.closest('.btn-select');
			menu.classList.toggle('open');

			document.addEventListener('click', event => {
				if (!menu.contains(event.target) && !btn.contains(event.target))
					menu.classList.remove('open');
			});
		}));

		const menuTrigger = document.querySelectorAll('.menu-trigger');
		menuTrigger.forEach(trigger => trigger.addEventListener('click', () => {
			body.classList.toggle('menu-open');
			header.classList.toggle('open');
			trigger.classList.toggle('open');
		}));

		const accordionTrigger = document.querySelectorAll('.accordion-trigger');
		accordionTrigger.forEach(trigger => {
			trigger.addEventListener('click', () => {
				const container = trigger.closest('.accordion-container');
				const content = container.querySelector('.accordion-content');
				const isActive = container.classList.contains('active');

				document.querySelectorAll('.accordion-container.active').forEach(activeContainer => {
					const activeContent = activeContainer.querySelector('.accordion-content');
					activeContent.style.maxHeight = null;
					activeContainer.classList.remove('active');
				});

				if (!isActive) {
					content.style.maxHeight = content.scrollHeight + "px";
					container.classList.add('active');
				}
			});
		});

		const scrollNext = document.querySelectorAll('.scroll-next');
		scrollNext.forEach(trigger => {
		  trigger.addEventListener('click', () => {
			const currentSection = trigger.closest('section');
			if (currentSection && currentSection.nextElementSibling) {
			  const nextSection = currentSection.nextElementSibling;
			  const top = (nextSection.getBoundingClientRect().top + window.scrollY) - 100;

			  window.scrollTo({ top, behavior: 'smooth' });
			}
		  });
		});
	},
	animation: () => {
		const initializeAnimation = () => {
			const wowEffects = document.querySelectorAll('.wow');
			wowEffects.forEach(trigger => {
				const { wowFadeIn } = trigger.dataset;
				const start = 'top 100%';
				const y = wowFadeIn ? 0 : 50;

				gsap.set(trigger, { opacity: 0, y });
				gsap.to(trigger, {
					opacity: 1,
					y: 0,
					duration: .4,
					delay: 0,
					scrollTrigger: { trigger, start },
					ease: "power2.out"
				});
			});
		};

		initializeAnimation();
	},
	slider: () => {
		const reviewsBlock = document.querySelector('.reviews-slider');
		reviewsBlock && new Splide( '.reviews-slider', {
			perPage : 3,
			perMove: 1,
			pagination: false,
			arrows: true,
			gap: 12,
			breakpoints: {
				992: { perPage : 2 },
				650: { perPage : 1 },
		  	},
		}).mount();
		const teamBlock = document.querySelector('.team-slider');
		teamBlock && new Splide( '.team-slider', {
			perPage : 4,
			perMove: 1,
			pagination: false,
			arrows: true,
			gap: 12,
			breakpoints: {
				992: { perPage : 3 },
				710: { perPage : 2 },
				480: { perPage : 1 },
		  	},
		}).mount();
	},
};

(() => common.init())();
