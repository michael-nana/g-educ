import { parseAnnalText } from './annal-parser';

describe('parseAnnalText', () => {
  it('repère les sections de cours, exercices et QCM dans du texte aplati', () => {
    const result = parseAnnalText(
      'COURS 1 : Les fractions permettent de représenter des parts égales. EXERCICE 1 : Calculs sur les fractions. QUESTION 1. Quelle fraction vaut la moitié ? A. 1/2 B. 2/3',
    );

    expect(result.lessons).toHaveLength(1);
    expect(result.lessons[0].title).toBe('COURS 1');
    expect(result.exercises).toHaveLength(1);
    expect(result.exercises[0].title).toBe('EXERCICE 1');
    expect(result.questions).toEqual([
      { statement: 'Quelle fraction vaut la moitié ?', options: ['1/2', '2/3'] },
    ]);
  });

  it('ne devine pas de question ni de bonne réponse si aucun QCM explicite est trouvé', () => {
    const result = parseAnnalText('COURS 1 : Une leçon assez longue pour être conservée. EXERCICE 1 : Résoudre cette équation par le calcul.');

    expect(result.questions).toEqual([]);
  });
});
