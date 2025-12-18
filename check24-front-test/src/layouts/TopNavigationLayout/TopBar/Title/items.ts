export interface TitleItem {
  path: string;
  title: string;
  subtitle?: string;
  show: boolean;
}

export interface TitleItems {
  items: TitleItem[];
}

const titleItems: TitleItems = {
  items: [
    {
      path: '/',
      title: 'index.title',
      subtitle: 'index.subtitle',
      show: true
    },
    {
      path: '/aviso-legal',
      title: 'legal_notice.title',
      show: true
    },
    {
      path: '/condiciones-de-uso',
      title: 'platform_usage_terms.main_title',
      show: true
    },
    {
      path: '/form',
      title: 'calculator.title',
      show: false
    },
    {
      path: '/politica-de-privacidad',
      title: 'privacy_policy.title',
      show: true
    },
    {
      path: '/politica-de-privacidad-instaladores',
      title: 'privacy_policy_installers.title',
      show: true
    },
    {
      path: '/',
      title: 'proposal.title',
      show: false
    },
    {
      path: '/uso-de-cookies',
      title: 'use_of_cookies.title',
      show: true
    },
    {
      path: '/blog',
      title: 'blog.blog_cover.title',
      show: true
    },
    {
      path: '/instalacion-de-aerotermia-en-vivienda-unifamiliar-cerca-de-guadalajara-rapida-gestion-y-trabajo-en-equipo',
      title: 'blog.heat_pumps_unifamiliar_installation.title',
      show: true
    },
    {
      path: '/saca-el-maximo-partido-a-tu-suelo-radiante-con-aerotermia-en-todas-las-estaciones',
      title: 'blog.heat_pumps_all_seasons.title',
      show: true
    },
    {
      path: '/reforma-integral-suelo-radiante-y-aerotermia-en-un-piso-de-madrid',
      title: 'blog.radiant_floor_heat_pumps_apartment.title',
      show: true
    },
    {
      path: '/aerotermia-para-calefaccion-con-radiadores-en-castilla-la-mancha',
      title: 'blog.heat_pumps_heating_radiators.title',
      show: true
    },
    {
      path: '/casos-de-exito-instalacion-de-aerotermia-en-castilla-y-leon',
      title: 'blog.heat_pumps_semi_detached_house.title',
      show: true
    },
    {
      path: '/ahorros-energeticos',
      title: 'blog.energy_savings.title',
      show: true
    },
    {
      path: '/aerotermia-que-es-y-como-funciona',
      title: 'blog.heat_pumps_what_is_it_and_how_it_works.title',
      show: true
    },
    {
      path: '/calefaccion-por-aerotermia-como-funciona',
      title: 'blog.heat_pumps_heating_how_does_it_work.title',
      show: true
    },
    {
      path: '/servicios/aerotermia-aire-aire',
      title: 'blog.air_to_air_heat_pumps.title',
      show: true
    },
    {
      path: '/faqs-nido',
      title: 'faqs.faqs_cover.title',
      show: true
    },
    {
      path: '/faqs-nido/faqs-ahorro-coste-financiacion-y-subvenciones',
      title: 'faqs.savings_cost_financing_and_subsidies.title',
      show: true
    },
    {
      path: '/faqs-nido/faqs-instalacion-de-bomba-de-calor-aerotermica-aire-agua',
      title: 'faqs.air_water_heat_pumps_installation.title',
      show: true
    },
    {
      path: '/faqs-nido/faqs-sobre-nido',
      title: 'faqs.about_nido.title',
      show: true
    },
    {
      path: '/faqs-nido/faqs-tecnologia-bomba-de-calor-aerotermica',
      title: 'faqs.heat_pumps_technology.title',
      show: true
    },
    {
      path: '/sobre-nosotros',
      title: 'faqs.get_to_know_us.title',
      show: true
    }
  ]
};
export default titleItems;
