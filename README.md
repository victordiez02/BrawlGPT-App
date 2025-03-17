
# BrawlGPT - Asistente Inteligente para Drafts de Brawl Stars 🌟

![Banner](public/resources/iconBS.png)

BrawlGPT es un simulador de drafts para Brawl Stars potenciado por inteligencia artificial que ayuda a los jugadores a tomar mejores decisiones durante el proceso de selección de personajes. Con una interfaz intuitiva y recomendaciones generadas por IA, BrawlGPT te permite optimizar tu estrategia en cada fase del draft.

## ✨ Características principales

- 🗺️ Selección de mapas con filtros por modo de juego
- 🧠 Recomendaciones de picks inteligentes basadas en el contexto del draft
- 🚫 Sistema de bans para personajes
- 🔄 Simulación completa de drafts con turnos
- 🌐 Soporte multilenguaje (Español e Inglés)
- 🔮 Inteligencia artificial que recomienda los mejores picks en cada fase

## 📱 Demostración

![BrawlGPT Demo](public/og-image.png)

## 🛠️ Tecnologías utilizadas

- **React** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes de UI
- **i18next** - Internacionalización
- **React DnD** - Drag and Drop de brawlers
- **Vite** - Build tool

## 🧠 Conexión con BrawlGPT API

Este proyecto se conecta con [BrawlGPT API](https://github.com/victordiez02/BrawlGPT-API.git), un servicio desarrollado por mí que:

1. Recibe información del estado actual del draft (mapa, brawlers seleccionados, brawlers baneados)
2. Utiliza Google Gemini para analizar la situación y generar recomendaciones contextuales
3. Devuelve las mejores opciones con explicaciones detalladas

La API está construida con FastAPI y utiliza modelos de IA para proporcionar recomendaciones precisas en diferentes fases del draft:

- **Fase 1**: Recomienda el primer brawler para elegir
- **Fase 2**: Sugiere la mejor combinación de dos brawlers
- **Fase 3**: Recomienda picks para completar la estrategia
- **Fase 4**: Sugiere el brawler final para cerrar la composición

## 🚀 ¿Cómo funciona?

1. **Selecciona un mapa** - Escoge el mapa donde se jugará la partida
2. **Configura el draft** - Decide qué equipo tiene el primer pick
3. **Banea brawlers** - Excluye personajes que no quieres que aparezcan
4. **Recibe recomendaciones de IA** - En cada fase del draft, recibe sugerencias inteligentes
5. **Completa tu draft** - Selecciona los brawlers finales para tu equipo

## 💻 Instalación local

Para ejecutar BrawlGPT en tu máquina local:

```bash
# Clona este repositorio
git clone https://github.com/tuusuario/BrawlGPT.git

# Navega al directorio del proyecto
cd BrawlGPT

# Instala las dependencias
npm install

# Crea un archivo .env con tu clave de API
echo "VITE_BRAWLGPT_API_KEY=tu_clave_api" > .env

# Inicia el servidor de desarrollo
npm run dev
```

> 🔑 **Nota:** Necesitarás una clave API de BrawlGPT. Puedes obtenerla configurando tu propia instancia de [BrawlGPT API](https://github.com/victordiez02/BrawlGPT-API.git).

## 🤔 ¿Cómo obtener la clave API?

1. Clona y configura el repositorio [BrawlGPT API](https://github.com/victordiez02/BrawlGPT-API.git)
2. Sigue las instrucciones en ese repositorio para generar tu clave API
3. Agrega la clave a tu archivo .env como se muestra arriba

## 🌐 Despliegue

El proyecto está optimizado para ser desplegado en plataformas como Vercel, Netlify o GitHub Pages.

## 📚 Estructura del proyecto

```
BrawlGPT/
├── src/
│   ├── components/     # Componentes React
│   ├── lib/            # Utilidades y datos
│   ├── pages/          # Páginas principales
│   └── i18n.ts         # Configuración de internacionalización
├── public/             # Recursos estáticos
└── README.md           # Documentación
```

## 🔮 Próximas mejoras

- Historial de drafts con estadísticas
- Más idiomas disponibles
- Modo oscuro/claro
- Sincronización con la API oficial de Brawl Stars

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerencias.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ por [Tu nombre]
