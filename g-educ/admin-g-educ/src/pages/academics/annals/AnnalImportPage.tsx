import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { chaptersService } from '../../../services/chapters.service';
import type { Chapter } from '../../../services/chapters.types';
import { annalsService, type AnnalImportResult } from '../../../services/annals.service';
import './AnnalImportPage.css';

function errorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'response' in error) {
    const message = (error as { response?: { data?: { message?: string | string[] } } }).response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }
  return 'Import impossible. Vérifiez le PDF et réessayez.';
}

export default function AnnalImportPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterId, setChapterId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnnalImportResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void chaptersService.findAll().then(setChapters).catch((err: unknown) => setError(errorMessage(err)));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!chapterId || !file) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      setResult(await annalsService.importPdf(chapterId, file));
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="annal-import-page">
      <header className="annal-import-header">
        <div>
          <Link to="/contents?tab=lessons">← Contenus</Link>
          <h1>Importer une annale PDF</h1>
          <p>Le PDF est ajouté comme leçon brouillon. Les exercices et le quiz restent à vérifier avant publication.</p>
        </div>
      </header>

      <form className="annal-import-card" onSubmit={(event) => void submit(event)}>
        <label>
          <span>Chapitre de rattachement</span>
          <select required value={chapterId} onChange={(event) => setChapterId(event.target.value)}>
            <option value="">Sélectionner un chapitre</option>
            {chapters.filter((chapter) => chapter.status !== 'ARCHIVE').map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.classSubject.class.code} · {chapter.classSubject.subject.name} · {chapter.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Fichier PDF (20 Mo maximum)</span>
          <input required type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        </label>
        <p className="annal-review-note">Le traitement suit des règles de texte, sans IA générative. Les pages scannées et les images restent dans le PDF source; leur contenu doit être vérifié et transcrit manuellement.</p>
        {file && <p className="annal-file-name">{file.name} · {(file.size / 1048576).toFixed(2)} Mo</p>}
        {error && <p className="annal-error" role="alert">{error}</p>}
        <button type="submit" disabled={loading || chapters.length === 0 || !file || !chapterId}>
          {loading ? 'Lecture du PDF et création des brouillons…' : 'Importer et préparer les brouillons'}
        </button>
      </form>

      {result && (
        <section className="annal-import-card annal-import-result" aria-live="polite">
          <h2>Import terminé</h2>
          <p><strong>{result.lesson.title}</strong> est disponible dans les leçons en brouillon.</p>
          <dl>
            <div><dt>Pages lues</dt><dd>{result.pages}</dd></div>
            <div><dt>Texte extrait</dt><dd>{result.extractedCharacters.toLocaleString('fr-FR')} caractères</dd></div>
            <div><dt>Exercices repérés</dt><dd>{result.detectedExercises}</dd></div>
            <div><dt>Leçons de cours repérées</dt><dd>{result.detectedLessons}</dd></div>
            <div><dt>Questions à choix repérées</dt><dd>{result.detectedChoiceQuestions}</dd></div>
          </dl>
          <h3>Brouillons créés</h3>
          {result.extractedLessons.length > 0 && <ul>{result.extractedLessons.map((lesson) => (
            <li key={lesson.id}>Leçon · {lesson.title}</li>
          ))}</ul>}
          <ul>{result.assessments.map((assessment) => (
            <li key={assessment.id}>{assessment.kind === 'EXERCICE' ? 'Exercice' : 'Quiz'} · {assessment.title}</li>
          ))}</ul>
          <p className="annal-review-note">{result.warning}</p>
          <nav className="annal-result-links">
            <Link to="/contents?tab=lessons">Ouvrir les leçons</Link>
            <Link to="/contents?tab=exercise">Vérifier les exercices</Link>
            <Link to="/contents?tab=quiz">Vérifier le quiz</Link>
          </nav>
        </section>
      )}
    </main>
  );
}
