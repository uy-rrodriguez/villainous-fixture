/*
 * (C) Disney Villainous all-vs-all tournament fixture.
 * Copyright (C) 2021. uy-rrodriguez.
 * https://github.com/uy-rrodriguez
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function animateHeader() {
	const header = document.getElementById("header");
	const top = header.parentNode;
	const y = window.scrollY;
	if (y >= 100) {
		top.classList.add("shrink");
		top.classList.remove("grow");
	}
	else {
		if (top.classList.contains("shrink")) {
			top.classList.add("grow");
			top.classList.remove("shrink");
		}
	}
}

function scrollToRound(round, smooth) {
	// Delta depending on height of the top banner
	// Round 1 is at the top of the page, so the banner is shown in full
	const delta = round == 1 ? 91 : 49;

	const roundElem = document.getElementById("round" + round);
	const top = roundElem.offsetTop - delta;

	window.scrollTo({
	  top: top,
	  behavior: (smooth ? "smooth" : "auto")
	});
}


let currentSticky;

function stickyPanelHeading() {
	const header = document.getElementById("header");
	const panels = document.getElementsByClassName("panel");
	const y = window.scrollY;
	// const distanceHeaderToHeading = 10;
	for (p of panels) {
		if ((p.offsetTop - y) < header.offsetHeight && (p.offsetTop + p.offsetHeight - y) > header.offsetHeight) {
			let heading = p.querySelector(".panel-heading");

			if (currentSticky != heading) {
				if (currentSticky) {
					// Restore previous heading to normal state
					currentSticky.parentNode.style.paddingTop = null;
					currentSticky.style.top = null;
					currentSticky.classList.remove("sticky");
				}

				// Set this panel heading as sticky
				currentSticky = heading;
		        currentSticky.parentNode.style.paddingTop = currentSticky.offsetHeight + "px"; //header.offsetHeight
				//currentSticky.style.marginTop = 91 + "px";
				currentSticky.classList.add("sticky");

				if (header.parentNode.classList.contains("grow")) {
				    //currentSticky.style.marginTop = 49.5 + "px";
				    //currentSticky.classList.add("sticky-follows-header");
		        }
		        else {
		            //currentSticky.parentNode.style.paddingTop = header.offsetHeight + "px";
		        }
			}
		}
	}

	// Update sticky element's top on scroll
	if (currentSticky) {
		//currentSticky.style.top = (y - currentSticky.parentNode.offsetTop + header.offsetHeight) + "px";
		currentSticky.style.top = (y - currentSticky.parentNode.offsetTop) + "px";
	}
}
