
import type { SchoolClass } from '../../../../services/classes.types';
import type { ClassSubject } from '../../../../services/class-subjects.types';

interface ClassesTableProps {
  classes: SchoolClass[];
  classSubjectsByClass: Record<string, ClassSubject[]>;
  onAssign: (schoolClass: SchoolClass) => void;
}

export default function ClassesTable({
  classes,
  classSubjectsByClass,
  onAssign,
}: ClassesTableProps) {
  if (classes.length === 0) {
    return (
      <div className="classes-empty">
        Aucune classe disponible.
      </div>
    );
  }

  return (
    <div className="classes-table-wrapper">
      <table className="classes-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Cycle</th>
            <th>Niveau</th>
            <th>Série</th>
            <th>Position</th>
            <th>Matières affectées</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((schoolClass) => (
            <tr key={schoolClass.id}>
              <td>
                <strong>{schoolClass.code}</strong>
              </td>

              <td>{schoolClass.label}</td>

              <td>{schoolClass.cycle}</td>

              <td>{schoolClass.level}</td>

              <td>{schoolClass.series || '—'}</td>

              <td>{schoolClass.position}</td>

              <td>
                {(classSubjectsByClass[schoolClass.id] ?? []).length > 0 ? (
                  <div className="classes-subject-list">
                    {(classSubjectsByClass[schoolClass.id] ?? []).map(
                      (classSubject) => (
                        <span
                          className="classes-subject-badge"
                          key={classSubject.id}
                        >
                          {classSubject.subject.name}
                        </span>
                      ),
                    )}
                  </div>
                ) : (
                  <span className="classes-no-subjects">
                    Aucune matière
                  </span>
                )}
              </td>

              <td>
                <button
                  type="button"
                  className="classes-action-button"
                  onClick={() => onAssign(schoolClass)}
                >
                  Gérer les matières
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
