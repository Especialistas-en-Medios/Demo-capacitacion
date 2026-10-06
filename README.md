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

> **Nota:** La aplicación detecta automáticamente cualquier archivo `.html` dentro de `profiles/`, por lo que **no necesitas editar ningún archivo JavaScript**.

### 4. Validar localmente
Para comprobar que tu tarjeta se visualiza correctamente en la vista general:
- Ejecuta `iniciar-demo.bat` con doble clic (inicia un servidor local y abre el navegador en `http://localhost:8080`).
- O en Visual Studio: Clic derecho sobre `index.html` > **Ver en el explorador** (`Ctrl + Shift + W`).

### 5. Confirmar cambios (Commit)
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
git commit -m "feat(perfil): agregar tarjeta de juan perez"
```

### 6. Publicar tu rama
Envía tu rama al repositorio remoto en GitHub:

```bash
git push -u origin feature/perfil-nombre-apellido
```

### 7. Crear el Pull Request (PR)
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

Seguimos el estándar internacional de **[Conventional Commits](https://www.conventionalcommits.org/)**. Cada commit debe explicar con claridad **qué** tipo de cambio se realizó, **sobre qué componente técnico recae** (scope) y una **descripción concisa** en minúsculas y modo imperativo.

#### Estructura Universal

```text
tipo(scope): descripción breve en minúsculas y modo imperativo
```

- **`tipo`**: Define la naturaleza del cambio (`feat`, `fix`, `docs`, etc.).
- **`(scope)`** *(opcional pero muy recomendado)*: Módulo, archivo o componente afectado en formato `kebab-case` (ej. `perfil`, `css`, `script`, `readme`). Si el cambio impacta de forma global a todo el proyecto, el scope puede omitirse: `tipo: descripción`.
- **`descripción`**: Frase corta sin punto final, en minúsculas y redactada en tiempo presente/imperativo (ej. `agregar...`, `corregir...`).

---

#### Los Más Frecuentes (Guía Rápida para Principiantes)

> [!TIP]
> **Para los ejercicios de este repositorio**, la gran mayoría de tus commits pertenecerán a estos 5 tipos:

| Tipo | ¿Cuándo se usa en este taller? | Ejemplo listo para usar |
| :--- | :--- | :--- |
| **`feat`** | Cuando creas tu tarjeta de presentación o agregas un elemento nuevo. | `feat(perfil): agregar tarjeta de carlos mendoza` |
| **`fix`** | Cuando corriges un enlace roto, avatar que no carga o algún bug. | `fix(perfil): corregir ruta de foto y algún bug en la interface` |
| **`style`** | Ajustes estéticos, espaciado, colores o formato CSS sin tocar lógica JS. | `style(css): ajustar margen y bordes de las tarjetas` |
| **`docs`** | Modificaciones en documentación o en el archivo `README.md`. | `docs(readme): agregar instrucciones para windows` |
| **`chore`** | Tareas de mantenimiento, configuración, `.gitignore` o limpieza de archivos. | `chore(gitignore): ignorar archivos temporales del editor` |

---

#### Tabla Completa de Tipos de Commit

| Tipo | Cuándo se usa | Ejemplo con Scope (`kebab-case`) |
| :--- | :--- | :--- |
| **`feat`** | Incorporación de una nueva funcionalidad, componente o vista. | `feat(perfil): agregar tarjeta de carlos mendoza` |
| **`fix`** | Corrección de un error, bug o comportamiento no deseado. | `fix(card-grid): resolver desalineacion visual en pantallas chicas` |
| **`docs`** | Modificaciones exclusivas a documentación (`README`, guías). | `docs(readme): agregar instrucciones para ejecutar en windows` |
| **`style`** | Ajustes visuales de formato sin impacto en lógica (espaciado, comillas). | `style(css): ordenar propiedades flexbox y colores globales` |
| **`refactor`** | Limpieza o reestructuración de código sin alterar funcionalidad. | `refactor(script): simplificar funcion de carga dinamica de perfiles` |
| **`perf`** | Optimización de rendimiento o consumo de recursos. | `perf(imagenes): optimizar tiempo de carga de avatares locales` |
| **`test`** | Creación o corrección de pruebas automatizadas. | `test(parser): agregar validacion de formato de tarjetas html` |
| **`build`** | Cambios en dependencias, empaquetado o librerías externas. | `build(npm): agregar dependencia para minificar estilos css` |
| **`chore`** | Tareas misceláneas de mantenimiento fuera del código fuente. | `chore(gitignore): ignorar archivos temporales del editor` |
| **`revert`** | Reversión de un commit anterior que causó problemas. | `revert: feat(perfil): agregar tarjeta de carlos mendoza` |
| **`ci`** | Ajustes en pipelines y flujos automatizados de GitHub Actions (avanzado) | `ci(github): configurar worflow para ejecucion en windows` |
---

#### Reglas de Oro para un Historial Limpio

1. **Escribe en infinitivo o imperativo**: Usa verbos como `agregar`, `corregir`, `actualizar` o `eliminar` (evita el pasado como *"agregado"* o *"se arregló"*).
2. **Usa minúsculas**: Mantiene consistencia y legibilidad profesional al revisar `git log`.
3. **Sé descriptivo y conciso**: Evita mensajes vagos como `git commit -m "cambios"`, `git commit -m "subir archivos"` o `git commit -m "fix"`.
4. **Commits atómicos**: Haz commits específicos por cada cambio lógico. Es preferible tener dos commits claros (`feat(perfil): ...` y `fix(css): ...`) que uno solo gigante que mezcle todo.
