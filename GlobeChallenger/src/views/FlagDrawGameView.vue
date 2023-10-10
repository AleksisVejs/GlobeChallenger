<template>
  <div class="flag-draw-game">
    <div class="main-draw-div" :class="{ 'blur-effect': !isDrawing }">
      <div class="flag-desc-div">
        <h1>
          Draw the flag of <span id="country-name-span">{{ countryName }}</span>
        </h1>
      </div>
      <div class="canvas-container">
        <canvas id="cursor" ref="cursor" width="500" height="300"></canvas>
        <canvas
          id="canvas"
          ref="canvas"
          width="500"
          height="300"
          style="
            border: 1px solid #a3ffb3;
            box-shadow: 0px 0px 10px 0px #a3ffb3;
          "
        ></canvas>
      </div>
      <div class="tools-container">
        <div class="brush-size-div">
          <input
            type="range"
            id="brush-size-slider"
            class="brush-size-slider"
            min="1"
            max="100"
            v-model="brushSize"
          />
        </div>
        <input type="color" id="color" v-model="brushColor" />
      </div>
      <div class="operation-button">
        <button id="undo-button" @click="undo">
          <font-awesome-icon icon="undo" />
          Undo
        </button>
        <button id="redo-button" @click="redo">
          <font-awesome-icon icon="redo" />
          Redo
        </button>
      </div>
      <div class="drawing-buttons">
        <button id="clear-button" @click="clearCanvas">
          <font-awesome-icon icon="trash" />
          Clear
        </button>
        <button id="submit-button" @click="submitDrawing">
          <font-awesome-icon icon="check" />
          Submit
        </button>
        <button id="desc-button" @click="showFlagDesc">
          <font-awesome-icon icon="info-circle" />
          Flag Desc.
        </button>
      </div>
    </div>
    <FlagDescription v-if="flagDescription" :flagDesc="flagDesc" />
    <FlagComparison
      v-if="!isDrawing"
      :usersFlag="flag"
      :countryFlag="countryFlag"
      :countryName="countryName"
      @close="isDrawing = true"
    />
  </div>
</template>

<script>
import { fabric } from "fabric";
import axios from "axios";
import FlagDescription from "../components/FlagDescription.vue";
import FlagComparison from "../components/FlagComparison.vue";

export default {
  name: "FlagDrawGameView",
  components: {
    FlagDescription,
    FlagComparison,
  },
  data() {
    return {
      countryName: "",
      flagDesc: "",
      flagDescription: false,
      countryFlag: "",
      flag: "",
      canvas: null,
      isDrawing: true,
      brushSize: 10,
      brushColor: "#ffffff",
      undoneActions: [],
      canvasStates: [],
      mousecursor: new fabric.Circle({
        radius: 10,
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 2,
        left: 0,
        top: 0,
        originX: "center",
        originY: "center",
        opacity: 0.3,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
      }),
    };
  },

  methods: {
    fetchCountry() {
      axios
        .get(
          "https://restcountries.com/v3.1/independent?status=true&fields=name,flags"
        )
        .then((response) => {
          const randomCountry =
            response.data[Math.floor(Math.random() * response.data.length)];
          this.countryName = randomCountry.name.common;
          this.flagDesc = randomCountry.flags.alt;
          this.countryFlag = randomCountry.flags.svg;
        });
    },

    showFlagDesc() {
      this.flagDescription = !this.flagDescription;
    },

    clearCanvas() {
      const canvasData = this.canvas.toDatalessJSON();
      this.canvasStates.push(canvasData);
      this.canvas.clear();

      this.canvas.add(this.mousecursor);
      this.canvas.renderAll();
    },

    submitDrawing() {
      this.isDrawing = false;
      this.flag = this.canvas.toDataURL();
      this.flagDescription = false;
    },

    updateBrushColor() {
      this.canvas.freeDrawingBrush.color = this.brushColor;
    },

    updateCursorSize() {
      var size = parseInt(this.brushSize);
      this.canvas.freeDrawingBrush.width = size;
      this.mousecursor.set({
        radius: size / 2,
      });
      this.mousecursor.setCoords();
      this.canvas.renderAll();
    },

    redo() {
      if (this.undoneActions.length > 0) {
        const lastUndoneAction = this.undoneActions.pop();
        this.canvas.add(lastUndoneAction);
        this.canvas.renderAll();
      }
    },

    undo() {
      const canvas = this.canvas;
      const filteredObjects = canvas._objects.filter(
        (object) => object !== this.mousecursor
      );

      if (filteredObjects.length > 0) {
        const lastItem = filteredObjects[filteredObjects.length - 1];
        this.undoneActions.push(lastItem);
        canvas.remove(lastItem);
        canvas.renderAll();
      }
      if (this.canvasStates.length > 0) {
        const canvasStateToUndo = this.canvasStates.pop();
        this.canvas.loadFromJSON(canvasStateToUndo);
      }
    },
  },

  mounted() {
    this.fetchCountry();
    this.canvas = new fabric.Canvas(this.$refs.canvas, {
      isDrawingMode: true,
      selection: false,
      freeDrawingCursor: "none",
    });

    this.canvas.freeDrawingBrush.width = this.brushSize;
    this.canvas.freeDrawingBrush.color = this.brushColor;

    this.canvas.add(this.mousecursor);

    this.canvas.on("mouse:move", (event) => {
      const mouse = this.canvas.getPointer(event.e);
      this.mousecursor.left = mouse.x;
      this.mousecursor.top = mouse.y;
      this.canvas.bringToFront(this.mousecursor);
      this.mousecursor.setCoords();
      this.canvas.renderAll();
    });

    this.canvas.on("mouse:down", () => {
      this.mousecursor.setCoords();
      this.canvas.renderAll();
    });

    this.canvas.on("mouse:up", () => {
      this.mousecursor.setCoords();
      this.canvas.renderAll();
    });
  },

  watch: {
    brushSize() {
      this.updateCursorSize();
    },
    brushColor() {
      this.updateBrushColor();
    },
    isDrawing() {
      if (this.isDrawing) {
        this.fetchCountry();
        this.flag = "";
        this.flagDescription = false;
        this.canvas.clear();
      }
    },
  },
};
</script>

<style>
.flag-draw-game {
  position: relative;
  color: #f1f1f1;
  text-shadow: 0 0 7px #ffffff67;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  z-index: 1;
}

.main-draw-div {
  width: 700px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 50px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
}

.canvas-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.color-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.tools-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.brush-size-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.brush-size-slider {
  width: 200px;
}

.drawing-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.drawing-buttons button {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  margin: 10px;
}

#country-name-span {
  color: #a3ffb3;
  text-shadow: 0 0 7px #a3ffb3;
}

.operation-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-bottom: 10px;
}

.operation-button button {
  width: 70px;
  height: 30px;
}

.blur-effect {
  filter: blur(5px);
}

#cursor {
  position: absolute;
  z-index: 2;
  pointer-events: none !important;
}
</style>
