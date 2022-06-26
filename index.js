//setting up canvas first
let canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

let ctx = canvas.getContext("2d")
ctx.lineWidth = 20

let prevX = null
let prevY = null

let draw = false

let lineWidth = 10;
const toolbar = document.getElementById('lineWidth');


// getting api color data from Crayola
// used locally due to cors issue with other apis

  function getRandomColor (){
 
    let response = fetch("crayola.json")
      .then((response) => response.json())
      .then((data) => {
      console.log('Success:', data);
      //going through array to select random color
      for(i = 0; i < data.length; i++)
      var random_color = data[Math.floor(
      Math.random() * data.length)];
    
    //setting random value to swatch element
    var x = document.getElementById('clr');
    x.style.backgroundColor = random_color.hex;
    console.log(random_color);
    let colChange = random_color.hex;
    console.log(colChange);
          
    //change color in drawing pen
    ctx.strokeStyle = colChange;

    //title change in html element
    document.getElementById("colTitle").innerHTML = `"${random_color.name}"`;
    document.getElementById("colTitle").style.color = colChange;
    })
    }
    getRandomColor();
  
// make button refresh page to get random new color
  const refreshButton = document.querySelector('.choose');
  const refreshPage = () => {
  location.reload();
}
refreshButton.addEventListener('click', refreshPage);

// making clear and save buttons work

let clearBtn = document.querySelector(".clear")
    clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save")
  saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png")
  let a = document.createElement("a")
  a.href = data
  a.download = "sketch.png"
  a.click()
})

//toolbar
toolbar.addEventListener('change', e => {
  if(e.target.id === 'stroke') {
  ctx.strokeStyle = e.target.value;
  }
  if(e.target.id === 'lineWidth') {
  lineWidth = e.target.value;
  }
});

// listening for mouse event to draw 

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)
window.addEventListener("mousemove", function(e){
    if(prevX == null || prevY == null || !draw){
      prevX = e.clientX
      prevY = e.clientY
      return
    }
    let mouseX = e.clientX
    let mouseY = e.clientY
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    prevX = e.clientX
    prevY = e.clientY
})
