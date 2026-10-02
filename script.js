/**
 * =========================================================================
 * Script de carga dinámica de perfiles - Capacitación Git & GitHub
 * =========================================================================
 */

/**
 * LISTA DE PERFILES REGISTRADOS
 * Cada desarrollador debe agregar aquí el nombre de su archivo HTML.
 * Ejemplo: 'juan-perez.html',
 */
const profileFiles = [
  'template.html',
  // Agrega tu archivo aquí abajo:
];

// Elementos del DOM
const profilesContainer = document.getElementById('profiles');
const loadingSpinner = document.getElementById('loadingProfiles');
const countBadge = document.getElementById('profileCount');
const corsWarning = document.getElementById('corsWarning');

/**
 * Carga e inyecta dinámicamente cada perfil en el contenedor #profiles
 */
async function loadAllProfiles() {
  // Advertencia visual si se detecta que se abrió con doble clic (file://)
  if (window.location.protocol === 'file:') {
    if (corsWarning) {
      corsWarning.classList.remove('d-none');
    }
  }

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
