import { useState } from "react";
import InstructorAnalyseSidebar from "./InstructorAnalyseSidebar";
import StudentTable from "../../../components/analyse/tables/StudentTable";
import StudentPerformanceChart from "../../../components/analyse/stats/LangueCommunicationChart";
import LangueCommunicationChart from "../../../components/analyse/stats/LangueCommunicationChart";
import MathematiquesChart from "../../../components/analyse/stats/MathematiquesChart";
import ElectroniqueChart from "../../../components/analyse/stats/ElectroniqueChart";
import ProgrammingChart from "../../../components/analyse/stats/ProgrammingChart";
import ProjectChart from "../../../components/analyse/stats/ProjectsChart";

const tab_title: string[] = ["Liste des étudiants", "Performances"];

const InstructorAnalyseArea = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<any>(null); // Gérer l'étudiant sélectionné
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const toggleCollapse = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter(k => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };

  const handleTabClick = (index: any) => {
    if (index === 1 && !selectedStudent) {
      return; // Désactiver l'onglet "Performances" si aucun étudiant n'est sélectionné
    }
    setActiveTab(index);
  };

  const handleRowClick = (student: any) => {
    setSelectedStudent(student);  // Mettre à jour l'étudiant sélectionné
    setActiveTab(1); // Passer à l'onglet "Performances"
  };

  // Rendu d'une section de l'accordéon
  const renderAccordionSection = (id: string, title: string, content: React.ReactNode) => (
    <div className="card">
      <div className="card-header" id={`heading-${id}`}>
        <h5 className="mb-0">
          <span
            className="accordion-toggle"
            onClick={() => toggleCollapse(id)}
            aria-expanded={activeKeys.includes(id) ? 'true' : 'false'}
            aria-controls={`collapse-${id}`}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {title}
          </span>
        </h5>
      </div>
      <div
        id={`collapse-${id}`}
        className={`collapse ${activeKeys.includes(id) ? 'show' : ''}`}
        aria-labelledby={`heading-${id}`}
      >
        <div className="card-body">
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <div className="dashboard__inner-wrap">
          <div className="row">
            <InstructorAnalyseSidebar />
            <div className="col-lg-9">
              <div className="dashboard__content-wrap">
                <div className="dashboard__content-title">
                  <h4 className="title">
                    Analyse {selectedStudent ? `| #${selectedStudent.nom} ${selectedStudent.prenom}` : ""}
                  </h4>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="dashboard__nav-wrap">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {tab_title.map((tab, index) => (
                          <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === index ? "active" : ""} ${index === 1 && !selectedStudent ? "disabled" : ""}`}
                              disabled={index === 1 && !selectedStudent}
                            >
                              {tab}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                      {/* Liste des étudiants */}
                      <div className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`} id="itemOne-tab-pane" role="tabpanel" aria-labelledby="itemOne-tab">
                        <div className="dashboard__review-table">
                          <StudentTable onRowClick={handleRowClick} /> {/* Passer la fonction de gestion du clic */}
                        </div>
                      </div>

                      {/* Performances */}
                      <div className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`} id="itemTwo-tab-pane" role="tabpanel" aria-labelledby="itemTwo-tab">
                        <div className="dashboard__review-table">
                          {selectedStudent ? (
                            <div id="accordion">
                              {renderAccordionSection('1', 'Langues et communications', <LangueCommunicationChart />)}
                              {renderAccordionSection('2', 'Mathématiques', <div><MathematiquesChart /></div>)}
                              {renderAccordionSection('3', 'Electroniques', <div><ElectroniqueChart /></div>)}
                              {renderAccordionSection('4', 'Programmation et modélisation', <div><ProgrammingChart /></div>)}
                              {renderAccordionSection('5', 'Projets et intégrations', <div><ProjectChart /></div>)}
                            </div>
                          ) : (
                            <div className="alert alert-info">
                              Sélectionner un étudiant d'abord pour voir les performances.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorAnalyseArea;
