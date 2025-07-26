# Avatar Assets

Folder ini berisi asset gambar untuk avatar.

## Format yang Didukung:
- PNG (statis dan animasi/APNG)
- GIF (animasi)
- SVG (direkomendasikan)
- JPG/JPEG

## Cara Menambahkan Avatar Baru:

1. **Letakkan file gambar** di folder ini
2. **Update `AppearanceContext.jsx`** dengan mapping baru:
   ```javascript
   'ava-03': { 
     src: '/avatars/nama-file.png', 
     name: 'Nama Avatar', 
     type: 'image' 
   }
   ```
3. **Update `ShopPage.jsx`** dengan item baru:
   ```javascript
   { 
     id: 'ava-03', 
     name: 'Avatar "Nama Avatar"', 
     price: 400, 
     icon: '🖼️', // icon untuk preview di shop
     category: 'tampilan', 
     subCategory: 'avatar' 
   }
   ```

## Tips:
- Gunakan ukuran gambar yang konsisten (misal 128x128px)
- Format PNG dengan transparansi untuk hasil terbaik
- GIF untuk animasi sederhana
- SVG untuk avatar yang scalable 