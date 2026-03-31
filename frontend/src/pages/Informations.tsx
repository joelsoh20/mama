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
          {sections.map((section, index) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id={section.id}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                {section.icon}
                <h2 className="text-2xl font-serif text-[#003366] dark:text-yellow-500">
                  {section.title}
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}