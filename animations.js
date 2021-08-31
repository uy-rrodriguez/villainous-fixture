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