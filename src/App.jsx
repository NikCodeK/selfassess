import React, { useEffect, useState } from "react";

const questions = [
  "Seid ihr die ersten in eurer Branche, die eine entsprechende Lösung entwickeln?",
  "Ist eure Lösung auf technischer oder wissenschaftlicher Ebene neuartig?",
  "Wird durch euer Produkt etwas erstmals möglich, das zuvor technisch nicht umsetzbar war?",
  "Schafft euer Projekt neues Wissen (technisch, wissenschaftlich oder empirisch)?",
  "Würde ein erfahrener Softwareentwickler nicht sofort wissen, welche Lösungswege geeignet sind?",
  "Können Lösungswege aus technischer Sicht scheitern?",
  "Werden Technologien, Methoden, Tools oder Frameworks auf neue Weise kombiniert?",
  "Werden diese Technologien oder Methoden weiterentwickelt oder speziell für das Projekt angepasst?",
  "Ist der Projekterfolg aus technischer Sicht aktuell noch unsicher?"
];

const hints = [
  "Fokus auf eure Branche und die technische Lösung – nicht nur auf das Geschäftsmodell.",
  "Gemeint ist echte technische oder wissenschaftliche Neuheit, nicht nur UX oder Packaging.",
  "Geht es um etwas, das vorher technisch nicht möglich oder praktikabel war?",
  "Neues Wissen kann auch technische Learnings oder Prototyp-Erkenntnisse umfassen.",
  "Auch Profis müssten recherchieren, experimentieren oder neue Wege testen.",
  "Scheitern heißt: echte technische Risiken, nicht nur Markt- oder Budgetrisiken.",
  "Setzt ihr bekannte Technologien ungewöhnlich oder neuartig zusammen?",
  "Passt ihr Tools oder Methoden an oder entwickelt Teile davon weiter?",
  "Gibt es offene technische Fragen, deren Beantwortung den Projekterfolg bestimmt?"
];

const styles = {
  page: {
    background: "#dbf2f4",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 24px",
    boxSizing: "border-box",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    position: "relative",
    overflow: "hidden"
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(81, 189, 203, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(81, 189, 203, 0.08) 0%, transparent 50%)`,
    pointerEvents: "none"
  },
  layout: {
    width: "100%",
    maxWidth: "800px",
    position: "relative",
    zIndex: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "32px",
    padding: "20px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  },
  logo: {
    height: "60px",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))"
  },
  card: {
    background: "#f4f4f4",
    borderRadius: "24px",
    padding: "48px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    animation: "fadeIn 0.6s ease-out"
  },
  banner: {
    width: "100%",
    borderRadius: "16px",
    margin: "24px 0",
    objectFit: "contain",
    maxHeight: "250px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    background: "#fff",
    padding: "24px"
  },
  title: {
    fontSize: "2.5rem",
    margin: "0 0 20px",
    color: "#0f172a",
    fontWeight: "800",
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: "1.15rem",
    marginBottom: "24px",
    color: "#1f2937",
    lineHeight: 1.7,
    fontWeight: "400"
  },
  sectionTitle: {
    fontSize: "1.6rem",
    marginBottom: "20px",
    color: "#0f172a",
    fontWeight: "700",
    lineHeight: 1.4
  },
  body: {
    fontSize: "1.05rem",
    color: "#1f2937",
    lineHeight: 1.7,
    fontWeight: "400"
  },
  progressContainer: {
    marginBottom: "24px"
  },
  progressText: {
    fontSize: "0.95rem",
    color: "#51bdcb",
    letterSpacing: "0.05em",
    marginBottom: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#dbf2f4",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "8px"
  },
  progressFill: {
    height: "100%",
    background: "#51bdcb",
    borderRadius: "999px",
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 0 12px rgba(81, 189, 203, 0.4)"
  },
  hintBox: {
    background: "rgba(81, 189, 203, 0.08)",
    borderRadius: "16px",
    padding: "20px",
    color: "#0f172a",
    marginTop: "24px",
    fontSize: "0.98rem",
    border: "1px solid rgba(81, 189, 203, 0.2)",
    lineHeight: 1.6,
    display: "flex",
    alignItems: "flex-start",
    gap: "12px"
  },
  hintIcon: {
    fontSize: "1.2rem",
    flexShrink: 0,
    marginTop: "2px"
  },
  buttonsRow: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    flexWrap: "wrap"
  },
  buttonPrimary: {
    background: "#f18511",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px 32px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: "140px",
    textDecoration: "none",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(241, 133, 17, 0.3)",
    position: "relative",
    overflow: "hidden"
  },
  buttonSecondary: {
    background: "#fff",
    color: "#f18511",
    border: "2px solid #f18511",
    borderRadius: "12px",
    padding: "14px 32px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: "140px",
    textDecoration: "none",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(241, 133, 17, 0.15)"
  },
  link: {
    color: "#51bdcb",
    textDecoration: "none",
    fontWeight: "600",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.2s ease"
  },
  disclaimer: {
    fontSize: "0.95rem",
    color: "#374151",
    marginTop: "20px",
    lineHeight: 1.6,
    padding: "16px",
    background: "rgba(81, 189, 203, 0.08)",
    borderRadius: "12px",
    borderLeft: "4px solid #51bdcb"
  },
  scoreDisplay: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#f18511",
    textAlign: "center",
    margin: "32px 0",
    lineHeight: 1
  },
  resultCard: {
    padding: "24px",
    borderRadius: "16px",
    marginTop: "24px",
    border: "2px solid"
  },
  resultPositive: {
    background: "rgba(81, 189, 203, 0.1)",
    borderColor: "#51bdcb"
  },
  resultNegative: {
    background: "rgba(241, 133, 17, 0.1)",
    borderColor: "#f18511"
  }
};

function InnovationCheckApp() {
  const [step, setStep] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = questions.length;
  const isPositive = score >= 3;

  const handleStart = () => {
    setStep("questions");
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (isYes) => {
    if (isYes) setScore((prev) => prev + 1);
    const nextIndex = currentIndex + 1;
    if (nextIndex < total) {
      setCurrentIndex(nextIndex);
    } else {
      setStep("result");
    }
  };

  const handleRestart = () => {
    setStep("start");
    setCurrentIndex(0);
    setScore(0);
  };

  const buttonFullWidth = isMobile ? { width: "100%", justifyContent: "center" } : {};
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div style={styles.page}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.layout}>
        <div style={{ ...styles.card, padding: isMobile ? "32px 24px" : "48px" }}>
          {step === "start" && (
            <>
              <h1 style={{ ...styles.title, fontSize: isMobile ? "2rem" : "2.5rem" }}>
                Selbsttest: Ist mein Projekt innovativ genug?
              </h1>
              <p style={styles.subtitle}>
                Beantworte 9 kurze Fragen mit Ja oder Nein und erhalte eine erste Orientierung, ob
                dein Vorhaben Merkmale für die Forschungszulage mitbringt.
              </p>
              <div style={styles.buttonsRow}>
                <button
                  style={{ ...styles.buttonPrimary, ...buttonFullWidth }}
                  onClick={handleStart}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(241, 133, 17, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(241, 133, 17, 0.3)";
                  }}
                >
                  Jetzt starten
                </button>
              </div>
            </>
          )}

          {step === "questions" && (
            <>
              <div style={styles.progressContainer}>
                <div style={styles.progressText}>
                  Frage {currentIndex + 1} von {total}
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
                </div>
              </div>
              <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? "1.3rem" : "1.6rem" }}>
                {questions[currentIndex]}
              </h2>
              <p style={styles.body}>
                Bitte wähle die Antwort, die am besten zu eurem aktuellen Stand passt.
              </p>
              <div style={styles.buttonsRow}>
                <button
                  style={{ ...styles.buttonPrimary, ...buttonFullWidth }}
                  onClick={() => handleAnswer(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(241, 133, 17, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(241, 133, 17, 0.3)";
                  }}
                >
                  ✓ Ja
                </button>
                <button
                  style={{ ...styles.buttonSecondary, ...buttonFullWidth }}
                  onClick={() => handleAnswer(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(241, 133, 17, 0.08)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(241, 133, 17, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(241, 133, 17, 0.15)";
                  }}
                >
                  ✗ Nein
                </button>
              </div>
              <div style={styles.hintBox}>
                <span style={styles.hintIcon}>💡</span>
                <span>{hints[currentIndex]}</span>
              </div>
            </>
          )}

          {step === "result" && (
            <>
              <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
                Ergebnis deines Selbsttests
              </h2>

              <div style={styles.scoreDisplay}>
                {score} / {total}
              </div>

              <div style={{
                ...styles.resultCard,
                ...(isPositive ? styles.resultPositive : styles.resultNegative)
              }}>
                <p style={{ ...styles.body, fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>
                  {isPositive
                    ? "🎉 Dein Projekt zeigt mehrere Merkmale, die für eine Förderung über die Forschungszulage sprechen könnten."
                    : "📋 Auf Basis deiner Antworten wirkt das Projekt aktuell weniger forschungs- oder entwicklungsintensiv. Oft lohnt sich trotzdem ein genauer Blick auf technische Details."}
                </p>
              </div>

              <p style={styles.disclaimer}>
                <strong>Wichtig:</strong> Dieser Selbsttest ersetzt keine fachliche Einzelfallprüfung und stellt keine
                verbindliche Aussage zur Förderfähigkeit dar.
              </p>

              <div style={styles.hintBox}>
                <span style={styles.hintIcon}>💬</span>
                <span>
                  Wenn du dir unsicher bist oder dein Projekt im Detail besprechen möchtest, melde dich
                  gerne bei uns für ein kostenloses Erstgespräch.
                </span>
              </div>

              <div style={styles.buttonsRow}>
                <a
                  href="https://formulare.clever-funding.de/t/4M7R318prmus"
                  style={{ ...styles.buttonPrimary, ...buttonFullWidth, flex: isMobile ? "none" : "1" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(241, 133, 17, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(241, 133, 17, 0.3)";
                  }}
                >
                  Kostenloses Erstgespräch
                </a>
                <button
                  style={{ ...styles.buttonSecondary, ...buttonFullWidth }}
                  onClick={handleRestart}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(241, 133, 17, 0.08)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(241, 133, 17, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(241, 133, 17, 0.15)";
                  }}
                >
                  Neu starten
                </button>
              </div>

              <p style={{ ...styles.body, marginTop: "24px", textAlign: "center" }}>
                Mehr Infos unter{" "}
                <a
                  style={styles.link}
                  href="https://clever-funding.de"
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#51bdcb")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                >
                  clever-funding.de
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InnovationCheckApp;
