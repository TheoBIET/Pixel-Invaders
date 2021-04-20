let App = {
   defaultColor: "#ccc",
   defaultBorderColor: "#3048AD",
   currentColor: null,
   currentBorderColor: null,
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
   // TODO Item Gomme qui redonnerai la couleur à la la drawableDiv choisie
   init() {
      const form = document.getElementById("configuration");
      let nbOfCasesPerRow = document.getElementById("nbOfCasesPerRow").value;
      let casesSize = document.getElementById("casesSize").value;
      const toolbar = document.getElementById("toolbar");
      const reset = document.getElementById("reset");
      const eraser = document.getElementById("eraser");

      this.generateToolbar();
      this.createDrawField(casesSize, nbOfCasesPerRow);

      reset.addEventListener("click", () => {
         this.createDrawField(casesSize, nbOfCasesPerRow);
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
         casesSize = document.getElementById("casesSize").value;
         this.createDrawField(casesSize, nbOfCasesPerRow);
      });
   },
   createDrawField(casesSizeParam, nbOfCasesPerRowParam) {
      const drawField = document.getElementById("drawField");
      // TODO Revoir si on ne peut pas améliorer la conversion des 2 pixels de bordure * nbOfCasesPerRowParam pour toutes les valeurs rem possible
      drawField.style.width = `${
         casesSizeParam * nbOfCasesPerRowParam + nbOfCasesPerRowParam * (2 / 16)
      }em`;
      drawField.style.height = `${
         casesSizeParam * nbOfCasesPerRowParam + nbOfCasesPerRowParam * (2 / 16)
      }em`;

      drawField.innerHTML = "";
      for (let i = 0; i < Math.pow(nbOfCasesPerRowParam, 2); i++) {
         this.createADrawableDiv(casesSizeParam);
      }
   },
   createADrawableDiv(casesSize) {
      let drawableDiv = document.createElement("div");
      drawableDiv.className = "drawableDiv";
      drawableDiv.style.width = `${casesSize}em`;
      drawableDiv.style.height = `${casesSize}em`;
      drawField.appendChild(drawableDiv);
   },
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
