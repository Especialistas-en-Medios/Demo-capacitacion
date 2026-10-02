# 🚀 Demo de Capacitación Git & GitHub

¡Bienvenidos a la práctica de Git y GitHub! En este ejercicio aprenderás el flujo de trabajo colaborativo profesional: clonar, crear ramas, realizar commits con buenas prácticas, registrar cambios y abrir un **Pull Request (PR)**.

---

## 📂 Estructura del Proyecto

```text
├── index.html        # Página principal con el grid (id="profiles")
├── style.css         # Estilos visuales listos para las tarjetas
├── script.js         # Lógica para cargar e inyectar perfiles dinámicamente
└── profiles/         # Directorio donde cada dev creará su perfil
    └── template.html # Plantilla base de ejemplo
```

---

## 🎯 Objetivo del Ejercicio

Cada desarrollador creará su propia **tarjeta de presentación** con su nombre, foto (o avatar), puesto, biografía, tecnologías y enlaces de contacto, y la integrará en el grid principal de [index.html](file:///c:/Users/deves/Documents/DESARROLLO_EM/Demo-capacitacion/index.html).

---

## 🛠️ Guía Paso a Paso para el Alumno

### 1. Clonar el repositorio
Abre tu terminal y clona el proyecto:
```bash
git clone <URL_DEL_REPOSITORIO>
cd Demo-capacitacion
```

### 2. Crear tu propia rama de trabajo
**Nunca trabajes directamente sobre `main`**. Crea una rama con tu nombre:
```bash
git checkout -b feature/perfil-tu-nombre
```
*(Ejemplo: `git checkout -b feature/perfil-juan-perez`)*

### 3. Crear tu tarjeta de perfil
1. Entra a la carpeta `profiles/`.
2. Duplica el archivo [template.html](file:///c:/Users/deves/Documents/DESARROLLO_EM/Demo-capacitacion/profiles/template.html) y renómbralo con tu nombre:
   ```text
   profiles/tu-nombre.html
   ```
   *(Ejemplo: `profiles/juan-perez.html`)*
3. Abre tu nuevo archivo en tu editor de código y modifica los datos de ejemplo:
   - Tu nombre
   - Foto o avatar (puedes usar URLs de [UI Avatars](https://ui-avatars.com/) o una imagen pública)
   - Rol o especialidad
   - Breve descripción
   - Tecnologías que dominas o te interesan
   - Enlaces a GitHub, LinkedIn o correo

> 💡 **Tip:** Puedes hacer doble clic en tu archivo `profiles/tu-nombre.html` para abrirlo en el navegador y previsualizar cómo va quedando tu tarjeta de forma individual.

### 4. Registrar tu tarjeta en la página principal
Abre [script.js](file:///c:/Users/deves/Documents/DESARROLLO_EM/Demo-capacitacion/script.js) y agrega el nombre de tu archivo a la lista `profileFiles`:

```javascript
const profileFiles = [
  'template.html',
  'tu-nombre.html', // <-- Agrega tu archivo aquí
];
```

### 5. Guardar y confirmar tus cambios en Git
Revisa el estado de tus archivos:
```bash
git status
```
Agrega tus cambios al área de preparación (stage):
```bash
git add .
```
Crea un commit descriptivo:
```bash
git commit -m "feat: agrega tarjeta de presentacion de Tu Nombre"
```

### 6. Subir tu rama a GitHub
Publica tu rama en el repositorio remoto:
```bash
git push -u origin feature/perfil-tu-nombre
```

### 7. Abrir un Pull Request (PR)
1. Entra al repositorio en **GitHub**.
2. Verás un botón verde que dice **"Compare & pull request"**. Haz clic en él.
3. Escribe un título claro y una breve descripción de tu cambio.
4. Asigna a tus compañeros o al instructor como revisor y haz clic en **"Create pull request"**.

---

## 💻 ¿Cómo visualizar el proyecto en local?

Como el proyecto utiliza `fetch()` para ensamblar los perfiles dinámicamente, tienes estas opciones sin instalar nada adicional:

- **⚡ La más fácil (Doble clic):** Ejecuta el archivo `iniciar-demo.bat`. Utiliza PowerShell nativo de Windows (no necesitas Python ni Node.js) y te abrirá el navegador automáticamente en `http://localhost:8080`.
- **En Visual Studio:** Clic derecho sobre [index.html](file:///c:/Users/deves/Documents/DESARROLLO_EM/Demo-capacitacion/index.html) &rarr; **Ver en el explorador** (*Ctrl + Shift + W*). Levantará IIS Express solo.
- **En VS Code:** Clic derecho sobre `index.html` &rarr; **Open with Live Server**.
- **En producción:** Puede publicarse directamente en **GitHub Pages** activándolo en *Settings &rarr; Pages*.
