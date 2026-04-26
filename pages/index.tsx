import { useState } from "react";
import styles from '../styles/Home.module.css';

// ─── LESCO Calculation Engine ─────────────────────────────────────────────────
interface BillCalculation {
  units: number;
  energy: number;
  fpa: number;
  fcSurcharge: number;
  qta: number;
  fixedCharges: number;
  lescoTotal: number;
  ed: number;
  gst: number;
  total: number;
  perUnit: number;
}

interface Rates {
  gopTariff: number;
  fpaPerUnit: number;
  fcSurchargeRate: number;
  qtaRate: number;
  edRate: number;
  gstRate: number;
}

interface MeterSession {
  units: number;
  bill: BillCalculation;
  lastBillVal: number;
  currentVal: number;
}

function calcBill(units: number, rates: Rates & { fixedCharges: number }): BillCalculation | null {
  if (!units || units <= 0) return null;
  const u = parseFloat(units.toString());
  const energy = u * rates.gopTariff;
  const fpa = u * rates.fpaPerUnit;
  const fcSurcharge = energy * rates.fcSurchargeRate;
  const qta = energy * rates.qtaRate;
  const lescoTotal = energy + fpa + fcSurcharge + qta + rates.fixedCharges;
  const ed = lescoTotal * rates.edRate;
  const gst = lescoTotal * rates.gstRate;
  const total = lescoTotal + ed + gst;
  return {
    units,
    energy: +energy.toFixed(0),
    fpa: +fpa.toFixed(0),
    fcSurcharge: +fcSurcharge.toFixed(0),
    qta: +qta.toFixed(0),
    fixedCharges: rates.fixedCharges,
    lescoTotal: +lescoTotal.toFixed(0),
    ed: +ed.toFixed(0),
    gst: +gst.toFixed(0),
    total: Math.round(total),
    perUnit: +(total / u).toFixed(1),
  };
}

const DEFAULT_RATES: Rates = {
  gopTariff: 10.54,
  fpaPerUnit: 1.50,
  fcSurchargeRate: 0.0408,
  qtaRate: 0.033,
  edRate: 0.016,
  gstRate: 0.18,
};

const METERS = {
  new: { label: "New Meter", short: "NEW", fixedCharges: 400, color: "#22D3EE", bg: "#0C2D3A" },
  old: { label: "Old Meter", short: "OLD", fixedCharges: 200, color: "#FBBF24", bg: "#2D1F00" },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
interface BillRowProps {
  label: string;
  val: number;
  bold?: boolean;
  green?: boolean;
  note?: string;
}

function BillRow({ label, val, bold, green, note }: BillRowProps) {
  return (
    <div className={styles.billRow}>
      <div>
        <span className={`${styles.billRowLabel} ${bold ? styles.bold : ''}`}>{label}</span>
        {note && <span className={styles.billRowNote}>({note})</span>}
      </div>
      <span className={`${styles.billRowValue} ${green ? styles.green : ''} ${bold ? styles.bold : ''}`}>
        Rs {val?.toLocaleString()}
      </span>
    </div>
  );
}

interface MeterResultProps {
  id: keyof typeof METERS;
  session: MeterSession;
  onReenter: () => void;
}

function MeterResult({ id, session, onReenter }: MeterResultProps) {
  const m = METERS[id];
  const [open, setOpen] = useState(false);
  const b = session.bill;
  return (
    <div className={styles.meterResult} style={{ background: m.bg, borderColor: m.color }}>
      <div className={styles.meterResultHeader}>
        <span style={{ color: m.color }}>{m.short} METER</span>
        <span className={styles.doneBadge}>✓ DONE</span>
      </div>
      <div className={styles.meterStats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>UNITS USED</div>
          <div className={styles.statValue} style={{ color: m.color }}>{b.units}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>EST. BILL</div>
          <div className={styles.billAmount}>Rs {b.total.toLocaleString()}</div>
          <div className={styles.perUnit}>~Rs {b.perUnit}/unit avg</div>
        </div>
      </div>
      <button 
        onClick={() => setOpen(!open)}
        className={styles.toggleButton}
        style={{ color: m.color, borderColor: m.color + '44' }}
      >
        {open ? "▲ Hide Details" : "▼ Show Bill Breakdown"}
      </button>
      {open && (
        <div className={styles.billBreakdown}>
          <BillRow label={`Energy (${b.units}u × Rs ${DEFAULT_RATES.gopTariff})`} val={b.energy} />
          <BillRow label="Fuel Price Adjustment (FPA)" val={b.fpa} note="changes monthly" />
          <BillRow label="FC Surcharge (~4%)" val={b.fcSurcharge} />
          <BillRow label="Quarterly Tariff Adj." val={b.qta} />
          <BillRow label="Fixed Charges" val={b.fixedCharges} />
          <BillRow label="LESCO Sub-Total" val={b.lescoTotal} bold />
          <BillRow label="Electricity Duty (1.6%)" val={b.ed} />
          <BillRow label="GST (18%)" val={b.gst} />
          <BillRow label="TOTAL PAYABLE" val={b.total} bold green />
          <div className={styles.disclaimer}>
            * Estimate only. Actual bill may differ slightly. Update rates in Settings if LESCO has changed them.
          </div>
        </div>
      )}
      <button onClick={onReenter} className={styles.reenterButton}>
        Re-enter this meter
      </button>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
interface SettingsTabProps {
  rates: Rates;
  setRates: (rates: Rates) => void;
  fixedCharges: { new: number; old: number };
  setFixedCharges: (charges: { new: number; old: number }) => void;
}

function SettingsTab({ rates, setRates, fixedCharges, setFixedCharges }: SettingsTabProps) {
  const [lr, setLr] = useState({ ...rates });
  const [lf, setLf] = useState({ ...fixedCharges });
  const [ok, setOk] = useState(false);
  
  const save = () => {
    const r = {} as Rates;
    for (const k in lr) {
      (r as any)[k] = parseFloat((lr as any)[k]) || rates[k as keyof Rates];
    }
    setRates(r);
    setFixedCharges({ 
      new: parseFloat(lf.new.toString()) || 400, 
      old: parseFloat(lf.old.toString()) || 200 
    });
    setOk(true);
    setTimeout(() => setOk(false), 2000);
  };

  const rateFields = [
    { k: "gopTariff", label: "Energy Rate (Rs per unit)", hint: "Basic price per unit. Check your bill under 'GOP TARIFF'. Currently ~Rs 10.54." },
    { k: "fpaPerUnit", label: "Fuel Price Adjustment — FPA (Rs/unit)", hint: "Changes EVERY MONTH. Check your latest bill. Can be Rs 1 to Rs 4+ per unit." },
    { k: "fcSurchargeRate", label: "FC Surcharge (enter as decimal)", hint: "e.g. enter 0.0408 for 4.08%. Usually around 4%. Find on your bill." },
    { k: "qtaRate", label: "Quarterly Tariff Adj. (decimal)", hint: "e.g. 0.033 = 3.3%. Changes every quarter." },
    { k: "edRate", label: "Electricity Duty (decimal)", hint: "e.g. 0.016 = 1.6%. Government tax." },
    { k: "gstRate", label: "GST (decimal)", hint: "e.g. 0.18 = 18%. General Sales Tax." },
  ] as const;

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsTitle}>Rates & Settings</div>
      <div className={styles.warningBox}>
        ⚠ <strong>These values can change.</strong> FPA changes every month. GOP Tariff and taxes may change by NEPRA order. When you get a new bill, compare these values and update them here so your estimates stay accurate.
      </div>

      <div className={styles.sectionTitle}>FIXED CHARGES (Rs/month)</div>
      <div className={styles.fixedChargesGrid}>
        {(["new", "old"] as const).map(id => (
          <div key={id}>
            <div style={{ color: METERS[id].color }} className={styles.meterLabel}>{METERS[id].label}</div>
            <input
              type="number"
              value={lf[id]}
              onChange={e => setLf(p => ({ ...p, [id]: e.target.value }))}
              className={styles.fixedChargeInput}
              style={{ color: METERS[id].color }}
            />
            <div className={styles.inputHint}>See "Fixed Charges" on bill</div>
          </div>
        ))}
      </div>

      {rateFields.map(f => (
        <div key={f.k} className={styles.rateField}>
          <div className={styles.rateLabel}>{f.label}</div>
          <div className={styles.rateHint}>{f.hint}</div>
          <input
            type="number"
            step="0.0001"
            value={lr[f.k]}
            onChange={e => setLr(p => ({ ...p, [f.k]: e.target.value }))}
            className={styles.rateInput}
          />
        </div>
      ))}

      <button onClick={save} className={`${styles.saveButton} ${ok ? styles.saved : ''}`}>
        {ok ? "✓ SAVED!" : "SAVE SETTINGS"}
      </button>
      <div className={styles.privacyNote}>
        Settings are saved on this device only. Nothing is sent anywhere.
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState<"check" | "report" | "settings">("check");
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [fixedCharges, setFixedCharges] = useState({ new: 400, old: 200 });
  const [sessions, setSessions] = useState<{ new: MeterSession | null; old: MeterSession | null }>({ new: null, old: null });

  // Wizard state
  const [step, setStep] = useState<"pick" | "enter" | "result">("pick");
  const [active, setActive] = useState<keyof typeof METERS | null>(null);
  const [lastBill, setLastBill] = useState("");
  const [current, setCurrent] = useState("");
  const [errors, setErrors] = useState<{ lb?: string; cu?: string }>({});

  const both = sessions.new && sessions.old;
  const other = active === "new" ? "old" : "new";

  const startMeter = (id: keyof typeof METERS) => {
    setActive(id);
    setLastBill(sessions[id]?.lastBillVal?.toString() || "");
    setCurrent(sessions[id]?.currentVal?.toString() || "");
    setErrors({});
    setStep("enter");
  };

  const handleGet = () => {
    const lb = parseFloat(lastBill), cu = parseFloat(current);
    const errs: { lb?: string; cu?: string } = {};
    if (!lastBill || isNaN(lb) || lb < 0) errs.lb = "Please enter the reading from your last LESCO bill.";
    if (!current || isNaN(cu) || cu < 0) errs.cu = "Please enter the number currently showing on the meter.";
    if (!errs.lb && !errs.cu && cu < lb) errs.cu = `Current reading (${cu}) is less than last bill reading (${lb}). Please check again.`;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const units = +(cu - lb).toFixed(2);
    const bill = calcBill(units, { ...rates, fixedCharges: fixedCharges[active!] });
    if (bill) {
      setSessions(p => ({ ...p, [active!]: { units, bill, lastBillVal: lb, currentVal: cu } }));
      setStep("result");
    }
  };

  const previewUnits = () => {
    const lb = parseFloat(lastBill), cu = parseFloat(current);
    if (!isNaN(lb) && !isNaN(cu) && cu >= lb) return +(cu - lb).toFixed(1);
    return null;
  };

  const meta = active ? METERS[active] : null;

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.logo}>⚡</span>
          <div>
            <div className={styles.title}>Bijli Meter Tracker</div>
            <div className={styles.subtitle}>LESCO · Singhpura, Lahore</div>
          </div>
        </div>
        <div className={styles.meterStatus}>
          {(["new", "old"] as const).map(id => {
            const s = sessions[id];
            const m = METERS[id];
            return (
              <div key={id} className={styles.statusCard} style={{ background: s ? m.bg : "", borderColor: s ? m.color : "" }}>
                <div style={{ color: s ? m.color : "" }} className={styles.statusLabel}>{m.short}</div>
                {s
                  ? <div className={styles.statusValue}>{s.units}u · Rs {s.bill.total.toLocaleString()}</div>
                  : <div className={styles.statusEmpty}>not checked</div>
                }
              </div>
            );
          })}
        </div>
      </header>

      <div className={styles.content}>
        {/* ══ CHECK TAB ══ */}
        {tab === "check" && (
          <>
            {/* PICK */}
            {step === "pick" && (
              <div className={styles.pageContent}>
                <div className={styles.pageTitle}>Check a Meter</div>
                <div className={styles.pageDescription}>
                  Pick one meter below. You'll enter just <strong>two numbers</strong> — one from your last bill, one from the meter itself. The app does the rest.
                </div>

                {(["new", "old"] as const).map(id => {
                  const m = METERS[id];
                  const s = sessions[id];
                  return (
                    <button
                      key={id}
                      onClick={() => startMeter(id)}
                      className={styles.meterButton}
                      style={{ background: m.bg, borderColor: m.color }}
                    >
                      <div className={styles.meterButtonHeader}>
                        <span style={{ color: m.color }} className={styles.meterButtonTitle}>{m.label}</span>
                        {s && <span className={styles.doneBadge}>✓ Done</span>}
                      </div>
                      {s
                        ? <div className={styles.meterButtonSubtext}>
                          {s.units} units · Rs {s.bill.total.toLocaleString()} — <span style={{ color: m.color }}>tap to update</span>
                        </div>
                        : <div className={styles.meterButtonSubtext}>Tap to check →</div>
                      }
                    </button>
                  );
                })}

                {both
                  ? <button onClick={() => setTab("report")} className={styles.reportButton}>
                      📊 Get Final Report
                    </button>
                  : <div className={styles.hintText}>
                      {sessions.new || sessions.old 
                        ? "Check the other meter too to unlock the Final Report." 
                        : "Check both meters to see the combined report."}
                    </div>
                }
              </div>
            )}

            {/* ENTER */}
            {step === "enter" && meta && (
              <div className={styles.pageContent}>
                <button onClick={() => setStep("pick")} className={styles.backButton}>
                  ← Back
                </button>

                <div className={styles.enterHeader}>
                  <div className={styles.meterBadge} style={{ background: meta.bg, borderColor: meta.color, color: meta.color }}>
                    {meta.short}
                  </div>
                  <div className={styles.enterTitle}>{meta.label}</div>
                </div>

                {/* Field 1 */}
                <div className={styles.inputSection}>
                  <div className={styles.stepIndicator}>STEP 1 of 2</div>
                  <div className={styles.inputTitle}>Last Bill Reading</div>
                  <div className={styles.inputDescription}>
                    Open the most recent LESCO bill for this meter. Find the box that says <strong>"PRESENT"</strong> or <strong>"Present Reading"</strong>. Enter that number exactly as it appears on the bill.
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 42200"
                    value={lastBill}
                    onChange={e => setLastBill(e.target.value)}
                    className={styles.numberInput}
                    style={{ borderColor: errors.lb ? "#EF4444" : meta.color + "66" }}
                  />
                  {errors.lb && <div className={styles.errorText}>⚠ {errors.lb}</div>}
                </div>

                {/* Field 2 */}
                <div className={styles.inputSection}>
                  <div className={styles.stepIndicator} style={{ color: "#22D3EE" }}>STEP 2 of 2</div>
                  <div className={styles.inputTitle}>Current Meter Reading</div>
                  <div className={styles.inputDescription}>
                    Go to the physical meter right now and look at the screen or dials.
                    {active === "new"
                      ? " Your new digital meter shows numbers like \"1060.9\" on the LCD screen."
                      : " Your old dial meter — read the numbers from left to right, e.g. \"42285\"."}
                    {" "}Enter exactly what you see.
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder={active === "new" ? "e.g. 1060.9" : "e.g. 42285"}
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    className={styles.numberInput}
                    style={{ borderColor: errors.cu ? "#EF4444" : meta.color + "66" }}
                  />
                  {errors.cu && <div className={styles.errorText}>⚠ {errors.cu}</div>}
                </div>

                {previewUnits() !== null && (
                  <div className={styles.previewCard} style={{ background: meta.bg, borderColor: meta.color + "55" }}>
                    <div className={styles.previewLabel}>UNITS SO FAR</div>
                    <div className={styles.previewValue} style={{ color: meta.color }}>{previewUnits()}</div>
                  </div>
                )}

                <button onClick={handleGet} className={styles.getResultButton} style={{ background: meta.color }}>
                  GET RESULT ›
                </button>
              </div>
            )}

            {/* RESULT */}
            {step === "result" && active && sessions[active] && (
              <div className={styles.pageContent}>
                <div className={styles.resultTitle}>Result — {METERS[active].label}</div>
                <div className={styles.resultSubtitle}>
                  From {sessions[active].lastBillVal} → {sessions[active].currentVal}
                </div>

                <MeterResult id={active} session={sessions[active]} onReenter={() => startMeter(active)} />

                <div className={styles.actionButtons}>
                  {!sessions[other] && (
                    <button onClick={() => startMeter(other)} className={styles.nextMeterButton} style={{ background: METERS[other].color }}>
                      Now Check {METERS[other].label} →
                    </button>
                  )}
                  {sessions[other] && (
                    <button onClick={() => setTab("report")} className={styles.reportButton}>
                      📊 Get Final Report
                    </button>
                  )}
                  <button onClick={() => setStep("pick")} className={styles.backButton}>
                    ← Back to Home
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ REPORT TAB ══ */}
        {tab === "report" && (
          <div className={styles.pageContent}>
            <div className={styles.pageTitle}>Final Report</div>
            <div className={styles.pageDescription}>Both meters · this billing cycle</div>

            {both ? (
              <>
                <div className={styles.combinedTotal}>
                  <div className={styles.combinedLabel}>COMBINED TOTAL</div>
                  <div className={styles.combinedStats}>
                    <div className={styles.combinedStat}>
                      <div className={styles.statLabel}>TOTAL UNITS</div>
                      <div className={styles.combinedUnits}>
                        {(sessions.new.units + sessions.old.units).toFixed(1)}
                      </div>
                    </div>
                    <div className={styles.combinedStat}>
                      <div className={styles.statLabel}>COMBINED BILL</div>
                      <div className={styles.combinedBill}>
                        Rs {(sessions.new.bill.total + sessions.old.bill.total).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {(["new", "old"] as const).map(id => (
                  <MeterResult
                    key={id}
                    id={id}
                    session={sessions[id]!}
                    onReenter={() => { setTab("check"); startMeter(id); }}
                  />
                ))}

                {/* Switch Advice */}
                <div className={styles.adviceBox}>
                  <div className={styles.adviceTitle}>⚡ When to Switch Meters</div>
                  {(() => {
                    const nu = sessions.new.units, ou = sessions.old.units;
                    const heavier = nu > ou ? "New" : "Old";
                    const lighter = nu > ou ? "Old" : "New";
                    const lighterColor = nu > ou ? METERS.old.color : METERS.new.color;
                    const heavierColor = nu > ou ? METERS.new.color : METERS.old.color;
                    return (
                      <div className={styles.adviceText}>
                        <strong style={{ color: heavierColor }}>{heavier} Meter</strong> is carrying more load ({Math.abs(nu - ou).toFixed(1)} extra units).
                        Switch your home load to the <strong style={{ color: lighterColor }}>{lighter} Meter</strong> to balance them out.
                        <br /><br />
                        <strong>Goal:</strong> Keep each meter under ~200 units per billing cycle to stay in the cheaper LESCO slab and avoid high bills.
                      </div>
                    );
                  })()}
                </div>

                <button onClick={() => { setTab("check"); setStep("pick"); }} className={styles.backButton}>
                  Check Again
                </button>
              </>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <div className={styles.emptyTitle}>Check both meters first</div>
                <div className={styles.emptyDescription}>
                  {sessions.new ? "New ✓ — now check Old Meter" : sessions.old ? "Old ✓ — now check New Meter" : "Go to Check tab and enter readings for both meters."}
                </div>
                <button onClick={() => setTab("check")} className={styles.primaryButton}>
                  Go Check →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══ SETTINGS TAB ══ */}
        {tab === "settings" && (
          <SettingsTab
            rates={rates}
            setRates={setRates}
            fixedCharges={fixedCharges}
            setFixedCharges={setFixedCharges}
          />
        )}
      </div>

      {/* ── Bottom Nav ── */}
      <nav className={styles.bottomNav}>
        {[
          { id: "check" as const, emoji: "⚡", label: "Check" },
          { id: "report" as const, emoji: "📊", label: "Report" },
          { id: "settings" as const, emoji: "⚙️", label: "Settings" },
        ].map(n => (
          <button
            key={n.id}
            onClick={() => { setTab(n.id); if (n.id === "check") setStep("pick"); }}
            className={`${styles.navButton} ${tab === n.id ? styles.active : ''}`}
          >
            <div>{n.emoji}</div>
            <div>{n.label}</div>
          </button>
        ))}
      </nav>
    </div>
  );
}
