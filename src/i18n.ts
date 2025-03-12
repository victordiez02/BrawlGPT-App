import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  // Landing page
  'landing_title': 'Discover the Best Pick with AI in Brawl Stars!',
  'landing_subtitle_1': 'Advanced AI analyzes your draft and recommends the best strategy in real-time.',
  'landing_subtitle_2': 'Simulate selections, perform bans, and get optimal picks for each match.',
  'step_1_title': 'Configure Your Draft',
  'step_1_desc': 'Select your map and team to get started.',
  'step_2_title': 'Ban Strategically',
  'step_2_desc': 'Remove up to 6 brawlers from the pool to refine your strategies.',
  'step_3_title': 'Get AI Recommendations',
  'step_3_desc': 'Receive optimal pick recommendations in seconds.',
  'draft_visualization_text': 'Visual representation of the draft with dynamic picks.',
  'cta_button': 'Generate Optimal Pick with AI',
  'footer_text': 'Unofficial tool for Brawl Stars',
  
  // Common
  'back_to_home': 'Back to Home',
  'search': 'Search...',
  'search_brawlers': 'Search brawlers...',
  'all_modes': 'All Modes',
  'no_maps_found': 'No maps found',
  'banned_brawlers': 'Banned Brawlers',
  'search_to_ban': 'Search to ban...',
  'no_banned_brawlers': 'No banned brawlers',
  'locked': 'Locked',
  
  // Simulator page
  'select_brawlers': 'Select Brawlers',
  'sort_by': 'Sort by',
  'by_rarity': 'By rarity',
  'name_az': 'Name (A-Z)',
  'name_za': 'Name (Z-A)',
  'no_brawlers_found': 'No brawlers found',
  'current_draft': 'Current Draft',
  'reset': 'Reset',
  'blue_team': 'Blue Team',
  'red_team': 'Red Team',
  'select': 'Select',
  'generating': 'Generating...',
  'generate_best_option': 'Generate Best Option',
  'generate_phase_1': 'Generate the best option for the first phase (FIRST PICK)',
  'generate_phase_2': 'Generate the best option for the second phase',
  'generate_phase_3': 'Generate the best option for the third phase',
  'generate_phase_4': 'Generate the best option for the last phase (LAST PICK)',
  'select_map_first': 'Select a map first',
  'configure_draft_correctly': 'Configure the draft correctly',
  'select_first_pick': 'Select the first pick',
  'select_first_pick_brawler': 'Select the brawler for the 1st pick',
  'select_second_pick_brawler': 'Select the brawler for the 2nd pick',
  'select_first_second_pick_brawlers': 'Select the brawlers for the 1st and 2nd picks',
  'select_third_pick_brawler': 'Select the brawler for the 3rd pick',
  'select_fourth_pick_brawler': 'Select the brawler for the 4th pick',
  'select_fifth_pick_brawler': 'Select the brawler for the 5th pick',
  'remove_sixth_pick': 'Remove the 6th pick',
  'incorrect_pick_order': 'Incorrect pick order. Missing picks {{missingPicks}}º',
  'brawler_selected': '{{name}} selected for the {{team}}',
  'brawler_removed': '{{name}} removed from the draft',
  'brawlers_swapped': '{{from}} swapped with {{to}}',
  'brawler_moved_position': '{{name}} moved to a new position',
  'brawler_banned': '{{name}} banned',
  'brawler_unbanned': 'Ban of {{name}} removed',
  'max_bans_error': 'You can\'t ban more than 6 brawlers',
  'max_picks_error': 'You can\'t select more than 5 brawlers',
  'must_select_map': 'You must select a map',
  'error_generating_recommendation': 'Error generating the recommendation. Try again.',
  'confirm_reset_draft': 'Are you sure you want to reset the draft? You will lose all current selections.',
  'draft_reset': 'Draft reset',
  'who_picks_first': 'Who picks first?',
  'select_map': 'Select map',
  'search_maps': 'Search maps...',
  
  // AI Recommendations
  'ai_recommendations': 'AI Recommendations',
  'generating_ai_recommendation': 'Analyzing draft and generating recommendations...',
  'this_might_take_a_moment': 'This might take a moment',
  'please_try_again': 'Please try again',
  'showing_best_picks': 'Showing best picks for this phase',
  'showing_best_pick_pairs': 'Showing best pick combinations for this phase',
  'best_pick': 'Best Pick',
  'best_combination': 'Best Combination',
  'unexpected_api_response': 'Unexpected API response',
  'ai_recommendations_generated': 'AI recommendations generated successfully',
  'invalid_draft_phase': 'Invalid draft phase',
  
  // Game modes
  'gem_grab': 'Gem Grab',
  'brawl_ball': 'Brawl Ball',
  'heist': 'Heist',
  'hot_zone': 'Hot Zone',
  'bounty': 'Bounty',
  'knockout': 'Knockout',
  'basket_brawl': 'Basket Brawl',
  
  // Rarities
  'common': 'Common',
  'rare': 'Rare',
  'super_rare': 'Super Rare',
  'epic': 'Epic',
  'mythic': 'Mythic',
  'legendary': 'Legendary',
  'chromatic': 'Chromatic',

  // Footer
  'footer_copyright': '© 2025 BrawlGPT - Fan-made tool for non-commercial purposes.',
  'footer_developer': 'Developed by <strong>Víctor Díez</strong>',
  'footer_contact': 'Contact:',
  'footer_source_code': 'Source code:',
  'footer_github': 'Available on GitHub',
  'footer_disclaimer': 'BrawlGPT is not an official Supercell tool and is not affiliated with them in any way.'
};

// Spanish translations
const esTranslations = {
  // Landing page
  'landing_title': '¡Descubre el Mejor Pick con IA en Brawl Stars!',
  'landing_subtitle_1': 'Una IA avanzada analiza tu draft y te recomienda la mejor estrategia en tiempo real.',
  'landing_subtitle_2': 'Simula selecciones, realiza baneos y obtén los mejores picks para cada partida.',
  'step_1_title': 'Configura tu Draft',
  'step_1_desc': 'Selecciona tu mapa y equipo para comenzar.',
  'step_2_title': 'Banea Inteligentemente',
  'step_2_desc': 'Elimina hasta 6 brawlers del pool para adaptar las estrategias.',
  'step_3_title': 'Obtén Recomendaciones IA',
  'step_3_desc': 'La IA te dará los mejores picks posibles en segundos.',
  'draft_visualization_text': 'Representación visual del draft con picks dinámicos.',
  'cta_button': 'Buscar el mejor Pick con IA',
  'footer_text': 'Herramienta no oficial para Brawl Stars',
  
  // Common
  'back_to_home': 'Volver al inicio',
  'search': 'Buscar...',
  'search_brawlers': 'Buscar brawlers...',
  'all_modes': 'Todos los modos',
  'no_maps_found': 'No se encontraron mapas',
  'banned_brawlers': 'Brawlers Baneados',
  'search_to_ban': 'Buscar para banear...',
  'no_banned_brawlers': 'No hay brawlers baneados',
  'locked': 'Bloqueado',
  
  // Simulator page
  'select_brawlers': 'Seleccionar Brawlers',
  'sort_by': 'Ordenar por',
  'by_rarity': 'Por rareza',
  'name_az': 'Nombre (A-Z)',
  'name_za': 'Nombre (Z-A)',
  'no_brawlers_found': 'No se encontraron brawlers',
  'current_draft': 'Draft Actual',
  'reset': 'Reiniciar',
  'blue_team': 'Equipo Azul',
  'red_team': 'Equipo Rojo',
  'select': 'Selecciona',
  'generating': 'Generando...',
  'generate_best_option': 'Buscar la Mejor Opción',
  'generate_phase_1': 'Buscar la mejor opción para la primera fase (PRIMER PICK)',
  'generate_phase_2': 'Buscar las mejores opción para la segunda fase',
  'generate_phase_3': 'Buscar las mejores opción para la tercera fase',
  'generate_phase_4': 'Buscar la mejor opción para la última fase (ÚLTIMO PICK)',
  'select_map_first': 'Primero selecciona un mapa',
  'configure_draft_correctly': 'Configura el draft correctamente',
  'select_first_pick': 'Selecciona el primer pick',
  'select_first_pick_brawler': 'Selecciona el brawler para el 1er pick',
  'select_second_pick_brawler': 'Selecciona el brawler para el 2º pick',
  'select_first_second_pick_brawlers': 'Selecciona los brawlers para los picks 1º y 2º',
  'select_third_pick_brawler': 'Selecciona el brawler para el 3er pick',
  'select_fourth_pick_brawler': 'Selecciona el brawler para el 4º pick',
  'select_fifth_pick_brawler': 'Selecciona el brawler para el 5º pick',
  'remove_sixth_pick': 'Elimina el 6º pick',
  'incorrect_pick_order': 'Orden de picks incorrecto. Faltan los picks {{missingPicks}}º',
  'brawler_selected': '{{name}} seleccionado para el {{team}}',
  'brawler_removed': '{{name}} eliminado del draft',
  'brawlers_swapped': 'Se ha intercambiado {{from}} por {{to}}',
  'brawler_moved_position': 'Se ha movido {{name}} a una nueva posición',
  'brawler_banned': '{{name}} baneado',
  'brawler_unbanned': 'Baneo de {{name}} eliminado',
  'max_bans_error': 'No puedes banear más de 6 brawlers',
  'max_picks_error': 'No puedes seleccionar más de 5 brawlers',
  'must_select_map': 'Debes seleccionar un mapa',
  'error_generating_recommendation': 'Error al buscar la recomendación. Inténtalo de nuevo.',
  'confirm_reset_draft': '¿Estás seguro de que quieres reiniciar el draft? Perderás todas las selecciones actuales.',
  'draft_reset': 'Draft reiniciado',
  'who_picks_first': '¿Quién empieza eligiendo?',
  'select_map': 'Seleccionar mapa',
  'search_maps': 'Buscar mapas...',
  
  // AI Recommendations
  'ai_recommendations': 'Recomendaciones de la IA',
  'generating_ai_recommendation': 'Analizando draft y generando recomendaciones...',
  'this_might_take_a_moment': 'Esto puede tardar un momento',
  'please_try_again': 'Por favor, inténtalo de nuevo',
  'showing_best_picks': 'Mostrando los mejores picks para esta fase',
  'showing_best_pick_pairs': 'Mostrando las mejores combinaciones para esta fase',
  'best_pick': 'Mejor pick',
  'best_combination': 'Mejores picks',
  'unexpected_api_response': 'Respuesta inesperada de la API',
  'ai_recommendations_generated': 'Recomendaciones de la IA generadas correctamente',
  'invalid_draft_phase': 'Fase de draft no válida',

  // Game modes
  'gem_grab': 'Atrapagemas',
  'brawl_ball': 'Balón Brawl',
  'heist': 'Atraco',
  'hot_zone': 'Zona Restringida',
  'bounty': 'Caza Estelar',
  'knockout': 'Noqueo',
  'basket_brawl': 'Hockey Brawl',
  
  // Rarities
  'common': 'Común',
  'rare': 'Raro',
  'super_rare': 'Super Raro',
  'epic': 'Épico',
  'mythic': 'Mítico',
  'legendary': 'Legendario',
  'chromatic': 'Cromático',

  // Footer
  'footer_copyright': '© 2025 BrawlGPT - Herramienta sin fines comerciales, creada por fans.',
  'footer_developer': 'Desarrollado por <strong>Víctor Díez</strong>',
  'footer_contact': 'Contacto:',
  'footer_source_code': 'Código fuente:',
  'footer_github': 'Disponible en GitHub',
  'footer_disclaimer': 'BrawlGPT no es una herramienta oficial de Supercell ni está afiliada con ellos de ninguna manera.'
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
