window.onload = function() {

  var KEYBOARDCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split(''),
    KEYBOARD = document.getElementById("keyboard-container"),
    count = KEYBOARDCHARS.length * 2,
    charTemplate = _.template(`<a-box id="<%= char %>" opacity="0.3" look-at="[camera]" width="0.9" height=".9" depth="0.1" position="<%= posX %> 0 <%= posZ %>"><a-entity mixin="font" text="text: <%= char %>" position="-0.2 -0.25 -.2"></a-entity></a-box>`),
    confirmTabTemplate = _.template(`<a-box id="confirm-tab" char="<%= char %>" color="tomato" look-at="[camera]" position="<%= position %>" width=".9" height=".9" depth=".1" opacity="1" </a-box>`);

  KEYBOARDCHARS.forEach(setKey);

  function setKey(char, i) {
    var posX = (0 - 11 * Math.cos(2 * i * Math.PI / count)),
      posZ = (0 - 11 * Math.sin(2 * i * Math.PI / count)),
      compiled = charTemplate({ char: char, posX: posX, posZ: posZ });

    KEYBOARD.insertAdjacentHTML('beforeend', compiled);

    var el = document.getElementById(char);

    el.addEventListener("mouseenter", showConfirm, false);
  }

  function showConfirm(evt) {
    var tab = document.getElementById("confirm-tab"),
      currentChar = this.getAttribute("id");
    var state = this;
    if (!tab) {
      createConfirm(state, currentChar);
    } else if (!!tab && tab.getAttribute("char") != currentChar) {
      deteleConfirmTab();
      createConfirm(state, currentChar);
    }
  }

  function createConfirm(state, char) {
    var pos = state.getAttribute("position"),
      posString = "" + pos.x + " -1 " + pos.z,
      confirmTab = confirmTabTemplate({ char: char, position: posString });
    document.getElementById("keyboard-container").insertAdjacentHTML('beforeend', confirmTab);
    document.getElementById("confirm-tab").addEventListener("mouseenter", confirmLetter);
  }

  function confirmLetter(evt) {
    var char = this.getAttribute("char"),
      inputField = document.getElementById("charPreview"),
      chars = document.getElementById("charPreview").getAttribute("text").text;
    inputField.setAttribute("text", { text: chars + char })
    inputField.setAttribute("position", { x: (0 - chars.length / 2), y: 2, z: -11 });
    deteleConfirmTab();
  }

  function deteleConfirmTab() {
    var tab = document.getElementById("confirm-tab")
    document.getElementById("keyboard-container").removeChild(tab);
  }
};
