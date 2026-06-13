import React, { useState, useCallback } from 'react'

// ── DATOS EQUIPOS ─────────────────────────────────────────────────────────
// [rank, att, def, forma_score, valor€M, host, wc_titles]
const T = {
  'España':         [2,  2.30,0.70,0.94,1050,0,1],
  'Francia':        [3,  2.25,0.72,0.90,1100,0,2],
  'Argentina':      [1,  2.28,0.75,0.88, 950,0,3],
  'Inglaterra':     [4,  2.10,0.78,0.86,1020,0,1],
  'Portugal':       [5,  2.15,0.80,0.84, 900,0,0],
  'Brasil':         [6,  2.08,0.77,0.83, 870,0,5],
  'Alemania':       [7,  2.02,0.80,0.81, 780,0,4],
  'Países Bajos':   [8,  1.95,0.82,0.80, 700,0,0],
  'Noruega':        [22, 1.90,0.85,0.79, 420,0,0],
  'Bélgica':        [9,  1.82,0.86,0.76, 620,0,0],
  'Uruguay':        [10, 1.78,0.86,0.77, 380,0,2],
  'Croacia':        [11, 1.72,0.88,0.75, 360,0,0],
  'Colombia':       [23, 1.65,0.87,0.75, 350,0,0],
  'Marruecos':      [13, 1.68,0.81,0.76, 280,0,0],
  'Suiza':          [14, 1.60,0.86,0.73, 250,0,0],
  'Senegal':        [15, 1.62,0.88,0.72, 240,0,0],
  'Japón':          [18, 1.55,0.87,0.72, 230,0,0],
  'Turquía':        [21, 1.50,0.89,0.71, 310,0,0],
  'Suecia':         [26, 1.52,0.88,0.71, 310,0,0],
  'USA':            [16, 1.55,0.91,0.72, 290,1,0],
  'México':         [17, 1.58,0.92,0.70, 270,1,0],
  'Canadá':         [30, 1.42,0.93,0.68, 220,1,0],
  'Corea del Sur':  [19, 1.45,0.92,0.69, 200,0,0],
  'Austria':        [24, 1.48,0.92,0.69, 280,0,0],
  'Ecuador':        [25, 1.42,0.93,0.68, 200,0,0],
  'Australia':      [27, 1.36,0.95,0.66, 180,0,0],
  'Paraguay':       [28, 1.34,0.96,0.65, 150,0,0],
  'Irán':           [29, 1.30,0.95,0.65, 130,0,0],
  'Costa de Marfil':[33, 1.32,0.96,0.64, 200,0,0],
  'Escocia':        [36, 1.28,0.96,0.64, 190,0,0],
  'Arabia Saudí':   [31, 1.25,0.97,0.64, 100,0,0],
  'Egipto':         [32, 1.24,0.98,0.63, 110,0,0],
  'Ghana':          [35, 1.24,0.97,0.63, 160,0,0],
  'Túnez':          [34, 1.20,0.98,0.62,  90,0,0],
  'Bosnia-Herz.':   [38, 1.20,0.99,0.62, 130,0,0],
  'Rep. Checa':     [40, 1.15,1.00,0.61, 150,0,0],
  'Sudáfrica':      [42, 1.15,1.01,0.60, 100,0,0],
  'Qatar':          [37, 1.10,1.05,0.59,  70,0,0],
  'Cabo Verde':     [44, 1.05,1.05,0.58,  60,0,0],
  'Argelia':        [52, 1.02,1.06,0.57,  80,0,0],
  'Uzbekistán':     [50, 1.00,1.08,0.56,  50,0,0],
  'DR Congo':       [60, 0.95,1.10,0.53,  55,0,0],
  'Jordania':       [63, 0.88,1.15,0.51,  30,0,0],
  'Panamá':         [70, 0.85,1.18,0.49,  40,0,0],
  'Haití':          [68, 0.82,1.20,0.48,  25,0,0],
  'Curazao':        [72, 0.80,1.22,0.47,  30,0,0],
  'Irak':           [75, 0.85,1.15,0.50,  35,0,0],
  'Nueva Zelanda':  [85, 0.75,1.30,0.44,  20,0,0],
}

const GRP = {
  A: ['México','Sudáfrica','Corea del Sur','Rep. Checa'],
  B: ['Canadá','Bosnia-Herz.','Qatar','Suiza'],
  C: ['Brasil','Marruecos','Haití','Escocia'],
  D: ['USA','Paraguay','Australia','Turquía'],
  E: ['Alemania','Curazao','Costa de Marfil','Ecuador'],
  F: ['Países Bajos','Japón','Suecia','Túnez'],
  G: ['Bélgica','Egipto','Irán','Nueva Zelanda'],
  H: ['España','Cabo Verde','Arabia Saudí','Uruguay'],
  I: ['Francia','Senegal','Irak','Noruega'],
  J: ['Argentina','Argelia','Austria','Jordania'],
  K: ['Portugal','DR Congo','Uzbekistán','Colombia'],
  L: ['Inglaterra','Croacia','Ghana','Panamá'],
}

const GRP_COLORS = {
  A:'#16a34a',B:'#dc2626',C:'#ea580c',D:'#2563eb',
  E:'#7c3aed',F:'#65a30d',G:'#db2777',H:'#0891b2',
  I:'#9333ea',J:'#0284c7',K:'#ea580c',L:'#06b6d4',
}

// Bracket oficial FIFA 2026
const R32_DEF = [
  ['1E','3ABCDF'],['1I','3CDFGH'],['2A','2B'],['1F','2C'],
  ['2K','2L'],   ['1H','2J'],   ['1D','3BEFIJ'],['1G','3AEHIJ'],
  ['1C','2F'],   ['2E','2I'],   ['1A','3CEFHI'],['1L','3EHIJK'],
  ['1J','2H'],   ['2D','2G'],   ['1B','3EFGIJ'],['1K','3DEJL'],
]

// ── ENGINE ────────────────────────────────────────────────────────────────
function strength(nm) {
  const d = T[nm]; if (!d) return 0.40
  const [rank,,, fs, val, host, wc] = d
  const rf  = Math.max(0, 1-(rank-1)*0.008)
  const vf  = Math.log(val+1)/Math.log(1100)
  const wcf = Math.min(wc*0.025, 0.10)
  const h   = host ? 0.04 : 0
  return Math.min(0.82, Math.max(0.32, 0.20*rf+0.35*fs+0.15*vf+0.10*wcf+0.20*rf+h))
}

function poisson(lam) {
  const L = Math.exp(-Math.max(0.25, lam))
  let k=0, p=1
  do { k++; p *= Math.random() } while (p>L && k<20)
  return k-1
}

function simMatch(h, a, ko) {
  const sH=strength(h), sA=strength(a), tot=sH+sA+0.001
  const dH=T[h]||[], dA=T[a]||[]
  const lH = Math.max(0.3, (sH/tot)*(dH[1]||1.5)*(dA[2]||1.0)*(ko?0.85:1)*1.65+0.08)
  const lA = Math.max(0.2, (sA/tot)*(dA[1]||1.5)*(dH[2]||1.0)*(ko?0.85:1)*1.65)
  return [poisson(lH), poisson(lA)]
}

function simPens(h, a) {
  const p = 0.5+(strength(h)-strength(a))*0.15
  return Math.random() < Math.min(0.78,Math.max(0.22,p)) ? h : a
}

function playMatch(h, a, ko) {
  const [gh, ga] = simMatch(h, a, ko)
  const w = gh>ga ? h : ga>gh ? a : simPens(h, a)
  return { h, a, gh, ga, w }
}

function simGroup(teams) {
  const pts={}, gf={}, ga={}
  teams.forEach(t => { pts[t]=0; gf[t]=0; ga[t]=0 })
  for (let i=0; i<teams.length; i++)
    for (let j=i+1; j<teams.length; j++) {
      const [gh, ga2] = simMatch(teams[i], teams[j], false)
      gf[teams[i]]+=gh; ga[teams[i]]+=ga2
      gf[teams[j]]+=ga2; ga[teams[j]]+=gh
      if (gh>ga2) pts[teams[i]]+=3
      else if (gh===ga2) { pts[teams[i]]++; pts[teams[j]]++ }
      else pts[teams[j]]+=3
    }
  return [...teams].sort((a,b) =>
    pts[b]!==pts[a] ? pts[b]-pts[a] :
    (gf[b]-ga[b])!==(gf[a]-ga[a]) ? (gf[b]-ga[b])-(gf[a]-ga[a]) :
    gf[b]-gf[a]
  )
}

function resolveRef(ref, w1, r1, thirds) {
  const type=ref[0], grp=ref.slice(1)
  if (type==='1') return w1[grp]
  if (type==='2') return r1[grp]
  const best = thirds.filter(x => grp.includes(x.g))
    .sort((a,b) => b.pts!==a.pts ? b.pts-a.pts : b.gd!==a.gd ? b.gd-a.gd : b.gf-a.gf)
  return best.length ? best[0].t : (thirds[0]?.t || '?')
}

// ── ACUMULADORES ──────────────────────────────────────────────────────────
function mkAcc() { return { pairs: {} } }
function accPair(acc, h, a, gh, ga, w) {
  const key = h+'|'+a
  if (!acc.pairs[key]) acc.pairs[key] = { n:0, wins:{}, hwS:{}, dS:{}, awS:{} }
  const p = acc.pairs[key]; p.n++
  p.wins[w] = (p.wins[w]||0)+1
  const sc = gh+'-'+ga
  if (gh>ga) p.hwS[sc]=(p.hwS[sc]||0)+1
  else if (gh===ga) p.dS[sc]=(p.dS[sc]||0)+1
  else p.awS[sc]=(p.awS[sc]||0)+1
}

function mkMatchAcc() { return { n:0, hw:0, d:0, aw:0, hwS:{}, dS:{}, awS:{} } }
function accGrp(acc, gh, ga) {
  acc.n++
  const sc = gh+'-'+ga
  if (gh>ga) { acc.hw++; acc.hwS[sc]=(acc.hwS[sc]||0)+1 }
  else if (gh===ga) { acc.d++; acc.dS[sc]=(acc.dS[sc]||0)+1 }
  else { acc.aw++; acc.awS[sc]=(acc.awS[sc]||0)+1 }
}

function topEntry(obj) {
  const e = Object.entries(obj)
  return e.length ? e.sort((a,b)=>b[1]-a[1])[0] : null
}

function slotSummary(acc, N) {
  const topP = topEntry(acc.pairs)
  if (!topP) return { w:'TBD', l:'TBD', wGoals:'?', lGoals:'?', wPct:0, lPct:0 }
  const [key, pd] = topP
  const [h, a] = key.split('|')
  const topW = topEntry(pd.wins)
  const w = topW ? topW[0] : h
  const l = w===h ? a : h
  const wPct = +((pd.wins[w]||0)/N*100).toFixed(1)
  const lPct = +((pd.wins[l]||0)/N*100).toFixed(1)
  const pool = w===h ? pd.hwS : w===a ? pd.awS : pd.dS
  const topSc = topEntry(pool||{})
  let wGoals='1', lGoals='0'
  if (topSc) {
    const pts = topSc[0].split('-')
    wGoals = w===h ? pts[0] : pts[1]
    lGoals = w===h ? pts[1] : pts[0]
  }
  return { w, l, wGoals, lGoals, wPct, lPct }
}

function bestGrpScore(acc) {
  const n = acc.n||1
  const pw=acc.hw/n, pd=acc.d/n, pl=acc.aw/n
  const pool = pw>=pd&&pw>=pl ? acc.hwS : pd>=pw&&pd>=pl ? acc.dS : acc.awS
  const e = topEntry(pool||{})
  return { score: e?e[0]:'1-0', pct: e?Math.round(e[1]/n*100):0 }
}

// ── SIMULACIÓN ────────────────────────────────────────────────────────────
function runSimulation(N, onProgress, onDone) {
  const champC={}, grpQ={}
  const grpMatchAcc={}
  const gks = Object.keys(GRP)

  const r32acc = Array.from({length:16}, mkAcc)
  const r16acc = Array.from({length:8},  mkAcc)
  const qfAcc  = Array.from({length:4},  mkAcc)
  const sfAcc  = Array.from({length:2},  mkAcc)
  const finAcc = mkAcc()

  gks.forEach(g => {
    GRP[g].forEach(t => { if (!champC[t]) champC[t]=0; if (!grpQ[t]) grpQ[t]=0 })
    const tm = GRP[g]
    for (let i=0; i<tm.length; i++)
      for (let j=i+1; j<tm.length; j++)
        grpMatchAcc[tm[i]+'§'+tm[j]+'§'+g] = mkMatchAcc()
  })

  let done = 0
  const CHUNK = 2000

  function step() {
    const end = Math.min(done+CHUNK, N)
    for (let it=done; it<end; it++) {
      const w1={}, r1={}, thirds=[]
      gks.forEach(g => {
        const tm = GRP[g]
        const sorted = simGroup(tm)
        w1[g]=sorted[0]; r1[g]=sorted[1]
        for (let i=0; i<tm.length; i++)
          for (let j=i+1; j<tm.length; j++) {
            const [gh, ga] = simMatch(tm[i], tm[j], false)
            accGrp(grpMatchAcc[tm[i]+'§'+tm[j]+'§'+g], gh, ga)
          }
        grpQ[sorted[0]]++; grpQ[sorted[1]]++
        // calcular pts reales del 3ro para ranking de terceros
        const t3 = sorted[2]
        let p3=0, gf3=0, ga3=0
        for (let i=0; i<tm.length; i++)
          for (let j=i+1; j<tm.length; j++) {
            const [gh2, ga2] = simMatch(tm[i], tm[j], false)
            if (tm[i]===t3) { gf3+=gh2; ga3+=ga2; if(gh2>ga2)p3+=3; else if(gh2===ga2)p3++; }
            if (tm[j]===t3) { gf3+=ga2; ga3+=gh2; if(ga2>gh2)p3+=3; else if(gh2===ga2)p3++; }
          }
        thirds.push({ t:t3, g, pts:p3, gd:gf3-ga3, gf:gf3 })
      })
      thirds.sort((a,b) => b.pts!==a.pts?b.pts-a.pts:b.gd!==a.gd?b.gd-a.gd:b.gf-a.gf)

      const r32t = R32_DEF.map(([rH,rA]) => [
        resolveRef(rH,w1,r1,thirds),
        resolveRef(rA,w1,r1,thirds)
      ])

      const r16t=[], qft=[], sft=[], fint=[]

      r32t.forEach(([h,a],i) => {
        const res=playMatch(h,a,true); accPair(r32acc[i],res.h,res.a,res.gh,res.ga,res.w); r16t.push(res.w)
      })
      for (let i=0;i<16;i+=2) {
        const res=playMatch(r16t[i],r16t[i+1],true); accPair(r16acc[i/2],res.h,res.a,res.gh,res.ga,res.w); qft.push(res.w)
      }
      for (let i=0;i<8;i+=2) {
        const res=playMatch(qft[i],qft[i+1],true); accPair(qfAcc[i/2],res.h,res.a,res.gh,res.ga,res.w); sft.push(res.w)
      }
      for (let i=0;i<4;i+=2) {
        const res=playMatch(sft[i],sft[i+1],true); accPair(sfAcc[i/2],res.h,res.a,res.gh,res.ga,res.w); fint.push(res.w)
      }
      const res=playMatch(fint[0],fint[1],true)
      accPair(finAcc,res.h,res.a,res.gh,res.ga,res.w)
      champC[res.w]=(champC[res.w]||0)+1
    }
    done = end
    onProgress(Math.round(done/N*100))
    if (done < N) setTimeout(step, 0)
    else onDone({ champC, grpQ, grpMatchAcc, N, r32acc, r16acc, qfAcc, sfAcc, finAcc })
  }
  step()
}

// ── COMPONENTES UI ────────────────────────────────────────────────────────
const pct = (c,n) => n ? +(c/n*100).toFixed(1) : 0

function BracketCard({ acc, N }) {
  const s = slotSummary(acc, N)
  if (s.w === 'TBD') return (
    <div className="bracket-card">
      <div className="bracket-row tbd-row"><span className="team-name text-gray-500">TBD</span><span className="score-val">—</span></div>
      <div className="bracket-row tbd-row"><span className="team-name text-gray-500">TBD</span><span className="score-val">—</span></div>
    </div>
  )
  return (
    <div className="bracket-card">
      <div className="bracket-row winner-row">
        <span className="team-name">{s.w}</span>
        <span className="score-val">{s.wGoals}</span>
      </div>
      <div className="bracket-row loser-row">
        <span className="team-name">{s.l}</span>
        <span className="score-val">{s.lGoals}</span>
      </div>
    </div>
  )
}

function MatchCard({ h, a, acc }) {
  const n = acc.n || 1
  const pw = Math.round(acc.hw/n*100)
  const pd = Math.round(acc.d/n*100)
  const pl = Math.round(acc.aw/n*100)
  const { score, pct: sfPct } = bestGrpScore(acc)
  return (
    <div className="match-card">
      <div className="match-top">
        <div className="match-team right">
          <div className="team-nm">{h}</div>
          <div className="team-sub">Gana {pw}%</div>
        </div>
        <div className="match-score-box">
          <div className="match-score-num">{score}</div>
          <div className="match-score-lbl">más prob · {sfPct}%</div>
        </div>
        <div className="match-team left">
          <div className="team-nm">{a}</div>
          <div className="team-sub">Gana {pl}%</div>
        </div>
      </div>
      <div className="match-bot">
        <div className="prob-seg win-seg">
          <div className="prob-pct">{pw}%</div>
          <div className="prob-bar"><div className="prob-fill" style={{width:`${pw}%`,background:'#1D9E75'}} /></div>
          <div className="prob-lbl">Gana {h.split(' ')[0]}</div>
        </div>
        <div className="prob-seg draw-seg">
          <div className="prob-pct">{pd}%</div>
          <div className="prob-bar"><div className="prob-fill" style={{width:`${pd}%`,background:'#BA7517'}} /></div>
          <div className="prob-lbl">Empate</div>
        </div>
        <div className="prob-seg loss-seg">
          <div className="prob-pct">{pl}%</div>
          <div className="prob-bar"><div className="prob-fill" style={{width:`${pl}%`,background:'#D85A30'}} /></div>
          <div className="prob-lbl">Gana {a.split(' ')[0]}</div>
        </div>
      </div>
    </div>
  )
}

// ── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('bracket')
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState(null)
  const [groupFilter, setGroupFilter] = useState('')

  const handleSim = useCallback(() => {
    if (running) return
    setRunning(true)
    setProgress(0)
    setResults(null)
    runSimulation(100000,
      p => setProgress(p),
      data => { setResults(data); setRunning(false); setProgress(100) }
    )
  }, [running])

  const sorted = results
    ? Object.entries(results.champC).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1])
    : []

  const gks = Object.keys(GRP)

  return (
    <div className="app-wrap">
      <style>{`
        .app-wrap { max-width: 1200px; margin: 0 auto; padding: 1rem; }
        .top-bar { display:flex; align-items:center; gap:12px; margin-bottom:1rem; flex-wrap:wrap; }
        .app-title { font-size:22px; font-weight:700; color:#E8B923; }
        .badge { background:#1e3a5f; color:#60a5fa; font-size:11px; padding:2px 8px; border-radius:4px; }
        .sim-btn { padding:8px 20px; background:#E8B923; color:#0a0f1e; border:none; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; }
        .sim-btn:disabled { opacity:.5; cursor:not-allowed; }
        .sim-btn:hover:not(:disabled) { background:#f5cc30; }
        .prog-bar { height:3px; background:#1e2a3a; border-radius:2px; margin-bottom:1rem; overflow:hidden; }
        .prog-fill { height:100%; background:#E8B923; transition:width .2s; }
        .kpis { display:grid; grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); gap:8px; margin-bottom:1rem; }
        .kpi { background:#111827; border:1px solid #1e2a3a; border-radius:8px; padding:.5rem .75rem; }
        .kpi-l { font-size:10px; color:#6b7280; margin-bottom:2px; }
        .kpi-v { font-size:16px; font-weight:600; color:#e8eaf0; }
        .tabs { display:flex; gap:6px; margin-bottom:1rem; flex-wrap:wrap; }
        .tab { padding:6px 14px; border:1px solid #1e2a3a; border-radius:6px; font-size:12px; cursor:pointer; background:#111827; color:#9ca3af; }
        .tab.on { background:#1e2a3a; color:#e8eaf0; font-weight:600; border-color:#374151; }
        .sec { display:none; } .sec.on { display:block; }

        /* BRACKET */
        .br-scroll { overflow-x:auto; padding-bottom:8px; }
        .br-grid { display:grid; grid-template-columns:repeat(9,140px); gap:0; min-width:1260px; }
        .br-col { display:flex; flex-direction:column; }
        .br-col-head { font-size:9px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:.05em; text-align:center; padding:4px 3px; border-bottom:1px solid #1e2a3a; margin-bottom:6px; }
        .br-col-head.center { color:#E8B923; }
        .br-col-body { display:flex; flex-direction:column; flex:1; padding:0 3px; }
        .bracket-card { background:#111827; border:1px solid #1e2a3a; border-radius:8px; overflow:hidden; margin-bottom:4px; width:132px; }
        .bracket-row { display:flex; justify-content:space-between; align-items:center; padding:5px 8px; min-height:26px; }
        .bracket-row+.bracket-row { border-top:1px solid #1e2a3a; }
        .winner-row { background:#052e16; }
        .winner-row .team-name { font-weight:600; color:#4ade80; font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:88px; }
        .winner-row .score-val { color:#4ade80; font-weight:700; font-size:12px; }
        .loser-row .team-name { color:#9ca3af; font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:88px; }
        .loser-row .score-val { color:#6b7280; font-size:11px; }
        .tbd-row { background:transparent; }
        .score-val { min-width:18px; text-align:right; }
        .trophy-center { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:12px 4px; text-align:center; }
        .trophy-icon { font-size:28px; }
        .trophy-name { font-size:13px; font-weight:700; color:#E8B923; }
        .trophy-pct { font-size:11px; color:#9ca3af; }

        /* FIXTURE */
        .grp-header { font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:.05em; margin:1rem 0 6px; padding-bottom:4px; border-bottom:1px solid #1e2a3a; display:flex; align-items:center; gap:6px; }
        .grp-dot { width:8px; height:8px; border-radius:50%; }
        .match-card { background:#111827; border:1px solid #1e2a3a; border-radius:10px; margin-bottom:6px; overflow:hidden; }
        .match-top { display:grid; grid-template-columns:1fr 96px 1fr; align-items:center; padding:10px 14px; gap:6px; }
        .match-team.right { text-align:right; } .match-team.left { text-align:left; }
        .team-nm { font-size:14px; font-weight:600; color:#e8eaf0; }
        .team-sub { font-size:11px; color:#6b7280; margin-top:2px; }
        .match-score-box { display:flex; flex-direction:column; align-items:center; gap:2px; }
        .match-score-num { font-size:26px; font-weight:700; letter-spacing:4px; color:#e8eaf0; line-height:1; }
        .match-score-lbl { font-size:10px; color:#4b5563; text-align:center; }
        .match-bot { border-top:1px solid #1e2a3a; display:grid; grid-template-columns:1fr 1fr 1fr; }
        .prob-seg { padding:7px 4px; display:flex; flex-direction:column; align-items:center; gap:3px; }
        .prob-seg:not(:last-child) { border-right:1px solid #1e2a3a; }
        .prob-pct { font-size:15px; font-weight:600; }
        .win-seg .prob-pct { color:#1D9E75; } .draw-seg .prob-pct { color:#BA7517; } .loss-seg .prob-pct { color:#D85A30; }
        .prob-bar { width:80%; height:4px; background:#1e2a3a; border-radius:2px; overflow:hidden; }
        .prob-fill { height:100%; border-radius:2px; }
        .prob-lbl { font-size:10px; color:#6b7280; text-align:center; }

        /* CAMPEONES */
        .champ-row { display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid #1e2a3a; }
        .champ-row:last-child { border:none; }
        .champ-rank { font-size:11px; color:#4b5563; width:20px; text-align:right; }
        .champ-name { font-size:13px; color:#e8eaf0; min-width:120px; }
        .champ-bar-wrap { flex:1; height:7px; background:#1e2a3a; border-radius:4px; overflow:hidden; }
        .champ-bar { height:100%; border-radius:4px; }
        .champ-pct { font-size:12px; color:#9ca3af; min-width:42px; text-align:right; }

        /* GRUPOS */
        .grp-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(185px,1fr)); gap:10px; }
        .grp-card { background:#111827; border:1px solid #1e2a3a; border-radius:10px; padding:.7rem .9rem; }
        .grp-card-title { font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:.04em; margin-bottom:8px; }
        .grp-team-row { display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid #1e2a3a; }
        .grp-team-row:last-child { border:none; }
        .grp-team-name { font-size:12px; color:#e8eaf0; }
        .grp-team-pct { font-size:11px; font-weight:600; }

        .filter-row { display:flex; gap:8px; margin-bottom:.9rem; align-items:center; flex-wrap:wrap; }
        .filter-row label { font-size:12px; color:#6b7280; }
        .filter-row select { font-size:12px; padding:4px 10px; border:1px solid #1e2a3a; border-radius:6px; background:#111827; color:#e8eaf0; }

        @media (max-width:640px) {
          .match-top { grid-template-columns:1fr 80px 1fr; padding:8px; }
          .team-nm { font-size:12px; }
          .match-score-num { font-size:20px; }
        }
      `}</style>

      {/* HEADER */}
      <div className="top-bar">
        <div className="app-title">🏆 Simulador Mundial 2026</div>
        <div className="badge">100.000 iteraciones · Monte Carlo</div>
        <button className="sim-btn" onClick={handleSim} disabled={running}>
          {running ? `⏳ Simulando ${progress}%…` : results ? '↺ Re-simular' : '▶ Simular'}
        </button>
      </div>

      <div className="prog-bar"><div className="prog-fill" style={{width:`${progress}%`}} /></div>

      {/* KPIs */}
      <div className="kpis">
        <div className="kpi"><div className="kpi-l">Iteraciones</div><div className="kpi-v">{results ? (100000).toLocaleString() : '—'}</div></div>
        {sorted[0] && <><div className="kpi"><div className="kpi-l">Campeón #1</div><div className="kpi-v" style={{fontSize:13}}>{sorted[0][0]}</div></div><div className="kpi"><div className="kpi-l">Prob.</div><div className="kpi-v">{pct(sorted[0][1],100000)}%</div></div></>}
        {sorted[1] && <><div className="kpi"><div className="kpi-l">Campeón #2</div><div className="kpi-v" style={{fontSize:13}}>{sorted[1][0]}</div></div><div className="kpi"><div className="kpi-l">Prob.</div><div className="kpi-v">{pct(sorted[1][1],100000)}%</div></div></>}
        {sorted[2] && <><div className="kpi"><div className="kpi-l">Campeón #3</div><div className="kpi-v" style={{fontSize:13}}>{sorted[2][0]}</div></div><div className="kpi"><div className="kpi-l">Prob.</div><div className="kpi-v">{pct(sorted[2][1],100000)}%</div></div></>}
      </div>

      {/* TABS */}
      <div className="tabs">
        {[['bracket','🏆 Bracket'],['fixture','📅 Fixture'],['campeones','📊 Campeones'],['grupos','👥 Grupos']].map(([id,label]) => (
          <div key={id} className={`tab${tab===id?' on':''}`} onClick={()=>setTab(id)}>{label}</div>
        ))}
      </div>

      {/* ── BRACKET ── */}
      {tab==='bracket' && (
        <div>
          {!results ? (
            <div style={{color:'#6b7280',fontSize:13,padding:'2rem 0'}}>Presioná ▶ Simular para ver el bracket completo del torneo.</div>
          ) : (
            <div className="br-scroll">
              <div className="br-grid">
                {/* Cabeceras */}
                {['Dieciséisavos','Octavos','Cuartos','Semis','Final · Campeón','Semis','Cuartos','Octavos','Dieciséisavos'].map((h,i) => (
                  <div key={i} className="br-col">
                    <div className={`br-col-head${i===4?' center':''}`}>{h}</div>
                  </div>
                ))}
              </div>
              <div className="br-grid" style={{marginTop:-28}}>
                {/* R32 izq */}
                <div className="br-col">
                  <div className="br-col-body">
                    {results.r32acc.slice(0,8).map((acc,i)=>(
                      <div key={i} style={{marginBottom:4}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
                {/* R16 izq */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:27}}>
                    {results.r16acc.slice(0,4).map((acc,i)=>(
                      <div key={i} style={{marginBottom:i<3?30:0}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
                {/* QF izq */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:57}}>
                    {results.qfAcc.slice(0,2).map((acc,i)=>(
                      <div key={i} style={{marginBottom:i<1?94:0}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
                {/* SF izq */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:127}}>
                    <BracketCard acc={results.sfAcc[0]} N={results.N}/>
                  </div>
                </div>
                {/* CENTRO */}
                <div className="br-col">
                  <div className="br-col-body" style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',paddingTop:80}}>
                    <BracketCard acc={results.finAcc} N={results.N}/>
                    <div className="trophy-center">
                      <div className="trophy-icon">🏆</div>
                      <div className="trophy-name">{sorted[0]?.[0]||'—'}</div>
                      <div className="trophy-pct">{sorted[0]?pct(sorted[0][1],results.N)+'%':'—'} de prob.</div>
                    </div>
                  </div>
                </div>
                {/* SF der */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:127}}>
                    <BracketCard acc={results.sfAcc[1]} N={results.N}/>
                  </div>
                </div>
                {/* QF der */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:57}}>
                    {results.qfAcc.slice(2,4).map((acc,i)=>(
                      <div key={i} style={{marginBottom:i<1?94:0}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
                {/* R16 der */}
                <div className="br-col">
                  <div className="br-col-body" style={{paddingTop:27}}>
                    {results.r16acc.slice(4,8).map((acc,i)=>(
                      <div key={i} style={{marginBottom:i<3?30:0}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
                {/* R32 der */}
                <div className="br-col">
                  <div className="br-col-body">
                    {results.r32acc.slice(8,16).map((acc,i)=>(
                      <div key={i} style={{marginBottom:4}}><BracketCard acc={acc} N={results.N}/></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FIXTURE ── */}
      {tab==='fixture' && (
        <div>
          <div className="filter-row">
            <label>Filtrar por grupo:</label>
            <select value={groupFilter} onChange={e=>setGroupFilter(e.target.value)}>
              <option value="">Todos los grupos</option>
              {gks.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          {!results ? (
            <div style={{color:'#6b7280',fontSize:13,padding:'1rem 0'}}>Presioná ▶ Simular para ver los partidos.</div>
          ) : (
            gks.filter(g=>!groupFilter||g===groupFilter).map(g=>(
              <div key={g}>
                <div className="grp-header">
                  <div className="grp-dot" style={{background:GRP_COLORS[g]}}/>
                  Grupo {g}
                </div>
                {GRP[g].map((h,i)=>GRP[g].slice(i+1).map(a=>(
                  <MatchCard key={h+'§'+a} h={h} a={a} acc={results.grpMatchAcc[h+'§'+a+'§'+g]}/>
                )))}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── CAMPEONES ── */}
      {tab==='campeones' && (
        <div>
          <div style={{fontSize:12,color:'#6b7280',marginBottom:10}}>Frecuencia de campeonato en {(100000).toLocaleString()} simulaciones.</div>
          {!results ? (
            <div style={{color:'#6b7280',fontSize:13}}>Presioná ▶ Simular.</div>
          ) : (
            sorted.slice(0,20).map(([nm,c],i)=>{
              const colors=['#1D9E75','#378ADD','#7F77DD','#D85A30','#BA7517','#D4537E','#0F6E56','#185FA5','#533489','#3B6D11']
              return (
                <div key={nm} className="champ-row">
                  <div className="champ-rank">{i+1}</div>
                  <div className="champ-name">{nm}</div>
                  <div className="champ-bar-wrap">
                    <div className="champ-bar" style={{width:`${Math.round(c/sorted[0][1]*100)}%`,background:colors[i%10]}}/>
                  </div>
                  <div className="champ-pct">{pct(c,results.N)}%</div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* ── GRUPOS ── */}
      {tab==='grupos' && (
        <div>
          <div style={{fontSize:12,color:'#6b7280',marginBottom:10}}>% de clasificar desde la fase de grupos (top 2 + 8 mejores terceros).</div>
          {!results ? (
            <div style={{color:'#6b7280',fontSize:13}}>Presioná ▶ Simular.</div>
          ) : (
            <div className="grp-grid">
              {gks.map(g=>(
                <div key={g} className="grp-card">
                  <div className="grp-card-title" style={{color:GRP_COLORS[g]}}>Grupo {g}</div>
                  {GRP[g].map(t=>{
                    const p=(results.grpQ[t]||0)/results.N*100
                    const c=p>65?'#1D9E75':p>40?'#60a5fa':'#6b7280'
                    return (
                      <div key={t} className="grp-team-row">
                        <span className="grp-team-name">{t}</span>
                        <span className="grp-team-pct" style={{color:c}}>{p.toFixed(0)}%</span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
