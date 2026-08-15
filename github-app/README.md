# Integración de la pizarra con GitHub

Esta carpeta prepara la arquitectura para que la pizarra autorice GitHub mediante una GitHub App en lugar de guardar un token personal en el navegador.

## Flujo

Pizarra → GitHub App / backend seguro → Contents API → `ejercicios-matematicas-ii/`

GitHub recomienda GitHub Apps frente a OAuth Apps para integraciones nuevas porque permiten permisos más específicos y tokens de corta duración.

## Importante

La aplicación GitHub todavía debe registrarse e instalarse en la cuenta `enzzosuarez17-max`. No se deben colocar `client_secret`, claves privadas ni tokens en los archivos públicos de GitHub Pages.
