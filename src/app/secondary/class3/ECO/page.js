import ClassTemplate from '@/components/ClassTemplate';

export const metadata = {
  title: '2ème Bac - Sciences Économiques | BHMaths',
  description: 'Ressources mathématiques pour la 2ème année du Baccalauréat - Section Sciences Économiques',
};

const sections = [
  {
    title: 'Cours',
    description: 'Accédez à tous les cours de mathématiques',
    href: '/course/2BacEco',
    action: 'Voir les cours',
  },
  {
    title: 'Exercices',
    description: "Exercices d'application et de pratique",
    href: '/exercice/2BacEco',
    action: 'Pratiquer',
  },
  {
    title: 'Devoirs',
    description: 'Devoirs et examens corrigés',
    href: '/devoir/2BacEco',
    action: "S'entraîner",
  },
  {
    title: 'Examens Nationaux',
    description: 'Examens nationaux des années précédentes',
    href: '/exams/2BacEco',
    action: 'Se préparer',
  },
  {
    title: 'Examens Blancs',
    description: "Examens blancs pour s'entraîner",
    href: '/examBlancs/2BacEco',
    action: "S'entraîner",
  },
];

export default function SecondBacEcoPage() {
  return (
    <ClassTemplate
      title="2ème Bac - Sciences Économiques"
      description="Cours, exercices et devoirs de mathématiques"
      sections={sections}
    />
  );
}
