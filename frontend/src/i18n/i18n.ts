import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navbar
      home: "Accueil",
      catalogue: "Catalogue",
      selection: "Ma Sélection",
      atelier_nav: "L'Atelier", 
      contact: "Contact",
      
      // Hero & Homepage
      hero_title: "L'Élégance",
      hero_subtitle: "à la main",
      hero_desc: "Donnez vie à vos envies avec des créations sur mesure, façonnées avec passion dans notre atelier de Douala.",
      hero_cta_primary: "Découvrir la Collection",
      hero_cta_secondary: "Notre Histoire",

      creations: {
  model_1: "Robe Signature Flore",
  model_2: "Ensemble Pagne Chic",
  model_3: "Kaba Moderne",
  model_4: "Tailleur Chantal"
},
      
      section_creations_title: "Clients",
      section_creations_italic: "Satisfaits",
      section_creations_badge: "Exclusivités de l'atelier",
      section_creations_link: "Découvrir la collection",
      section_creations_model: "Modèle Signature",
      section_creations_details: "Détails de la pièce",
      
      // FAQ
      faq_title: "Questions Fréquentes",
      faq_q1: "Quels sont vos délais pour une tenue sur mesure ?",
      faq_a1: "Pour une tenue de ville, comptez 7 à 10 jours. Pour une robe de mariée ou une tenue d'apparat, prévoyez 3 à 6 semaines selon la complexité.",
      faq_q2: "Dois-je apporter mon propre tissu ?",
      faq_a2: "Vous avez le choix ! Vous pouvez apporter votre pagne ou tissu, ou choisir parmi notre sélection de tissus premium (soie, dentelle, basins) disponibles à l'atelier.",
      faq_q3: "Faites-vous des essayages à domicile ?",
      faq_a3: "Les essayages se font prioritairement à notre atelier à Douala pour disposer de tout le matériel. Cependant, un service VIP à domicile est possible sur demande.",
      faq_q4: "Comment se passe le paiement ?",
      faq_a4: "Nous demandons un acompte de 50% à la commande pour lancer la confection, et le solde lors du dernier essayage avant livraison.",

      // Catalogue
      cat_all: "Tous",
      cat_wedding: "Mariage", 
      cat_custom: "Sur Mesure", 
      cat_ready: "Prêt-à-porter", 
      select: "Choisir", 
      selected: "Sélectionné", 
      no_name: "Nouvelle Création",

      testimonials_title: "Témoignages",
testimonials_subtitle: "Ce que nos clients disent de nous",
leave_review_btn: "Laisser un avis",
close_form: "Fermer",
form_name_placeholder: "Votre nom",
form_rating_label: "Note",
form_comment_placeholder: "Votre message...",
submit_review: "Envoyer l'avis",
review_success_msg: "Merci ! Votre avis est en attente de validation.",
review_error_msg: "Une erreur est survenue lors de l'envoi.",
no_testimonials_yet: "Aucun témoignage pour le moment.",

      // Spécialités
      spec_title: "Nos Spécialités",
      spec_subtitle: "L'excellence du geste au service de votre élégance",
      spec_btn: "Découvrir l'Atelier",
      spec_trad_title: "Tenues Traditionnelles",
      spec_trad_desc: "Kabas, Gandouras et ensembles en pagne façonnés dans le respect des traditions.",
      spec_emb_title: "Broderie d'Art",
      spec_emb_desc: "Des finitions à la main d'une précision rare pour des pièces uniques.",
      spec_suit_title: "Tailleurs & Costumes",
      spec_suit_desc: "Une coupe impeccable et une structure rigoureuse pour affirmer votre allure.",
      spec_dress_title: "Robes sur mesure",
      spec_dress_desc: "Chaque création est moulée sur vos mesures pour une silhouette parfaite.",
      
      // Page Atelier
      atelier: {
        hero_subtitle: "L'Excellence du Geste",
        hero_title: "L’Atelier SOH & CHANTAL",
        hero_quote: "Là où chaque fil raconte une histoire et chaque tissu devient une émotion.",
        founders_section_title: "Le Cœur Créatif",
        founder1_role: "Fondatrice & Créatrice principale",
        founder1_bio: "Passionnée par l'élégance africaine, Flore insuffle à chaque création de SOH & CHANTAL une âme unique.",
        founder2_role: "Co-fondatrice & Responsable gestion",
        founder2_bio: "Experte en finitions de haute couture, Chantal veille à la perfection technique de chaque pièce.",
        locaux_section_title: "Immersion dans nos Locaux",
        locaux_1: "Espace de coupe",
        locaux_2: "Showroom",
        locaux_3: "Zone de couture",
        location_city: "Situé à shell, Douala, Cameroun",
        location_desc: "Un espace dédié à la haute couture africaine.",
        team_section_title: "Nos Mains d'Or",
        role_senior: "Couturière Senior",
        role_embroidery: "Spécialiste Broderie",
        role_modeliste: "Modéliste",
        role_finishing: "Finition"
      },

      // Pied de page / Contact
      cta_final_title: "L'élégance commence par un premier rendez-vous.",
      cta_final_desc: "Venez nous rendre visite dans notre atelier à Douala pour discuter de votre projet de couture sur-mesure.",
      cta_final_button: "Prendre rendez-vous",
      location: "Douala, Cameroun",

      info_main_title: "Centre d'Informations",

      info_blog_title: "Bienvenue dans l'univers de SOH & CHANTAL. Nos créateurs partagent ici les secrets de la haute couture africaine, de la sélection des tissus aux dernières tendances de Douala. Suivez nos récits pour comprendre l'âme de nos collections et apprendre à sublimer vos tenues au quotidien.",

      info_blog_text: "Découvrez les coulisses de l'atelier et nos conseils mode...",

      info_privacy_title: "Chez SOH & CHANTAL, la protection de votre vie privée est une priorité. Nous collectons uniquement les informations nécessaires au traitement de vos commandes via WhatsApp. Vos données ne sont jamais partagées avec des tiers et sont utilisées exclusivement pour vous offrir un service sur-mesure de haute qualité.",

      info_privacy_text: "Vos données sont protégées et ne sont jamais partagées...",

    }
  },
  en: {
    translation: {
      home: "Home",
      catalogue: "Catalogue",
      selection: "My Selection",
      atelier_nav: "The Atelier",
      contact: "Contact",
      
      hero_title: "Elegance",
      hero_subtitle: "Handcrafted",
      hero_desc: "Bring your desires to life with bespoke creations, passionately crafted in our Douala workshop.",
      hero_cta_primary: "Discover Collection",
      hero_cta_secondary: "Our Story",
      
      section_creations_title: "Latest",
      section_creations_italic: "Creations",
      section_creations_badge: "Atelier Exclusives",
      section_creations_link: "View the collection",
      section_creations_model: "Signature Model",
      section_creations_details: "Piece Details",

      creations: {
  model_1: "Flore Signature Dress",
  model_2: "Chic Wax Set",
  model_3: "Modern Kaba",
  model_4: "Chantal Suit",

  // Contact Page

  contact_title: "Restons en contact",
contact_phone_label: "Téléphone",
contact_email_label: "Email",
contact_address_label: "Atelier",
contact_form_subtitle: "Envoyez-nous un message",
contact_btn_email: "Envoyer par Email",
contact_btn_whatsapp: "Discuter sur WhatsApp",
contact_wa_warn: "Veuillez entrer votre nom et un message.",
contact_wa_intro: "Bonjour SOH & CHANTAL,",
contact_success_msg: "✨ Message envoyé avec succès !",
contact_error_msg: "Désolé, une erreur est survenue.",
sending: "Envoi...",
},

testimonials_title: "Testimonials",
testimonials_subtitle: "What our clients say about us",
leave_review_btn: "Leave a Review",
close_form: "Close",
form_name_placeholder: "Your name",
form_rating_label: "Rating",
form_comment_placeholder: "Your message...",
submit_review: "Submit Review",
review_success_msg: "Thank you! Your review is pending approval.",
review_error_msg: "An error occurred during submission.",
no_testimonials_yet: "No testimonials yet.",
      
      faq_title: "Frequently Asked Questions",
      faq_q1: "What are your lead times for bespoke outfits?",
      faq_a1: "For casual wear, allow 7 to 10 days. For wedding dresses or ceremonial attire, allow 3 to 6 weeks depending on complexity.",
      faq_q2: "Do I need to bring my own fabric?",
      faq_a2: "The choice is yours! You can bring your own fabric, or choose from our selection of premium fabrics (silk, lace, basins) available at the atelier.",
      faq_q3: "Do you offer home fittings?",
      faq_a3: "Fittings are primarily done at our Douala workshop. However, a VIP home service is available upon request.",
      faq_q4: "How does payment work?",
      faq_a4: "We require a 50% deposit upon ordering to start production, and the balance at the final fitting before delivery.",

      cta_final_title: "Elegance begins with a first appointment.",
      cta_final_desc: "Visit our Douala workshop to discuss your bespoke couture project.",
      cta_final_button: "Book an Appointment",
      location: "Douala, Cameroon",

      cat_all: "All", 
      cat_wedding: "Wedding", 
      cat_custom: "Bespoke", 
      cat_ready: "Ready-to-wear", 
      select: "Select", 
      selected: "Selected", 
      no_name: "New Creation",

      spec_title: "Our Specialties",
      spec_subtitle: "Excellence in craftsmanship for your elegance",
      spec_btn: "Discover the Atelier",
      spec_trad_title: "Traditional Wear",
      spec_trad_desc: "Kabas, Gandouras, and wax print sets crafted with respect for tradition.",
      spec_emb_title: "Art Embroidery",
      spec_emb_desc: "Hand-finished precision to give character to your unique pieces.",
      spec_suit_title: "Suits & Tailoring",
      spec_suit_desc: "Impeccable cuts and rigorous structure to enhance your silhouette.",
      spec_dress_title: "Bespoke Dresses",
      spec_dress_desc: "Each creation is molded to your measurements for a perfect fit.",

      atelier: {
        hero_subtitle: "Excellence in Motion",
        hero_title: "The SOH & CHANTAL Atelier",
        hero_quote: "Where every thread tells a story and every fabric becomes an emotion.",
        founders_section_title: "The Creative Heart",
        founder1_role: "Founder & Lead Designer",
        founder1_bio: "Passionate about African elegance, Flore breathes a unique soul into every SOH & CHANTAL creation.",
        founder2_role: "Co-founder & Management Head",
        founder2_bio: "Expert in haute couture finishing, Chantal ensures the technical perfection of every piece.",
        locaux_section_title: "A Look Inside Our Workshop",
        locaux_1: "Cutting Area",
        locaux_2: "Showroom",
        locaux_3: "Sewing Zone",
        location_city: "Located in shell, Douala, Cameroon",
        location_desc: "A space dedicated to African haute couture.",
        team_section_title: "Our Golden Hands",
        role_senior: "Senior Seamstress",
        role_embroidery: "Embroidery Specialist",
        role_modeliste: "Pattern Maker",
        role_finishing: "Finishing Specialist",

        info_main_title: "Information Center",
      info_blog_title: "Welcome to the world of SOH & CHANTAL...",
      info_blog_text: "Discover the workshop's behind-the-scenes...",
      info_privacy_title: "At SOH & CHANTAL, protecting your privacy is a priority...",
 // Contact Page
      contact_title: "Get in touch",
contact_phone_label: "Phone",
contact_email_label: "Email",
contact_address_label: "Workshop",
contact_form_subtitle: "Send us a message",
contact_btn_email: "Send via Email",
contact_btn_whatsapp: "Chat on WhatsApp",
contact_wa_warn: "Please enter your name and a message.",
contact_wa_intro: "Hello SOH & CHANTAL,",
contact_success_msg: "✨ Message sent successfully!",
contact_error_msg: "Sorry, an error occurred.",
sending: "Sending...",
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;