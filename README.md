# Capacitación Git & GitHub - Especialistas en Medios

Repositorio didáctico diseñado para la capacitación del equipo de desarrollo en el flujo de trabajo estándar con Git y GitHub: gestión de ramas, confirmación de cambios mediante commits convencionales y resolución de integraciones a través de Pull Requests (PR).

---

## Estructura del Proyecto

```text
├── index.html        # Vista principal del grid de perfiles
├── style.css         # Hoja de estilos del proyecto y componentes visuales
├── script.js         # Lógica de carga dinámica de tarjetas de perfil
├── iniciar-demo.bat  # Acceso directo para iniciar el servidor local en Windows
├── servidor.ps1      # Servidor HTTP ligero basado en PowerShell nativo
└── profiles/         # Directorio destinado a los perfiles individuales
    └── template.html # Plantilla base de referencia
```

---

## Objetivo del Ejercicio

Cada integrante del equipo debe crear su propia tarjeta de presentación a partir de `profiles/template.html`, registrarla en la lógica de la aplicación y solicitar su integración a la rama principal mediante un Pull Request.

---

## Flujo de Trabajo (Paso a Paso)

### 1. Clonar el repositorio
Abre una terminal y clona el proyecto en tu máquina local:

```bash
git clone https://github.com/Especialistas-en-Medios/Demo-capacitacion.git
cd Demo-capacitacion
```

### 2. Crear una rama de trabajo
Crea y posiciónate en una rama propia utilizando la convención `feature/perfil-nombre-apellido`:

```bash
git checkout -b feature/perfil-nombre-apellido
```
*Ejemplo:* `git checkout -b feature/perfil-carlos-mendoza`

### 3. Crear tu tarjeta de presentación
1. Dirígete a la carpeta `profiles/`.
2. Duplica el archivo `template.html` y guárdalo con tu nombre en formato kebab-case:
   ```text
   profiles/nombre-apellido.html
   ```
   *Ejemplo:* `profiles/carlos-mendoza.html`
3. Abre tu archivo en tu editor de código y personaliza los campos:
   - Nombre completo y rol profesional.
   - Resumen o descripción personal.
   - Tecnologías o especialidades técnicas.
   - Enlace a foto o avatar de perfil.

> **Nota:** Puedes abrir tu archivo `profiles/nombre-apellido.html` directamente en el navegador con doble clic para previsualizar el diseño individual mientras lo editas.

### 4. Registrar tu perfil en la aplicación
Abre el archivo [script.js](file:///c:/Users/deves/Documents/DESARROLLO_EM/Demo-capacitacion/script.js) y agrega el nombre de tu archivo en el arreglo `profileFiles`:

```javascript
const profileFiles = [
  'template.html',
  'nombre-apellido.html', // <-- Agrega tu archivo aquí
];
```

### 5. Validar localmente
Para comprobar que tu tarjeta se visualiza correctamente en la vista general:
- Ejecuta `iniciar-demo.bat` con doble clic (inicia un servidor local y abre el navegador en `http://localhost:8080`).
- O en Visual Studio: Clic derecho sobre `index.html` > **Ver en el explorador** (`Ctrl + Shift + W`).

### 6. Confirmar cambios (Commit)
Verifica los archivos modificados:

```bash
git status
```

Agrega los archivos al área de preparación (stage):

```bash
git add .
```

Crea el commit respetando la convención:

```bash
git commit -m "feat: agrega tarjeta de presentacion de Nombre Apellido"
```

### 7. Publicar tu rama
Envía tu rama al repositorio remoto en GitHub:

```bash
git push -u origin feature/perfil-nombre-apellido
```

### 8. Crear el Pull Request (PR)
1. Ingresa al repositorio en GitHub: [Demo-capacitacion](https://github.com/Especialistas-en-Medios/Demo-capacitacion).
2. Haz clic en el botón **Compare & pull request** que aparecerá en la parte superior.
3. Asegúrate de que la rama destino sea `base: main` y la rama de origen sea tu rama `compare: feature/...`.
4. Asigna un título descriptivo a tu PR y solicita la revisión del equipo o del instructor.
5. Haz clic en **Create pull request**.

---

## Convenciones del Proyecto

### Nomenclatura de Ramas
| Tipo | Prefijo | Ejemplo |
| :--- | :--- | :--- |
| Nueva funcionalidad / perfil | `feature/` | `feature/perfil-carlos-mendoza` |
| Corrección de error | `fix/` | `fix/corrige-estilos-carlos` |

### Mensajes de Confirmación (Conventional Commits)
| Prefijo | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `feat:` | Incorporación de nueva funcionalidad o tarjeta | `feat: agrega tarjeta de presentacion de Carlos Mendoza` |
| `fix:` | Corrección de errores, enlaces rotos o bugs | `fix: corrige sintaxis en script de perfiles` |
| `docs:` | Modificaciones exclusivas a documentación | `docs: actualiza guia de flujo de trabajo` |
