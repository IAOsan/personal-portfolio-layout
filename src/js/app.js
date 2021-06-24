/* eslint-disable no-param-reassign */
const navbar = {
   parent: document.querySelector('.header'),
   container: document.querySelector('.nav'),
   offsetTop: document.querySelector('.nav').offsetTop,
   pageSections: Array.from(document.querySelectorAll('section')),
   links: Array.from(document.querySelectorAll('.nav__link')),
   addClass: function (element, style) {
      element.classList.add(`${style}`);
   },
   removeClass: function (element, style) {
      element.classList.remove(`${style}`);
   },
   findLink: function (id, style) {
      this.links.forEach(link => {
         if (link.textContent === id) {
            this.addClass(link, style);
         } else {
            this.removeClass(link, style);
         }
      });
   },
   changeLiks: function (scroll) {
      // add another section
      const allSections = [
         document.querySelector('header'),
         ...this.pageSections,
      ];
      allSections.forEach(section => {
         // if scroll = to the top edge of the element
         if (scroll >= section.offsetTop - 30) {
            this.findLink(section.id, 'nav__link--change'); // if id == to link text
         }
      });
   },
   position: function (scrollY) {
      //  executes always in scroll
      if (scrollY >= this.offsetTop) {
         // offsetop pos top of the element
         this.addClass(navbar.container, 'u-sticky');
      } else {
         this.removeClass(navbar.container, 'u-sticky');
      }
      this.changeLiks(scrollY);
   },
};
const skills = {
   parent: document.querySelector('.skills'),
   container: document.querySelector('.skills__wrapper'),
   bars: Array.from(document.querySelectorAll('.skills__percent')),
   percents: ['90', '89', '85', '87', '80', '70', '50'],
   percentsText: Array.from(document.querySelectorAll('.skills__textBar span')),
   addPercentage: function (element, percentage) {
      element.style.width = `${percentage}%`;
   },
   showPercent: function () {
      this.percentsText.forEach((element, i) => {
         element.textContent = this.percents[i];
      });
   },
   animateBars: function (scrollY) {
      const parentHeight = this.parent.offsetHeight;
      if (scrollY >= parentHeight / 2) {
         this.bars.forEach((bar, i) => {
            this.addPercentage(bar, this.percents[i]);
         });
      }
   },
};

skills.showPercent();
window.addEventListener('scroll', () => {
   const scrollY = window.pageYOffset; // vertical scroll
   navbar.position(scrollY);
   skills.animateBars(scrollY);
});
