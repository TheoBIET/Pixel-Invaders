let App = {
   // Save the default state colors
   defaultColor: "#ccc",
   defaultBorderColor: "#3048AD",
   // Save the current picked colors
   currentColor: null,
   currentBorderColor: null,
   //Available color's Array
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
   //Available color's Array (Darker)
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
      Application's Initialization
   */
   init() {
      const form = document.getElementById("configuration");
      let nbOfCasesPerRow = document.getElementById("nbOfCasesPerRow").value;
      const toolbar = document.getElementById("toolbar");
      const reset = document.getElementById("reset");
      const eraser = document.getElementById("eraser");

      this.generateToolbar();
      this.createDrawField(nbOfCasesPerRow);

      reset.addEventListener("click", () => {
         this.createDrawField(nbOfCasesPerRow);
      });

      toolbar.addEventListener("click", (event) => {
         this.currentColor = event.target.style.backgroundColor;
         this.currentBorderColor = event.target.style.border;
      });

      eraser.addEventListener("click", () => {
         this.currentColor = this.defaultColor;
         this.currentBorderColor = this.defaultBorderColor
      });

      drawField.addEventListener("click", (event) => {
         const TARGET = event.target;
         TARGET.style.backgroundColor = this.currentColor;
         TARGET.style.border = this.currentBorderColor;
      });

      form.addEventListener("change", () => {
         nbOfCasesPerRow = document.getElementById("nbOfCasesPerRow").value;
         this.createDrawField(nbOfCasesPerRow);
      });
   },
   /* 
      Create Draw Field 
   */
   createDrawField(nbOfCasesPerRowParam) {
      const DRAW_FIELD = document.getElementById("drawField");
      const DRAW_FIELD_DEFAULT_WIDTH = 40
      const NUMBER_OF_CASE_PER_ROW = nbOfCasesPerRowParam
      // Empty Draw Field when the number of cases change
      DRAW_FIELD.innerHTML = null;
      // Calcul the Draw Field with the 2px border of all cases
      DRAW_FIELD.style.width = `${DRAW_FIELD_DEFAULT_WIDTH + NUMBER_OF_CASE_PER_ROW * (2 / 16)}em`;
      DRAW_FIELD.style.height = `${DRAW_FIELD_DEFAULT_WIDTH + NUMBER_OF_CASE_PER_ROW * (2 / 16)}em`;
      // Création d'une grille de (nb x nb)
      for (let i = 0; i < Math.pow(NUMBER_OF_CASE_PER_ROW, 2); i++) {
         this.createADrawableDiv(DRAW_FIELD_DEFAULT_WIDTH, NUMBER_OF_CASE_PER_ROW);
      }
      // Show the Draw Field size in range's label
      document.getElementById("nbCases").textContent = `${NUMBER_OF_CASE_PER_ROW}x${NUMBER_OF_CASE_PER_ROW}`
   },
   /*
      Generate all the Draw Field's blocs
   */
   createADrawableDiv(drawFieldWidth, nbOfCasesPerRow) {
      let drawableDiv = document.createElement("div");
      drawableDiv.className = "drawableDiv";
      drawableDiv.style.width = `${drawFieldWidth / nbOfCasesPerRow}em`;
      drawableDiv.style.height = `${drawFieldWidth / nbOfCasesPerRow}em`;
      drawField.appendChild(drawableDiv);
   },
   /*
      Generate the toolbar and insert all of available colors
   */
   generateToolbar() {
      const toolbar = document.getElementById("toolbar");
      const Colors = this.Colors;
      const borderColors = this.borderColors;
      for (i = 0; i < Colors.length; i++) {
         const colorBox = document.createElement("div");
         colorBox.className = "color";
         colorBox.style.backgroundColor = Colors[i];
         colorBox.style.border = `1px solid ${borderColors[i]}`;
         toolbar.appendChild(colorBox);
      }
   },
};

App.init();
