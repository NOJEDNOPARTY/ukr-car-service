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
		const setFixedHeader = () => window.scrollY > 0
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
		// const storyYearsBlock = document.querySelector('.story-years-slider');
		// const storySlider = storyYearsBlock && new Splide(storyYearsBlock, {
		// 	direction: 'ttb',
		// 	pagination: false,
		// 	arrows: false,
		// 	autoHeight: true,
		// 	heightRatio: 1,
		// 	wheel: true,
		// 	releaseWheel: true,
		// }).mount();
	},
};

(() => common.init())();
