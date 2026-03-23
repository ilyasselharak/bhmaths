import ClassTemplate from '@/components/ClassTemplate';

export const metadata = {
  title: '2ème Bac - PC-SVT | BHMaths',
  description: 'Ressources mathématiques pour la 2ème année du Baccalauréat - Section PC-SVT',
};

const sections = [
  {
    title: 'Cours',
    description: 'Accédez à tous les cours de mathématiques',
    href: '/course/2BacPCSVT',
    action: 'Voir les cours',
  },
  {
    title: 'Exercices',
    description: "Exercices d'application et de pratique",
    href: '/exercice/2BacPCSVT',
    action: 'Pratiquer',
  },
  {
    title: 'Devoirs',
    description: 'Devoirs et examens corrigés',
    href: '/devoir/2BacPCSVT',
    action: "S'entraîner",
  },
  {
    title: 'Examens Nationaux',
    description: 'Examens nationaux des années précédentes',
    href: '/exams/2BacPCSVT',
    action: 'Se préparer',
  },
  {
    title: 'Examens Blancs',
    description: "Examens blancs pour s'entraîner",
    href: '/examBlancs/2BacPCSVT',
    action: "S'entraîner",
  },
];

export default function SecondBacPcSvtPage() {
  return (
    <ClassTemplate
      title="2ème Bac - PC-SVT"
      description="Cours, exercices et devoirs de mathématiques"
      sections={sections}
    />
  );
}
