import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Info, BookOpen, ShieldCheck, FileText, Map } from 'lucide-react';

export default function Informations() {
  const { t } = useTranslation();

  const sections = [
    { id: 'blog', icon: <BookOpen className="text-blue-500" />, title: t('info_blog_title'), content: t('info_blog_text') },
    { id: 'privacy', icon: <ShieldCheck className="text-green-500" />, title: t('info_privacy_title'), content: t('info_privacy_text') },
    { id: 'terms', icon: <FileText className="text-orange-500" />, title: t('info_terms_title'), content: t('info_terms_text') },
    { id: 'sitemap', icon: <Map className="text-purple-500" />, title: t('info_sitemap_title'), content: t('info_sitemap_text') },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <Info className="mx-auto text-[#b8860b] mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-serif text-[#003366] dark:text-white mb-6">
            {t('info_main_title')}
          </h1>
          <div className="w-24 h-1 bg-[#b8860b] mx-auto"></div>
        </motion.div>

        <div className="space-y-16">
          {/* {sections.map((section, index) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id={section.id}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-sm"
            > */}
              <div className="flex items-center gap-4 mb-6">
                {/* {section.icon} */}
                <h4 className="text-2xl font-serif text-[#003366] dark:text-yellow-500">
                  Dernière mise à jour : 04/04/2026

Bienvenue sur S&C Mode.
La protection de vos données personnelles est importante pour nous. Cette politique vous explique quelles données nous collectons, pourquoi nous les collectons, et comment vous pouvez les gérer.

1. Responsable de traitement
Le responsable du traitement des données est :
S&C Mode sohjoel20@gmail.com <br />
2. Données collectées
Nous pouvons collecter les données suivantes :

Données d’identification : nom, prénom, adresse email, numéro de téléphone (si vous remplissez un formulaire de contact, d’inscription ou de commande).

Données de connexion : adresse IP, type de navigateur, pages visitées, durée de visite (via des cookies ou journaux serveur).

Données de paiement (le cas échéant) : elles sont traitées directement par notre prestataire de paiement sécurisé ; nous ne stockons pas vos informations bancaires complètes. <br />

3. Finalités du traitement
Vos données sont utilisées pour :

Répondre à vos demandes de contact.

Gérer votre compte utilisateur (si applicable).

Traiter vos commandes ou abonnements.

Améliorer notre site (analyse statistique).

Respecter nos obligations légales. <br />

4. Base légale
Nous traitons vos données sur la base :

De votre consentement (ex. : inscription à une newsletter).

De l’exécution d’un contrat (ex. : commande).

De notre intérêt légitime (ex. : amélioration du service).

D’une obligation légale (ex. : facturation). <br />

5. Destinataires des données
Vos données sont accessibles uniquement aux personnes habilitées de S&C Mode et, le cas échéant, à nos sous-traitants (hébergeur, outil d’emailing, service de paiement). Nous ne vendons pas vos données à des tiers. <br />

6. Durée de conservation
Vos données sont conservées :

Pour les demandes de contact : 3 ans après le dernier contact.

Pour les comptes clients : jusqu’à suppression de votre compte, puis 5 ans à des fins probatoires (sauf opposition).

Pour les cookies : 13 mois maximum. <br />

7. Transferts hors UE
Si nous utilisons des outils dont les serveurs sont situés hors de l’Union européenne (ex. : États-Unis), nous nous assurons que des garanties appropriées sont en place (clauses contractuelles types).
<br />
8. Vos droits
Conformément au RGPD, vous disposez des droits suivants :

D’accès : savoir quelles données nous détenons sur vous.

De rectification : les faire corriger si elles sont inexactes.

D’effacement : demander la suppression de vos données (« droit à l’oubli »).

D’opposition : vous opposer à un traitement (ex. : prospection).

À la limitation : suspendre temporairement l’utilisation de vos données.

À la portabilité : recevoir vos données dans un format structuré.

Pour exercer ces droits, écrivez à : [votre email dédié]. Nous répondrons dans un délai d’un mois.

Vous avez également le droit d’introduire une réclamation auprès de la CNIL (www.cnil.fr).
<br />
9. Cookies
Nous utilisons des cookies essentiels (fonctionnement du site) et éventuellement des cookies analytiques (ex. : Google Analytics). Vous pouvez paramétrer vos préférences via le bandeau cookies affiché lors de votre première visite.
<br />
10. Sécurité
Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre la perte, l’intrusion ou l’accès non autorisé.
                </h4>
              </div>
              
              {/* <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div> */}
            {/* </motion.section>
          ))} */}
        </div>
      </div>
    </div>
  );
}