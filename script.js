const cards = document.querySelectorAll('.card');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const placeCards = document.querySelectorAll('.place-card');
const compareButtons = document.querySelectorAll('.compare-btn');
const mapPins = document.querySelectorAll('.map-pin');
const faqItems = document.querySelectorAll('.faq-item');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const adminTriggers = document.querySelectorAll('.admin-trigger');
const reserveButtons = document.querySelectorAll('.reserve-trigger');
const modals = document.querySelectorAll('.modal-overlay');
const closeModalButtons = document.querySelectorAll('.close-modal');
const searchForm = document.getElementById('searchForm');
const reservationModal = document.getElementById('reservationModal');
const priceFilter = document.getElementById('priceFilter');
const typeFilter = document.getElementById('typeFilter');
const guestFilter = document.getElementById('guestFilter');
const serviceFilter = document.getElementById('serviceFilter');
const compareList = document.getElementById('compareList');
const compareCount = document.getElementById('compareCount');
const signupForm = document.getElementById('signupForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminSection = document.getElementById('adminSection');
const registeredList = document.getElementById('registeredList');
const reservationList = document.getElementById('reservationList');
const logoutAdminButton = document.getElementById('logoutAdmin');
const calendarGrid = document.getElementById('calendarGrid');
const monthLabel = document.getElementById('monthLabel');
const bookingRange = document.getElementById('bookingRange');
const bookingPriceLabel = document.getElementById('bookingPriceLabel');
const bookingTotal = document.getElementById('bookingTotal');
const bookingDiscount = document.getElementById('bookingDiscount');
const bookingNights = document.getElementById('bookingNights');
const bookingSavings = document.getElementById('bookingSavings');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const menuLinks = document.querySelectorAll('.menu a');
const mainSections = document.querySelectorAll('main > section');
const languageSelect = document.getElementById('languageSelect');

function setMenuActiveState(activeId) {
  const resolvedActiveId = activeId === 'contacto' ? 'contacto-fijo' : activeId;

  menuLinks.forEach((link) => {
    const linkTarget = link.getAttribute('href')?.replace('#', '');
    const isActive = linkTarget === resolvedActiveId || (resolvedActiveId === 'contacto-fijo' && linkTarget === 'contacto');
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function showMenuSection(targetId) {
  const resolvedTargetId = targetId === 'contacto' ? 'contacto-fijo' : targetId;
  const targetSection = document.getElementById(resolvedTargetId) || document.getElementById('inicio');
  if (!targetSection) return;

  mainSections.forEach((section) => {
    const isHomeSection = targetSection.id === 'inicio' && (section.id === 'inicio' || section.classList.contains('booking-panel'));
    section.classList.toggle('active-section', section === targetSection || isHomeSection);
  });

  setMenuActiveState(resolvedTargetId);

  if (targetSection.id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
}

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.slice(1);
    if (!targetId) return;
    event.preventDefault();
    showMenuSection(targetId);
  });
});

const observer = new IntersectionObserver((entries) => {
  const visibleEntry = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visibleEntry) return;

  const sectionId = visibleEntry.target.id;
  if (sectionId === 'inicio' || sectionId === 'booking-panel') {
    setMenuActiveState('inicio');
    return;
  }

  setMenuActiveState(sectionId);
}, {
  root: null,
  threshold: [0.2, 0.4, 0.6],
  rootMargin: '-10% 0px -35% 0px'
});

mainSections.forEach((section) => observer.observe(section));

document.body.classList.add('section-mode');
showMenuSection('inicio');

const translations = {
  es: {
    navHome: "Inicio",
    navDestinations: "Destinos",
    navSections: "Secciones",
    navPlaces: "Lugares",
    navExperiences: "Experiencias",
    navContact: "Contacto",
    loginBtn: "Iniciar sesión",
    signupBtn: "Registrarse",
    adminBtn: "Admin",
    heroEyebrow: "Descubre Puerto Iguazú",
    heroTitle: "Tu refugio perfecto, rodeado de naturaleza.",
    heroDesc: "Encontrá los mejores alojamientos, habitaciones con estilo y experiencias únicas cerca de las Cataratas y la selva misionera.",
    heroExplore: "Explorar alojamientos",
    heroExperiencesBtn: "Ver experiencias",
    heroCall: "Llamar ahora",
    statsStays: "Estadías",
    statsReviews: "Reseñas",
    statsSupport: "Atención",
    searchTitle: "Buscar alojamiento",
    searchDestination: "Destino",
    searchDates: "Fechas",
    searchGuests: "Huéspedes",
    searchButton: "Buscar",
    featuredEyebrow: "Alojamientos destacados",
    featuredTitle: "Elegí el lugar ideal para tu escapada",
    featuredViewAll: "Ver todos",
    tabSectionEyebrow: "Secciones especiales",
    tabSectionTitle: "Todo en pestañas separadas para una mejor navegación",
    tabStays: "Alojamientos",
    tabExperiences: "Experiencias",
    tabServices: "Servicios",
    tabStayTag1: "Selva",
    tabStayTitle1: "Casa Jardín Iguazú",
    tabStayDesc1: "Vista natural, piscina y ambiente íntimo para relajarse.",
    tabStayTag2: "Familia",
    tabStayTitle2: "Blossom House",
    tabStayDesc2: "Espacio amplio, cómodo y pensado para viajes largos.",
    tabStayTag3: "Romántico",
    tabStayTitle3: "Cabina del Bosque",
    tabStayDesc3: "Un entorno especial para vivir una escapada tranquila.",
    tabExpTag1: "Top",
    tabExpTitle1: "Tour de cataratas",
    tabExpDesc1: "Recorridos guiados para vivir la naturaleza con detalles.",
    tabExpTag2: "Naturaleza",
    tabExpTitle2: "Senderos y descanso",
    tabExpDesc2: "Planes para explorar la selva y desconectarte del ruido.",
    tabExpTag3: "Aventura",
    tabExpTitle3: "Experiencias locales",
    tabExpDesc3: "Momentos auténticos con la mejor energía del destino.",
    tabServiceTag1: "Atención",
    tabServiceTitle1: "Check-in flexible",
    tabServiceDesc1: "Servicio pensado para que llegues con tranquilidad.",
    tabServiceTag2: "Incluido",
    tabServiceTitle2: "Desayuno y Wi‑Fi",
    tabServiceDesc2: "Todo lo necesario para una estadía cómoda y relajada.",
    tabServiceTag3: "Soporte",
    tabServiceTitle3: "Recomendaciones",
    tabServiceDesc3: "Te orientamos con los mejores planes del lugar.",
    tagSelva: "Selva",
    tagFamily: "Familia",
    tagRomantic: "Romántico",
    stayCard1Desc: "Ideal para desconectarte con piscina, jardín y vista natural.",
    stayCard2Desc: "Amplio espacio con ambiente cálido, ideal para viajar en familia.",
    stayCard3Desc: "Ambiente íntimo y tranquilo para vivir una escapada especial.",
    rooms2: "2 habitaciones",
    guests3: "3 huéspedes",
    guests2Short: "2 huéspedes",
    showcaseEyebrow: "Detalle del alojamiento",
    showcaseRating: "4.9 · 126 reseñas",
    showcaseDesc: "Una vivienda acogedora con jardines tropicales, piscina privada y una vista natural que invita a descansar luego de explorar la región.",
    detailFeature1: "2 habitaciones privadas",
    detailFeature2: "1 baño completo y amenities",
    detailFeature3: "Wi‑Fi, cocina equipada y patio",
    detailFeature4: "Check-in flexible y atención 24/7",
    fromText: "Desde",
    reserveNow: "Reservar ahora",
    experienceEyebrow: "Experiencias inolvidables",
    experienceTitle: "Viví Puerto Iguazú con un estilo de descanso auténtico.",
    experienceDesc: "Desde alojamiento cerca de las Cataratas hasta estadías con enfoque en la naturaleza, Blossom Stay conecta a viajeros con lugares que transforman cada paseo en una historia memorable.",
    experienceFeature1: "Ubicación estratégica cerca de los principales atractivos",
    experienceFeature2: "Ambientes acogedores, modernos y muy bien valorados",
    experienceFeature3: "Recomendaciones personalizadas para cada viaje",
    experienceTop: "Top experiencia",
    experienceTopText: "Tour de Cataratas + descanso en el bosque",
    experienceRec: "Recomendación",
    experienceRecText: "Estadía con desayuno incluido + guía local",
    premiumWhyEyebrow: "Por qué elegir Blossom Stay",
    premiumWhyTitle: "Una experiencia premium pensada para relajarte desde el primer minuto.",
    ratingAverage: "Valoración promedio",
    staysBooked: "estadías reservadas",
    travelerFav: "Recomendado por viajeros",
    featureWifi: "Wi‑Fi de alta velocidad",
    featureWifiDesc: "Conectate sin límites mientras trabajás, te relajás o compartís momentos.",
    featurePool: "Piscina",
    featurePoolDesc: "Espacios pensados para descansar con estilo y disfrutar del clima tropical.",
    featureParking: "Estacionamiento",
    featureParkingDesc: "Facilidad para llegar y moverte sin tener que preocuparte por el auto.",
    featureBreakfast: "Desayuno",
    featureBreakfastDesc: "Empieza cada día con sabores, calma y la energía perfecta para explorar.",
    featureClean: "Limpieza impecable",
    featureCleanDesc: "Ambientes cuidados y presentados con una atención impecable en cada detalle.",
    featureFlexible: "Cancelación flexible",
    featureFlexibleDesc: "Reservá con tranquilidad y ajustá tu plan si el viaje cambia de rumbo.",
    itineraryTitle: "Itinerarios recomendados para tu viaje",
    itineraryBuildPlan: "Armar mi plan",
    itineraryTrip1Title: "Relajación total",
    itineraryTrip1Desc: "Descanso, naturaleza y un cierre con buen vino y paisaje.",
    itineraryTrip1Item1: "Check-in tranquilo",
    itineraryTrip1Item2: "Sendero y piscina",
    itineraryTrip1Item3: "Cena recomendada",
    itineraryTrip1From: "Desde USD 248",
    itineraryTrip2Title: "Aventura y cascadas",
    itineraryTrip2Desc: "La mejor mezcla entre excursiones, fotos y momentos de descanso.",
    itineraryTrip2Item1: "Cataratas + miradores",
    itineraryTrip2Item2: "Senderismo",
    itineraryTrip2Item3: "Tour nocturno",
    itineraryTrip2From: "Desde USD 336",
    itineraryTrip3Title: "Viaje en pareja",
    itineraryTrip3Desc: "Un plan romántico con detalles especiales y tiempo para desconectarse.",
    itineraryTrip3Item1: "Desayuno incluido",
    itineraryTrip3Item2: "Tour romántico",
    itineraryTrip3Item3: "Momentos especiales",
    itineraryTrip3From: "Desde USD 416",
    premiumStep: "Paso 10",
    premiumTitle: "Paquetes premium para disfrutar mejor",
    premiumConsult: "Consultar paquete",
    premiumTagLuxe: "Lujoso",
    premiumLuxeDesc: "Estadía elegante con desayuno, spa, wifi y una experiencia de descanso premium.",
    premiumLuxeItem1: "Habitación premium con vista",
    premiumLuxeItem2: "Desayuno incluido",
    premiumLuxeItem3: "Tour de cataratas",
    premiumTagFamily: "Familiar",
    premiumFamilyTitle: "Familia en la selva",
    premiumFamilyDesc: "Una opción ideal para viajar en familia con comodidad, espacios y actividades calmadas.",
    premiumFamilyItem1: "Habitación amplia",
    premiumFamilyItem2: "Senderismo + actividades",
    premiumFamilyItem3: "Check-in flexible",
    premiumTagRomantic: "Romántico",
    premiumRomanticTitle: "Escapada íntima",
    premiumRomanticDesc: "Detalles para parejas, ambiente cálido y momentos especiales con estilo tropical.",
    premiumRomanticItem1: "Plan romántico",
    premiumRomanticItem2: "Desayuno para dos",
    premiumRomanticItem3: "Ambiente privado",
    mapEyebrow: "Mapa interactivo",
    mapTitle: "Explorá los alojamientos por zona",
    mapSeeProperties: "Ver propiedades",
    mapJungle: "Selva",
    mapRiver: "Río",
    mapNearbyTitle: "Ubicaciones cercanas",
    mapNearby1: "Frente a la zona turística",
    mapNearby2: "Muy cerca de senderos y naturaleza",
    mapNearby3: "Acceso cómodo para familias y parejas",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Todo lo que necesitás saber antes de reservar",
    faqQuestion1: "¿Hay cancelación gratuita?",
    faqAnswer1: "Sí. Muchos de nuestros alojamientos incluyen cancelación flexible, según la fecha de tu reserva y las condiciones del host.",
    faqQuestion2: "¿Se puede pagar en cuotas?",
    faqAnswer2: "La mayoría de las reservas pueden gestionarse con distintas formas de pago, según el alojamiento y la opción elegida.",
    faqQuestion3: "¿Aceptan mascotas?",
    faqAnswer3: "Algunas propiedades permiten mascotas. La información se indica en cada alojamiento y también podés consultarlo antes de reservar.",
    faqQuestion4: "¿Hay desayuno incluido?",
    faqAnswer4: "En varios alojamientos incluye desayuno, mientras que en otros se ofrece como servicio extra. Lo podés confirmar en la descripción.",
    faqQuestion5: "¿Puedo consultar recomendaciones del destino?",
    faqAnswer5: "Claro. Blossom Stay te recomienda experiencias, senderos, atracciones y planes para que tu estadía sea más completa.",
    bookingEyebrow: "Reserva fácil",
    bookingTitle: "Elegí tus fechas y seguí con la reserva en segundos.",
    bookingDesc: "Una experiencia clara, rápida y pensada para que puedas comparar, elegir y confirmar el mejor alojamiento sin complicaciones.",
    bookingFeature1: "Cancelación flexible",
    bookingFeature2: "Atención 24/7",
    bookingFeature3: "Check-in y check-out claros",
    bookingFeature4: "Desayuno y Wi‑Fi incluidos",
    stayLabel: "Estadía",
    guestsLabel: "Huéspedes",
    reserveNow2: "Reservar ahora",
    whyBookEyebrow: "Por qué reservar con Blossom",
    whyBookTitle: "Todo lo que espera una buena experiencia de alojamiento",
    benefitCheckin: "Check-in flexible",
    benefitCheckinDesc: "Reservás con libertad y una experiencia más cómoda desde el primer momento.",
    benefitSuperhost: "Superhost quality",
    benefitSuperhostDesc: "Ambientes cuidadosamente seleccionados con atención personalizada y estética.",
    benefitSecure: "Pago seguro",
    benefitSecureDesc: "Procesos claros, confiables y pensados para viajar sin preocupaciones.",
    benefitLocation: "Ubicación ideal",
    benefitLocationDesc: "Acceso a parques, rutas, cataratas y zonas turísticas sin complicaciones.",
    zonesEyebrow: "Zonas populares",
    zonesTitle: "Elegí la zona que mejor encaje con tu viaje",
    zonesMap: "Ver mapa",
    zoneCenter: "Centro",
    zoneCenterDesc: "Comodidad, restaurantes, traslado y vida local.",
    zoneNature: "Naturaleza",
    zoneJungleTitle: "Selva misionera",
    zoneJungleDesc: "Ambiente tranquilo y cercanía con la naturaleza.",
    zoneAdventure: "Aventura",
    zoneFallsTitle: "Cataratas",
    zoneFallsDesc: "Perfecto para quienes quieren comenzar el día temprano.",
    zoneFamily: "Familia",
    zoneResidentialTitle: "Zona residencial",
    zoneResidentialDesc: "Más calma, más espacio y una experiencia muy relajada.",
    reviewsEyebrow: "Opiniones destacadas",
    reviewsTitle: "Viajero feliz, experiencia confirmada",
    reviewAverage: "Promedio",
    reviewRecommend: "Recomiendan",
    reviewStays: "Estadías",
    review1Text: "“La casa estaba hermosa, tranquila y muy bien ubicada para visitar todo Puerto Iguazú.”",
    review2Text: "“La atención fue excelente y el ambiente era perfecto para viajar con mi familia.”",
    review3Text: "“La cabaña tenía detalles muy lindos y estaba rodeada de naturaleza.”",
    contactEyebrow: "Contacto",
    contactTitle: "Hablemos de tu próxima estadía",
    contactWhatsApp: "WhatsApp directo",
    contactFormTitle: "Envíanos un mensaje",
    contactName: "Nombre",
    contactMessage: "Mensaje",
    contactSend: "Enviar consulta",
    contactLocation: "Puerto Iguazú, Misiones, Argentina",
    contactHours: "Lun a Dom · 9:00 a 20:00",
    activitiesTitle: "Actividades para vivir la experiencia completa",
    activitiesRequest: "Solicitar info",
    activityBadgeTop: "Top 1",
    activityFallsTitle: "Cataratas + miradores",
    activityFallsDesc: "Recorré los mejores miradores con guía local y horarios pensados para cada nivel de aventura.",
    activityFallsTime: "4 horas",
    activityFallsPrice: "Desde USD 44",
    activityFallsShort: "Miradores vistos desde lo más espectacular del parque.",
    activityDetail: "Ver detalle",
    activityReserve: "Reservar",
    activityNatureBadge: "Naturaleza",
    activityForestTitle: "Senderismo en la selva",
    activityForestDesc: "Una experiencia calma y auténtica con paisajes, fauna y paradas ideales para fotos.",
    activityForestTime: "3 horas",
    activityForestPrice: "Desde USD 38",
    activityForestShort: "Senderos tranquilos para conectar con la naturaleza.",
    activityDetail2: "Ver detalle",
    activityReserve2: "Reservar",
    activityLocalBadge: "Local",
    activityGastronomyTitle: "Tour gastronómico",
    activityGastronomyDesc: "Probá sabores regionales, cafés locales y experiencias que te conectan con la cultura del lugar.",
    activityGastronomyTime: "2.5 horas",
    activityGastronomyPrice: "Desde USD 31",
    activityGastronomyShort: "Sabor local con cafés, snacks y sabores auténticos.",
    activityDetail3: "Ver detalle",
    activityReserve3: "Reservar",
    activityCouplesBadge: "Parejas",
    activityRomanticTitle: "Tour romántico",
    activityRomanticDesc: "Un plan pensado para noches íntimas, vistas relajantes y momentos especiales en un entorno tropical.",
    activityRomanticTime: "2 horas",
    activityRomanticPrice: "Desde USD 34",
    activityRomanticShort: "Paseos relajados y momento perfecto para compartir.",
    activityDetail4: "Ver detalle",
    activityReserve4: "Reservar",
    reserveBtnShort: "Reservar",
    reserveBtnShort2: "Reservar",
    reserveBtnShort3: "Reservar",
    premiumBookBtn: "Reservar paquete",
    premiumBookBtn2: "Reservar paquete",
    premiumBookBtn3: "Reservar paquete"
  },
  en: {
    navHome: "Home",
    navDestinations: "Destinations",
    navSections: "Sections",
    navPlaces: "Places",
    navExperiences: "Experiences",
    navContact: "Contact",
    loginBtn: "Log in",
    signupBtn: "Sign up",
    adminBtn: "Admin",
    heroEyebrow: "Discover Puerto Iguazú",
    heroTitle: "Your perfect retreat, surrounded by nature.",
    heroDesc: "Find the best accommodations, stylish rooms and unique experiences near the Falls and the Misionera jungle.",
    heroExplore: "Explore stays",
    heroExperiencesBtn: "See experiences",
    heroCall: "Call now",
    statsStays: "Stays",
    statsReviews: "Reviews",
    statsSupport: "Support",
    searchTitle: "Find accommodation",
    searchDestination: "Destination",
    searchDates: "Dates",
    searchGuests: "Guests",
    searchButton: "Search",
    featuredEyebrow: "Featured stays",
    featuredTitle: "Choose the ideal place for your getaway",
    featuredViewAll: "See all",
    tabSectionEyebrow: "Special sections",
    tabSectionTitle: "Everything in separate tabs for better navigation",
    tabStays: "Stays",
    tabExperiences: "Experiences",
    tabServices: "Services",
    tabStayTag1: "Jungle",
    tabStayTitle1: "Casa Jardín Iguazú",
    tabStayDesc1: "Natural views, pool and an intimate atmosphere to relax.",
    tabStayTag2: "Family",
    tabStayTitle2: "Blossom House",
    tabStayDesc2: "Spacious, comfortable and designed for longer trips.",
    tabStayTag3: "Romantic",
    tabStayTitle3: "Cabina del Bosque",
    tabStayDesc3: "A special setting for a calm and relaxing getaway.",
    tabExpTag1: "Top",
    tabExpTitle1: "Falls tour",
    tabExpDesc1: "Guided tours to experience nature with thoughtful details.",
    tabExpTag2: "Nature",
    tabExpTitle2: "Trails and rest",
    tabExpDesc2: "Plans to explore the jungle and disconnect from noise.",
    tabExpTag3: "Adventure",
    tabExpTitle3: "Local experiences",
    tabExpDesc3: "Authentic moments with the best energy of the destination.",
    tabServiceTag1: "Support",
    tabServiceTitle1: "Flexible check-in",
    tabServiceDesc1: "Service designed so you can arrive with peace of mind.",
    tabServiceTag2: "Included",
    tabServiceTitle2: "Breakfast and Wi‑Fi",
    tabServiceDesc2: "Everything you need for a comfortable and relaxed stay.",
    tabServiceTag3: "Support",
    tabServiceTitle3: "Recommendations",
    tabServiceDesc3: "We guide you with the best plans in the area.",
    tagSelva: "Jungle",
    tagFamily: "Family",
    tagRomantic: "Romantic",
    stayCard1Desc: "Perfect for unplugging with a pool, garden and natural views.",
    stayCard2Desc: "Spacious and warm environment, ideal for travelling with family.",
    stayCard3Desc: "An intimate and peaceful atmosphere for a special getaway.",
    rooms2: "2 bedrooms",
    guests3: "3 guests",
    guests2Short: "2 guests",
    showcaseEyebrow: "Stay details",
    showcaseRating: "4.9 · 126 reviews",
    showcaseDesc: "A welcoming home with tropical gardens, a private pool and natural views that invite you to rest after exploring the region.",
    detailFeature1: "2 private bedrooms",
    detailFeature2: "1 full bathroom and amenities",
    detailFeature3: "Wi‑Fi, fully equipped kitchen and patio",
    detailFeature4: "Flexible check-in and 24/7 support",
    fromText: "From",
    reserveNow: "Reserve now",
    experienceEyebrow: "Unforgettable experiences",
    experienceTitle: "Live Puerto Iguazú with a truly authentic rest style.",
    experienceDesc: "From stays near the Falls to nature-focused escapes, Blossom Stay connects travelers with places that turn every outing into a memorable story.",
    experienceFeature1: "Strategic location near the main attractions",
    experienceFeature2: "Welcoming, modern and highly rated spaces",
    experienceFeature3: "Personalized recommendations for every trip",
    experienceTop: "Top experience",
    experienceTopText: "Falls tour + forest rest",
    experienceRec: "Recommendation",
    experienceRecText: "Stay with breakfast included + local guide",
    premiumWhyEyebrow: "Why choose Blossom Stay",
    premiumWhyTitle: "A premium experience designed to help you relax from the first minute.",
    ratingAverage: "Average rating",
    staysBooked: "booked stays",
    travelerFav: "Recommended by travelers",
    featureWifi: "High-speed Wi‑Fi",
    featureWifiDesc: "Stay connected without limits while working, relaxing or sharing moments.",
    featurePool: "Pool",
    featurePoolDesc: "Spaces designed to rest in style and enjoy the tropical climate.",
    featureParking: "Parking",
    featureParkingDesc: "Easy access and no stress about the car.",
    featureBreakfast: "Breakfast",
    featureBreakfastDesc: "Start each day with flavor, calm and the perfect energy for exploring.",
    featureClean: "Impeccable cleaning",
    featureCleanDesc: "Carefully prepared spaces with attention to every detail.",
    featureFlexible: "Flexible cancellation",
    featureFlexibleDesc: "Book with peace of mind and adjust your plans if your trip changes.",
    itineraryTitle: "Recommended itineraries for your trip",
    itineraryBuildPlan: "Design my plan",
    itineraryTrip1Title: "Total relaxation",
    itineraryTrip1Desc: "Rest, nature and a cozy closing with wine and scenery.",
    itineraryTrip1Item1: "Smooth check-in",
    itineraryTrip1Item2: "Trail and pool",
    itineraryTrip1Item3: "Recommended dinner",
    itineraryTrip1From: "From USD 248",
    itineraryTrip2Title: "Adventure and waterfalls",
    itineraryTrip2Desc: "The best mix of excursions, photos and rest moments.",
    itineraryTrip2Item1: "Falls + viewpoints",
    itineraryTrip2Item2: "Hiking",
    itineraryTrip2Item3: "Night tour",
    itineraryTrip2From: "From USD 336",
    itineraryTrip3Title: "Couples getaway",
    itineraryTrip3Desc: "A romantic plan with special details and time to unplug.",
    itineraryTrip3Item1: "Breakfast included",
    itineraryTrip3Item2: "Romantic tour",
    itineraryTrip3Item3: "Special moments",
    itineraryTrip3From: "From USD 416",
    premiumStep: "Step 10",
    premiumTitle: "Premium packages to enjoy more",
    premiumConsult: "Ask about a package",
    premiumTagLuxe: "Luxury",
    premiumLuxeDesc: "Elegant stay with breakfast, spa, Wi‑Fi and a premium rest experience.",
    premiumLuxeItem1: "Premium room with view",
    premiumLuxeItem2: "Breakfast included",
    premiumLuxeItem3: "Falls tour",
    premiumTagFamily: "Family",
    premiumFamilyTitle: "Family in the jungle",
    premiumFamilyDesc: "An ideal option for travelling with family with comfort, space and calm activities.",
    premiumFamilyItem1: "Spacious room",
    premiumFamilyItem2: "Hiking + activities",
    premiumFamilyItem3: "Flexible check-in",
    premiumTagRomantic: "Romantic",
    premiumRomanticTitle: "Intimate escape",
    premiumRomanticDesc: "Details for couples, a warm atmosphere and special moments in a tropical setting.",
    premiumRomanticItem1: "Romantic plan",
    premiumRomanticItem2: "Breakfast for two",
    premiumRomanticItem3: "Private setting",
    mapEyebrow: "Interactive map",
    mapTitle: "Explore stays by area",
    mapSeeProperties: "See properties",
    mapJungle: "Jungle",
    mapRiver: "River",
    mapNearbyTitle: "Nearby locations",
    mapNearby1: "Near the tourist zone",
    mapNearby2: "Close to trails and nature",
    mapNearby3: "Easy access for families and couples",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Everything you need to know before booking",
    faqQuestion1: "Is there free cancellation?",
    faqAnswer1: "Yes. Many of our accommodations include flexible cancellation depending on your booking date and host conditions.",
    faqQuestion2: "Can I pay in installments?",
    faqAnswer2: "Most reservations can be arranged with different payment options depending on the accommodation and chosen plan.",
    faqQuestion3: "Do you accept pets?",
    faqAnswer3: "Some properties allow pets. The information is listed for each accommodation and you can also ask before booking.",
    faqQuestion4: "Is breakfast included?",
    faqAnswer4: "Several accommodations include breakfast, while others offer it as an extra service. You can confirm it in the description.",
    faqQuestion5: "Can I get destination recommendations?",
    faqAnswer5: "Of course. Blossom Stay recommends experiences, trails, attractions and plans to make your stay more complete.",
    bookingEyebrow: "Easy booking",
    bookingTitle: "Choose your dates and continue with the reservation in seconds.",
    bookingDesc: "A clear, fast experience designed so you can compare, choose and confirm the best stay without complications.",
    bookingFeature1: "Flexible cancellation",
    bookingFeature2: "24/7 support",
    bookingFeature3: "Clear check-in and check-out",
    bookingFeature4: "Breakfast and Wi‑Fi included",
    stayLabel: "Stay",
    guestsLabel: "Guests",
    reserveNow2: "Reserve now",
    whyBookEyebrow: "Why book with Blossom",
    whyBookTitle: "Everything you expect from a great accommodation experience",
    benefitCheckin: "Flexible check-in",
    benefitCheckinDesc: "You book with freedom and a more comfortable experience from the beginning.",
    benefitSuperhost: "Superhost quality",
    benefitSuperhostDesc: "Carefully selected spaces with personalized attention and style.",
    benefitSecure: "Secure payment",
    benefitSecureDesc: "Clear, reliable processes designed to help you travel with peace of mind.",
    benefitLocation: "Ideal location",
    benefitLocationDesc: "Access to parks, routes, waterfalls and tourist areas without complications.",
    zonesEyebrow: "Popular areas",
    zonesTitle: "Choose the area that best matches your trip",
    zonesMap: "See map",
    zoneCenter: "Center",
    zoneCenterDesc: "Comfort, restaurants, transfers and local life.",
    zoneNature: "Nature",
    zoneJungleTitle: "Misionera jungle",
    zoneJungleDesc: "A calm atmosphere with close contact with nature.",
    zoneAdventure: "Adventure",
    zoneFallsTitle: "Waterfalls",
    zoneFallsDesc: "Perfect for those who want to start the day early.",
    zoneFamily: "Family",
    zoneResidentialTitle: "Residential area",
    zoneResidentialDesc: "More calm, more space and a very relaxed experience.",
    reviewsEyebrow: "Featured reviews",
    reviewsTitle: "Happy traveler, confirmed experience",
    reviewAverage: "Average",
    reviewRecommend: "Recommend",
    reviewStays: "Stays",
    review1Text: "“The house was beautiful, quiet and very well located for exploring all of Puerto Iguazú.”",
    review2Text: "“The service was excellent and the atmosphere was perfect for traveling with my family.”",
    review3Text: "“The cabin had lovely details and was surrounded by nature.”",
    contactEyebrow: "Contact",
    contactTitle: "Let’s talk about your next stay",
    contactWhatsApp: "Direct WhatsApp",
    contactFormTitle: "Send us a message",
    contactName: "Name",
    contactMessage: "Message",
    contactSend: "Send inquiry",
    contactLocation: "Puerto Iguazú, Misiones, Argentina",
    contactHours: "Mon to Sun · 9:00 to 20:00",
    activitiesTitle: "Activities to enjoy the complete experience",
    activitiesRequest: "Request info",
    activityBadgeTop: "Top 1",
    activityFallsTitle: "Falls + viewpoints",
    activityFallsDesc: "Explore the best viewpoints with a local guide and schedules designed for every adventure level.",
    activityFallsTime: "4 hours",
    activityFallsPrice: "From USD 44",
    activityFallsShort: "Viewpoints seen from the most spectacular side of the park.",
    activityDetail: "View details",
    activityReserve: "Book",
    activityNatureBadge: "Nature",
    activityForestTitle: "Jungle hike",
    activityForestDesc: "A calm and authentic experience with landscapes, wildlife and ideal photo stops.",
    activityForestTime: "3 hours",
    activityForestPrice: "From USD 38",
    activityForestShort: "Peaceful trails to connect with nature.",
    activityDetail2: "View details",
    activityReserve2: "Book",
    activityLocalBadge: "Local",
    activityGastronomyTitle: "Gastronomy tour",
    activityGastronomyDesc: "Taste regional flavors, local coffee and experiences that connect you with the culture of the place.",
    activityGastronomyTime: "2.5 hours",
    activityGastronomyPrice: "From USD 31",
    activityGastronomyShort: "Local flavor with coffee, snacks and authentic tastes.",
    activityDetail3: "View details",
    activityReserve3: "Book",
    activityCouplesBadge: "Couples",
    activityRomanticTitle: "Romantic tour",
    activityRomanticDesc: "A plan designed for intimate nights, relaxed views and special moments in a tropical setting.",
    activityRomanticTime: "2 hours",
    activityRomanticPrice: "From USD 34",
    activityRomanticShort: "Relaxed walks and the perfect time to share.",
    activityDetail4: "View details",
    activityReserve4: "Book",
    reserveBtnShort: "Reserve",
    reserveBtnShort2: "Reserve",
    reserveBtnShort3: "Reserve",
    premiumBookBtn: "Book package",
    premiumBookBtn2: "Book package",
    premiumBookBtn3: "Book package"
  },
  pt: {
    navHome: "Início",
    navDestinations: "Destinos",
    navSections: "Seções",
    navPlaces: "Locais",
    navExperiences: "Experiências",
    navContact: "Contato",
    loginBtn: "Entrar",
    signupBtn: "Cadastrar",
    adminBtn: "Admin",
    heroEyebrow: "Descubra Puerto Iguazú",
    heroTitle: "Seu refúgio perfeito, cercado pela natureza.",
    heroDesc: "Encontre os melhores alojamentos, quartos com estilo e experiências únicas perto das Cataratas e da selva missioneira.",
    heroExplore: "Explorar hospedagens",
    heroExperiencesBtn: "Ver experiências",
    heroCall: "Ligar agora",
    statsStays: "Hospedagens",
    statsReviews: "Avaliações",
    statsSupport: "Atendimento",
    searchTitle: "Buscar hospedagem",
    searchDestination: "Destino",
    searchDates: "Datas",
    searchGuests: "Hóspedes",
    searchButton: "Buscar",
    featuredEyebrow: "Hospedagens em destaque",
    featuredTitle: "Escolha o lugar ideal para sua escapada",
    featuredViewAll: "Ver todos",
    tabSectionEyebrow: "Seções especiais",
    tabSectionTitle: "Tudo em abas separadas para melhor navegação",
    tabStays: "Hospedagens",
    tabExperiences: "Experiências",
    tabServices: "Serviços",
    tabStayTag1: "Selva",
    tabStayTitle1: "Casa Jardín Iguazú",
    tabStayDesc1: "Vista natural, piscina e ambiente íntimo para relaxar.",
    tabStayTag2: "Família",
    tabStayTitle2: "Blossom House",
    tabStayDesc2: "Espaço amplo, confortável e pensado para viagens longas.",
    tabStayTag3: "Romântico",
    tabStayTitle3: "Cabina del Bosque",
    tabStayDesc3: "Um ambiente especial para viver uma escapada tranquila.",
    tabExpTag1: "Top",
    tabExpTitle1: "Tour das cataratas",
    tabExpDesc1: "Passeios guiados para viver a natureza com detalhes.",
    tabExpTag2: "Natureza",
    tabExpTitle2: "Trilhas e descanso",
    tabExpDesc2: "Planos para explorar a selva e se desconectar do barulho.",
    tabExpTag3: "Aventura",
    tabExpTitle3: "Experiências locais",
    tabExpDesc3: "Momentos autênticos com a melhor energia do destino.",
    tabServiceTag1: "Atendimento",
    tabServiceTitle1: "Check-in flexível",
    tabServiceDesc1: "Serviço pensado para você chegar com tranquilidade.",
    tabServiceTag2: "Incluído",
    tabServiceTitle2: "Café da manhã e Wi‑Fi",
    tabServiceDesc2: "Tudo que você precisa para uma estadia confortável e relaxante.",
    tabServiceTag3: "Suporte",
    tabServiceTitle3: "Recomendações",
    tabServiceDesc3: "Orientamos você com os melhores planos da região.",
    tagSelva: "Selva",
    tagFamily: "Família",
    tagRomantic: "Romântico",
    stayCard1Desc: "Ideal para desligar com piscina, jardim e vista natural.",
    stayCard2Desc: "Espaço amplo e acolhedor, ideal para viajar em família.",
    stayCard3Desc: "Ambiente íntimo e tranquilo para uma escapada especial.",
    rooms2: "2 quartos",
    guests3: "3 hóspedes",
    guests2Short: "2 hóspedes",
    showcaseEyebrow: "Detalhes da hospedagem",
    showcaseRating: "4.9 · 126 avaliações",
    showcaseDesc: "Uma casa acolhedora com jardins tropicais, piscina privada e vista natural que convida ao descanso após explorar a região.",
    detailFeature1: "2 quartos privados",
    detailFeature2: "1 banheiro completo e amenities",
    detailFeature3: "Wi‑Fi, cozinha equipada e pátio",
    detailFeature4: "Check-in flexível e atendimento 24/7",
    fromText: "A partir de",
    reserveNow: "Reservar agora",
    experienceEyebrow: "Experiências inesquecíveis",
    experienceTitle: "Viva Puerto Iguazú com um estilo de descanso autêntico.",
    experienceDesc: "Desde hospedagens perto das Cataratas até escapadas focadas na natureza, a Blossom Stay conecta viajantes a lugares que transformam cada passeio em uma história memorável.",
    experienceFeature1: "Localização estratégica perto dos principais atrativos",
    experienceFeature2: "Ambientes acolhedores, modernos e muito bem avaliados",
    experienceFeature3: "Recomendações personalizadas para cada viagem",
    experienceTop: "Top experiência",
    experienceTopText: "Tour das Cataratas + descanso na floresta",
    experienceRec: "Recomendação",
    experienceRecText: "Estadia com café da manhã incluído + guia local",
    premiumWhyEyebrow: "Por que escolher a Blossom Stay",
    premiumWhyTitle: "Uma experiência premium pensada para relaxar desde o primeiro minuto.",
    ratingAverage: "Avaliação média",
    staysBooked: "estadas reservadas",
    travelerFav: "Recomendado por viajantes",
    featureWifi: "Wi‑Fi de alta velocidade",
    featureWifiDesc: "Conecte-se sem limites enquanto trabalha, relaxa ou compartilha momentos.",
    featurePool: "Piscina",
    featurePoolDesc: "Espaços pensados para descansar com estilo e aproveitar o clima tropical.",
    featureParking: "Estacionamento",
    featureParkingDesc: "Facilidade para chegar e se deslocar sem preocupação com o carro.",
    featureBreakfast: "Café da manhã",
    featureBreakfastDesc: "Comece cada dia com sabor, calma e a energia perfeita para explorar.",
    featureClean: "Limpeza impecável",
    featureCleanDesc: "Ambientes cuidadosos com atenção impecável a cada detalhe.",
    featureFlexible: "Cancelamento flexível",
    featureFlexibleDesc: "Reserve com tranquilidade e ajuste seu plano se a viagem mudar.",
    itineraryTitle: "Itinerários recomendados para sua viagem",
    itineraryBuildPlan: "Montar meu plano",
    itineraryTrip1Title: "Relaxamento total",
    itineraryTrip1Desc: "Descanso, natureza e um fechamento com vinho e paisagem.",
    itineraryTrip1Item1: "Check-in tranquilo",
    itineraryTrip1Item2: "Trilha e piscina",
    itineraryTrip1Item3: "Jantar recomendado",
    itineraryTrip1From: "A partir de USD 248",
    itineraryTrip2Title: "Aventura e cachoeiras",
    itineraryTrip2Desc: "A melhor mistura entre excursões, fotos e momentos de descanso.",
    itineraryTrip2Item1: "Cataratas + mirantes",
    itineraryTrip2Item2: "Trilha",
    itineraryTrip2Item3: "Tour noturno",
    itineraryTrip2From: "A partir de USD 336",
    itineraryTrip3Title: "Viagem a dois",
    itineraryTrip3Desc: "Um plano romântico com detalhes especiais e tempo para desligar.",
    itineraryTrip3Item1: "Café da manhã incluído",
    itineraryTrip3Item2: "Tour romântico",
    itineraryTrip3Item3: "Momentos especiais",
    itineraryTrip3From: "A partir de USD 416",
    premiumStep: "Etapa 10",
    premiumTitle: "Pacotes premium para aproveitar melhor",
    premiumConsult: "Consultar pacote",
    premiumTagLuxe: "Luxuoso",
    premiumLuxeDesc: "Estadia elegante com café da manhã, spa, Wi‑Fi e experiência premium de descanso.",
    premiumLuxeItem1: "Quarto premium com vista",
    premiumLuxeItem2: "Café da manhã incluído",
    premiumLuxeItem3: "Tour de cataratas",
    premiumTagFamily: "Família",
    premiumFamilyTitle: "Família na selva",
    premiumFamilyDesc: "Uma opção ideal para viajar em família com conforto, espaço e atividades calmas.",
    premiumFamilyItem1: "Quarto amplo",
    premiumFamilyItem2: "Trilha + atividades",
    premiumFamilyItem3: "Check-in flexível",
    premiumTagRomantic: "Romântico",
    premiumRomanticTitle: "Escapada íntima",
    premiumRomanticDesc: "Detalhes para casais, ambiente acolhedor e momentos especiais em um cenário tropical.",
    premiumRomanticItem1: "Plano romântico",
    premiumRomanticItem2: "Café da manhã para dois",
    premiumRomanticItem3: "Ambiente privado",
    mapEyebrow: "Mapa interativo",
    mapTitle: "Explore hospedagens por região",
    mapSeeProperties: "Ver propriedades",
    mapJungle: "Selva",
    mapRiver: "Rio",
    mapNearbyTitle: "Localizações próximas",
    mapNearby1: "Perto da zona turística",
    mapNearby2: "Muito perto de trilhas e natureza",
    mapNearby3: "Acesso confortável para famílias e casais",
    faqEyebrow: "Perguntas frequentes",
    faqTitle: "Tudo o que você precisa saber antes de reservar",
    faqQuestion1: "Há cancelamento gratuito?",
    faqAnswer1: "Sim. Muitas de nossas acomodações incluem cancelamento flexível, conforme a data da reserva e as condições do anfitrião.",
    faqQuestion2: "Posso pagar em parcelas?",
    faqAnswer2: "A maioria das reservas pode ser gerenciada com diferentes formas de pagamento, de acordo com a acomodação e a opção escolhida.",
    faqQuestion3: "Aceitam animais?",
    faqAnswer3: "Algumas propriedades permitem animais. As informações são indicadas em cada acomodação e também podem ser consultadas antes da reserva.",
    faqQuestion4: "Há café da manhã incluído?",
    faqAnswer4: "Em várias acomodações, o café da manhã está incluído, enquanto em outras é oferecido como serviço extra. Você pode confirmar pela descrição.",
    faqQuestion5: "Posso consultar recomendações do destino?",
    faqAnswer5: "Claro. A Blossom Stay recomenda experiências, trilhas, atrações e planos para que sua estadia seja mais completa.",
    bookingEyebrow: "Reserva fácil",
    bookingTitle: "Escolha as datas e siga com a reserva em segundos.",
    bookingDesc: "Uma experiência clara, rápida e pensada para que você compare, escolha e confirme a melhor hospedagem sem complicações.",
    bookingFeature1: "Cancelamento flexível",
    bookingFeature2: "Atendimento 24/7",
    bookingFeature3: "Check-in e check-out claros",
    bookingFeature4: "Café da manhã e Wi‑Fi incluídos",
    stayLabel: "Estadía",
    guestsLabel: "Hóspedes",
    reserveNow2: "Reservar agora",
    whyBookEyebrow: "Por que reservar com a Blossom",
    whyBookTitle: "Tudo o que se espera de uma boa experiência de hospedagem",
    benefitCheckin: "Check-in flexível",
    benefitCheckinDesc: "Você reserva com liberdade e uma experiência mais confortável desde o início.",
    benefitSuperhost: "Qualidade Superhost",
    benefitSuperhostDesc: "Ambientes cuidadosamente selecionados com atenção personalizada e estética.",
    benefitSecure: "Pagamento seguro",
    benefitSecureDesc: "Processos claros e confiáveis pensados para viajar sem preocupações.",
    benefitLocation: "Localização ideal",
    benefitLocationDesc: "Acesso a parques, rotas, cachoeiras e áreas turísticas sem complicações.",
    zonesEyebrow: "Zonas populares",
    zonesTitle: "Escolha a área que melhor combina com sua viagem",
    zonesMap: "Ver mapa",
    zoneCenter: "Centro",
    zoneCenterDesc: "Conforto, restaurantes, transfer e vida local.",
    zoneNature: "Natureza",
    zoneJungleTitle: "Selva missioneira",
    zoneJungleDesc: "Ambiente tranquilo e proximidade com a natureza.",
    zoneAdventure: "Aventura",
    zoneFallsTitle: "Cataratas",
    zoneFallsDesc: "Perfeito para quem gosta de começar o dia cedo.",
    zoneFamily: "Família",
    zoneResidentialTitle: "Zona residencial",
    zoneResidentialDesc: "Mais calma, mais espaço e uma experiência muito relaxante.",
    reviewsEyebrow: "Avaliações em destaque",
    reviewsTitle: "Viajante feliz, experiência confirmada",
    reviewAverage: "Média",
    reviewRecommend: "Recomendam",
    reviewStays: "Estadias",
    review1Text: "“A casa era linda, tranquila e muito bem localizada para visitar todo Puerto Iguazú.”",
    review2Text: "“O atendimento foi excelente e o ambiente era perfeito para viajar com a minha família.”",
    review3Text: "“A cabana tinha detalhes muito bonitos e ficava rodeada de natureza.”",
    contactEyebrow: "Contato",
    contactTitle: "Vamos falar da sua próxima estadia",
    contactWhatsApp: "WhatsApp direto",
    contactFormTitle: "Envie-nos uma mensagem",
    contactName: "Nome",
    contactMessage: "Mensagem",
    contactSend: "Enviar consulta",
    contactLocation: "Puerto Iguazú, Misiones, Argentina",
    contactHours: "Seg a Dom · 9:00 às 20:00",
    activitiesTitle: "Atividades para viver a experiência completa",
    activitiesRequest: "Solicitar informação",
    activityBadgeTop: "Top 1",
    activityFallsTitle: "Cataratas + mirantes",
    activityFallsDesc: "Explore os melhores mirantes com guia local e horários pensados para cada nível de aventura.",
    activityFallsTime: "4 horas",
    activityFallsPrice: "A partir de USD 44",
    activityFallsShort: "Mirantes vistos do lado mais espetacular do parque.",
    activityDetail: "Ver detalhes",
    activityReserve: "Reservar",
    activityNatureBadge: "Natureza",
    activityForestTitle: "Trilha na selva",
    activityForestDesc: "Uma experiência calma e autêntica com paisagens, fauna e paradas ideais para fotos.",
    activityForestTime: "3 horas",
    activityForestPrice: "A partir de USD 38",
    activityForestShort: "Trilhas tranquilas para conectar com a natureza.",
    activityDetail2: "Ver detalhes",
    activityReserve2: "Reservar",
    activityLocalBadge: "Local",
    activityGastronomyTitle: "Tour gastronômico",
    activityGastronomyDesc: "Experimente sabores regionais, cafés locais e experiências que conectam você com a cultura do lugar.",
    activityGastronomyTime: "2,5 horas",
    activityGastronomyPrice: "A partir de USD 31",
    activityGastronomyShort: "Sabor local com cafés, snacks e sabores autênticos.",
    activityDetail3: "Ver detalhes",
    activityReserve3: "Reservar",
    activityCouplesBadge: "Casais",
    activityRomanticTitle: "Tour romântico",
    activityRomanticDesc: "Um plano pensado para noites íntimas, vistas relaxantes e momentos especiais em um ambiente tropical.",
    activityRomanticTime: "2 horas",
    activityRomanticPrice: "A partir de USD 34",
    activityRomanticShort: "Passeios relaxantes e o momento perfeito para compartilhar.",
    activityDetail4: "Ver detalhes",
    activityReserve4: "Reservar",
    reserveBtnShort: "Reservar",
    reserveBtnShort2: "Reservar",
    reserveBtnShort3: "Reservar",
    premiumBookBtn: "Reservar pacote",
    premiumBookBtn2: "Reservar pacote",
    premiumBookBtn3: "Reservar pacote"
  },
  fr: {
    navHome: "Accueil",
    navDestinations: "Destinations",
    navSections: "Sections",
    navPlaces: "Lieux",
    navExperiences: "Expériences",
    navContact: "Contact",
    loginBtn: "Se connecter",
    signupBtn: "S'inscrire",
    adminBtn: "Admin",
    heroEyebrow: "Découvrez Puerto Iguazú",
    heroTitle: "Votre refuge parfait, entouré de nature.",
    heroDesc: "Trouvez les meilleurs hébergements, chambres élégantes et expériences uniques près des chutes et de la jungle missionnaire.",
    heroExplore: "Explorer les séjours",
    heroExperiencesBtn: "Voir les expériences",
    heroCall: "Appeler maintenant",
    statsStays: "Séjours",
    statsReviews: "Avis",
    statsSupport: "Support",
    searchTitle: "Rechercher un hébergement",
    searchDestination: "Destination",
    searchDates: "Dates",
    searchGuests: "Invités",
    searchButton: "Rechercher",
    featuredEyebrow: "Séjours en vedette",
    featuredTitle: "Choisissez le lieu idéal pour votre escapade",
    featuredViewAll: "Voir tout",
    tabSectionEyebrow: "Sections spéciales",
    tabSectionTitle: "Tout dans des onglets séparés pour une meilleure navigation",
    tabStays: "Séjours",
    tabExperiences: "Expériences",
    tabServices: "Services",
    tabStayTag1: "Jungle",
    tabStayTitle1: "Casa Jardín Iguazú",
    tabStayDesc1: "Vue naturelle, piscine et atmosphère intime pour vous détendre.",
    tabStayTag2: "Famille",
    tabStayTitle2: "Blossom House",
    tabStayDesc2: "Espace spacieux, confortable et pensé pour de longs séjours.",
    tabStayTag3: "Romantique",
    tabStayTitle3: "Cabina del Bosque",
    tabStayDesc3: "Un cadre spécial pour une escapade calme et reposante.",
    tabExpTag1: "Top",
    tabExpTitle1: "Tour des chutes",
    tabExpDesc1: "Visites guidées pour vivre la nature avec des détails soignés.",
    tabExpTag2: "Nature",
    tabExpTitle2: "Sentiers et repos",
    tabExpDesc2: "Des plans pour explorer la jungle et vous déconnecter du bruit.",
    tabExpTag3: "Aventure",
    tabExpTitle3: "Expériences locales",
    tabExpDesc3: "Des moments authentiques avec la meilleure énergie de la destination.",
    tabServiceTag1: "Accueil",
    tabServiceTitle1: "Check-in flexible",
    tabServiceDesc1: "Un service pensé pour vous accueillir en toute tranquillité.",
    tabServiceTag2: "Inclus",
    tabServiceTitle2: "Petit-déjeuner et Wi‑Fi",
    tabServiceDesc2: "Tout ce qu'il faut pour un séjour confortable et relaxant.",
    tabServiceTag3: "Support",
    tabServiceTitle3: "Recommandations",
    tabServiceDesc3: "Nous vous guidons avec les meilleurs plans de la région.",
    tagSelva: "Jungle",
    tagFamily: "Famille",
    tagRomantic: "Romantique",
    stayCard1Desc: "Idéal pour vous déconnecter avec une piscine, un jardin et une vue naturelle.",
    stayCard2Desc: "Espace ample et chaleureux, idéal pour voyager en famille.",
    stayCard3Desc: "Un cadre intime et paisible pour une escapade spéciale.",
    rooms2: "2 chambres",
    guests3: "3 invités",
    guests2Short: "2 invités",
    showcaseEyebrow: "Détails du séjour",
    showcaseRating: "4.9 · 126 avis",
    showcaseDesc: "Une maison accueillante avec des jardins tropicaux, une piscine privée et une vue naturelle qui vous invite à vous reposer après avoir exploré la région.",
    detailFeature1: "2 chambres privées",
    detailFeature2: "1 salle de bain complète et commodités",
    detailFeature3: "Wi‑Fi, cuisine équipée et patio",
    detailFeature4: "Check-in flexible et assistance 24/7",
    fromText: "À partir de",
    reserveNow: "Réserver maintenant",
    experienceEyebrow: "Expériences inoubliables",
    experienceTitle: "Vivez Puerto Iguazú avec un style de repos authentique.",
    experienceDesc: "Des séjours près des chutes aux escapades axées sur la nature, Blossom Stay relie les voyageurs à des endroits qui transforment chaque sortie en une histoire mémorable.",
    experienceFeature1: "Emplacement stratégique près des principales attractions",
    experienceFeature2: "Espaces accueillants, modernes et très bien notés",
    experienceFeature3: "Recommandations personnalisées pour chaque voyage",
    experienceTop: "Top expérience",
    experienceTopText: "Tour des chutes + repos en forêt",
    experienceRec: "Recommandation",
    experienceRecText: "Séjour avec petit-déjeuner inclus + guide local",
    premiumWhyEyebrow: "Pourquoi choisir Blossom Stay",
    premiumWhyTitle: "Une expérience premium pensée pour vous détendre dès la première minute.",
    ratingAverage: "Note moyenne",
    staysBooked: "séjours réservés",
    travelerFav: "Recommandé par les voyageurs",
    featureWifi: "Wi‑Fi haut débit",
    featureWifiDesc: "Restez connecté sans limites pendant que vous travaillez, vous détendez ou partagez des moments.",
    featurePool: "Piscine",
    featurePoolDesc: "Des espaces pensés pour se détendre avec style et profiter du climat tropical.",
    featureParking: "Parking",
    featureParkingDesc: "Facilité d'accès sans stress lié à la voiture.",
    featureBreakfast: "Petit-déjeuner",
    featureBreakfastDesc: "Commencez chaque journée avec des saveurs, du calme et l'énergie parfaite pour explorer.",
    featureClean: "Nettoyage impeccable",
    featureCleanDesc: "Des espaces soignés avec une attention impeccable à chaque détail.",
    featureFlexible: "Annulation flexible",
    featureFlexibleDesc: "Réservez en toute tranquillité et ajustez votre plan si votre voyage change.",
    itineraryTitle: "Itinéraires recommandés pour votre voyage",
    itineraryBuildPlan: "Créer mon plan",
    itineraryTrip1Title: "Détente totale",
    itineraryTrip1Desc: "Repos, nature et une fin de journée avec vin et paysage.",
    itineraryTrip1Item1: "Check-in serein",
    itineraryTrip1Item2: "Randonnée et piscine",
    itineraryTrip1Item3: "Dîner recommandé",
    itineraryTrip1From: "À partir de USD 248",
    itineraryTrip2Title: "Aventure et cascades",
    itineraryTrip2Desc: "Le meilleur mélange d'excursions, de photos et de moments de repos.",
    itineraryTrip2Item1: "Chutes + points de vue",
    itineraryTrip2Item2: "Randonnée",
    itineraryTrip2Item3: "Tour nocturne",
    itineraryTrip2From: "À partir de USD 336",
    itineraryTrip3Title: "Voyage à deux",
    itineraryTrip3Desc: "Un plan romantique avec des détails spéciaux et du temps pour déconnecter.",
    itineraryTrip3Item1: "Petit-déjeuner inclus",
    itineraryTrip3Item2: "Tour romantique",
    itineraryTrip3Item3: "Moments spéciaux",
    itineraryTrip3From: "À partir de USD 416",
    premiumStep: "Étape 10",
    premiumTitle: "Forfaits premium pour mieux profiter",
    premiumConsult: "Demander un forfait",
    premiumTagLuxe: "Luxe",
    premiumLuxeDesc: "Séjour élégant avec petit-déjeuner, spa, Wi‑Fi et expérience premium de repos.",
    premiumLuxeItem1: "Chambre premium avec vue",
    premiumLuxeItem2: "Petit-déjeuner inclus",
    premiumLuxeItem3: "Tour des chutes",
    premiumTagFamily: "Famille",
    premiumFamilyTitle: "Famille dans la jungle",
    premiumFamilyDesc: "Une option idéale pour voyager en famille avec confort, espace et activités calmes.",
    premiumFamilyItem1: "Chambre spacieuse",
    premiumFamilyItem2: "Randonnée + activités",
    premiumFamilyItem3: "Check-in flexible",
    premiumTagRomantic: "Romantique",
    premiumRomanticTitle: "Évasion intime",
    premiumRomanticDesc: "Des détails pour les couples, une ambiance chaleureuse et des moments spéciaux dans un cadre tropical.",
    premiumRomanticItem1: "Plan romantique",
    premiumRomanticItem2: "Petit-déjeuner pour deux",
    premiumRomanticItem3: "Cadre privé",
    mapEyebrow: "Carte interactive",
    mapTitle: "Explorez les séjours par zone",
    mapSeeProperties: "Voir les propriétés",
    mapJungle: "Jungle",
    mapRiver: "Rivière",
    mapNearbyTitle: "Lieux à proximité",
    mapNearby1: "Près de la zone touristique",
    mapNearby2: "Très près des sentiers et de la nature",
    mapNearby3: "Accès pratique pour familles et couples",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "Tout ce que vous devez savoir avant de réserver",
    faqQuestion1: "Y a-t-il une annulation gratuite ?",
    faqAnswer1: "Oui. Beaucoup de nos hébergements incluent une annulation flexible selon la date de votre réservation et les conditions de l'hôte.",
    faqQuestion2: "Peut-on payer en plusieurs fois ?",
    faqAnswer2: "La plupart des réservations peuvent être gérées avec différentes options de paiement selon l'hébergement et l'option choisie.",
    faqQuestion3: "Acceptez-vous les animaux ?",
    faqAnswer3: "Certaines propriétés acceptent les animaux. L'information est indiquée pour chaque hébergement et vous pouvez aussi le demander avant de réserver.",
    faqQuestion4: "Le petit-déjeuner est-il inclus ?",
    faqAnswer4: "Plusieurs hébergements incluent le petit-déjeuner, tandis que d'autres l'offrent comme service supplémentaire. Vous pouvez le confirmer dans la description.",
    faqQuestion5: "Puis-je obtenir des recommandations sur la destination ?",
    faqAnswer5: "Bien sûr. Blossom Stay recommande des expériences, des sentiers, des attractions et des plans pour rendre votre séjour plus complet.",
    bookingEyebrow: "Réservation facile",
    bookingTitle: "Choisissez vos dates et poursuivez la réservation en quelques secondes.",
    bookingDesc: "Une expérience claire, rapide et pensée pour que vous puissiez comparer, choisir et confirmer le meilleur hébergement sans complications.",
    bookingFeature1: "Annulation flexible",
    bookingFeature2: "Assistance 24/7",
    bookingFeature3: "Check-in et check-out clairs",
    bookingFeature4: "Petit-déjeuner et Wi‑Fi inclus",
    stayLabel: "Séjour",
    guestsLabel: "Invités",
    reserveNow2: "Réserver maintenant",
    whyBookEyebrow: "Pourquoi réserver chez Blossom",
    whyBookTitle: "Tout ce que l'on attend d'une bonne expérience d'hébergement",
    benefitCheckin: "Check-in flexible",
    benefitCheckinDesc: "Vous réservez avec liberté et une expérience plus confortable dès le début.",
    benefitSuperhost: "Qualité Superhost",
    benefitSuperhostDesc: "Des espaces soigneusement sélectionnés avec une attention personnalisée et un style soigné.",
    benefitSecure: "Paiement sécurisé",
    benefitSecureDesc: "Des processus clairs et fiables pensés pour voyager sans souci.",
    benefitLocation: "Emplacement idéal",
    benefitLocationDesc: "Accès aux parcs, routes, cascades et zones touristiques sans complications.",
    zonesEyebrow: "Zones populaires",
    zonesTitle: "Choisissez la zone qui correspond le mieux à votre voyage",
    zonesMap: "Voir la carte",
    zoneCenter: "Centre",
    zoneCenterDesc: "Confort, restaurants, transferts et vie locale.",
    zoneNature: "Nature",
    zoneJungleTitle: "Jungle missionnaire",
    zoneJungleDesc: "Un atmosphère calme et un contact proche avec la nature.",
    zoneAdventure: "Aventure",
    zoneFallsTitle: "Chutes",
    zoneFallsDesc: "Parfait pour ceux qui veulent commencer la journée tôt.",
    zoneFamily: "Famille",
    zoneResidentialTitle: "Zone résidentielle",
    zoneResidentialDesc: "Plus de calme, plus d'espace et une expérience très relaxante.",
    reviewsEyebrow: "Avis en vedette",
    reviewsTitle: "Voyageur heureux, expérience confirmée",
    reviewAverage: "Moyenne",
    reviewRecommend: "Recommandent",
    reviewStays: "Séjours",
    review1Text: "“La maison était magnifique, calme et très bien située pour visiter tous les endroits de Puerto Iguazú.”",
    review2Text: "“Le service était excellent et l'ambiance était parfaite pour voyager en famille.”",
    review3Text: "“La cabane avait de jolis détails et était entourée de nature.”",
    contactEyebrow: "Contact",
    contactTitle: "Parlons de votre prochain séjour",
    contactWhatsApp: "WhatsApp direct",
    contactFormTitle: "Envoyez-nous un message",
    contactName: "Nom",
    contactMessage: "Message",
    contactSend: "Envoyer la demande",
    contactLocation: "Puerto Iguazú, Misiones, Argentine",
    contactHours: "Lun au Dim · 9:00 à 20:00",
    activitiesTitle: "Activités pour vivre l'expérience complète",
    activitiesRequest: "Demander des infos",
    activityBadgeTop: "Top 1",
    activityFallsTitle: "Chutes + belvédères",
    activityFallsDesc: "Explorez les meilleurs belvédères avec un guide local et des horaires conçus pour chaque niveau d'aventure.",
    activityFallsTime: "4 heures",
    activityFallsPrice: "À partir de USD 44",
    activityFallsShort: "Belvédères vus depuis le point le plus spectaculaire du parc.",
    activityDetail: "Voir le détail",
    activityReserve: "Réserver",
    activityNatureBadge: "Nature",
    activityForestTitle: "Randonnée en jungle",
    activityForestDesc: "Une expérience calme et authentique avec des paysages, de la faune et des arrêts parfaits pour les photos.",
    activityForestTime: "3 heures",
    activityForestPrice: "À partir de USD 38",
    activityForestShort: "Des sentiers paisibles pour se reconnecter à la nature.",
    activityDetail2: "Voir le détail",
    activityReserve2: "Réserver",
    activityLocalBadge: "Local",
    activityGastronomyTitle: "Tour gastronomique",
    activityGastronomyDesc: "Goûtez aux saveurs régionales, aux cafés locaux et aux expériences qui vous connectent à la culture du lieu.",
    activityGastronomyTime: "2,5 heures",
    activityGastronomyPrice: "À partir de USD 31",
    activityGastronomyShort: "Saveur locale avec cafés, snacks et goûts authentiques.",
    activityDetail3: "Voir le détail",
    activityReserve3: "Réserver",
    activityCouplesBadge: "Couples",
    activityRomanticTitle: "Tour romantique",
    activityRomanticDesc: "Un plan pensé pour des soirées intimes, des vues relaxantes et des moments spéciaux dans un cadre tropical.",
    activityRomanticTime: "2 heures",
    activityRomanticPrice: "À partir de USD 34",
    activityRomanticShort: "Promenades relaxantes et moment parfait à partager.",
    activityDetail4: "Voir le détail",
    activityReserve4: "Réserver",
    reserveBtnShort: "Réserver",
    reserveBtnShort2: "Réserver",
    reserveBtnShort3: "Réserver",
    premiumBookBtn: "Réserver le forfait",
    premiumBookBtn2: "Réserver le forfait",
    premiumBookBtn3: "Réserver le forfait"
  }
};

const ADMIN_USERS = [
  { user: 'admin', password: 'blossom123' },
  { user: 'Mia Benitez', password: 'blossom123' },
  { user: 'Nicol Nestto', password: 'blossom123' },
  { user: 'Acsa Goncalves', password: 'blossom123' },
  { user: 'Sonia Villalba', password: 'blossom123' },
  { user: 'Alfonso Fransisco', password: 'blossom123' }
];

const registeredUsers = JSON.parse(localStorage.getItem('blossomRegisteredUsers') || '[]');
const reservations = JSON.parse(localStorage.getItem('blossomReservations') || '[]');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = [];
let compareItems = [];
const nightlyRate = 96;
const multiNightDiscount = 0.1;

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : 'es';
  const languageData = translations[selectedLanguage];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = languageData[key];
    if (value) {
      element.textContent = value;
    }
  });

  document.documentElement.lang = selectedLanguage;
  localStorage.setItem('blossomLanguage', selectedLanguage);

  if (languageSelect) {
    languageSelect.value = selectedLanguage;
  }

  const langLabel = document.querySelector('.lang-label');
  if (langLabel) {
    langLabel.textContent = selectedLanguage.toUpperCase();
  }
}

if (languageSelect) {
  languageSelect.addEventListener('change', (event) => {
    applyLanguage(event.target.value);
  });
}

const savedLanguage = localStorage.getItem('blossomLanguage') || 'es';
applyLanguage(savedLanguage);

function updateComparePanel() {
  if (!compareList || !compareCount) return;

  compareCount.textContent = `${compareItems.length}/2`;

  if (compareItems.length === 0) {
    compareList.innerHTML = '<p>Seleccioná dos propiedades para comparar.</p>';
    return;
  }

  compareList.innerHTML = compareItems
    .map((item) => `
      <div class="compare-item">
        <div>
          <strong>${item.name}</strong>
          <small>${item.zone}</small>
        </div>
        <div class="compare-meta">
          <span>⭐ ${item.rating}</span>
          <span>USD ${item.price}</span>
        </div>
        <button type="button" aria-label="Quitar ${item.name}" data-remove="${item.name}">×</button>
      </div>
    `)
    .join('');

  compareList.querySelectorAll('button[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedName = button.dataset.remove;
      compareItems = compareItems.filter((item) => item.name !== selectedName);
      const card = document.querySelector(`.place-card[data-name="${selectedName}"]`);
      if (card) {
        const btn = card.querySelector('.compare-btn');
        btn?.classList.remove('active');
        btn.textContent = 'Comparar';
        card.classList.remove('is-compare');
      }
      updateComparePanel();
    });
  });
}

function updateCatalogVisibility() {
  const priceValue = priceFilter?.value || 'all';
  const typeValue = typeFilter?.value || 'all';
  const guestValue = guestFilter?.value || 'all';
  const serviceValue = serviceFilter?.value || 'all';

  placeCards.forEach((card) => {
    const price = Number(card.dataset.price || 0);
    const guests = Number(card.dataset.guests || 0);
    const cardType = card.dataset.type || '';
    const services = (card.dataset.services || '').split(',');
    const matchesPrice = priceValue === 'all' ||
      (priceValue === 'under-80' && price < 80) ||
      (priceValue === '80-120' && price >= 80 && price <= 120) ||
      (priceValue === 'over-120' && price > 120);
    const matchesType = typeValue === 'all' || cardType === typeValue;
    const matchesGuests = guestValue === 'all' ||
      (guestValue === '2' && guests <= 2) ||
      (guestValue === '4' && guests >= 3 && guests <= 4) ||
      (guestValue === '6' && guests >= 6);
    const matchesService = serviceValue === 'all' || services.includes(serviceValue);

    const visible = matchesPrice && matchesType && matchesGuests && matchesService;
    card.style.display = visible ? 'block' : 'none';
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function renderAdminLists() {
  if (!registeredList || !reservationList) return;

  if (registeredUsers.length === 0) {
    registeredList.innerHTML = '<li>No hay registros aún.</li>';
  } else {
    registeredList.innerHTML = registeredUsers
      .map((user) => `<li><strong>${user.name}</strong> · ${user.email}</li>`)
      .join('');
  }

  if (reservations.length === 0) {
    reservationList.innerHTML = '<li>No hay reservas aún.</li>';
  } else {
    reservationList.innerHTML = reservations
      .map((item) => `<li><strong>${item.name}</strong> · DNI ${item.dni} · ${item.hotel} · ${item.dates || 'Sin fechas'}</li>`)
      .join('');
  }
}

function showAdminPanel() {
  if (adminSection) {
    adminSection.classList.remove('hidden');
  }
}

function hideAdminPanel() {
  if (adminSection) {
    adminSection.classList.add('hidden');
  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

function updateBookingText() {
  if (!bookingRange) return;

  updateBookingPrice();

  if (selectedDates.length === 0) {
    bookingRange.textContent = 'Seleccioná fechas';
    return;
  }

  if (selectedDates.length === 1) {
    bookingRange.textContent = formatDate(selectedDates[0]);
    return;
  }

  const [start, end] = selectedDates.slice().sort((a, b) => a - b);
  bookingRange.textContent = `${formatDate(start)} - ${formatDate(end)}`;
}

function updateBookingPrice() {
  if (!bookingTotal || !bookingPriceLabel) return;

  const hasRange = selectedDates.length === 2;
  const [start, end] = selectedDates.slice().sort((a, b) => a - b);
  const nights = hasRange ? Math.round((end - start) / 86400000) : 0;
  const hasDiscount = nights >= 3;
  const subtotal = nights * nightlyRate;
  const savings = hasDiscount ? subtotal * multiNightDiscount : 0;
  const total = subtotal - savings;

  if (!hasRange || nights === 0) {
    bookingPriceLabel.textContent = 'Desde';
    bookingTotal.textContent = `USD ${nightlyRate} / noche`;
    bookingDiscount?.setAttribute('hidden', '');
    if (bookingNights) bookingNights.textContent = 'Seleccioná las fechas';
    bookingSavings?.setAttribute('hidden', '');
    return;
  }

  bookingPriceLabel.textContent = `Total por ${nights} ${nights === 1 ? 'noche' : 'noches'}`;
  bookingTotal.textContent = `USD ${total.toFixed(0)}`;
  if (bookingNights) bookingNights.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;

  if (hasDiscount) {
    if (bookingDiscount) {
      bookingDiscount.textContent = '10% de descuento aplicado';
      bookingDiscount.removeAttribute('hidden');
    }
    if (bookingSavings) {
      bookingSavings.textContent = `Ahorrás USD ${savings.toFixed(0)}`;
      bookingSavings.removeAttribute('hidden');
    }
  } else {
    bookingDiscount?.setAttribute('hidden', '');
    bookingSavings?.setAttribute('hidden', '');
  }
}

function renderCalendar() {
  if (!calendarGrid || !monthLabel) return;

  calendarGrid.innerHTML = '';

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  monthLabel.textContent = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(currentYear, currentMonth, 1));

  for (let i = 0; i < startDay; i += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    const date = new Date(currentYear, currentMonth, day);
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isSelected = selectedDates.some((selected) => selected.getTime() === normalizedDate.getTime());

    cell.className = 'calendar-day';
    if (isSelected) cell.classList.add('selected');

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.slice().sort((a, b) => a - b);
      if (normalizedDate > start && normalizedDate < end) {
        cell.classList.add('range');
      }
    }

    cell.textContent = day;
    cell.addEventListener('click', () => {
      if (selectedDates.length === 2) {
        selectedDates = [normalizedDate];
      } else {
        const existing = selectedDates.find((selected) => selected.getTime() === normalizedDate.getTime());
        if (existing) {
          selectedDates = selectedDates.filter((selected) => selected.getTime() !== normalizedDate.getTime());
        } else {
          selectedDates.push(normalizedDate);
        }
      }

      selectedDates.sort((a, b) => a - b);
      updateBookingText();
      renderCalendar();
    });

    calendarGrid.appendChild(cell);
  }
}

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.transition = 'transform 0.2s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? '♥' : '♡';
  });
});

compareButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.place-card');
    const name = card?.querySelector('h3')?.textContent?.trim() || 'Propiedad';
    const price = Number(card?.dataset.price || 0);
    const rating = card?.dataset.rating || '4.8';
    const zone = card?.dataset.zone || 'Sin zona';

    const exists = compareItems.some((item) => item.name === name);
    if (exists) {
      compareItems = compareItems.filter((item) => item.name !== name);
      button.classList.remove('active');
      button.textContent = 'Comparar';
      card?.classList.remove('is-compare');
    } else if (compareItems.length < 2) {
      compareItems.push({ name, price, rating, zone });
      button.classList.add('active');
      button.textContent = 'Agregado';
      card?.classList.add('is-compare');
    }

    updateComparePanel();
  });
});

mapPins.forEach((pin) => {
  pin.addEventListener('click', () => {
    const targetId = pin.dataset.target;
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    mapPins.forEach((item) => item.classList.toggle('active', item === pin));
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.classList.add('is-compare');

    setTimeout(() => {
      targetCard.classList.remove('is-compare');
    }, 1800);
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isOpen) {
      item.classList.add('active');
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    if (typeFilter) {
      typeFilter.value = filter === 'all' ? 'all' : filter;
    }

    updateCatalogVisibility();
  });
});

[priceFilter, typeFilter, guestFilter, serviceFilter].forEach((select) => {
  select?.addEventListener('change', () => {
    const allFilterButtons = document.querySelectorAll('.filter-btn');
    const activeType = typeFilter?.value || 'all';
    allFilterButtons.forEach((button) => {
      const matches = button.dataset.filter === activeType;
      button.classList.toggle('active', activeType !== 'all' ? matches : button.dataset.filter === 'all');
    });

    updateCatalogVisibility();
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetPanel = button.dataset.tab;

    tabButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === targetPanel;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  });
});

modalTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    if (modalId) openModal(modalId);
  });
});

adminTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    openModal('adminModal');
  });
});

reserveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal('reservationModal');
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-overlay');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const showcase = document.getElementById('showcase');
  if (showcase) {
    showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

placeCards.forEach((card) => {
  card.dataset.name = card.querySelector('h3')?.textContent?.trim() || 'Propiedad';
});

const comparePanel = document.getElementById('comparePanel');
if (comparePanel) {
  comparePanel.setAttribute('aria-live', 'polite');
}

signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const newUser = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || '')
  };

  registeredUsers.push(newUser);
  localStorage.setItem('blossomRegisteredUsers', JSON.stringify(registeredUsers));
  renderAdminLists();
  signupForm.reset();

  const submitButton = signupForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = '¡Registrado!';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = 'Registrarme';
      submitButton.disabled = false;
      closeModal('signupModal');
    }, 1200);
  }
});

adminLoginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(adminLoginForm);
  const user = String(formData.get('adminUser') || '').trim().toLowerCase();
  const password = String(formData.get('adminPassword') || '');
  const isValid = ADMIN_USERS.some((entry) => entry.user.toLowerCase() === user && entry.password === password);

  if (isValid) {
    showAdminPanel();
    closeModal('adminModal');
    adminLoginForm.reset();
  } else {
    alert('Credenciales inválidas');
  }
});

reservationModal?.addEventListener('click', (event) => {
  if (event.target === reservationModal) {
    reservationModal.classList.add('hidden');
    reservationModal.setAttribute('aria-hidden', 'true');
  }
});

const reservationForm = document.getElementById('reservationForm');
reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(reservationForm);
  const booking = {
    name: String(formData.get('name') || ''),
    dni: String(formData.get('dni') || ''),
    cardNumber: String(formData.get('cardNumber') || ''),
    hotel: 'Casa Jardín Iguazú',
    dates: selectedDates.length > 0 ? `${selectedDates.map((d) => formatDate(d)).join(' - ')}` : 'Sin fechas seleccionadas'
  };

  reservations.push(booking);
  localStorage.setItem('blossomReservations', JSON.stringify(reservations));
  renderAdminLists();

  const submitButton = reservationForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = '¡Reservado!';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = 'Confirmar reserva';
      submitButton.disabled = false;
      reservationForm.reset();
      closeModal('reservationModal');
    }, 1400);
  }
});

logoutAdminButton?.addEventListener('click', () => {
  hideAdminPanel();
});

prevMonthBtn?.addEventListener('click', () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  renderCalendar();
});

nextMonthBtn?.addEventListener('click', () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  renderCalendar();
});

renderAdminLists();
hideAdminPanel();
renderCalendar();
updateBookingText();
updateCatalogVisibility();
updateComparePanel();
showMenuSection('inicio');