import { Link } from "react-router-dom";

const RESUME_PDF = "/Nolan_McDonald_Resume.pdf";

export default function ResumePage() {
  return (
    <div className="resume-page">
      <header className="resume-page-header">
        <div className="container resume-page-header-inner">
          <Link to="/" className="back-button">
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </div>
      </header>

      <iframe src={RESUME_PDF} title="Nolan McDonald resume" className="resume-pdf-frame" />
    </div>
  );
}
