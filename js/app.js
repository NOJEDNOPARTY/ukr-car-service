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

		const questions = document.querySelectorAll('.faq-question');
		questions.forEach(q => q.addEventListener('click', () => {
			const item = q.closest('.faq-item');
			const answer = item.querySelector('.faq-answer');
			const isActive = item.classList.contains('active');

			document.querySelectorAll('.faq-item').forEach(i => {
				i.classList.remove('active');
				i.querySelector('.faq-answer').style.maxHeight = null;
			});

			if (!isActive) {
				item.classList.add('active');
				answer.style.maxHeight = answer.scrollHeight + "px";
			}
		}));

		const scrollNext = document.querySelectorAll('.scroll-next');
		scrollNext.forEach(trigger => {
		  trigger.addEventListener('click', () => {
			const section = trigger.closest('section');
			const top = section ? (section.getBoundingClientRect().bottom + window.scrollY) : 0;

			window.scrollTo({ top, behavior: 'smooth' });
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
