const canvas = document.getElementById('canvas');
const gridElementsInput = document.getElementById('grid-input-elm');
const canvasSizeLabel = document.querySelectorAll('.canvas-size-label');
const colorInput = document.getElementById('color-picker');
const toolBtn = document.querySelectorAll('.color-btn');
const clearBtn = document.getElementById('clear-btn');

document.addEventListener('DOMContentLoaded', () => {
  canvasResize();

  gridElementsInput.addEventListener('click', (e) => {
    canvasResize(e.target.value);

    canvasSizeLabel.forEach((num) => {
      num.innerText = `${e.target.value}`
    });
  });

  toolBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      for (let i = 0; i < toolBtn.length; i++) {
        if (toolBtn[i] == e.target) {
          toolBtn.forEach((btn) => {
            btn.classList.remove('btn-selected')
          })
  
          toolBtn[i].classList.add('btn-selected');
        }
      }
    });
  });
});

function canvasResize (sizeValue = 2) {
  const canvasNewSize = (sizeValue * sizeValue);
  canvas.innerHTML = "";

  for (let i = 0; i < canvasNewSize; i++) {
    canvas.innerHTML += `<div class="grid-element"></div>`;

    document.querySelectorAll('.grid-element').forEach((element) => {
      element.addEventListener('click', () => {
        paintGridElement(element);
      })

      clearBtn.addEventListener('click', () => {
        clearCanvas (document.querySelectorAll('.grid-element'));
      });
    });
  }

  const gridElements = document.querySelectorAll('.grid-element');
  const gridElementSize = ((canvas.offsetWidth) / sizeValue);

  gridElements.forEach((element) => {
    element.setAttribute('style', `width: ${gridElementSize}px; height: ${gridElementSize}px`);
  });
}

function paintGridElement (element) {
  let color;

  if (toolBtn[0].classList.contains('btn-selected')) {
    color = colorInput.value
  } else if (toolBtn[1].classList.contains('btn-selected')) {
    color = randomColor();
  } else if (toolBtn[2].classList.contains('btn-selected')) {
    color = "#fff"
  }

  element.style.backgroundColor = color;
}

function randomColor () {
  let color = "";

  for (let i = 0; i < 3; i++) {
    const sub = Math.floor(Math.random() * 256).toString(16);

    color += (sub.length == 1 ? "0" + sub : sub);
  }

  return "#" + color;
}

function clearCanvas (elements) {
  elements.forEach((element) => {
    element.style.backgroundColor = "#fff";
  });
}