let App = {
   // Saving the default color
   defaultColor: "#eee",
   defaultBorderColor: "#000",
   // Save the currently selected color
   currentColor: null,
   currentBorderColor: null,
   // Array of available colors
   Colors: [
      "#FF0000",
      "#800000",
      "#FFA500",
      "#FFFF00",
      "#808000",
      "#00FF00",
      "#008000",
      "#00FFFF",
      "#008080",
      "#0000FF",
      "#000080",
      "#FF00FF",
      "#800080",
      "#fff",
      "#000",
      "#bbb",
   ],
   // Array of available colors (Darker)
   borderColors: [
      "#8a0000",
      "#470000",
      "#a76d01",
      "#b6b600",
      "#444400",
      "#009400",
      "#004400",
      "#00a3a3",
      "#004d4d",
      "#00008b",
      "#00004b",
      "#9e009e",
      "#410041",
      "#fff",
      "#000",
      "#aaa",
   ],

   /* 
      Creating a drawing area
   */
   createDrawField(nbOfCasesPerRowParam) {
      const DRAW_FIELD = document.getElementById("drawField");
      const DRAW_FIELD_DEFAULT_WIDTH = 40;
      const NUMBER_OF_CASE_PER_ROW = nbOfCasesPerRowParam;
      // Empty Draw Field when the number of cases change
      DRAW_FIELD.innerHTML = null;
      // Calcul the Draw Field with the 2px border of all cases
      DRAW_FIELD.style.width = `${
         DRAW_FIELD_DEFAULT_WIDTH + NUMBER_OF_CASE_PER_ROW * (2 / 16)
      }em`;
      DRAW_FIELD.style.height = `${
         DRAW_FIELD_DEFAULT_WIDTH + NUMBER_OF_CASE_PER_ROW * (2 / 16)
      }em`;
      // Création d'une grille de (nb x nb)
      for (let i = 0; i < Math.pow(NUMBER_OF_CASE_PER_ROW, 2); i++) {
         this.createADrawableDiv(
            DRAW_FIELD_DEFAULT_WIDTH,
            NUMBER_OF_CASE_PER_ROW
         );
      }
      // Show the Draw Field size in range's label
      document.getElementById(
         "nbCases"
      ).textContent = `${NUMBER_OF_CASE_PER_ROW}x${NUMBER_OF_CASE_PER_ROW}`;
   },

   /*
         Generate all the Draw Field's blocs
   */
   createADrawableDiv(drawFieldWidth, nbOfCasesPerRow) {
      // Creation of each cells
      const DRAWABLE_DIV = document.createElement("div");
      const DRAW_FIELD = document.getElementById("drawField");
      DRAWABLE_DIV.className = "drawableDiv";
      DRAWABLE_DIV.style.width = `${drawFieldWidth / nbOfCasesPerRow}em`;
      DRAWABLE_DIV.style.height = `${drawFieldWidth / nbOfCasesPerRow}em`;
      // Adding the cell in the drawing area
      DRAW_FIELD.appendChild(DRAWABLE_DIV);
   },

   /*
         Generate the toolbar and insert all of available colors
   */
   generateToolbar() {
      const TOOLBAR = document.getElementById("toolbar");
      const COLORS = this.Colors;
      const BORDER_COLORS = this.borderColors;
      for (i = 0; i < COLORS.length; i++) {
         const colorBox = document.createElement("div");
         colorBox.className = "color";
         colorBox.style.backgroundColor = COLORS[i];
         colorBox.style.border = `1px solid ${BORDER_COLORS[i]}`;
         TOOLBAR.appendChild(colorBox);
      }
   },

   /*
      Initialization of the application
   */
   init() {
      const FORM = document.getElementById("configuration");
      const TOOLBAR = document.getElementById("toolbar");
      const RESET = document.getElementById("reset");
      const ERASER = document.getElementById("eraser");
      const DRAW_FIELD = document.getElementById("drawField");
      let nbOfCasesPerRow = document.getElementById("nbOfCasesPerRow").value;

      // DOM generation (Toolbar & Drawing area)
      this.generateToolbar();
      this.createDrawField(nbOfCasesPerRow);

      // DOM Reset button
      RESET.addEventListener("click", () => {
         this.createDrawField(nbOfCasesPerRow);
      });

      // Eraser management (Return to initial state)
      ERASER.addEventListener("click", () => {
         this.currentColor = this.defaultColor;
         this.currentBorderColor = this.defaultBorderColor;
      });

      // Dynamic change of the number of available cells
      FORM.addEventListener("change", () => {
         nbOfCasesPerRow = document.getElementById("nbOfCasesPerRow").value;
         this.createDrawField(nbOfCasesPerRow);
      });

      // Storage of the selected color
      TOOLBAR.addEventListener("click", (event) => {
         this.currentColor = event.target.style.backgroundColor;
         this.currentBorderColor = event.target.style.border;
      });

      let mouseIsDown = false;
      let timeout = null;
      DRAW_FIELD.addEventListener("mousedown", (event) => {
         mouseIsDown = true;
         const TARGET = event.target;
         TARGET.style.backgroundColor = this.currentColor;
         TARGET.style.border = this.currentBorderColor;
      });

      DRAW_FIELD.addEventListener("mouseover", (event) => {
         timeout = setTimeout(() => {
            if (mouseIsDown) {
               const TARGET = event.target;
               TARGET.style.backgroundColor = this.currentColor;
               TARGET.style.border = this.currentBorderColor;
            }
         }, 10);
      });

      DRAW_FIELD.addEventListener("mouseup", () => {
         mouseIsDown = false;
         clearTimeout(timeout);
      });

      DRAW_FIELD.addEventListener("mouseleave", () => {
         mouseIsDown = false;
         clearTimeout(timeout);
      });
   },
};

window.onload = () => {
   App.init();
};
