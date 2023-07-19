function calculate() {
  var ageInput = document.getElementById('age');
  var weightInput = document.getElementById('weight');
  var heightInput = document.getElementById('height');
  var headCircumferenceInput = document.getElementById('head-circumference');
  var maleRadio = document.getElementById('m');
  var femaleRadio = document.getElementById('f');
  var resultDiv = document.getElementById('result');

  var age = parseInt(ageInput.value);
  var weight = parseFloat(weightInput.value);
  var height = parseFloat(heightInput.value);
  var headCircumference = parseFloat(headCircumferenceInput.value);
  var gender = maleRadio.checked ? 'boy' : 'girl';

  if (!age || !weight || !height || !headCircumference) {
    resultDiv.textContent = 'Please enter all values.';
    return;
  }

if (age > 12) {
    resultDiv.textContent = 'Please enter a valid age between 1 and 12.month';
    return;
  }
  
  var averageWeight = 0;
  var averageHeight = 0;
  var averageHeadCircumference = 0;

  if (gender === 'boy') {
    averageWeight = [4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6][age - 1];
    averageHeight = [54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7][age - 1];
    averageHeadCircumference = [34.5, 36.6, 38.2, 39.5, 40.7, 41.7, 42.6, 43.4, 44.2, 44.9, 45.6, 46.2][age - 1];
  } else {
    averageWeight = [4.2, 5.1, 5.8, 6.4, 7.0, 7.3, 7.6, 8.0, 8.2, 8.5, 8.7, 9.0][age - 1];
    averageHeight = [53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0][age - 1];
    averageHeadCircumference = [34.1, 35.9, 37.4, 38.6, 39.8, 40.8, 41.7, 42.5, 43.2, 43.9, 44.5, 45.1][age - 1];
  }

  var weightThreshold = averageWeight * 0.1;
  var heightThreshold = averageHeight * 0.1;
  var headCircumferenceThreshold = averageHeadCircumference * 0.1;

  var weightPercentile = calculatePercentile(weight, averageWeight, weightThreshold);
  var heightPercentile = calculatePercentile(height, averageHeight, heightThreshold);
  var headCircumferencePercentile = calculatePercentile(headCircumference, averageHeadCircumference, headCircumferenceThreshold);

  //#region Algorithms
  if (weightPercentile < 10 && headCircumferencePercentile < 10 && heightPercentile < 10) {
    resultDiv.textContent = 'You should go to the doctor.';
  } else {
    // Sonuçları gösterin
    var weightDifference = (weight - averageWeight).toFixed(2);
    var heightDifference = (height - averageHeight).toFixed(2);
    var headCircumferenceDifference = (headCircumference - averageHeadCircumference).toFixed(2);

    if (weight > averageWeight && headCircumference > averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is more than average weight by " + weightDifference + ", head circumference is greater than average by " + headCircumferenceDifference + " cm, and average height is " + heightDifference + " cm";
    }
    else if (weight > averageWeight && headCircumference > averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + (weightDifference) + " more than average weight and head circumference is " + Math.abs(headCircumferenceDifference) + " cm less than average height " + Math.abs(heightDifference) + " cm as little";
    }
    else if (weight > averageWeight && headCircumference < averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is " + (weightDifference) + " more than average weight and head circumference is " + Math.abs(headCircumferenceDifference) + " cm less than average height " + Math.abs(heightDifference) + " cm as many";
    }
    else if (weight > averageWeight && headCircumference < averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + (weightDifference) + " more than average weight and head circumference is " + Math.abs(headCircumferenceDifference) + " cm less than average height " + Math.abs(heightDifference) + " cm as little";
    }

    else if (weight < averageWeight && headCircumference > averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight by " + Math.abs(weightDifference) + ", head circumference is greater than average by " + headCircumferenceDifference + " cm, and height is " + heightDifference + " cm more than average height";
    }

    else if (weight < averageWeight && headCircumference < averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight by " + Math.abs(weightDifference) + " and head circumference is less than the average value by " + Math.abs(headCircumferenceDifference) + " cm and height by " + heightDifference + " cm more than average height ";
    }

    else if (weight < averageWeight && headCircumference < averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight " + Math.abs(weightDifference) + " and head circumference is less than the average value " + Math.abs(headCircumferenceDifference) + " cm less than average height " + Math.abs(heightDifference) + " as little as cm";
    }

    else if (weight > averageWeight && headCircumference == averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is more than average weight by " + (weightDifference) + "";
    }

    else if (weight == averageWeight && headCircumference > averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is more than average head circumference by " + (headCircumference) + "";
    }

    else if (weight == averageWeight && headCircumference == averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is more than average height by " + (heightDifference) + "";
    }

    else if (weight < averageWeight && headCircumference == averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is as small as " + Math.abs(weightDifference) + " average weight ";
    }

    else if (weight == averageWeight && headCircumference < averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is as small as " + Math.abs(headCircumference) + " average head circumference ";
    }

    else if (weight == averageWeight && headCircumference == averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is as small as " + Math.abs(heightDifference) + " average height ";
    }

    //---------------------------------------------------------------------------------------
    else if (weight == averageWeight && headCircumference < averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + " smaller than average height " + Math.abs(heightDifference) + " and " + Math.abs(headCircumferenceDifference) + " less than average head average";
    }

    else if (weight == averageWeight && headCircumference < averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is " + (heightDifference) + " more than average height and " + " less than average head circumference " + Math.abs(headCircumferenceDifference) + " less than cm";
    }

    else if (weight == averageWeight && headCircumference > averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + " smaller than average height " + Math.abs(heightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm more than average";
    }

    else if (weight < averageWeight && headCircumference == averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is less than " + Math.abs(heightDifference) + " than average height " + " and your baby is less than average weight " + Math.abs(weightDifference) + " cm";
    }

    else if (weight < averageWeight && headCircumference == averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is " + " more than average height" + (heightDifference) + " and your baby is less than average weight by " + Math.abs(weightDifference) + " cm";
    }

    else if (weight > averageWeight && headCircumference == averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + " smaller than average height " + (heightDifference) + " and your baby is " + (weightDifference) + " cm higher than average weight";
    }

    //---------------------------------------------------------------------

    else if (weight < averageWeight && headCircumference > averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight " + Math.abs(weightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm more than average height " + Math.abs(heightDifference) + " as little as cm";
    }

    else if (weight < averageWeight && headCircumference > averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight " + Math.abs(weightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm more than average  ";
    }

    else if (weight > averageWeight && headCircumference < averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is more than average weight " + Math.abs(weightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm less than average  ";
    }

    else if (weight < averageWeight && headCircumference < averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is less than average weight " + Math.abs(weightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm less than average  ";
    }

    else if (weight > averageWeight && headCircumference > averageHeadCircumference && height == averageHeight) {
      resultDiv.textContent = "Your baby is more than average weight " + Math.abs(weightDifference) + " and head circumference is " + Math.abs(headCircumferenceDifference) + " cm more than average  ";
    }

    else if (weight < averageWeight && headCircumference == averageHeadCircumference && height < averageHeight) {
      resultDiv.textContent = "Your baby is " + " smaller than average height " + (heightDifference) + " and your baby is " + (weightDifference) + " cm shorter than average weight";
    }

    else if (weight > averageWeight && headCircumference == averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is " + " more than average height " + (heightDifference) + " and your baby is " + (weightDifference) + " cm higher than average weight";
    }

    else if (weight == averageWeight && headCircumference > averageHeadCircumference && height > averageHeight) {
      resultDiv.textContent = "Your baby is " + (heightDifference) + " more than average height and " + " more than average head circumference " + Math.abs(headCircumferenceDifference) + " less than cm";
    }

    else {
      resultDiv.textContent = "Your baby is of average weight, height, and head circumference.";
    }
  }
}
//#endregion

function calculatePercentile(value, averageValue, threshold) {
  if (value > averageValue + threshold) {
    return 100;
  } else if (value < averageValue - threshold) {
    return 0;
  } else {
    var percentile = ((value - (averageValue - threshold)) / (2 * threshold)) * 100;
    return Math.round(percentile);
  }
}


/* Draggle JS Coding Start */

// Select DOM elements
const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

// Global variables for tracking drag events
let isDragging = false, startY, startHeight;

// Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
const showBottomSheet = () => {
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden";
  updateSheetHeight(50);
}

const updateSheetHeight = (height) => {
  sheetContent.style.height = `${height}vh`; //updates the height of the sheet content
  // Toggles the fullscreen class to bottomSheet if the height is equal to 100
  bottomSheet.classList.toggle("fullscreen", height === 100);
}

// Hide the bottom sheet and show body vertical scrollbar
const hideBottomSheet = () => {
  bottomSheet.classList.remove("show");
  document.body.style.overflowY = "auto";
}

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging");
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeight + delta / window.innerHeight * 100;
  updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default 
// height based on the current height of the sheet content
const dragStop = () => {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContent.style.height);
  sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

sheetOverlay.addEventListener("click", hideBottomSheet);
showModalBtn.addEventListener("click", showBottomSheet);

/* Draggle JS Coding End */
