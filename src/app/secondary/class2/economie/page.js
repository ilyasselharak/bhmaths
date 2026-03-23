import ClassTemplate from '@/components/ClassTemplate';

export const metadata = {
  title: '1ère Bac - Sciences Économiques | BHMaths',
  description: 'Ressources mathématiques pour la 1ère année du Baccalauréat - Section Sciences Économiques',
};

const sections = [
  {
    title: 'Cours',
    description: 'Accédez à tous les cours de mathématiques',
    href: '/course/firstBacEconomics',
    action: 'Voir les cours',
  },
  {
    title: 'Exercices',
    description: "Exercices d'application et de pratique",
    href: '/exercice/firstBacEconomics',
    action: 'Pratiquer',
  },
  {
    title: 'Devoirs',
    description: 'Devoirs et examens corrigés',
    href: '/devoir/firstBacEconomics',
    action: "S'entraîner",
  },
  {
    title: 'Résumés',
    description: 'Fiches de révision et résumés',
    href: '/secondary/class2/economie/resumes',
    action: 'Réviser',
  },
];

export default function FirstBacEconomiePage() {
  return (
    <ClassTemplate
      title="1ère Bac - Sciences Économiques"
      description="Cours, exercices et devoirs de mathématiques"
      sections={sections}
    />
  );
}
