/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
// Navigation bar
const navbar = document.getElementById('navbar__list');
// All Sections in the document
const allSections = document.querySelectorAll('section');
// Header containing navbar
const header = document.querySelector('.page__header');
// To top button
const toTop = document.querySelector('.to__top__btn');
// Height of the window
const windHeight = window.innerHeight;
// Used for setTimeout Id
let scrollTimer = null;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// Adding class(es) to an element
const addClass = (elem, ...classToAdd) => {
  const styles = [...classToAdd];
  for (const style of styles) {
    elem.classList.add(style);
  }
};

// Removing class(es) from an element
const removeClass = (elem, ...classToRemove) => {
  const styles = [...classToRemove];
  for (const style of styles) {
    elem.classList.remove(style);
  }
};

// Check if the element in the viewport
const isInViewport = elem => {
	// Get the element top coordinate
  const topBoundary = elem.getBoundingClientRect().top;
  // 0.4 works good without overlapping sections
  return topBoundary < windHeight * 0.4 && topBoundary > windHeight * -0.6  ;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
/*
 * Dynamically create a navigation menu based on the sections of the page
 * menuList - The ul that will contians the list items
 * sections - NodeList  of all sections in the page
*/
const buildMenu = (menuList, sections) => {
	// Using DocumentFragment to improve performance
	const fragment = document.createDocumentFragment();
	// Loop and create list items
	for (const section of sections) {
		// ID of each section used for the anchor
		const sectionId = section.id;
		// Dataset used to populate li
		const content = section.dataset.nav;
		// Create li element
    const listItem = document.createElement('li');
    // Anchor element for list item
    const anchorElem = `<a class="menu__link" href="#${sectionId}">${content}</a>`;
    listItem.innerHTML = anchorElem;
    fragment.appendChild(listItem);
	}
	menuList.appendChild(fragment);
	return menuList;
};

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
	for (const section of allSections) {
		// Section Id
		const sectionId = section.getAttribute('id');
		// The nav item that links to the section id
		const navItem = document.querySelector(`a[href="#${sectionId}"]`);
		if (isInViewport(section)) {
			// Add style to section to be clear it is in the viewport
	    addClass(section, 'active');
	    // Add style to the nav item correspond to the section in the viewport
	    addClass(navItem, 'menu__link__active');
	  } else {
	    removeClass(section, 'active');
	    removeClass(navItem, 'menu__link__active');
	  }
	}
	// Show to top btn when scroll below the fold of the page
  window.pageYOffset > windHeight / 2 ?
  	addClass(toTop, 'show__btn')
  	: removeClass(toTop, 'show__btn');
};

// Scroll to anchor ID using scrollTO event
/*
* Listener function to the click event of each anchor in the nave menu
* Event delegation using (evt) - Event object and its (target) property
* to avoid many events
*/
const scrollToSection = evt => {
	// Using (nodeName) property to verify target is the desired element
	if (evt.target.nodeName === 'A') {
		// Prevent the default action from occurring
		evt.preventDefault();
		// The targeted section id
    const anchorId = evt.target.getAttribute('href');
    // Using scrollTo event to scroll smoothly to the targeted section
    window.scrollTo({
    	top: document.querySelector(anchorId).offsetTop,
    	behavior: 'smooth'
    });
  }
};

// Scroll to top
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior:'smooth'
	});
};

// Hide fixed navigation bar while not scrolling
/*
* Set a timer in scroll event
* If another scroll event fired then reset the timer
* When the timer fire, then it is supposed that scrolling has stopped
*/
const hideNav = () => {
	if(scrollTimer !== null) {
		// Reset the timer
    clearTimeout(scrollTimer);
    removeClass(header, 'hide__header');
  }
  scrollTimer = setTimeout(() => {
  	// Hide navbar when not scrolling
  	addClass(header, 'hide__header');
  	// Show navbar when on the top of page and before reach sections
  	if (window.pageYOffset < windHeight * 0.4) {
  		removeClass(header, 'hide__header')
  	}
  }, 1000);
};

/**
 * End Main Functions
 * Begin Events
 *
*/
// Build menu
buildMenu(navbar, allSections);

// Scroll to section on link click
navbar.addEventListener('click', scrollToSection);

// Scroll to top on to-top btn click
toTop.addEventListener('click', scrollToTop);

/* Event for scroll and using a delay
 * to reduce the frequency of scrolling events fired
*/
setTimeout( () => {
	document.addEventListener('scroll', () => {
  	// Set sections as active
    setActiveSection();
    // Hide nav while not scrolling
    hideNav();
  });
}, 10);