import React from "react";

interface ProjectIllustrationProps {
  index: number;
}

// Conceptual illustrations from the approved editorial prototype, not product UI.
const ProjectIllustration = ({ index }: ProjectIllustrationProps) => (
  <div className="editorial-case-visual" aria-hidden="true">
    {index === 0 ? (
      <>
        <div className="editorial-flow">
          <div>↳ Candidate evidence</div>
          <div>↳ AI-assisted screening</div>
          <div>
            <span className="editorial-check">✓</span> Human approval
          </div>
        </div>
        <span className="editorial-caption">
          Conceptual workflow / not product UI
        </span>
      </>
    ) : index === 1 ? (
      <>
        <div className="editorial-security-rings">
          <span>Guardrails</span>
        </div>
        <span className="editorial-caption">Conceptual security model</span>
      </>
    ) : (
      <>
        <div className="editorial-ledger">
          <div>
            <strong>NOVEM / OPERATIONS</strong>
            <span>↗</span>
          </div>
          <div>
            <span>Precious metals</span>
            <span>───</span>
          </div>
          <div>
            <span>Digital assets</span>
            <span>───</span>
          </div>
          <div>
            <span>Audit trail</span>
            <span>↳</span>
          </div>
        </div>
        <span className="editorial-caption">
          Conceptual ledger / not product UI
        </span>
      </>
    )}
  </div>
);

export default ProjectIllustration;
