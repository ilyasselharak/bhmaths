import ClassTemplate from '@/components/ClassTemplate';

export const metadata = {
  title: '2ème Bac - Lettres | BHMaths',
  description: 'Ressources mathématiques pour la 2ème année du Baccalauréat - Section Lettres',
};

const sections = [
  {
    title: 'Cours',
    description: 'Accédez à tous les cours de mathématiques',
    href: '/course/2BacTCT',
    action: 'Voir les cours',
  },
  {
    title: 'Exercices',
    description: "Exercices d'application et de pratique",
    href: '/exercice/2BacTCT',
    action: 'Pratiquer',
  },
  {
    title: 'Devoirs',
    description: 'Devoirs et examens corrigés',
    href: '/devoir/2BacTech',
    action: "S'entraîner",
  },
  {
    title: 'Examens Nationaux',
    description: 'Examens nationaux des années précédentes',
    href: '/exams/2BacLettres',
    action: 'Se préparer',
  },
  {
    title: 'Examens Blancs',
    description: "Examens blancs pour s'entraîner",
    href: '/examBlancs/2BacLettres',
    action: "S'entraîner",
  },
];

export default function SecondBacLettresPage() {
  return (
    <ClassTemplate
      title="2ème Bac - Lettres"
      description="Cours, exercices et devoirs de mathématiques"
      sections={sections}
    />
  );
}
