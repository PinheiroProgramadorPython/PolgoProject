<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import apiBase from "../services/api";


const map = ref(null);
const ganhadores = ref([]);
const totalPorEstado = ref({});


const estadosCoords = {
  AC: [-9.0238, -70.812],
  AL: [-9.5713, -36.782],
  AM: [-3.4168, -65.8561],
  AP: [1.4142, -51.6022],
  BA: [-12.9714, -41.55],
  CE: [-5.4984, -39.3206],
  DF: [-15.7998, -47.8645],
  ES: [-19.1834, -40.3089],
  GO: [-15.827, -49.8362],
  MA: [-4.9609, -45.2744],
  MG: [-18.5122, -44.555],
  MS: [-20.7722, -54.7852],
  MT: [-12.6819, -56.9211],
  PA: [-3.79, -52.478],
  PB: [-7.239, -36.7819],
  PE: [-8.8137, -37.091],
  PI: [-7.7183, -42.7289],
  PR: [-24.89, -51.55],
  RJ: [-22.9, -43.2],
  RN: [-5.7945, -36.354],
  RO: [-10.83, -63.34],
  RR: [2.05, -61.4],
  RS: [-30.0346, -53.09],
  SC: [-27.33, -50.5],
  SE: [-10.9, -37.07],
  SP: [-22.19, -48.79],
  TO: [-10.1753, -48.298],
};

onMounted(async () => {
  map.value = L.map("map").setView([-15.78, -47.93], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    minZoom: 4,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);

  const response = await axios.get(`${apiBase}/ganhadores`);
  ganhadores.value = response.data;

  
  totalPorEstado.value = ganhadores.value.reduce((acc, g) => {
    const uf = g.estado?.toUpperCase();
    if (!acc[uf]) acc[uf] = { total: 0, nomes: [] };
    acc[uf].total++;
    acc[uf].nomes.push(g.nome);
    return acc;
  }, {});

 
  for (const [uf, info] of Object.entries(totalPorEstado.value)) {
    const coords = estadosCoords[uf];
    if (!coords) continue;

    const marker = L.circleMarker(coords, {
      radius: Math.min(10 + info.total, 25),
      fillColor: "#007bff",
      color: "#004a99",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    }).addTo(map.value);

    marker.bindPopup(`
      <strong>${uf}</strong><br>
      <b>Total:</b> ${info.total}<br>
      <b>Ganhadores:</b><br>${info.nomes.slice(0, 5).join("<br>")}
      ${info.nomes.length > 5 ? "<br><em>e mais...</em>" : ""}
    `);
  }
});
</script>

<template>
  <section class="d-flex mx-5 mb-5">
    <div>
      <h2 class="text-center mb-3">Mapa dos Ganhadores por Estado</h2>
      <div id="map" style="height: 50rem; width: 40rem;" class="rounded"></div>
    </div>

    <div class="container mt-4 text-center">
      <h4>Totalizadores por Estado</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <div
          v-for="(info, uf) in totalPorEstado"
          :key="uf"
          class="border p-3 rounded shadow-sm text-center"
        >
          <strong>{{ uf }}</strong><br />
          {{ info.total }} ganhador(es)
        </div>
      </div>
    </div>
  </section>
</template>
