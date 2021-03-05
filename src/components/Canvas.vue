<template>
  <canvas
    id="shader-container"
    ref="canvas"
    width="500"
    height="500"
  >
  </canvas>
</template>

<script>
import lava from "@/assets/shaders/lava.frag";
import vert from "@/assets/shaders/vertex.vert";

export default {
  name: "Canvas",
  mounted() {
    this.gl = this.$refs.canvas.getContext("webgl");
    const vertex = this.createShader(this.gl.VERTEX_SHADER, vert);
    const fragment = this.createShader(this.gl.FRAGMENT_SHADER, lava);
    this.program = this.createProgram(vertex, fragment);
  },
  methods: {
    createShader(type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      const success = this.gl.getShaderParameter(
        shader,
        this.gl.COMPILE_STATUS
      );
      if (success) {
        return shader;
      }

      console.log(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
    },
    createProgram(vertexShader, fragmentShader) {
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);
      const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
      if (success) {
        return program;
      }

      console.log(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
    }
  }
};
</script>

<style scoped>
</style>
