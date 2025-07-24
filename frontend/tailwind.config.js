/** @type {import('tailwindcss').Config} */
export default {
  // Tentukan file mana yang akan dipindai oleh Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // PENTING: Aktifkan dark mode dengan class strategy
  darkMode: 'class',
  theme: {
    extend: {
      // Anda bisa menambahkan custom colors untuk tema di masa depan
      colors: {
        // Contoh untuk tema galaxy nantinya
        'galaxy': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#6366f1',
          900: '#312e81',
        }
      }
    },
  },
  plugins: [],
}