'use strict';

var doc = window.document;
var dropdownToggleElements = doc.querySelectorAll('[data-toggle="dropdown"]');

// Show a target element when trigger element is clicked then hide targetHide element
function dropdownToggle(trigger, targetShow, targetHide) {
  trigger.onclick = function() {
    console.log('works');
    targetShow.style.display = targetShow.style.display === 'none'? 'block': 'none';
    if (targetHide.style.display === 'block') {
      targetHide.style.display = 'none';
    }
  };
}

// Map all element with data-toggle attribute valued dropdown
if (dropdownToggleElements) {
  for (var i = 0; i < dropdownToggleElements.length; i++) {
    dropdownToggle(
      dropdownToggleElements[i],
      doc.querySelectorAll(dropdownToggleElements[i].dataset.target)[0],
      doc.querySelectorAll(dropdownToggleElements[i].dataset.hide)[0]);
  }
}
