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
            padding: 70px 16px 20px 16px; /* Ajuste: mais padding no topo para baixar o título e afastar dos botões */
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
        /*    Floresta bioluminescente profunda, pirilampos   */
        /*    por todo o lado, cogumelos brilhantes, nevoeiro */
        /*    denso, copas de árvores sobrepostas, vida       */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="emerald"] {
            font-family: 'Nunito', sans-serif;
            background-color: #010a01;
            color: #90e8a0;
            background-image:
                /* Copas de árvores densas - múltiplas camadas */
                radial-gradient(ellipse at 0% -10%, rgba(0,60,15,0.35) 0%, transparent 55%),
                radial-gradient(ellipse at 100% -5%, rgba(0,50,20,0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 50% -15%, rgba(0,40,10,0.25) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 10%, rgba(5,70,25,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 5%, rgba(0,55,20,0.18) 0%, transparent 45%),
                /* Cogumelos bioluminescentes - brilho grande e difuso */
                radial-gradient(circle 18px at 5% 78%, rgba(80,255,140,0.18) 0%, rgba(40,200,100,0.04) 50%, transparent 100%),
                radial-gradient(circle 14px at 95% 55%, rgba(60,255,170,0.15) 0%, rgba(30,200,120,0.03) 50%, transparent 100%),
                radial-gradient(circle 20px at 40% 92%, rgba(100,255,100,0.12) 0%, rgba(50,200,80,0.03) 50%, transparent 100%),
                radial-gradient(circle 12px at 75% 88%, rgba(70,255,130,0.14) 0%, rgba(35,200,90,0.03) 50%, transparent 100%),
                radial-gradient(circle 16px at 15% 45%, rgba(90,255,160,0.1) 0%, rgba(45,200,110,0.02) 50%, transparent 100%),
                radial-gradient(circle 10px at 88% 30%, rgba(110,255,120,0.12) 0%, rgba(55,200,80,0.02) 50%, transparent 100%),
                /* Pirilampos - campo inteiro de luz */
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
                /* Nevoeiro no chão da floresta */
                linear-gradient(to top, rgba(5,30,10,0.6) 0%, rgba(5,25,8,0.3) 8%, transparent 25%),
                /* Raios de luz a penetrar a copa */
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
        /*    Espaço profundo com nebulosas em múltiplas      */
        /*    cores, via láctea, campo estelar denso,         */
        /*    galáxias distantes, grandiosidade cósmica       */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="glass"] {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #020008;
            color: #ddd0ff;
            background-image:
                /* Nebulosas - múltiplas cores e camadas */
                radial-gradient(ellipse at 15% 30%, rgba(139,92,246,0.2) 0%, transparent 45%),
                radial-gradient(ellipse at 85% 20%, rgba(59,130,246,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 60% 75%, rgba(236,72,153,0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 35% 80%, rgba(6,182,212,0.1) 0%, transparent 40%),
                radial-gradient(ellipse at 90% 70%, rgba(249,115,22,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 5% 60%, rgba(168,85,247,0.08) 0%, transparent 35%),
                radial-gradient(ellipse at 50% 10%, rgba(56,189,248,0.07) 0%, transparent 30%),
                radial-gradient(ellipse at 70% 45%, rgba(192,38,211,0.05) 0%, transparent 30%),
                /* Via Láctea - faixa diagonal */
                linear-gradient(135deg, transparent 30%, rgba(139,92,246,0.04) 40%, rgba(200,180,255,0.03) 50%, rgba(100,150,255,0.04) 60%, transparent 70%),
                /* Campo estelar denso */
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
                /* Galáxias distantes */
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
        /*    Oceano profundo com cáusticas de luz, ondas,    */
        /*    criaturas bioluminescentes, pressão abissal,    */
        /*    correntes marinhas, vida submarina              */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="ocean"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #000610;
            color: #7dd3fc;
            background-image:
                /* Luz da superfície a filtrar - cáusticas */
                radial-gradient(ellipse at 50% -20%, rgba(14,165,233,0.1) 0%, transparent 60%),
                radial-gradient(ellipse at 30% -10%, rgba(56,189,248,0.06) 0%, transparent 40%),
                radial-gradient(ellipse at 70% -5%, rgba(34,211,238,0.05) 0%, transparent 35%),
                /* Padrão de cáusticas (luz a ondular na água) */
                radial-gradient(ellipse 40px 30px at 20% 15%, rgba(56,189,248,0.04) 0%, transparent 100%),
                radial-gradient(ellipse 50px 35px at 50% 10%, rgba(34,211,238,0.03) 0%, transparent 100%),
                radial-gradient(ellipse 35px 25px at 80% 18%, rgba(56,189,248,0.04) 0%, transparent 100%),
                radial-gradient(ellipse 45px 30px at 35% 8%, rgba(14,165,233,0.03) 0%, transparent 100%),
                /* Correntes marinhas */
                linear-gradient(170deg, transparent 20%, rgba(6,182,212,0.03) 30%, transparent 40%),
                linear-gradient(190deg, transparent 50%, rgba(8,145,178,0.02) 60%, transparent 70%),
                /* Criaturas bioluminescentes - águas-vivas e plâncton */
                radial-gradient(circle 8px at 10% 60%, rgba(34,211,238,0.15) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                radial-gradient(circle 12px at 85% 45%, rgba(56,189,248,0.12) 0%, rgba(14,165,233,0.02) 60%, transparent 100%),
                radial-gradient(circle 6px at 45% 75%, rgba(34,211,238,0.18) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                radial-gradient(circle 10px at 70% 85%, rgba(103,232,249,0.1) 0%, rgba(34,211,238,0.02) 60%, transparent 100%),
                radial-gradient(circle 8px at 25% 90%, rgba(56,189,248,0.13) 0%, rgba(14,165,233,0.02) 60%, transparent 100%),
                radial-gradient(circle 5px at 90% 70%, rgba(34,211,238,0.16) 0%, rgba(6,182,212,0.03) 60%, transparent 100%),
                /* Plâncton bioluminescente disperso */
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
                /* Gradiente de profundidade - cada vez mais escuro */
                linear-gradient(to bottom, rgba(0,20,40,0.0) 0%, rgba(0,10,25,0.3) 60%, rgba(0,5,15,0.6) 100%),
                /* Fundo oceânico */
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
        /*    Manuscrito iluminado, ouro rico, bordas         */
        /*    ornamentais, pergaminho antigo, tochas,         */
        /*    caligrafia gótica, heráldica                    */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="royalgold"] {
            font-family: 'Cinzel', serif;
            background-color: #0c0604;
            color: #f0deb0;
            background-image:
                /* Brilho de tochas nas paredes do castelo */
                radial-gradient(ellipse at 5% 20%, rgba(212,175,55,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 95% 25%, rgba(212,175,55,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 50% 0%, rgba(180,130,50,0.07) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 100%, rgba(120,60,20,0.1) 0%, transparent 50%),
                /* Brilho vermelho de braseiro */
                radial-gradient(ellipse at 10% 80%, rgba(180,40,20,0.06) 0%, transparent 35%),
                radial-gradient(ellipse at 90% 85%, rgba(160,50,25,0.05) 0%, transparent 30%),
                /* Textura de pedra do castelo - padrão subtil */
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,175,55,0.01) 40px, rgba(212,175,55,0.01) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(212,175,55,0.008) 60px, rgba(212,175,55,0.008) 61px),
                /* Bordas decorativas - linhas douradas nas laterais */
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
