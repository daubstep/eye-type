$(document).ready(function() {
	var KEYBOARDCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split(''),
		KEYBOARD = $("#keyboard-container"),
		count = KEYBOARDCHARS.length * 2;

	$.each(KEYBOARDCHARS, function(i, char) {
        var posX = (0 - 11 * Math.cos(2 * i * Math.PI / count )),
            posZ = (0 - 11 * Math.sin(2 * i * Math.PI / count )),
            char_id = 'char-' + char;
		KEYBOARD.prepend('<a-box class="char-card" id="' + char + '" color="#d3d3d3" look-at="[camera]" width="0.9" height="0.9" depth="0.1" position="' + posX + ' 0 ' + posZ + '"><a-entity mixin="font" text="text: ' + char + '" position="-0.2 -0.25 .05"></a-entity></a-box>');
		var el = document.getElementById(char);
		el.addEventListener("mouseenter", confirmLetter, false);
	});

	function confirmLetter(evt) {
		var text = document.getElementById("charPreview").getAttribute("text").text,
			char = this.getAttribute("id"),
			inputField = document.getElementById("charPreview");
		inputField.setAttribute("text", {text: text + char})
		inputField.setAttribute("position", {x: (0 - text.length/2)  , y: 2, z: -11})
	}

	$('.char-card').on('mouseover', confirmLetter)
});