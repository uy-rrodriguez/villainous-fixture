/*
 * (C)Disney Villainous all-vs-all tournament fixture.
 * Copyright (C) 2021. https://github.com/uy-rrodriguez
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

function animateHeader() {
	const header = document.getElementById("header");
	const y = window.scrollY;
	if (y >= 100) {
		header.classList.add("shrink");
		header.classList.remove("grow");
	}
	else {
		header.classList.add("grow");
		header.classList.remove("shrink");
	}
}

function scrollToRound(round, smooth) {
	const roundElem = document.getElementById("round" + round);
	const top = roundElem.offsetTop;
	window.scrollTo({
	  top: top,
	  behavior: (smooth ? "smooth" : "auto")
	});
}