<script>
import L from "leaflet";
import apiBase from "../services/api";

export default {
  data() {
    return {
      mapa: null,
      usuarioMarker: null,
      lojaMarker: null,
      lojas: [],
      lojasComCoordenadas: [],
    };
  },

  async mounted() {
    this.mapa = L.map("map").setView([-22.37, -46.94], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(this.mapa);

    await this.carregarLojas();
  },

  methods: {
    async carregarLojas() {
      try {
        const res = await fetch(`${apiBase}/lojas`);
        const data = await res.json();
        this.lojas = data;

        for (const loja of this.lojas) {
          const enderecoCompleto = `${loja.endereco}, ${loja.cidade}, ${loja.estado}`;
          const geo = await this.buscarCoordenadas(enderecoCompleto);
          if (geo) {
            this.lojasComCoordenadas.push({
              ...loja,
              lat: parseFloat(geo.lat),
              lng: parseFloat(geo.lon),
            });
          }
        }

        this.lojasComCoordenadas.forEach((loja) => {
          L.marker([loja.lat, loja.lng])
            .addTo(this.mapa)
            .bindPopup(`<strong>${loja.nome}</strong><br>${loja.endereco}`);
        });
      } catch (e) {
        console.error("Erro ao carregar lojas:", e);
        alert("Erro ao carregar lista de lojas!");
      }
    },

    async buscarCoordenadas(endereco) {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          endereco
        )}&format=json&limit=1`;
        const res = await fetch(url, {
          headers: { "User-Agent": "vue-mapa-lojas" },
        });
        const data = await res.json();
        return data[0];
      } catch {
        return null;
      }
    },

    mostrarMaisProxima() {
      if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização!");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          if (this.usuarioMarker) this.mapa.removeLayer(this.usuarioMarker);
          this.usuarioMarker = L.marker([userLat, userLng])
            .addTo(this.mapa)
            .bindPopup("Você está aqui")
            .openPopup();

          let lojaMaisProxima = null;
          let menorDistancia = Infinity;

          this.lojasComCoordenadas.forEach((loja) => {
            const dist = this.calcularDistancia(userLat, userLng, loja.lat, loja.lng);
            if (dist < menorDistancia) {
              menorDistancia = dist;
              lojaMaisProxima = loja;
            }
          });

          if (!lojaMaisProxima) {
            alert("Nenhuma loja encontrada com coordenadas válidas!");
            return;
          }

          if (this.lojaMarker) this.mapa.removeLayer(this.lojaMarker);
          this.lojaMarker = L.marker([lojaMaisProxima.lat, lojaMaisProxima.lng])
            .addTo(this.mapa)
            .bindPopup(`Loja mais próxima: ${lojaMaisProxima.nome}`)
            .openPopup();

          this.mapa.fitBounds([
            [userLat, userLng],
            [lojaMaisProxima.lat, lojaMaisProxima.lng],
          ]);
        },
        () => alert("Não foi possível obter sua localização!")
      );
    },

    calcularDistancia(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
          Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
  },
};
</script>

<template>
<div class="my-5 mx-5 d-flex justify-content-center align-items-center">
    <div class="me-5">
        <button @click="mostrarMaisProxima" class="btn btn-primary">Mostrar loja mais próxima</button>
    </div>
    <div id="map" style="height: 30rem; width: 30rem;" class="rounded"></div>
</div>
</template>
