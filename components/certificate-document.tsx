"use client"

const GOLD = "#C6983F"
const NAVY = "#0D1B2A"
const CREAM = "#FFFEF7"

export function CertificateDocument({
  studentName,
  courseName,
  issueDate,
}: {
  studentName: string
  courseName: string
  issueDate: string
}) {
  return (
    <div
      style={{
        width: "297mm",
        height: "210mm",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        background: CREAM,
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          width: "72mm",
          height: "100%",
          background: NAVY,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14mm 8mm 12mm",
          flexShrink: 0,
          position: "relative",
          backgroundImage:
            "radial-gradient(circle, rgba(198,152,63,0.08) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          }}
        />

        {/* Branding */}
        <div style={{ textAlign: "center" }}>
          <img
            src="/new-logo-favicon.png"
            alt="BSPrep"
            style={{
              width: "52px",
              height: "52px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: "20px",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            BSPrep
          </div>
          <div
            style={{
              color: GOLD,
              fontSize: "7px",
              letterSpacing: "0.22em",
              marginTop: "5px",
              textTransform: "uppercase" as const,
            }}
          >
            IITM BS QUALIFIER PREP
          </div>
          <div
            style={{
              width: "30mm",
              height: "1px",
              background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
              margin: "10px auto",
            }}
          />
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "7.5px", letterSpacing: "0.2em" }}>
            CERTIFICATE
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "7.5px", letterSpacing: "0.2em", marginTop: "2px" }}>
            OF COMPLETION
          </div>
        </div>

        {/* Seal */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              border: `2px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 6px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: `1px solid rgba(198,152,63,0.35)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/new-logo-favicon.png"
                alt=""
                style={{
                  width: "28px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
          </div>
          <div style={{ color: GOLD, fontSize: "6.5px", letterSpacing: "0.22em" }}>OFFICIAL SEAL</div>
        </div>

        {/* Gold bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          }}
        />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          flex: 1,
          background: CREAM,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "12mm 14mm 10mm 13mm",
          position: "relative",
          borderLeft: `3px solid ${GOLD}`,
        }}
      >
        {/* Watermark */}
        <img
          src="/new-logo-favicon.png"
          alt=""
          style={{
            position: "absolute",
            right: "12mm",
            top: "50%",
            transform: "translateY(-50%)",
            width: "130px",
            opacity: 0.025,
            pointerEvents: "none",
          }}
        />

        {/* Inner border */}
        <div
          style={{
            position: "absolute",
            inset: "5mm",
            border: `1px solid rgba(198,152,63,0.18)`,
            pointerEvents: "none",
          }}
        />

        {/* Corner ornaments */}
        {(
          [
            { top: "3mm", right: "3mm", borderTop: `1.5px solid ${GOLD}`, borderRight: `1.5px solid ${GOLD}` },
            { bottom: "3mm", right: "3mm", borderBottom: `1.5px solid ${GOLD}`, borderRight: `1.5px solid ${GOLD}` },
            { top: "3mm", left: "3mm", borderTop: `1.5px solid ${GOLD}`, borderLeft: `1.5px solid ${GOLD}` },
            { bottom: "3mm", left: "3mm", borderBottom: `1.5px solid ${GOLD}`, borderLeft: `1.5px solid ${GOLD}` },
          ] as const
        ).map((s, i) => (
          <div
            key={i}
            style={{ position: "absolute", width: "6mm", height: "6mm", pointerEvents: "none", ...s }}
          />
        ))}

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Title + divider */}
          <div style={{ marginBottom: "4mm" }}>
            <div
              style={{
                color: GOLD,
                fontSize: "8.5px",
                fontWeight: 600,
                letterSpacing: "0.38em",
                textTransform: "uppercase" as const,
              }}
            >
              Certificate of Completion
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3mm" }}>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(to right, ${GOLD}, rgba(198,152,63,0.08))`,
                }}
              />
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  background: GOLD,
                  transform: "rotate(45deg)",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>

          {/* Certify italic */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "#999",
              marginBottom: "2mm",
            }}
          >
            This is to certify that
          </div>

          {/* Student name */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "36px",
              fontWeight: 700,
              color: NAVY,
              lineHeight: 1.05,
              marginBottom: "2.5mm",
              letterSpacing: "-0.3px",
            }}
          >
            {studentName}
          </div>

          {/* Gold underline */}
          <div
            style={{
              width: "72mm",
              height: "2px",
              background: `linear-gradient(to right, ${GOLD}, rgba(198,152,63,0.1))`,
              marginBottom: "3mm",
            }}
          />

          {/* Completion line */}
          <div
            style={{
              fontSize: "11px",
              color: "#888",
              marginBottom: "2mm",
            }}
          >
            has successfully completed the course
          </div>

          {/* Course name */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: NAVY,
              marginBottom: "1mm",
            }}
          >
            {courseName}
          </div>

          <div
            style={{
              fontSize: "8px",
              color: GOLD,
              letterSpacing: "0.14em",
              marginBottom: "5mm",
            }}
          >
            IITM BS QUALIFIER PREP &nbsp;·&nbsp; BSPREP &nbsp;·&nbsp; 2026
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingTop: "3mm",
              borderTop: `1px solid rgba(198,152,63,0.22)`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "7px",
                  color: GOLD,
                  letterSpacing: "0.12em",
                  marginBottom: "1.5mm",
                  fontWeight: 600,
                }}
              >
                DATE ISSUED
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: NAVY }}>{issueDate}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "7px", color: "#ccc", letterSpacing: "0.04em" }}>
                Student-led initiative · Not affiliated with IIT Madras
              </div>
              <div style={{ fontSize: "7px", color: "#ccc", marginTop: "1px" }}>bsprep.in</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "7px",
                  color: GOLD,
                  letterSpacing: "0.12em",
                  marginBottom: "1.5mm",
                  fontWeight: 600,
                }}
              >
                ISSUED BY
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: NAVY }}>The BSPrep Team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
