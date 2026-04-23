# Iluminem — Web estática

Sitio estático en HTML/CSS para Iluminem.

## Estructura
- `index.html`, `productos.html`, `nosotros.html`, `contacto.html`
- `styles.css` — estilos y design tokens
- `script.js` — interacciones
- `assets/` — imágenes y logo

## Uso local
Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
```

## Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```
