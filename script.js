/**
 * =========================================================================
 * Script de carga dinámica de perfiles - Capacitación Git & GitHub
 * =========================================================================
 * Detecta automáticamente todos los archivos HTML en la carpeta profiles/
 * para que los desarrolladores NO tengan que editar este archivo y se eviten
 * los conflictos de fusión (merge conflicts) en los Pull Requests.
 */

// Elementos del DOM
const profilesContainer = document.getElementById('profiles');
const loadingSpinner = document.getElementById('loadingProfiles');
const countBadge = document.getElementById('profileCount');
const corsWarning = document.getElementById('corsWarning');

/**
 * Obtiene la lista de archivos de la carpeta profiles/
 * 1. Primero intenta consultar la API local del servidor (/api/profiles)
 * 2. Si falla (ej. GitHub Pages), consulta la API pública de GitHub
 * 3. Fallback a template.html si no hay conexión
 */
async function getProfileFiles() {
  // 1. Intento: Servidor local (iniciar-demo.bat)
  try {
    const localRes = await fetch('api/profiles');
    if (localRes.ok) {
      let files = await localRes.json();
      if (typeof files === 'string') {
        files = [files];
      }
      if (Array.isArray(files) && files.length > 0) {
        console.log('[Info] Perfiles detectados desde servidor local:', files);
        return files;
      }
    }
  } catch (e) {
    // Continúa con el fallback
  }

  // 2. Intento: API de GitHub (funciona en GitHub Pages o cualquier hosting)
  try {
    const ghRes = await fetch('https://api.github.com/repos/Especialistas-en-Medios/Demo-capacitacion/contents/profiles');
    if (ghRes.ok) {
      const contents = await ghRes.json();
      if (Array.isArray(contents)) {
        const ghFiles = contents
          .filter(item => item.type === 'file' && item.name.toLowerCase().endsWith('.html'))
          .map(item => item.name);
        if (ghFiles.length > 0) {
          console.log('[Info] Perfiles detectados desde API de GitHub:', ghFiles);
          return ghFiles;
        }
      }
    }
  } catch (e) {
    // Continúa con el fallback
  }

  // 3. Fallback seguro
  return ['template.html'];
}

/**
 * Carga e inyecta dinámicamente cada perfil en el contenedor #profiles
 */
async function loadAllProfiles() {
  if (window.location.protocol === 'file:') {
    if (corsWarning) {
      corsWarning.classList.remove('d-none');
    }
  }

  const profileFiles = await getProfileFiles();
  let loadedCount = 0;

  for (const fileName of profileFiles) {
    try {
      const response = await fetch(`profiles/${fileName}`);
      if (!response.ok) {
        console.warn(`No se pudo cargar el perfil: ${fileName} (Status: ${response.status})`);
        continue;
      }
      const htmlText = await response.text();

      // Parsear el HTML obtenido
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Buscar el contenedor de la tarjeta (.profile-card-wrapper) o directamente .profile-card
      const cardWrapper = doc.querySelector('.profile-card-wrapper');

      if (cardWrapper) {
        profilesContainer.appendChild(cardWrapper);
        loadedCount++;
      } else {
        // Fallback: si el dev no incluyó el wrapper, lo generamos con clases de Bootstrap
        const card = doc.querySelector('.profile-card');
        if (card) {
          const wrapper = document.createElement('div');
          wrapper.className = 'col-12 col-md-6 col-lg-4 profile-card-wrapper';
          wrapper.appendChild(card);
          profilesContainer.appendChild(wrapper);
          loadedCount++;
        }
      }
    } catch (error) {
      console.error(`Error al procesar profiles/${fileName}:`, error);
    }
  }

  // Ocultar spinner de carga y actualizar contador
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
  if (countBadge) {
    countBadge.textContent = loadedCount;
  }

  // Si no cargó nada y estamos en file://, mostrar mensaje de ayuda en el grid
  if (loadedCount === 0 && window.location.protocol === 'file:' && profilesContainer) {
    profilesContainer.innerHTML = `
      <div class="col-12 text-center py-4">
        <div class="p-4 bg-white rounded-3 shadow-sm border">
          <p class="text-muted small mb-3">
            Ejecuta <strong>iniciar-demo.bat</strong> con doble clic, o en Visual Studio da clic derecho en <code>index.html</code> &rarr; <em>Ver en el explorador</em>.
          </p>
          <a href="profiles/template.html" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-box-arrow-up-right me-1"></i> Ver template individualmente
          </a>
        </div>
      </div>
    `;
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAllProfiles);
