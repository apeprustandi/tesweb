<script setup>
import { ref, onMounted } from "vue";

const user = ref(null); // State untuk menyimpan data pengguna
const loading = ref(false); // State untuk loading

// Fungsi untuk mengambil data dari API
const fetchUser = async () => {
  loading.value = true; // Set loading true saat mulai fetch
  try {
    const response = await fetch("https://duniakedol.online/faker/users");
    if (!response.ok) throw new Error("Gagal mengambil data.");
    user.value = await response.json(); // Simpan data ke dalam state
  } catch (error) {
    console.error(error.message);
    user.value = null; // Reset user jika gagal
  } finally {
    loading.value = false; // Set loading selesai
  }
};

// Fungsi untuk menyalin data ke clipboard
const copyUserData = () => {
  if (user.value) {
    const data = `
Nama: ${user.value.nama}
Tanggal Lahir: ${user.value.tgl_lahir}
Email: ${user.value.email}
Phone: ${user.value.phone}
IP Address: ${user.value.ip}
Device ID: ${user.value.deviceId}
`;
    navigator.clipboard.writeText(data)
      .then(() => alert("Data berhasil disalin ke clipboard."))
      .catch(() => alert("Gagal menyalin data."));
  }
};

// Panggil fetchUser saat komponen pertama kali dimuat
onMounted(fetchUser);
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <!-- Tombol Fetch Data -->
    <button
      @click="fetchUser"
      class="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
      :disabled="loading"
    >
      {{ loading ? "Fetching..." : "Update Data" }}
    </button>

    <!-- Loading Indicator -->
    <div v-if="loading && !user" class="text-gray-500">Loading...</div>

    <!-- Card untuk Menampilkan Data -->
    <div v-else-if="user" class="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
      <h2 class="text-xl font-bold mb-2">{{ user.nama }}</h2>
      <p class="text-gray-600 text-sm mb-2">Tanggal Lahir: {{ user.tgl_lahir }}</p>
      <p class="text-gray-600 text-sm mb-2">Email: {{ user.email }}</p>
      <p class="text-gray-600 text-sm mb-2">Phone: {{ user.phone }}</p>
      <p class="text-gray-600 text-sm mb-2">IP Address: {{ user.ip }}</p>
      <p class="text-gray-600 text-sm mb-2">Device ID: {{ user.deviceId }}</p>

      <!-- Tombol Salin Data -->
      <button
        @click="copyUserData"
        class="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
      >
        Salin Data
      </button>
    </div>

    <!-- Error Message Jika Tidak Ada Data -->
    <div v-else class="text-red-500">Gagal memuat data.</div>
  </div>
</template>

<style scoped>
/* Card Styles */
.card {
  background: linear-gradient(to bottom right, #ffffff, #f0f4f8);
  border-radius: 1.5rem; /* 24px */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15), 0 6px 8px rgba(0, 0, 0, 0.1);
}

/* Text Styling */
.card h2 {
  color: #2c3e50;
}

.card p {
  color: #7f8c8d;
}

/* Add subtle borders between details */
.card p:not(:last-child) {
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
