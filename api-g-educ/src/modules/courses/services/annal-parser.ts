const EXERCISE_HEADING = /\b(EXERCICE|PROBLÈME|PROBLEME)\s*(\d+|[IVX]+)?\s*[:.\-–—]?/gi;
const COURSE_HEADING = /\b(COURS|LEÇON|LECON)\s*(\d+|[IVX]+)?\s*[:.\-–—]?/gi;
const QUESTION_HEADING = /(?:\bQUESTION\s*(\d{1,2})\s*[).:\-]|(?:^|\n)\s*(\d{1,2})\s*[).:\-])\s*/gi;

type ParsedQuestion = { statement: string; options: string[] };

function findSections(text: string, pattern: RegExp) {
  const headings = [...text.matchAll(pattern)].map((match) => ({
    index: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
    label: [match[1], match[2]].filter(Boolean).join(' ').trim(),
  }));
  if (!headings.length) return [];
  return headings.map((heading, index) => ({
    title: heading.label,
    text: text.slice(heading.end, headings[index + 1]?.index ?? text.length).trim(),
  })).filter((section) => section.text.length > 20);
}

function findQuestions(text: string): ParsedQuestion[] {
  const headings = [...text.matchAll(QUESTION_HEADING)].map((match) => ({
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }));
  return headings.flatMap((heading, index) => {
    const block = text.slice(heading.end, headings[index + 1]?.start ?? text.length);
    const optionMatches = [...block.matchAll(/(?:^|\s)([A-Da-d])[).:\-]\s*/g)];
    if (optionMatches.length < 2) return [];
    const statement = block.slice(0, optionMatches[0].index).trim();
    const options = optionMatches.slice(0, 4).map((option, optionIndex) => {
      const start = (option.index ?? 0) + option[0].length;
      const end = optionMatches[optionIndex + 1]?.index ?? block.length;
      return block.slice(start, end).trim();
    }).filter(Boolean);
    return statement && options.length >= 2 ? [{ statement, options }] : [];
  });
}

export function parseAnnalText(text: string) {
  return {
    lessons: findSections(text, COURSE_HEADING),
    exercises: findSections(text, EXERCISE_HEADING),
    questions: findQuestions(text),
  };
}
