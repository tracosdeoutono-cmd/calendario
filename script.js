// Injeta os 14 temas visuais na página (versão ENHANCED)
(function injectAllThemes() {
    if (document.getElementById("al-app-allthemes")) return;

    // Overlay animado para efeitos vivos
    if (!document.getElementById("al-theme-overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "al-theme-overlay";
        document.body.appendChild(overlay);
    }

    const style = document.createElement("style");
    style.id = "al-app-allthemes";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=VT323&family=Caveat:wght@400;700&family=Nunito:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Cinzel:wght@400;600;700;800&family=Cinzel+Decorative:wght@400;700;900&family=Fredoka:wght@400;600;700&family=Quicksand:wght@300;400;600;700&family=Russo+One&family=Raleway:wght@200;300;400;600;700&family=Bangers&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 70px 16px 20px 16px; /* Padding de topo para baixar o título */
            min-height: 100vh;
            transition: background-color 0.4s ease, color 0.3s ease;
            position: relative;
        }

        #result { max-width: 920px; margin: 0 auto; position: relative; z-index: 2; }

        /* Overlay animado global */
        #al-theme-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        /* ══════════════════════════════════════════ */
        /* 1. ⬜ BRANCO CLÁSSICO (INTOCADO)           */
        /* ══════════════════════════════════════════ */
        body[data-theme="white"], body:not([data-theme]) {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #ffffff;
            color: #212529;
        }
        body[data-theme="white"] #al-theme-overlay,
        body:not([data-theme]) #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════ */
        /* 2. 🍂 OUTONO LUXURY (INTOCADO)             */
        /* ══════════════════════════════════════════ */
        body[data-theme="outono"] {
            font-family: 'Outfit', sans-serif;
            background-color: #12100e;
            color: #fff8f0;
            background-image:
                radial-gradient(at 10% 10%, rgba(245, 158, 11, 0.14) 0px, transparent 45%),
                radial-gradient(at 90% 90%, rgba(234, 88, 12, 0.12) 0px, transparent 45%);
            background-attachment: fixed;
        }
        body[data-theme="outono"] div[style*="background-color: #f8f9fa"],
        body[data-theme="outono"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(26, 22, 19, 0.85) !important;
            border-color: rgba(245, 158, 11, 0.2) !important;
            color: #fff8f0 !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5) !important;
        }
        body[data-theme="outono"] h2, body[data-theme="outono"] h3 { color: #fff !important; }
        body[data-theme="outono"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════ */
        /* 3. 🖥️ RETRO TERMINAL (INTOCADO)            */
        /* ══════════════════════════════════════════ */
        body[data-theme="cyber"] {
            font-family: 'VT323', monospace;
            background-color: #000000;
            color: #00ff41;
            background-image: repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px, transparent 1px, transparent 3px);
            background-attachment: fixed;
            letter-spacing: 0.5px;
        }
        body[data-theme="cyber"] div[style*="background-color: #f8f9fa"],
        body[data-theme="cyber"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(0,20,0,0.8) !important;
            border: 1px solid #00ff41 !important;
            border-radius: 0px !important;
            box-shadow: 0 0 10px rgba(0,255,65,0.15), inset 0 0 30px rgba(0,255,65,0.03) !important;
            color: #00ff41 !important;
        }
        body[data-theme="cyber"] h1 { text-shadow: 0 0 10px rgba(0,255,65,0.5); }
        body[data-theme="cyber"] h2, body[data-theme="cyber"] h3 {
            color: #00ff41 !important; text-transform: uppercase; letter-spacing: 2px;
            text-shadow: 0 0 8px rgba(0,255,65,0.4); border-bottom: 1px dashed rgba(0,255,65,0.3); padding-bottom: 4px;
        }
        body[data-theme="cyber"] button { border-radius: 0px !important; font-family: 'VT323', monospace !important; text-transform: uppercase; letter-spacing: 1px; }
        body[data-theme="cyber"] hr { border-color: rgba(0,255,65,0.2) !important; }
        body[data-theme="cyber"] p, body[data-theme="cyber"] div, body[data-theme="cyber"] span { text-shadow: 0 0 4px rgba(0,255,65,0.15); }
        body[data-theme="cyber"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════ */
        /* 4. 📓 CADERNO (INTOCADO)                   */
        /* ══════════════════════════════════════════ */
        body[data-theme="cappuccino"] {
            font-family: 'Caveat', cursive;
            font-size: 18px;
            background-color: #fdf6e3;
            color: #2c1810;
            background-image:
                repeating-linear-gradient(transparent, transparent 31px, #e8d5b7 31px, #e8d5b7 32px),
                linear-gradient(90deg, transparent 60px, #f0c4c4 60px, #f0c4c4 61px, transparent 61px);
            background-attachment: local;
        }
        body[data-theme="cappuccino"] div[style*="background-color: #f8f9fa"],
        body[data-theme="cappuccino"] div[style*="border: 1px solid #ddd"] {
            background-color: #fffde7 !important; border: none !important;
            border-left: 4px solid #e88d67 !important; border-radius: 2px !important;
            box-shadow: 3px 3px 0px rgba(44,24,16,0.1) !important; color: #2c1810 !important;
            transform: rotate(-0.3deg);
        }
        body[data-theme="cappuccino"] h1 { font-size: 36px; text-decoration: underline wavy #e88d67; text-underline-offset: 6px; }
        body[data-theme="cappuccino"] h2, body[data-theme="cappuccino"] h3 { color: #c0392b !important; font-weight: 700; }
        body[data-theme="cappuccino"] button { font-family: 'Caveat', cursive !important; font-size: 17px !important; border-radius: 4px !important; border-style: dashed !important; }
        body[data-theme="cappuccino"] hr { border: none !important; border-bottom: 2px dashed #d4b896 !important; }
        body[data-theme="cappuccino"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════════════ */
        /* 5. 🌿 FLORESTA ENCANTADA (MEGA ENHANCED)          */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="emerald"] {
            font-family: 'Nunito', sans-serif;
            background-color: #010a01;
            color: #90e8a0;
            background-image:
                radial-gradient(ellipse at 0% -10%, rgba(0,60,15,0.35) 0%, transparent 55%),
                radial-gradient(ellipse at 100% -5%, rgba(0,50,20,0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 50% -15%, rgba(0,40,10,0.25) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 10%, rgba(5,70,25,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 5%, rgba(0,55,20,0.18) 0%, transparent 45%),
                radial-gradient(circle 18px at 5% 78%, rgba(80,255,140,0.18) 0%, rgba(40,200,100,0.04) 50%, transparent 100%),
                radial-gradient(circle 14px at 95% 55%, rgba(60,255,170,0.15) 0%, rgba(30,200,120,0.03) 50%, transparent 100%),
                radial-gradient(circle 20px at 40% 92%, rgba(100,255,100,0.12) 0%, rgba(50,200,80,0.03) 50%, transparent 100%),
                radial-gradient(circle 12px at 75% 88%, rgba(70,255,130,0.14) 0%, rgba(35,200,90,0.03) 50%, transparent 100%),
                radial-gradient(circle 16px at 15% 45%, rgba(90,255,160,0.1) 0%, rgba(45,200,110,0.02) 50%, transparent 100%),
                radial-gradient(circle 10px at 88% 30%, rgba(110,255,120,0.12) 0%, rgba(55,200,80,0.02) 50%, transparent 100%),
                radial-gradient(circle 2px at 8% 20%, rgba(200,255,100,0.8) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 12% 35%, rgba(180,255,80,0.7) 0%, transparent 100%),
                radial-gradient(circle 2px at 18% 55%, rgba(210,255,120,0.65) 0%, transparent 100%),
                radial-gradient(circle 1px at 22% 72%, rgba(190,255,90,0.75) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 28% 15%, rgba(170,255,110,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 33% 42%, rgba(220,255,130,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px at 38% 68%, rgba(200,255,70,0.7) 0%, transparent 100%),
                radial-gradient(circle 2px at 42% 28%, rgba(160,255,100,0.65) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 48% 85%, rgba(210,255,140,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 52% 12%, rgba(180,255,60,0.75) 0%, transparent 100%),
                radial-gradient(circle 2px at 58% 48%, rgba(190,255,110,0.6) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 62% 75%, rgba(200,255,90,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px at 68% 32%, rgba(170,255,130,0.7) 0%, transparent 100%),
                radial-gradient(circle 2px at 72% 58%, rgba(220,255,80,0.5) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 78% 18%, rgba(190,255,100,0.65) 0%, transparent 100%),
                radial-gradient(circle 1px at 82% 82%, rgba(210,255,120,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 88% 45%, rgba(180,255,70,0.55) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 92% 65%, rgba(200,255,140,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 96% 22%, rgba(170,255,90,0.7) 0%, transparent 100%),
                radial-gradient(circle 2px at 50% 50%, rgba(160,255,110,0.4) 0%, transparent 100%),
                linear-gradient(to top, rgba(5,30,10,0.6) 0%, rgba(5,25,8,0.3) 8%, transparent 25%),
                linear-gradient(135deg, transparent 40%, rgba(120,255,80,0.02) 45%, transparent 50%),
                linear-gradient(155deg, transparent 55%, rgba(100,230,60,0.015) 60%, transparent 65%);
            background-attachment: fixed;
        }
        body[data-theme="emerald"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(circle 3px at 25% 30%, rgba(150,255,80,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 55% 65%, rgba(130,255,100,0.5) 0%, transparent 100%),
                radial-gradient(circle 3px at 80% 25%, rgba(170,255,60,0.55) 0%, transparent 100%),
                radial-gradient(circle 2px at 15% 70%, rgba(140,255,90,0.5) 0%, transparent 100%),
                radial-gradient(circle 2.5px at 65% 85%, rgba(160,255,70,0.45) 0%, transparent 100%),
                radial-gradient(circle 2px at 40% 15%, rgba(180,255,110,0.5) 0%, transparent 100%),
                radial-gradient(circle 3px at 90% 50%, rgba(120,255,80,0.4) 0%, transparent 100%);
            animation: fireflyDrift 7s ease-in-out infinite alternate;
        }
        body[data-theme="emerald"] div[style*="background-color: #f8f9fa"],
        body[data-theme="emerald"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(145deg, rgba(4,60,30,0.55) 0%, rgba(2,45,20,0.4) 50%, rgba(6,70,35,0.3) 100%) !important;
            border: 1px solid rgba(52,211,153,0.2) !important;
            border-left: 4px solid rgba(52,211,153,0.6) !important;
            border-radius: 24px 8px 24px 8px !important;
            color: #90e8a0 !important;
            box-shadow: 0 8px 35px rgba(0,0,0,0.5), 0 0 25px rgba(34,197,94,0.06), inset 0 1px 0 rgba(100,255,100,0.04) !important;
            backdrop-filter: blur(8px) !important;
        }
        body[data-theme="emerald"] h1 {
            background: linear-gradient(135deg, #4ade80, #22c55e, #86efac);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: none; filter: drop-shadow(0 0 15px rgba(34,197,94,0.3));
        }
        body[data-theme="emerald"] h2, body[data-theme="emerald"] h3 { color: #4ade80 !important; font-weight: 800; text-shadow: 0 0 12px rgba(74,222,128,0.2); }
        body[data-theme="emerald"] button { border-radius: 50px !important; font-family: 'Nunito', sans-serif !important; font-weight: 700 !important; }
        body[data-theme="emerald"] hr { border: none !important; height: 1px !important; background: linear-gradient(90deg, transparent, rgba(52,211,153,0.25), rgba(74,222,128,0.15), transparent) !important; }

        /* ══════════════════════════════════════════════════ */
        /* 6. 🌌 COSMOS (MEGA ENHANCED)                      */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="glass"] {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #020008;
            color: #ddd0ff;
            background-image:
                radial-gradient(ellipse at 15% 30%, rgba(139,92,246,0.2) 0%, transparent 45%),
                radial-gradient(ellipse at 85% 20%, rgba(59,130,246,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 60% 75%, rgba(236,72,153,0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 35% 80%, rgba(6,182,212,0.1) 0%, transparent 40%),
                radial-gradient(ellipse at 90% 70%, rgba(249,115,22,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 5% 60%, rgba(168,85,247,0.08) 0%, transparent 35%),
                radial-gradient(ellipse at 50% 10%, rgba(56,189,248,0.07) 0%, transparent 30%),
                radial-gradient(ellipse at 70% 45%, rgba(192,38,211,0.05) 0%, transparent 30%),
                linear-gradient(135deg, transparent 30%, rgba(139,92,246,0.04) 40%, rgba(200,180,255,0.03) 50%, rgba(100,150,255,0.04) 60%, transparent 70%),
                radial-gradient(circle 1px at 3% 8%, rgba(255,255,255,0.9) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 7% 45%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 11% 72%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 15% 22%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1px at 19% 88%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 23% 55%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 27% 12%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 31% 68%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1px at 35% 35%, rgba(200,180,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 39% 92%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 43% 18%, rgba(180,200,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 47% 78%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 51% 42%, rgba(255,220,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 55% 5%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 1px at 59% 62%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 63% 28%, rgba(200,220,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 67% 85%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 71% 48%, rgba(255,200,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 75% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 79% 72%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 83% 38%, rgba(220,200,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 87% 95%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 91% 55%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 95% 25%, rgba(200,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 98% 82%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(ellipse 6px 3px at 20% 60%, rgba(200,180,255,0.15) 0%, transparent 100%),
                radial-gradient(ellipse 4px 2px at 75% 35%, rgba(180,200,255,0.12) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="glass"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(ellipse at 20% 40%, rgba(139,92,246,0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 60%, rgba(236,72,153,0.04) 0%, transparent 50%);
            animation: cosmosBreath 12s ease-in-out infinite alternate;
        }
        body[data-theme="glass"] div[style*="background-color: #f8f9fa"],
        body[data-theme="glass"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 50%, rgba(236,72,153,0.04) 100%) !important;
            border: 1px solid rgba(139,92,246,0.2) !important;
            border-radius: 16px !important;
            color: #ddd0ff !important;
            backdrop-filter: blur(24px) saturate(1.6) !important;
            box-shadow: 0 12px 45px rgba(139,92,246,0.1), 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06) !important;
        }
        body[data-theme="glass"] h1 { background: linear-gradient(135deg, #c084fc, #60a5fa, #f472b6, #22d3ee); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientShift 6s ease infinite; }
        body[data-theme="glass"] h2, body[data-theme="glass"] h3 { color: #c084fc !important; text-shadow: 0 0 15px rgba(192,132,252,0.2); }
        body[data-theme="glass"] button { font-family: 'Space Grotesk', sans-serif !important; border-radius: 12px !important; }
        body[data-theme="glass"] hr { border: none !important; height: 1px !important; background: linear-gradient(90deg, transparent, rgba(139,92,246,0.2), rgba(236,72,153,0.15), transparent) !important; }

        /* ══════════════════════════════════════════════════ */
        /* 7. 🌊 ABISMO MARINHO (MEGA ENHANCED)              */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="ocean"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #000610;
            color: #7dd3fc;
            background-image:
                radial-gradient(ellipse at 50% -20%, rgba(14,165,233,0.1) 0%, transparent 60%),
                radial-gradient(ellipse at 30% -10%, rgba(56,189,248,0.06) 0%, transparent 40%),
                radial-gradient(ellipse at 70% -5%, rgba(34,211,238,0.05) 0%, transparent 35%),
                radial-gradient(ellipse 40px 30px at 20% 15%, rgba(56,189,248,0.04) 0%, transparent 100%),
                radial-gradient(ellipse 50px 35px at 50% 10%, rgba(34,211,238,0.03) 0%, transparent 100%),
                radial-gradient(ellipse 35px 25px at 80% 18%, rgba(56,189,248,0.04) 0%, transparent 100%),
                radial-gradient(ellipse 45px 30px at 35% 8%, rgba(14,165,233,0.03) 0%, transparent 100%),
                linear-gradient(170deg, transparent 20%, rgba(6,182,212,0.03) 30%, transparent 40%),
                linear-gradient(190deg, transparent 50%, rgba(8,145,178,0.02) 60%, transparent 70%),
                radial-gradient(circle 8px at 10% 60%, rgba(34,211,238,0.15) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                radial-gradient(circle 12px at 85% 45%, rgba(56,189,248,0.12) 0%, rgba(14,165,233,0.02) 60%, transparent 100%),
                radial-gradient(circle 6px at 45% 75%, rgba(34,211,238,0.18) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                radial-gradient(circle 10px at 70% 85%, rgba(103,232,249,0.1) 0%, rgba(34,211,238,0.02) 60%, transparent 100%),
                radial-gradient(circle 8px at 25% 90%, rgba(56,189,248,0.13) 0%, rgba(14,165,233,0.02) 60%, transparent 100%),
                radial-gradient(circle 5px at 90% 70%, rgba(34,211,238,0.16) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                radial-gradient(circle 2px at 15% 40%, rgba(34,211,238,0.3) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 30% 55%, rgba(56,189,248,0.25) 0%, transparent 100%),
                radial-gradient(circle 2px at 55% 35%, rgba(103,232,249,0.2) 0%, transparent 100%),
                radial-gradient(circle 1px at 65% 60%, rgba(34,211,238,0.3) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 80% 50%, rgba(56,189,248,0.25) 0%, transparent 100%),
                radial-gradient(circle 2px at 40% 80%, rgba(34,211,238,0.2) 0%, transparent 100%),
                radial-gradient(circle 1px at 20% 70%, rgba(103,232,249,0.28) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 75% 30%, rgba(56,189,248,0.22) 0%, transparent 100%),
                radial-gradient(circle 2px at 50% 90%, rgba(34,211,238,0.18) 0%, transparent 100%),
                radial-gradient(circle 1px at 92% 25%, rgba(34,211,238,0.25) 0%, transparent 100%),
                linear-gradient(to bottom, rgba(0,20,40,0.0) 0%, rgba(0,10,25,0.3) 60%, rgba(0,5,15,0.6) 100%),
                radial-gradient(ellipse at 50% 100%, rgba(8,47,73,0.2) 0%, transparent 50%);
            background-attachment: fixed;
        }
        body[data-theme="ocean"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(circle 3px at 30% 50%, rgba(34,211,238,0.2) 0%, transparent 100%),
                radial-gradient(circle 4px at 60% 70%, rgba(56,189,248,0.15) 0%, transparent 100%),
                radial-gradient(circle 2px at 80% 35%, rgba(103,232,249,0.18) 0%, transparent 100%);
            animation: underwaterDrift 10s ease-in-out infinite alternate;
        }
        body[data-theme="ocean"] div[style*="background-color: #f8f9fa"],
        body[data-theme="ocean"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(180deg, rgba(8,47,73,0.5) 0%, rgba(6,40,65,0.35) 50%, rgba(4,30,50,0.45) 100%) !important;
            border: 1px solid rgba(34,211,238,0.15) !important;
            border-bottom: 3px solid rgba(34,211,238,0.25) !important;
            border-radius: 20px !important;
            color: #7dd3fc !important;
            box-shadow: 0 15px 45px rgba(0,0,0,0.5), 0 0 35px rgba(34,211,238,0.04), inset 0 -1px 0 rgba(34,211,238,0.06) !important;
            backdrop-filter: blur(12px) !important;
        }
        body[data-theme="ocean"] h1 {
            background: linear-gradient(135deg, #22d3ee, #38bdf8, #7dd3fc);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 20px rgba(34,211,238,0.3));
        }
        body[data-theme="ocean"] h2, body[data-theme="ocean"] h3 { color: #22d3ee !important; text-shadow: 0 0 15px rgba(34,211,238,0.25); }
        body[data-theme="ocean"] button { border-radius: 16px !important; }
        body[data-theme="ocean"] hr { border: none !important; height: 1px !important; background: linear-gradient(90deg, transparent, rgba(34,211,238,0.2), rgba(56,189,248,0.15), transparent) !important; }

        /* ══════════════════════════════════════════════════ */
        /* 8. 👑 MANUSCRITO MEDIEVAL (MEGA ENHANCED)          */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="royalgold"] {
            font-family: 'Cinzel', serif;
            background-color: #0c0604;
            color: #f0deb0;
            background-image:
                radial-gradient(ellipse at 5% 20%, rgba(212,175,55,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 95% 25%, rgba(212,175,55,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 50% 0%, rgba(180,130,50,0.07) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 100%, rgba(120,60,20,0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 10% 80%, rgba(180,40,20,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 90% 85%, rgba(160,50,25,0.05) 0%, transparent 30%),
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,175,55,0.01) 40px, rgba(212,175,55,0.01) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(212,175,55,0.008) 60px, rgba(212,175,55,0.008) 61px),
                linear-gradient(90deg, rgba(212,175,55,0.06) 0%, transparent 2%, transparent 98%, rgba(212,175,55,0.06) 100%);
            background-attachment: fixed;
        }
        body[data-theme="royalgold"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(ellipse at 5% 20%, rgba(255,180,50,0.05) 0%, transparent 40%),
                radial-gradient(ellipse at 95% 25%, rgba(255,180,50,0.04) 0%, transparent 35%);
            animation: torchFlicker 4s ease-in-out infinite alternate;
        }
        body[data-theme="royalgold"] div[style*="background-color: #f8f9fa"],
        body[data-theme="royalgold"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(30,16,6,0.92) 0%, rgba(40,22,8,0.85) 50%, rgba(35,18,6,0.9) 100%) !important;
            border: 2px solid rgba(212,175,55,0.3) !important;
            border-top: 3px solid rgba(212,175,55,0.45) !important;
            border-radius: 4px !important;
            color: #f0deb0 !important;
            box-shadow:
                0 8px 25px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(212,175,55,0.12),
                inset 0 -1px 0 rgba(212,175,55,0.06),
                0 0 0 1px rgba(212,175,55,0.08) !important;
            position: relative;
        }
        body[data-theme="royalgold"] h1 {
            text-transform: uppercase;
            letter-spacing: 4px;
            font-weight: 800;
            font-family: 'Cinzel Decorative', 'Cinzel', serif;
            background: linear-gradient(135deg, #d4af37, #f5d77a, #d4af37, #b8860b);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: goldShimmer 4s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
            border-bottom: 2px double #d4af37;
            padding-bottom: 12px;
        }
        body[data-theme="royalgold"] h2, body[data-theme="royalgold"] h3 {
            color: #d4af37 !important;
            font-variant: small-caps;
            letter-spacing: 2px;
            text-shadow: 0 1px 3px rgba(0,0,0,0.5);
            border-bottom: 1px solid rgba(212,175,55,0.15);
            padding-bottom: 6px;
        }
        body[data-theme="royalgold"] button {
            font-family: 'Cinzel', serif !important;
            border-radius: 3px !important;
            font-variant: small-caps;
            letter-spacing: 1px;
            border: 1px solid rgba(212,175,55,0.4) !important;
        }
        body[data-theme="royalgold"] hr {
            border: none !important;
            height: 3px !important;
            background: linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.15) 15%, #d4af37 40%, #f5d77a 50%, #d4af37 60%, rgba(212,175,55,0.15) 85%, transparent 95%) !important;
            margin: 22px 0 !important;
        }

        /* ══════════════════════════════════════════ */
        /* 9. 🎪 CARNAVAL (INTOCADO)                  */
        /* ══════════════════════════════════════════ */
        body[data-theme="carnival"] {
            font-family: 'Fredoka', sans-serif;
            background-color: #fffdf0;
            color: #1a1a2e;
            background-image:
                repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 20px,
                    rgba(255, 0, 80, 0.04) 20px,
                    rgba(255, 0, 80, 0.04) 40px
                );
            background-attachment: fixed;
        }
        body[data-theme="carnival"] div[style*="background-color: #f8f9fa"],
        body[data-theme="carnival"] div[style*="border: 1px solid #ddd"] {
            background-color: #fff7cc !important;
            border: 3px solid #ff0050 !important;
            border-radius: 20px !important;
            color: #1a1a2e !important;
            box-shadow: 5px 5px 0px #ff0050, 8px 8px 0px rgba(255,0,80,0.2) !important;
            transform: rotate(0.3deg);
        }
        body[data-theme="carnival"] h1 { color: #ff0050; text-shadow: 3px 3px 0px rgba(255,0,80,0.15); }
        body[data-theme="carnival"] h2 { color: #0066ff !important; font-weight: 700; }
        body[data-theme="carnival"] h3 { color: #ff0050 !important; font-weight: 700; }
        body[data-theme="carnival"] button {
            font-family: 'Fredoka', sans-serif !important;
            border-radius: 50px !important;
            font-weight: 600 !important;
            box-shadow: 3px 3px 0px rgba(0,0,0,0.15) !important;
        }
        body[data-theme="carnival"] hr { border: none !important; height: 4px !important; background: repeating-linear-gradient(90deg, #ff0050, #ff0050 10px, #0066ff 10px, #0066ff 20px, #ffcc00 20px, #ffcc00 30px) !important; border-radius: 2px !important; }
        body[data-theme="carnival"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════ */
        /* 10. 🌸 SAKURA (INTOCADO)                   */
        /* ══════════════════════════════════════════ */
        body[data-theme="sakura"] {
            font-family: 'Quicksand', sans-serif;
            font-weight: 400;
            background-color: #fff5f7;
            color: #5d3a4a;
            background-image:
                radial-gradient(ellipse at 80% 20%, rgba(251,113,133,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, rgba(244,114,182,0.08) 0%, transparent 50%),
                radial-gradient(circle 6px at 85% 15%, rgba(251,113,133,0.15) 0%, transparent 100%),
                radial-gradient(circle 4px at 10% 70%, rgba(244,114,182,0.12) 0%, transparent 100%),
                radial-gradient(circle 5px at 70% 85%, rgba(251,113,133,0.1) 0%, transparent 100%),
                radial-gradient(circle 3px at 30% 25%, rgba(244,114,182,0.13) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="sakura"] div[style*="background-color: #f8f9fa"],
        body[data-theme="sakura"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(255,255,255,0.7) !important;
            border: none !important;
            border-left: 3px solid #f9a8d4 !important;
            border-radius: 12px !important;
            color: #5d3a4a !important;
            box-shadow: 0 4px 20px rgba(244,114,182,0.08) !important;
        }
        body[data-theme="sakura"] h1 { color: #be185d; font-weight: 300; letter-spacing: 2px; }
        body[data-theme="sakura"] h2, body[data-theme="sakura"] h3 { color: #db2777 !important; font-weight: 600; }
        body[data-theme="sakura"] button {
            font-family: 'Quicksand', sans-serif !important;
            border-radius: 10px !important;
            font-weight: 600 !important;
        }
        body[data-theme="sakura"] hr { border: none !important; height: 1px !important; background: linear-gradient(90deg, transparent, #f9a8d4, transparent) !important; }
        body[data-theme="sakura"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════════════ */
        /* 11. 🔥 VULCÃO (MEGA ENHANCED)                     */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="lava"] {
            font-family: 'Russo One', sans-serif;
            background-color: #080000;
            color: #ff6b35;
            background-image:
                linear-gradient(175deg, transparent 30%, rgba(220,38,38,0.06) 35%, rgba(249,115,22,0.04) 40%, transparent 45%),
                linear-gradient(185deg, transparent 55%, rgba(234,88,12,0.05) 60%, rgba(220,38,38,0.03) 65%, transparent 70%),
                linear-gradient(170deg, transparent 75%, rgba(249,115,22,0.04) 80%, transparent 85%),
                radial-gradient(ellipse at 25% 75%, rgba(220,38,38,0.18) 0%, transparent 45%),
                radial-gradient(ellipse at 75% 25%, rgba(249,115,22,0.14) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.12) 0%, transparent 35%),
                radial-gradient(ellipse at 15% 30%, rgba(234,88,12,0.08) 0%, transparent 35%),
                radial-gradient(ellipse at 85% 70%, rgba(239,68,68,0.1) 0%, transparent 35%),
                linear-gradient(45deg, transparent 48%, rgba(249,115,22,0.04) 49%, rgba(253,186,116,0.02) 50%, transparent 51%),
                linear-gradient(135deg, transparent 52%, rgba(220,38,38,0.03) 53%, transparent 54%),
                linear-gradient(80deg, transparent 30%, rgba(249,115,22,0.02) 31%, transparent 32%),
                radial-gradient(circle 2px at 8% 25%, rgba(255,100,30,0.6) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 15% 60%, rgba(255,80,20,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 22% 40%, rgba(255,120,40,0.55) 0%, transparent 100%),
                radial-gradient(circle 2px at 30% 80%, rgba(255,90,25,0.45) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 38% 15%, rgba(255,110,35,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 45% 55%, rgba(255,70,15,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 52% 75%, rgba(255,130,50,0.4) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 60% 30%, rgba(255,85,20,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px at 68% 65%, rgba(255,100,30,0.5) 0%, transparent 100%),
                radial-gradient(circle 2px at 75% 45%, rgba(255,75,18,0.45) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 82% 85%, rgba(255,115,38,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 90% 20%, rgba(255,90,25,0.55) 0%, transparent 100%),
                radial-gradient(circle 2px at 95% 55%, rgba(255,105,32,0.4) 0%, transparent 100%),
                linear-gradient(to bottom, rgba(20,5,0,0.4) 0%, rgba(15,3,0,0.2) 10%, transparent 25%);
            background-attachment: fixed;
        }
        body[data-theme="lava"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(ellipse at 30% 80%, rgba(220,38,38,0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 30%, rgba(249,115,22,0.05) 0%, transparent 45%);
            animation: lavaPulse 5s ease-in-out infinite alternate;
        }
        body[data-theme="lava"] div[style*="background-color: #f8f9fa"],
        body[data-theme="lava"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(25,4,0,0.92) 0%, rgba(40,8,0,0.85) 50%, rgba(30,5,0,0.9) 100%) !important;
            border: 1px solid rgba(220,38,38,0.35) !important;
            border-bottom: 3px solid rgba(249,115,22,0.5) !important;
            border-radius: 8px !important;
            color: #ff6b35 !important;
            box-shadow:
                0 10px 30px rgba(220,38,38,0.15),
                0 0 1px rgba(249,115,22,0.3),
                inset 0 -2px 15px rgba(249,115,22,0.04),
                inset 0 1px 0 rgba(255,100,30,0.06) !important;
        }
        body[data-theme="lava"] h1 {
            background: linear-gradient(135deg, #ef4444, #f97316, #fbbf24, #f97316, #ef4444);
            background-size: 200% 100%;
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            animation: fireGradient 3s ease-in-out infinite;
            filter: drop-shadow(0 0 20px rgba(239,68,68,0.4)) drop-shadow(0 0 40px rgba(249,115,22,0.2));
            text-transform: uppercase;
        }
        body[data-theme="lava"] h2, body[data-theme="lava"] h3 {
            color: #f97316 !important;
            text-shadow: 0 0 12px rgba(249,115,22,0.35), 0 0 25px rgba(220,38,38,0.15);
            text-transform: uppercase; letter-spacing: 1.5px;
        }
        body[data-theme="lava"] button {
            font-family: 'Russo One', sans-serif !important;
            border-radius: 6px !important;
            text-transform: uppercase !important;
        }
        body[data-theme="lava"] hr { border: none !important; height: 2px !important; background: linear-gradient(90deg, transparent, #ef4444, #f97316, #fbbf24, #f97316, #ef4444, transparent) !important; }

        /* ══════════════════════════════════════════════════ */
        /* 12. ❄️ ÁRTICO (MEGA ENHANCED)                     */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="arctic"] {
            font-family: 'Raleway', sans-serif;
            font-weight: 300;
            background-color: #040e1c;
            color: #c7d2fe;
            background-image:
                radial-gradient(ellipse 80% 15% at 30% 15%, rgba(52,211,153,0.12) 0%, transparent 100%),
                radial-gradient(ellipse 60% 10% at 55% 12%, rgba(96,165,250,0.1) 0%, transparent 100%),
                radial-gradient(ellipse 70% 12% at 75% 18%, rgba(167,139,250,0.08) 0%, transparent 100%),
                radial-gradient(ellipse 50% 8% at 20% 20%, rgba(52,211,153,0.06) 0%, transparent 100%),
                radial-gradient(ellipse 65% 10% at 85% 10%, rgba(56,189,248,0.07) 0%, transparent 100%),
                radial-gradient(circle 1px at 5% 8%, rgba(255,255,255,0.9) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 12% 22%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 18% 45%, rgba(200,220,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 25% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1px at 32% 58%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 38% 32%, rgba(200,210,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 1px at 45% 12%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 52% 72%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 58% 42%, rgba(220,230,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 65% 8%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 1px at 72% 55%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 78% 28%, rgba(200,215,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 85% 48%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 0.5px at 92% 18%, rgba(255,255,255,0.8) 0%, transparent 100%),
                radial-gradient(circle 1px at 98% 65%, rgba(220,225,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 3px at 15% 35%, rgba(147,197,253,0.2) 0%, transparent 100%),
                radial-gradient(circle 2px at 45% 25%, rgba(165,180,252,0.18) 0%, transparent 100%),
                radial-gradient(circle 3px at 75% 60%, rgba(147,197,253,0.15) 0%, transparent 100%),
                radial-gradient(circle 2px at 35% 75%, rgba(200,220,255,0.2) 0%, transparent 100%),
                radial-gradient(circle 3px at 85% 40%, rgba(147,197,253,0.16) 0%, transparent 100%),
                linear-gradient(to top, rgba(15,25,50,0.4) 0%, rgba(10,20,40,0.2) 8%, transparent 20%),
                linear-gradient(to bottom, rgba(96,165,250,0.04) 0%, transparent 15%);
            background-attachment: fixed;
        }
        body[data-theme="arctic"] #al-theme-overlay {
            opacity: 1;
            background: linear-gradient(90deg,
                transparent 10%,
                rgba(52,211,153,0.04) 25%,
                rgba(96,165,250,0.05) 40%,
                rgba(167,139,250,0.04) 55%,
                rgba(52,211,153,0.03) 70%,
                transparent 90%
            );
            background-size: 200% 100%;
            animation: auroraWave 15s ease-in-out infinite;
        }
        body[data-theme="arctic"] div[style*="background-color: #f8f9fa"],
        body[data-theme="arctic"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(12,20,40,0.8) 0%, rgba(20,30,55,0.6) 50%, rgba(15,25,45,0.7) 100%) !important;
            border: 1px solid rgba(147,197,253,0.18) !important;
            border-top: 2px solid rgba(147,197,253,0.3) !important;
            border-radius: 4px !important;
            color: #c7d2fe !important;
            box-shadow: 0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(147,197,253,0.1), 0 0 20px rgba(96,165,250,0.03) !important;
            backdrop-filter: blur(10px) !important;
        }
        body[data-theme="arctic"] h1 {
            color: #93c5fd; font-weight: 200; letter-spacing: 5px; text-transform: uppercase;
            text-shadow: 0 0 20px rgba(147,197,253,0.2);
        }
        body[data-theme="arctic"] h2, body[data-theme="arctic"] h3 {
            color: #93c5fd !important; font-weight: 300; letter-spacing: 1.5px;
            text-shadow: 0 0 10px rgba(147,197,253,0.15);
        }
        body[data-theme="arctic"] button {
            font-family: 'Raleway', sans-serif !important;
            border-radius: 4px !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px;
        }
        body[data-theme="arctic"] hr { border: none !important; height: 1px !important; background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), rgba(165,180,252,0.15), transparent) !important; }

        /* ══════════════════════════════════════════════════ */
        /* 13. 🔮 CRISTAL MÍSTICO (NOVO - substitui Pop Art)  */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="crystal"] {
            font-family: 'Raleway', sans-serif;
            font-weight: 300;
            background-color: #08001a;
            color: #d8c0ff;
            background-image:
                radial-gradient(ellipse at 20% 30%, rgba(147,51,234,0.18) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.14) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 50%, rgba(126,34,206,0.08) 0%, transparent 55%),
                radial-gradient(ellipse at 75% 20%, rgba(59,130,246,0.12) 0%, transparent 40%),
                radial-gradient(ellipse at 15% 75%, rgba(96,165,250,0.08) 0%, transparent 35%),
                radial-gradient(ellipse at 85% 50%, rgba(16,185,129,0.08) 0%, transparent 35%),
                radial-gradient(ellipse at 10% 45%, rgba(52,211,153,0.06) 0%, transparent 30%),
                radial-gradient(ellipse at 40% 80%, rgba(244,63,94,0.07) 0%, transparent 35%),
                radial-gradient(ellipse at 60% 10%, rgba(236,72,153,0.06) 0%, transparent 30%),
                linear-gradient(45deg, transparent 20%, rgba(239,68,68,0.02) 22%, rgba(249,115,22,0.02) 24%, rgba(234,179,8,0.02) 26%, rgba(34,197,94,0.02) 28%, rgba(59,130,246,0.02) 30%, rgba(147,51,234,0.02) 32%, transparent 34%),
                linear-gradient(225deg, transparent 60%, rgba(147,51,234,0.02) 62%, rgba(59,130,246,0.02) 64%, rgba(34,197,94,0.02) 66%, rgba(234,179,8,0.02) 68%, rgba(249,115,22,0.02) 70%, rgba(239,68,68,0.02) 72%, transparent 74%),
                linear-gradient(60deg, transparent 45%, rgba(200,180,255,0.015) 48%, transparent 51%),
                linear-gradient(120deg, transparent 35%, rgba(180,200,255,0.012) 38%, transparent 41%),
                linear-gradient(30deg, transparent 55%, rgba(220,180,255,0.01) 58%, transparent 61%),
                radial-gradient(circle 2px at 12% 18%, rgba(200,180,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 25% 52%, rgba(147,197,253,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 35% 30%, rgba(192,132,252,0.65) 0%, transparent 100%),
                radial-gradient(circle 1px at 42% 72%, rgba(52,211,153,0.5) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 55% 15%, rgba(244,114,182,0.55) 0%, transparent 100%),
                radial-gradient(circle 2px at 62% 85%, rgba(96,165,250,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 70% 42%, rgba(253,186,116,0.45) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 78% 65%, rgba(192,132,252,0.6) 0%, transparent 100%),
                radial-gradient(circle 2px at 88% 28%, rgba(167,139,250,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px at 93% 78%, rgba(147,197,253,0.5) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 18% 88%, rgba(244,63,94,0.4) 0%, transparent 100%),
                radial-gradient(circle 1px at 48% 48%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 2px at 30% 68%, rgba(168,85,247,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 82% 12%, rgba(52,211,153,0.45) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 58% 58%, rgba(200,180,255,0.4) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="crystal"] #al-theme-overlay {
            opacity: 1;
            background:
                radial-gradient(ellipse at 30% 40%, rgba(147,51,234,0.04) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.03) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.01) 50%, transparent 70%);
            animation: crystalShimmer 8s ease-in-out infinite alternate;
        }
        body[data-theme="crystal"] div[style*="background-color: #f8f9fa"],
        body[data-theme="crystal"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(30,10,60,0.6) 0%, rgba(20,8,50,0.45) 50%, rgba(25,12,55,0.5) 100%) !important;
            border: 1px solid rgba(168,85,247,0.25) !important;
            border-left: 3px solid transparent !important;
            border-image: linear-gradient(to bottom, rgba(239,68,68,0.4), rgba(234,179,8,0.4), rgba(34,197,94,0.4), rgba(59,130,246,0.4), rgba(147,51,234,0.4)) 1 !important;
            border-radius: 12px !important;
            color: #d8c0ff !important;
            box-shadow: 0 10px 35px rgba(0,0,0,0.5), 0 0 20px rgba(147,51,234,0.06), inset 0 1px 0 rgba(255,255,255,0.05) !important;
            backdrop-filter: blur(16px) saturate(1.4) !important;
        }
        body[data-theme="crystal"] h1 {
            background: linear-gradient(135deg, #c084fc, #60a5fa, #34d399, #fbbf24, #f472b6, #c084fc);
            background-size: 300% 100%;
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            animation: prismShift 8s ease infinite;
            font-weight: 200; letter-spacing: 3px;
            filter: drop-shadow(0 0 15px rgba(168,85,247,0.3));
        }
        body[data-theme="crystal"] h2 { color: #c084fc !important; font-weight: 400; letter-spacing: 1px; text-shadow: 0 0 12px rgba(192,132,252,0.2); }
        body[data-theme="crystal"] h3 { color: #a78bfa !important; font-weight: 400; text-shadow: 0 0 10px rgba(167,139,250,0.2); }
        body[data-theme="crystal"] button {
            font-family: 'Raleway', sans-serif !important;
            border-radius: 8px !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px;
        }
        body[data-theme="crystal"] hr {
            border: none !important; height: 1px !important;
            background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15), rgba(234,179,8,0.15), rgba(34,197,94,0.15), rgba(59,130,246,0.15), rgba(147,51,234,0.15), transparent) !important;
        }

        /* ══════════════════════════════════════════════════ */
        /* 14. ⚡ SYNTHWAVE (NOVO - tema retro 80s neon)      */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="synthwave"] {
            font-family: 'Orbitron', sans-serif;
            font-weight: 400;
            background-color: #0a0020;
            color: #e0d0ff;
            background-image:
                linear-gradient(to top,
                    rgba(255,50,100,0.0) 0%,
                    rgba(255,50,100,0.06) 30%,
                    rgba(255,100,50,0.08) 40%,
                    rgba(255,150,50,0.06) 45%,
                    rgba(200,50,200,0.04) 55%,
                    rgba(100,0,150,0.03) 65%,
                    transparent 75%
                ),
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 59px,
                    rgba(255,45,149,0.04) 59px,
                    rgba(255,45,149,0.04) 60px
                ),
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 39px,
                    rgba(0,240,255,0.03) 39px,
                    rgba(0,240,255,0.03) 40px
                ),
                radial-gradient(ellipse at 20% 60%, rgba(255,45,149,0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 80% 40%, rgba(0,240,255,0.1) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 35% 20%, rgba(255,45,149,0.05) 0%, transparent 30%),
                radial-gradient(ellipse at 65% 75%, rgba(0,240,255,0.06) 0%, transparent 35%),
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 3px,
                    rgba(255,255,255,0.008) 3px,
                    rgba(255,255,255,0.008) 4px
                ),
                radial-gradient(circle 1.5px at 10% 10%, rgba(255,45,149,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 20% 30%, rgba(0,240,255,0.4) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 35% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 45% 25%, rgba(255,45,149,0.4) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 60% 12%, rgba(0,240,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 75% 5%, rgba(168,85,247,0.4) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 85% 18%, rgba(255,255,255,0.45) 0%, transparent 100%),
                radial-gradient(circle 1px at 92% 35%, rgba(255,45,149,0.35) 0%, transparent 100%),
                radial-gradient(circle 1px at 50% 45%, rgba(0,240,255,0.3) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="synthwave"] #al-theme-overlay {
            opacity: 1;
            background: linear-gradient(90deg,
                transparent,
                rgba(255,45,149,0.02) 20%,
                rgba(0,240,255,0.02) 40%,
                rgba(168,85,247,0.02) 60%,
                rgba(255,45,149,0.02) 80%,
                transparent
            );
            background-size: 200% 100%;
            animation: neonSweep 6s ease-in-out infinite;
        }
        body[data-theme="synthwave"] div[style*="background-color: #f8f9fa"],
        body[data-theme="synthwave"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(20,0,50,0.8) 0%, rgba(15,0,40,0.65) 100%) !important;
            border: 1px solid rgba(255,45,149,0.25) !important;
            border-bottom: 2px solid rgba(0,240,255,0.3) !important;
            border-radius: 4px !important;
            color: #e0d0ff !important;
            box-shadow:
                0 8px 30px rgba(0,0,0,0.5),
                0 0 15px rgba(255,45,149,0.06),
                0 0 15px rgba(0,240,255,0.04),
                inset 0 1px 0 rgba(255,255,255,0.04) !important;
            backdrop-filter: blur(10px) !important;
        }
        body[data-theme="synthwave"] h1 {
            background: linear-gradient(135deg, #ff2d95, #00f0ff, #ff2d95);
            background-size: 200% 100%;
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            animation: neonGradient 4s ease infinite;
            text-transform: uppercase; letter-spacing: 3px;
            filter: drop-shadow(0 0 15px rgba(255,45,149,0.4)) drop-shadow(0 0 30px rgba(0,240,255,0.2));
        }
        body[data-theme="synthwave"] h2 {
            color: #ff2d95 !important;
            text-shadow: 0 0 10px rgba(255,45,149,0.35), 0 0 20px rgba(255,45,149,0.15);
            text-transform: uppercase; letter-spacing: 2px; font-size: 16px;
        }
        body[data-theme="synthwave"] h3 {
            color: #00f0ff !important;
            text-shadow: 0 0 10px rgba(0,240,255,0.3), 0 0 20px rgba(0,240,255,0.12);
            text-transform: uppercase; letter-spacing: 1.5px;
        }
        body[data-theme="synthwave"] button {
            font-family: 'Orbitron', sans-serif !important;
            border-radius: 2px !important;
            text-transform: uppercase !important;
            letter-spacing: 1px;
            font-size: 12px !important;
            font-weight: 500 !important;
        }
        body[data-theme="synthwave"] hr {
            border: none !important; height: 2px !important;
            background: linear-gradient(90deg, transparent, #ff2d95, #00f0ff, #a855f7, transparent) !important;
        }

        /* ══════════════════════════════════════════ */
        /* ANIMAÇÕES PARA TEMAS VIVOS                 */
        /* ══════════════════════════════════════════ */
        @keyframes fireflyDrift {
            0% { transform: translateY(0) translateX(0); opacity: 0.3; }
            25% { opacity: 0.7; }
            50% { transform: translateY(-15px) translateX(8px); opacity: 0.5; }
            75% { opacity: 0.8; }
            100% { transform: translateY(-5px) translateX(-5px); opacity: 0.4; }
        }

        @keyframes cosmosBreath {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; }
            100% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes underwaterDrift {
            0% { transform: translateY(0) translateX(0); opacity: 0.4; }
            50% { transform: translateY(8px) translateX(-5px); opacity: 0.6; }
            100% { transform: translateY(-3px) translateX(3px); opacity: 0.5; }
        }

        @keyframes torchFlicker {
            0% { opacity: 0.5; }
            10% { opacity: 0.6; }
            20% { opacity: 0.45; }
            30% { opacity: 0.7; }
            40% { opacity: 0.5; }
            50% { opacity: 0.65; }
            60% { opacity: 0.55; }
            70% { opacity: 0.7; }
            80% { opacity: 0.5; }
            90% { opacity: 0.6; }
            100% { opacity: 0.55; }
        }

        @keyframes lavaPulse {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.02); }
            100% { opacity: 0.5; transform: scale(1); }
        }

        @keyframes auroraWave {
            0% { background-position: 0% 0%; opacity: 0.6; }
            50% { opacity: 0.9; }
            100% { background-position: 200% 0%; opacity: 0.6; }
        }

        @keyframes crystalShimmer {
            0% { opacity: 0.3; transform: rotate(0deg) scale(1); }
            50% { opacity: 0.6; }
            100% { opacity: 0.4; transform: rotate(0.5deg) scale(1.01); }
        }

        @keyframes neonSweep {
            0% { background-position: -100% 0%; }
            100% { background-position: 200% 0%; }
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes goldShimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes fireGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes prismShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes neonGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* ══════════════════════════════════════════ */
        /* AJUSTES ESCUROS PARA DROPDOWN + RELÓGIO    */
        /* ══════════════════════════════════════════ */
        body[data-theme="outono"] .theme-select-dropdown, body[data-theme="cyber"] .theme-select-dropdown,
        body[data-theme="emerald"] .theme-select-dropdown, body[data-theme="glass"] .theme-select-dropdown,
        body[data-theme="ocean"] .theme-select-dropdown, body[data-theme="royalgold"] .theme-select-dropdown,
        body[data-theme="lava"] .theme-select-dropdown, body[data-theme="arctic"] .theme-select-dropdown,
        body[data-theme="crystal"] .theme-select-dropdown, body[data-theme="synthwave"] .theme-select-dropdown {
            background-color: rgba(10,10,10,0.9) !important;
            border-color: rgba(255,255,255,0.2) !important;
            color: #fff !important;
        }
        body[data-theme="outono"] .clock-btn, body[data-theme="cyber"] .clock-btn,
        body[data-theme="emerald"] .clock-btn, body[data-theme="glass"] .clock-btn,
        body[data-theme="ocean"] .clock-btn, body[data-theme="royalgold"] .clock-btn,
        body[data-theme="lava"] .clock-btn, body[data-theme="arctic"] .clock-btn,
        body[data-theme="crystal"] .clock-btn, body[data-theme="synthwave"] .clock-btn {
            background-color: rgba(10,10,10,0.85) !important;
            border-color: rgba(255,255,255,0.2) !important;
        }

        /* ══════════════════════════════════════════ */
        /* COMPONENTES EXCLUSIVOS DO TEMA OUTONO      */
        /* ══════════════════════════════════════════ */
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; animation: pulse 1.6s infinite; }
        .pulse-red { background-color: #f43f5e; box-shadow: 0 0 0 0 rgba(244,63,94,0.7); }
        .pulse-green { background-color: #10b981; box-shadow: 0 0 0 0 rgba(16,185,129,0.7); }
        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244,63,94,0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0); }
        }
        .stat-box { background: rgba(18,16,14,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; padding: 18px; }
        .stat-val { font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 4px; }
        .bar-bg { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; margin-top: 10px; }
        .bar-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #ea580c); border-radius: 3px; }
        .segment-btn { font-family: inherit; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 12px; cursor: pointer; border: none; background: transparent; color: #a3998e; transition: all 0.25s ease; }
        .segment-btn.active-cleaning { background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 700; box-shadow: 0 4px 15px rgba(245,158,11,0.35); }
        .segment-btn.active-occupancy { background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(16,185,129,0.35); }
        .clock-btn { border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        body[data-theme="outono"] .clock-btn.active { background: linear-gradient(135deg, #ea580c, #c2410c) !important; box-shadow: 0 0 15px rgba(234,88,12,0.5) !important; border-color: transparent !important; }
    `;
    document.head.appendChild(style);
})();

const WORKER_BASE_URL = "https://al.tracosdeoutono.workers.dev";
const calendars = [
    { name: "Achada 1", url: `${WORKER_BASE_URL}?room=achada1` },
    { name: "Achada 2", url: `${WORKER_BASE_URL}?room=achada2` },
    { name: "Achada 3", url: `${WORKER_BASE_URL}?room=achada3` },
    { name: "Achada 4", url: `${WORKER_BASE_URL}?room=achada4` },
    { name: "Achada 5", url: `${WORKER_BASE_URL}?room=achada5` },
    { name: "Achada 6", url: `${WORKER_BASE_URL}?room=achada6` },
    { name: "Impasse 2", url: `${WORKER_BASE_URL}?room=impasse2` },
    { name: "Impasse 3", url: `${WORKER_BASE_URL}?room=impasse3` },
    { name: "Impasse 4", url: `${WORKER_BASE_URL}?room=impasse4` },
    { name: "Impasse Villa", url: `${WORKER_BASE_URL}?room=impassevilla` },
    { name: "Vizinho 1", url: `${WORKER_BASE_URL}?room=vizinho1` },
    { name: "Vizinho 2", url: `${WORKER_BASE_URL}?room=vizinho2` },
    { name: "Vizinho 3", url: `${WORKER_BASE_URL}?room=vizinho3` }
];

const result = document.getElementById("result");
let globalReservations = [];
let cloudHistory = {};
let currentView = "cleaning";
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let showPastStatsMode = false;
let selectedSnapshotDate = null;

// TEMA INICIAL PADRÃO (OUTONO)
let currentTheme = localStorage.getItem("al_theme") || "outono";
document.body.setAttribute("data-theme", currentTheme);

// NOVA FUNÇÃO: Injetar os botões do relógio e do tema fora da "caixa" principal
// para garantir que ficam SEMPRE fixos, mesmo ao fazer scroll da página.
window.createOrUpdateFixedControls = function() {
    let controls = document.getElementById("al-fixed-controls");
    if (!controls) {
        controls = document.createElement("div");
        controls.id = "al-fixed-controls";
        // Position fixed injetado diretamente no body com z-index muito alto
        controls.style.cssText = "position: fixed; top: 16px; right: 16px; display: flex; align-items: center; gap: 8px; z-index: 999999;";
        document.body.appendChild(controls);
    }

    const isSnapshots = currentView === "snapshots";
    controls.innerHTML = `
        <select class="theme-select-dropdown" onchange="window.setTheme(this.value)" title="Mudar Estilo" style="
            padding: 4px 8px; font-size: 13px; border-radius: 6px;
            border: 1px solid rgba(0,0,0,0.2); background-color: rgba(255,255,255,0.9); color: #333;
            cursor: pointer; outline: none; box-shadow: 0 2px 6px rgba(0,0,0,0.15); backdrop-filter: blur(5px);
        ">
            <option value="white" ${currentTheme==='white'?'selected':''}>⬜ Original</option>
            <option value="outono" ${currentTheme==='outono'?'selected':''}>🍂 Outono</option>
            <option value="cyber" ${currentTheme==='cyber'?'selected':''}>🖥️ Terminal</option>
            <option value="cappuccino" ${currentTheme==='cappuccino'?'selected':''}>📓 Caderno</option>
            <option value="emerald" ${currentTheme==='emerald'?'selected':''}>🌿 Floresta</option>
            <option value="glass" ${currentTheme==='glass'?'selected':''}>🌌 Cosmos</option>
            <option value="ocean" ${currentTheme==='ocean'?'selected':''}>🌊 Abismo</option>
            <option value="royalgold" ${currentTheme==='royalgold'?'selected':''}>👑 Medieval</option>
            <option value="carnival" ${currentTheme==='carnival'?'selected':''}>🎪 Carnaval</option>
            <option value="sakura" ${currentTheme==='sakura'?'selected':''}>🌸 Sakura</option>
            <option value="lava" ${currentTheme==='lava'?'selected':''}>🔥 Vulcão</option>
            <option value="arctic" ${currentTheme==='arctic'?'selected':''}>❄️ Ártico</option>
            <option value="crystal" ${currentTheme==='crystal'?'selected':''}>🔮 Cristal</option>
            <option value="synthwave" ${currentTheme==='synthwave'?'selected':''}>⚡ Synthwave</option>
        </select>
        <button onclick="window.toggleSnapshots()" class="clock-btn ${isSnapshots?'active':''}" style="
            font-size: 16px; background-color: ${isSnapshots?'#e2e6ea':'rgba(255,255,255,0.9)'};
            border: 1px solid rgba(0,0,0,0.2); width: 34px; height: 34px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15); padding: 0; backdrop-filter: blur(5px);
        " title="${isSnapshots?'Voltar ao Início':'Ver Previsões'}">🕒</button>
    `;
};
window.createOrUpdateFixedControls();

window.setTheme = function(themeKey) {
    currentTheme = themeKey;
    try { localStorage.setItem("al_theme", themeKey); } catch(e){}
    document.body.setAttribute("data-theme", currentTheme);
    window.createOrUpdateFixedControls();
    renderCurrentView();
};

function renderCurrentView() {
    if (currentView === "cleaning") showCleaningPlan();
    else if (currentView === "occupancy") showOccupancyPlan();
    else if (currentView === "snapshots") showSnapshotsPlan();
}

window.toggleSnapshots = function() {
    if (currentView === "snapshots") {
        currentView = "cleaning";
    } else {
        currentView = "snapshots";
        selectedSnapshotDate = null;
    }
    window.createOrUpdateFixedControls();
    renderCurrentView();
};

async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const separator = resource.includes("?") ? "&" : "?";
    const noCacheUrl = `${resource}${separator}_t=${Date.now()}`;
    const noCacheOptions = { ...options, cache: 'no-store', signal: controller.signal };
    try { const response = await fetch(noCacheUrl, noCacheOptions); clearTimeout(id); return response; }
    catch (error) { clearTimeout(id); throw error; }
}

window.copyFromData = function(btnElement, encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = "Copiado! ✅";
        setTimeout(() => { btnElement.innerText = originalText; }, 1500);
    }).catch(err => { console.error("Erro ao copiar:", err); });
};

window.switchMainView = function(view) { currentView = view; if (currentView === "snapshots") selectedSnapshotDate = null; renderCurrentView(); };
window.toggleHistoryView = function() { showHistoryMode = !showHistoryMode; showCleaningPlan(); };
window.toggleOccupancyStats = function() { showOccupancyStats = !showOccupancyStats; if (!showOccupancyStats) showPastStatsMode = false; showOccupancyPlan(); };
window.togglePastStats = function() { showPastStatsMode = !showPastStatsMode; showOccupancyPlan(); };
window.selectHouse = function(house) { selectedHouse = house; showOccupancyPlan(); };
window.selectSnapshot = function(dateKey) { selectedSnapshotDate = dateKey; showSnapshotsPlan(); };

async function fetchCloudHistory() {
    try { const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000); let data = await res.json(); cloudHistory = typeof data === 'string' ? JSON.parse(data) : data; if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) cloudHistory = {}; }
    catch (e) { console.warn("Aviso: Histórico não carregou.", e); cloudHistory = {}; }
}

async function saveToCloudHistory(newEntries) {
    try { await fetchWithTimeout(`${WORKER_BASE_URL}?action=saveHistory`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntries) }, 8000); }
    catch (e) { console.error("Erro ao guardar histórico:", e); }
}

async function loadCalendars() {
    // TEXTO INICIAL ATUALIZADO 
    result.innerHTML = "<p style='font-size: 18px; font-weight: bold;'>⏳ Está quase...</p>";
    try {
        const historyPromise = fetchCloudHistory();
        const calendarPromises = calendars.map(async (calendar) => {
            try { const response = await fetchWithTimeout(calendar.url, {}, 12000); if (!response.ok) return []; return parseICS(await response.text(), calendar.name); }
            catch (e) { console.warn("Erro ao carregar " + calendar.name); return []; }
        });
        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();
        updateCloudHistory();
        renderCurrentView();
    } catch (err) { result.innerHTML = `<p style="color: red; font-weight: bold;">Erro geral: ${err.message}</p>`; }
}

function parseDate(d) { return new Date(Number(d.substring(0,4)), Number(d.substring(4,6))-1, Number(d.substring(6,8))); }
function parseICS(text, roomName) {
    const r = []; if (!text || !text.includes("BEGIN:VEVENT")) return r;
    for (const event of text.split("BEGIN:VEVENT")) { const s = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/); const e = event.match(/DTEND(?:;[^:]*)?:(\d{8})/); if (s && e) r.push({ room: roomName, checkIn: parseDate(s[1]), checkOut: parseDate(e[1]) }); }
    return r;
}
function sameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate()+days); return d; }
function isSunday(date) { return date.getDay()===0; }
function getDaysBetween(a, b) { return Math.round((b.getTime()-a.getTime())/(1000*60*60*24)); }

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;
    const nextR = allReservations.filter(r => r.room===reservation.room && r.checkIn>=checkout).sort((a,b) => a.checkIn-b.checkIn)[0];
    const sameDayArr = nextR && sameDay(checkout, nextR.checkIn);
    let bestDay = checkout, isForcedSunday = false;
    if (isSunday(checkout) && sameDayArr) { bestDay=checkout; isForcedSunday=true; }
    else {
        let startDay = isSunday(checkout)?addDays(checkout,1):checkout, endDay = startDay;
        if (nextR) { if (getDaysBetween(checkout,nextR.checkIn)<=2) endDay=nextR.checkIn; }
        let bestScore=-1;
        for (let d=new Date(startDay); d<=endDay; d=addDays(d,1)) {
            if (isSunday(d)) continue; let score=0;
            allReservations.forEach(r => { if (sameDay(r.checkOut,d)) { score+=1; if (reservation.room.toLowerCase().includes("achada")&&r.room.toLowerCase().includes("achada")) score+=10; } });
            if (score>=bestScore) { bestScore=score; bestDay=new Date(d); }
        }
    }
    return { date: bestDay, sunday: isForcedSunday, urgent: nextR ? sameDay(bestDay,nextR.checkIn) : false };
}

function updateCloudHistory() {
    try {
        let hasChanges=false; const today=new Date(); today.setHours(0,0,0,0);
        let m = typeof cloudHistory==='object'&&cloudHistory!==null ? JSON.parse(JSON.stringify(cloudHistory)) : {};
        globalReservations.forEach(res => {
            const info=getCleaningInfo(res,globalReservations);
            if (info.date<=today) {
                const dk=info.date.getFullYear()+"-"+(info.date.getMonth()+1).toString().padStart(2,'0')+"-"+info.date.getDate().toString().padStart(2,'0');
                if (!m[dk]||typeof m[dk]!=='object') { m[dk]={dateIso:info.date.toISOString(),rooms:[]}; hasChanges=true; }
                if (!Array.isArray(m[dk].rooms)) m[dk].rooms=[];
                if (!m[dk].rooms.some(r=>r.room===res.room)) { m[dk].rooms.push({room:res.room,sunday:info.sunday,urgent:info.urgent}); hasChanges=true; }
            }
        });
        if (!m["_snapshots"]||typeof m["_snapshots"]!=='object') m["_snapshots"]={};
        const tk=today.getFullYear()+"-"+(today.getMonth()+1).toString().padStart(2,'0')+"-"+today.getDate().toString().padStart(2,'0');
        if (!m["_snapshots"][tk]) {
            let sp={}; const lim=addDays(today,6);
            globalReservations.forEach(res => {
                const info=getCleaningInfo(res,globalReservations);
                if (info.date>=today&&info.date<=lim) {
                    const sdk=info.date.getFullYear()+"-"+(info.date.getMonth()+1).toString().padStart(2,'0')+"-"+info.date.getDate().toString().padStart(2,'0');
                    if (!sp[sdk]) sp[sdk]={dateIso:info.date.toISOString(),rooms:[]};
                    if (!sp[sdk].rooms.some(r=>r.room===res.room)) sp[sdk].rooms.push({room:res.room,sunday:info.sunday,urgent:info.urgent});
                }
            });
            m["_snapshots"][tk]=sp; hasChanges=true;
        }
        if (hasChanges) { saveToCloudHistory(m); cloudHistory=m; }
    } catch(err) { console.error("Erro histórico:",err); }
}

// Removidos os controlos da renderNavigation para evitar serem reescritos e perderem a fixação
function renderNavigation() {
    const isCleaning=currentView==="cleaning", isOccupancy=currentView==="occupancy", isSnapshots=currentView==="snapshots";

    if (currentTheme==="outono") {
        return `
            <div style="margin-bottom: 22px;">
                <h1 style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #fff8f0 30%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">🍂 Traços de Outono</h1>
                <div style="font-size: 13px; color: #a3998e; font-weight: 500;">Gestão de Alojamento Local</div>
            </div>
            <div style="margin-bottom: 24px;">
                <div style="display: inline-flex; background: rgba(255,255,255,0.04); padding: 5px; border-radius: 16px; border: 1px solid rgba(245,158,11,0.2); gap: 4px;">
                    <button onclick="window.switchMainView('cleaning')" class="segment-btn ${isCleaning?'active-cleaning':''}">🧹 Limpezas</button>
                    <button onclick="window.switchMainView('occupancy')" class="segment-btn ${isOccupancy?'active-occupancy':''}">📊 Disponibilidade</button>
                </div>
            </div>`;
    }

    return `
        <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="window.switchMainView('cleaning')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #007bff; background-color: ${isCleaning?'#007bff':'#ffffff'}; color: ${isCleaning?'#ffffff':'#007bff'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧹 Plano de Limpezas</button>
            <button onclick="window.switchMainView('occupancy')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #28a745; background-color: ${isOccupancy?'#28a745':'#ffffff'}; color: ${isOccupancy?'#ffffff':'#28a745'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📊 Disponibilidade da Casa</button>
        </div>`;
}

function showSnapshotsPlan() {
    let html=renderNavigation(); html+=`<h1>🕒 Previsões Passadas</h1>`;
    const snapshots=cloudHistory["_snapshots"]||{}; const snapshotKeys=Object.keys(snapshots).sort().reverse();
    if (snapshotKeys.length===0) { html+=`<p>Ainda não há previsões guardadas. A primeira foi gerada agora!</p>`; result.innerHTML=html; return; }
    if (!selectedSnapshotDate) {
        html+=`<p style="color: #555;">Escolhe um dia para ver o plano que estava previsto nesse momento:</p><div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">`;
        snapshotKeys.forEach(key => { html+=`<button onclick="window.selectSnapshot('${key}')" style="padding: 10px 15px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #f8f9fa; color: #17a2b8; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">📅 ${new Date(key).toLocaleDateString("pt-PT",{day:"numeric",month:"long",year:"numeric"})}</button>`; });
        html+=`</div>`;
    } else {
        const label=new Date(selectedSnapshotDate).toLocaleDateString("pt-PT",{day:"numeric",month:"long",year:"numeric"});
        html+=`<div style="margin-bottom: 20px;"><button onclick="window.selectSnapshot(null)" style="padding: 8px 14px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">🔙 Voltar</button></div>`;
        html+=`<h2 style="color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 8px;">Plano do dia: <span style="color: #333;">${label}</span></h2>`;
        const plan=snapshots[selectedSnapshotDate]; const planKeys=Object.keys(plan).sort();
        if (planKeys.length===0) html+=`<p>Sem limpezas planeadas.</p>`;
        planKeys.forEach(key => {
            const day=plan[key]; const d=new Date(day.dateIso);
            let title=d.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
            if (day.rooms.some(r=>r.sunday)) title="🔴 "+title;
            let rh=""; day.rooms.sort((a,b)=>a.room.localeCompare(b.room)).forEach(c => { rh+=`${c.urgent?"⚠️":"🧹"} ${c.room}${c.urgent?" <b>(entrada no mesmo dia)</b>":""}<br>`; });
            html+=`<div style="margin-top: 15px; margin-bottom: 15px;"><h3 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">${title}</h3><div style="font-size: 15px;">${rh}</div></div><hr style="border: 0; border-top: 1px solid #eee;">`;
        });
    }
    result.innerHTML=html;
}

function showCleaningPlan() {
    const today=new Date(); today.setHours(0,0,0,0); let grouped={};
    if (showHistoryMode) {
        Object.keys(cloudHistory).forEach(dk => { if (cloudHistory[dk]&&cloudHistory[dk].dateIso) { const id=new Date(cloudHistory[dk].dateIso); if (id<today) grouped[dk]={date:id,rooms:cloudHistory[dk].rooms||[]}; } });
    } else {
        globalReservations.forEach(res => {
            const info=getCleaningInfo(res,globalReservations);
            if (info.date>=today) {
                const dk=info.date.getFullYear()+"-"+(info.date.getMonth()+1).toString().padStart(2,'0')+"-"+info.date.getDate().toString().padStart(2,'0');
                if (!grouped[dk]) grouped[dk]={date:info.date,rooms:[]};
                if (!grouped[dk].rooms.some(r=>r.room===res.room)) grouped[dk].rooms.push({room:res.room,sunday:info.sunday,urgent:info.urgent});
            }
        });
    }
    let sortedKeys=Object.keys(grouped).sort(); if (showHistoryMode) sortedKeys.reverse();
    let html=renderNavigation();
    html+=`<div style="margin-bottom: 25px;"><button onclick="window.toggleHistoryView()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">${showHistoryMode?"📅 Ver Próximas Limpezas":"📜 Ver Dias Anteriores"}</button></div>`;
    html+=`<h1>${showHistoryMode?"📜 Histórico de Limpezas (Cloud)":"🧹 Plano de Limpezas"}</h1>`;
    if (sortedKeys.length===0) html+=`<p>Não há limpezas ${showHistoryMode?'anteriores no histórico':'agendadas'}.</p>`;

    sortedKeys.forEach(key => {
        const day=grouped[key];
        let title=day.date.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
        if (day.rooms.some(r=>r.sunday)) title="🔴 "+title;
        let dPt=title.replace("🔴 ",""); dPt=dPt.charAt(0).toUpperCase()+dPt.slice(1); let cPt=[`🧹 Limpezas - ${dPt}:`];
        let dEs=day.date.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); dEs=dEs.charAt(0).toUpperCase()+dEs.slice(1); let cEs=[`🧹 Limpiezas - ${dEs}:`];
        let rh="";
        day.rooms.sort((a,b)=>a.room.localeCompare(b.room)).forEach(clean => {
            const hCo=globalReservations.some(r=>r.room===clean.room&&sameDay(r.checkOut,day.date));
            const hCi=clean.urgent||globalReservations.some(r=>r.room===clean.room&&sameDay(r.checkIn,day.date));
            let tPt="",tEs="",tH="";
            if (hCo&&hCi){tPt=" (sai e entra)";tEs=" (sale y entra)";tH=" <b>(sai e entra)</b>";}
            else if(hCo){tPt=" (sai hoje)";tEs=" (sale hoy)";tH=" <b>(sai hoje)</b>";}
            else if(hCi){tPt=" (entrada hoje)";tEs=" (entrada hoy)";tH=" <b>(entrada hoje)</b>";}
            const em=hCi?"⚠️":"🧹"; cPt.push(`${em} ${clean.room}${tPt}`); cEs.push(`${em} ${clean.room}${tEs}`); rh+=`${em} ${clean.room}${tH}<br>`;
        });
        const ePt=encodeURIComponent(cPt.join("\n")), eEs=encodeURIComponent(cEs.join("\n"));
        html+=`<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
            <h2 style="margin: 0;">${title}</h2>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="window.copyFromData(this,'${ePt}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #28a745; background-color: #28a745; color: white; font-weight: bold;">🇵🇹 Copiar PT</button>
                <button onclick="window.copyFromData(this,'${eEs}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #17a2b8; color: white; font-weight: bold;">🇪🇸 Copiar ES</button>
            </div></div><div style="margin-top: 8px;">${rh}</div><hr>`;
    });
    result.innerHTML=html;
}

function getHouseRooms(h) {
    if(h==="achada") return ["Achada 1","Achada 2","Achada 3","Achada 4","Achada 5","Achada 6"];
    if(h==="impasse") return ["Impasse 2","Impasse 3","Impasse 4"];
    if(h==="vizinho") return ["Vizinho 1","Vizinho 2","Vizinho 3"]; return [];
}

function calculateHouseStats(houseKey) {
    const rooms=getHouseRooms(houseKey); if(!rooms.length) return {};
    const hr=globalReservations.filter(r=>rooms.includes(r.room)); if(!hr.length) return {};
    let minD=new Date(),maxD=new Date();
    hr.forEach(r=>{if(r.checkIn<minD)minD=new Date(r.checkIn);if(r.checkOut>maxD)maxD=new Date(r.checkOut);});
    let cur=new Date(minD.getFullYear(),minD.getMonth(),1), end=new Date(maxD.getFullYear(),maxD.getMonth()+1,0);
    const stats={};
    while(cur<=end){
        const mk=cur.getFullYear()+"-"+String(cur.getMonth()+1).padStart(2,'0');
        const ml=cur.toLocaleDateString("pt-PT",{month:"long",year:"numeric"});
        if(!stats[mk]) stats[mk]={label:ml.charAt(0).toUpperCase()+ml.slice(1),dormidas:0,checkins:0,checkouts:0,diasEsgotados:0,totalCapacity:rooms.length*new Date(cur.getFullYear(),cur.getMonth()+1,0).getDate()};
        let occ=0;
        rooms.forEach(room=>{
            const isO=hr.some(r=>{if(r.room!==room)return false;const cI=new Date(r.checkIn);cI.setHours(0,0,0,0);const cO=new Date(r.checkOut);cO.setHours(0,0,0,0);return cur>=cI&&cur<cO;});
            if(isO){stats[mk].dormidas++;occ++;}
            if(hr.some(r=>r.room===room&&sameDay(r.checkIn,cur)))stats[mk].checkins++;
        });
        if(occ===rooms.length)stats[mk].diasEsgotados++;
        cur=addDays(cur,1);
    }
    return stats;
}

function showOccupancyPlan() {
    const houseRooms=getHouseRooms(selectedHouse), totalRooms=houseRooms.length;
    const houseLabels={achada:"Achada (6 Quartos)",impasse:"Impasse (3 Quartos)",vizinho:"Vizinho (3 Quartos)"};
    let html=renderNavigation();
    html+=`<div style="margin-bottom: 25px; display: flex; gap: 8px; flex-wrap: wrap;">
        <button onclick="window.selectHouse('achada')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='achada'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='achada'?'#ffffff':'#17a2b8'}; font-weight: bold;">🏡 Achada</button>
        <button onclick="window.selectHouse('impasse')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='impasse'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='impasse'?'#ffffff':'#17a2b8'}; font-weight: bold;">🏡 Impasse</button>
        <button onclick="window.selectHouse('vizinho')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='vizinho'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='vizinho'?'#ffffff':'#17a2b8'}; font-weight: bold;">🏡 Vizinho</button>
    </div>
    <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
    <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
        <button onclick="window.toggleOccupancyStats()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #ffc107; background-color: ${showOccupancyStats?'#e0a800':'#ffc107'}; color: #333; font-weight: bold;">${showOccupancyStats?'🔙 Ocultar Estatísticas':'📈 Ver Estatísticas Mensais'}</button>
        ${showOccupancyStats?`<button onclick="window.togglePastStats()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: ${showPastStatsMode?'#5a6268':'#6c757d'}; color: white; font-weight: bold;">${showPastStatsMode?'📅 Ver Meses Atuais e Futuros':'📜 Ver Meses Passados'}</button>`:''}
    </div>`;

    if (showOccupancyStats) {
        const stats=calculateHouseStats(selectedHouse); let statKeys=Object.keys(stats);
        const cmk=new Date().getFullYear()+"-"+String(new Date().getMonth()+1).padStart(2,'0');
        statKeys=showPastStatsMode?statKeys.filter(k=>k<cmk).sort().reverse():statKeys.filter(k=>k>=cmk).sort();
        if(!statKeys.length) html+=`<p>Sem dados de estatísticas.</p><hr>`;
        else {
            html+=`<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">`;
            statKeys.forEach(key => {
                const s=stats[key], taxa=s.totalCapacity>0?Math.round((s.dormidas/s.totalCapacity)*100):0;
                if(currentTheme==="outono") {
                    html+=`<div class="stat-box" style="flex: 1; min-width: 220px;"><div style="color: #fbbf24; font-weight: 700; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">${s.label}</div><div class="stat-val">${taxa}% <span style="font-size: 13px; font-weight: 500; color: #a3998e;">ocupação</span></div><div class="bar-bg"><div class="bar-fill" style="width: ${taxa}%;"></div></div><div style="margin-top: 12px; font-size: 13px; color: #a3998e; display: flex; flex-direction: column; gap: 4px;"><span>🌙 Dormidas: <strong style="color: #fff;">${s.dormidas}</strong> / ${s.totalCapacity}</span><span>🧳 Check-ins: <strong style="color: #fff;">${s.checkins}</strong></span><span>🔥 Dias 100% cheios: <strong style="color: #34d399;">${s.diasEsgotados}</strong></span></div></div>`;
                } else {
                    html+=`<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; flex: 1; min-width: 220px; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"><h3 style="margin-top: 0; color: #007bff; text-transform: capitalize; border-bottom: 1px solid #ccc; padding-bottom: 8px;">${s.label}</h3><p style="margin: 8px 0; font-size: 15px;"><strong>🛏️ Ocupação:</strong> ${taxa}%</p><p style="margin: 8px 0; font-size: 15px;"><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size: 12px; color: #666;">(de ${s.totalCapacity})</span></p><p style="margin: 8px 0; font-size: 15px;"><strong>🧳 Check-ins:</strong> ${s.checkins}</p><p style="margin: 8px 0; font-size: 15px;"><strong>🔥 Dias 100% cheios:</strong> ${s.diasEsgotados}</p></div>`;
                }
            });
            html+=`</div>`;
        }
    }
    html+=`<hr>`;
    const today=new Date(); today.setHours(0,0,0,0);
    let maxDate=addDays(today,60);
    globalReservations.forEach(r=>{if(houseRooms.includes(r.room)){const o=new Date(r.checkOut);o.setHours(0,0,0,0);if(o>maxDate)maxDate=o;}});
    const totalDays=getDaysBetween(today,maxDate)+1;
    for(let i=0;i<totalDays;i++){
        const cd=addDays(today,i); let rd=[];
        houseRooms.forEach(rn=>{
            const hCo=globalReservations.some(r=>r.room===rn&&sameDay(r.checkOut,cd));
            const hCi=globalReservations.some(r=>r.room===rn&&sameDay(r.checkIn,cd));
            const isO=globalReservations.some(r=>{if(r.room!==rn)return false;const cI=new Date(r.checkIn);cI.setHours(0,0,0,0);const cO=new Date(r.checkOut);cO.setHours(0,0,0,0);return cd>=cI&&cd<cO;});
            if(isO||hCo||hCi){let t="";if(hCo&&hCi)t=" <b>(sai e entra)</b>";else if(hCo)t=" <b>(sai)</b>";else if(hCi)t=" <b>(entra)</b>";rd.push(`${rn}${t}`);}
        });
        const cnt=rd.length;
        html+=`<h2>${cd.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</h2>`;
        if(cnt===0) html+=`<div style="font-size: 18px; font-weight: bold; color: #28a745; margin-bottom: 5px;">0 🟢</div>`;
        else { html+=`<div style="font-size: 18px; font-weight: bold; color: #dc3545; margin-bottom: 5px;">${cnt} / ${totalRooms} 🔴</div>`; html+=`<div style="font-size: 14px; color: #333;">Ocupados: ${rd.join(", ")}</div>`; }
        html+="<hr>";
    }
    result.innerHTML=html;
}

loadCalendars();
