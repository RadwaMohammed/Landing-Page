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
const navbar = document.getElementById('navbar__list');
const allSections = document.querySelectorAll('section');
// Height of the window
const windHeight = window.innerHeight;

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
  return topBoundary < windHeight * 0.4 && topBoundary > windHeight * -0.4  ;
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
		const itemContent = section.dataset.nav;
		// Create li element
    const listItem = document.createElement('li');
    // Using sectionID so the link scroll to the appropriate section
    listItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${itemContent}</a>`;
    fragment.appendChild(listItem);
	}
	menuList.appendChild(fragment);
	return menuList;
};

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
	for (const section of allSections) {
		if (isInViewport(section)) {
			// Add style to section to be clear it is in the viewport
	    addClass(section, 'your-active-class');
	  } else {
	    removeClass(section, 'your-active-class');
	  }
	}
};

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
buildMenu(navbar, allSections);
// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', setActiveSection);




