import { useSearchParams } from 'react-router-dom';
import CoursesPage from '../../courses/page/CoursesPage';
import AssessmentsPage from '../../assessments/page/AssessmentsPage';
import './ContentsPage.css';

type ContentTab = 'lessons' | 'exercise' | 'quiz';

const tabs: { id: ContentTab; label: string }[] = [
  { id: 'lessons', label: 'Leçons' },
  { id: 'exercise', label: 'Exercices' },
  { id: 'quiz', label: 'Quiz' },
];

function isContentTab(value: string | null): value is ContentTab {
  return tabs.some((tab) => tab.id === value);
}

export default function ContentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const selectedTab = isContentTab(requestedTab) ? requestedTab : 'lessons';

  const selectTab = (tab: ContentTab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="contents-page">
      <nav className="contents-tabs" aria-label="Types de contenus">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={selectedTab === tab.id}
            className={`contents-tab${selectedTab === tab.id ? ' active' : ''}`}
            onClick={() => selectTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section>
        {selectedTab === 'lessons' ? (
          <CoursesPage />
        ) : (
          <AssessmentsPage
            key={selectedTab}
            fixedKindFilter={selectedTab === 'exercise' ? 'EXERCICE' : 'QUIZ'}
          />
        )}
      </section>
    </div>
  );
}
