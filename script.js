// Injeta os temas visuais na página (versão V2 – 9 temas)
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
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Caveat:wght@400;600;700&family=Cinzel:wght@500;700;900&family=Comfortaa:wght@400;700&family=Creepster&family=Fredoka:wght@400;600;700&family=Kalam:wght@300;400;700&family=Marck+Script&family=Monoton&family=Orbitron:wght@500;700;900&family=Outfit:wght@400;600;700;800&family=Patrick+Hand&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Press+Start+2P&family=Quicksand:wght@300;400;600;700&family=Righteous&family=Rubik+Glitch&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&family=VT323&display=swap');

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 20px 16px 20px 16px;
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
        /* THEME POPUP & CIRCLE BUTTONS               */
        /* ══════════════════════════════════════════ */
        .theme-popup-wrapper {
            position: relative;
        }
        .theme-popup {
            position: absolute;
            right: 0;
            top: 42px;
            background: rgba(255,255,255,0.97);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 14px;
            padding: 6px;
            z-index: 1000;
            min-width: 175px;
            box-shadow: 0 12px 45px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04);
            backdrop-filter: blur(20px);
            animation: popupFadeIn 0.18s ease;
        }
        .theme-popup-item {
            padding: 9px 14px;
            cursor: pointer;
            border-radius: 10px;
            font-size: 14px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            transition: background 0.12s ease;
            white-space: nowrap;
            color: inherit;
        }
        .theme-popup-item:hover {
            background: rgba(0,0,0,0.06);
        }
        .theme-popup-item.active {
            background: rgba(0,120,255,0.1);
            font-weight: 700;
        }
        @keyframes popupFadeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .clock-btn {
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 16px;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 1px solid rgba(0,0,0,0.2);
            background-color: rgba(255,255,255,0.9);
            box-shadow: 0 3px 8px rgba(0,0,0,0.18);
            backdrop-filter: blur(5px);
            flex-shrink: 0;
        }
        .clock-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }
        .clock-btn:active {
            transform: scale(0.95);
        }

        /* ══════════════════════════════════════════ */
        /* 1. BRANCO CLÁSSICO                          */
        /* ══════════════════════════════════════════ */
        body[data-theme="white"], body:not([data-theme]) {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #ffffff;
            color: #212529;
        }
        body[data-theme="white"] #al-theme-overlay,
        body:not([data-theme]) #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════ */
        /* 2. OUTONO LUXURY                            */
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
        /* 3. RETRO TERMINAL                           */
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
        /* 4. CADERNO                                  */
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

        /* ══════════════════════════════════════════ */
        /* 5. CARNAVAL                                 */
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
        /* 6. SAKURA                                   */
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
        /* 7. AQUARELA (PINTURA ARTÍSTICA VIBRANTE)          */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="aquarela"] {
            font-family: 'Kalam', cursive, sans-serif;
            font-size: 17px;
            background-color: #fcf8f2;
            color: #242436;
            background-image:
                radial-gradient(ellipse 480px 320px at 8% 12%, rgba(2, 132, 199, 0.22) 0%, rgba(2, 132, 199, 0.08) 60%, transparent 100%),
                radial-gradient(ellipse 420px 290px at 88% 10%, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0.06) 60%, transparent 100%),
                radial-gradient(ellipse 400px 300px at 92% 80%, rgba(225, 29, 72, 0.18) 0%, rgba(225, 29, 72, 0.05) 60%, transparent 100%),
                radial-gradient(ellipse 380px 260px at 12% 88%, rgba(16, 185, 129, 0.20) 0%, rgba(16, 185, 129, 0.06) 60%, transparent 100%),
                radial-gradient(ellipse 340px 240px at 50% 50%, rgba(124, 58, 237, 0.14) 0%, rgba(124, 58, 237, 0.04) 65%, transparent 100%),
                radial-gradient(circle 3px at 18% 28%, rgba(2, 132, 199, 0.5) 0%, transparent 100%),
                radial-gradient(circle 4.5px at 22% 32%, rgba(225, 29, 72, 0.45) 0%, transparent 100%),
                radial-gradient(circle 2.5px at 78% 22%, rgba(245, 158, 11, 0.6) 0%, transparent 100%),
                radial-gradient(circle 3.5px at 84% 65%, rgba(124, 58, 237, 0.45) 0%, transparent 100%),
                radial-gradient(circle 4px at 28% 75%, rgba(16, 185, 129, 0.5) 0%, transparent 100%),
                radial-gradient(circle 2px at 60% 85%, rgba(225, 29, 72, 0.4) 0%, transparent 100%),
                radial-gradient(circle 3px at 45% 15%, rgba(2, 132, 199, 0.4) 0%, transparent 100%),
                radial-gradient(circle 1px at 30% 40%, rgba(0,0,0,0.03) 0%, transparent 100%),
                radial-gradient(circle 1px at 70% 60%, rgba(0,0,0,0.025) 0%, transparent 100%);
            background-attachment: fixed;
        }

        body[data-theme="aquarela"] div[style*="background-color: #f8f9fa"],
        body[data-theme="aquarela"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.86) 0%, rgba(255, 252, 246, 0.80) 50%, rgba(246, 250, 255, 0.82) 100%) !important;
            border: 2px solid transparent !important;
            border-left: 6px solid #0284c7 !important;
            border-radius: 20px 14px 22px 16px !important;
            color: #242436 !important;
            box-shadow:
                0 14px 35px -8px rgba(2, 132, 199, 0.15),
                0 6px 20px -4px rgba(225, 29, 72, 0.10),
                inset 0 0 35px rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(12px);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        body[data-theme="aquarela"] div[style*="background-color: #f8f9fa"]:hover,
        body[data-theme="aquarela"] div[style*="border: 1px solid #ddd"]:hover {
            transform: translateY(-2px);
            box-shadow:
                0 18px 40px -6px rgba(2, 132, 199, 0.20),
                0 8px 24px -2px rgba(225, 29, 72, 0.14),
                inset 0 0 35px rgba(255, 255, 255, 0.8) !important;
        }

        body[data-theme="aquarela"] h1 {
            font-family: 'Caveat', cursive, sans-serif !important;
            font-size: 40px !important;
            font-weight: 700 !important;
            background: linear-gradient(125deg, #0369a1 0%, #6d28d9 30%, #be123c 65%, #c2410c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0.5px;
            filter: drop-shadow(2px 2px 8px rgba(109, 40, 217, 0.18));
            margin: 0;
            line-height: 1.15;
        }

        body[data-theme="aquarela"] h2 {
            font-family: 'Caveat', cursive, sans-serif !important;
            font-size: 28px !important;
            font-weight: 700 !important;
            color: #1e40af !important;
            text-shadow: 1px 1px 4px rgba(30, 64, 175, 0.15);
            margin-top: 18px !important;
        }

        body[data-theme="aquarela"] h3 {
            font-family: 'Caveat', cursive, sans-serif !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            color: #be123c !important;
            text-shadow: 1px 1px 4px rgba(190, 18, 60, 0.12);
        }

        body[data-theme="aquarela"] button {
            font-family: 'Kalam', cursive, sans-serif !important;
            font-size: 15px !important;
            font-weight: 700 !important;
            border-radius: 50px !important;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        body[data-theme="aquarela"] button:hover { transform: translateY(-2px) scale(1.03) !important; }
        body[data-theme="aquarela"] button:active { transform: scale(0.97) !important; }
        body[data-theme="aquarela"] button[onclick*="copyFromData"][onclick*="ePt"] { background: linear-gradient(135deg, #059669, #0284c7) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3) !important; }
        body[data-theme="aquarela"] button[onclick*="copyFromData"][onclick*="eEs"] { background: linear-gradient(135deg, #e11d48, #d97706) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(225, 29, 72, 0.3) !important; }
        body[data-theme="aquarela"] button[onclick*="switchMainView('cleaning')"] { background: linear-gradient(135deg, #2563eb, #7c3aed) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3) !important; }
        body[data-theme="aquarela"] button[onclick*="switchMainView('occupancy')"] { background: linear-gradient(135deg, #059669, #10b981) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3) !important; }

        body[data-theme="aquarela"] hr {
            border: none !important;
            height: 4px !important;
            background: linear-gradient(90deg, transparent 0%, rgba(2, 132, 199, 0.5) 15%, rgba(124, 58, 237, 0.5) 38%, rgba(225, 29, 72, 0.5) 65%, rgba(245, 158, 11, 0.45) 85%, transparent 100%) !important;
            border-radius: 50px !important;
            margin: 20px 0 !important;
            filter: blur(0.25px);
        }

        body[data-theme="aquarela"] .theme-popup { background: rgba(255, 255, 255, 0.95) !important; border: 2px solid rgba(124, 58, 237, 0.25) !important; box-shadow: 0 15px 45px rgba(2, 132, 199, 0.2) !important; backdrop-filter: blur(20px); }
        body[data-theme="aquarela"] .theme-popup-item { font-family: 'Kalam', cursive, sans-serif !important; font-size: 15px !important; font-weight: 700; }
        body[data-theme="aquarela"] .theme-popup-item.active { background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(225, 29, 72, 0.12)) !important; color: #1e40af !important; }
        body[data-theme="aquarela"] #al-theme-overlay { opacity: 0; }

        /* ══════════════════════════════════════════════════ */
        /* 8. JORNAL                                         */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="jornal"] {
            font-family: 'Playfair Display', serif;
            background-color: #f0ebe2;
            color: #1a1a1a;
            background-image:
                repeating-linear-gradient(90deg, transparent, transparent calc(50% - 1px), rgba(0,0,0,0.04) calc(50% - 1px), rgba(0,0,0,0.04) calc(50% + 1px), transparent calc(50% + 1px)),
                radial-gradient(ellipse at 20% 30%, rgba(180,160,120,0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, rgba(160,140,100,0.06) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.04) 100%);
            background-attachment: fixed;
        }
        body[data-theme="jornal"] div[style*="background-color: #f8f9fa"],
        body[data-theme="jornal"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(255,255,252,0.7) !important; border: 1px solid #1a1a1a !important;
            border-top: 3px double #1a1a1a !important; border-radius: 0px !important;
            color: #1a1a1a !important; box-shadow: none !important;
        }
        body[data-theme="jornal"] h1 { font-weight: 900; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 3px double #1a1a1a; padding-bottom: 8px; line-height: 1.1; }
        body[data-theme="jornal"] h2 { color: #1a1a1a !important; font-weight: 700; font-style: italic; font-size: 18px; border-top: 1px solid #1a1a1a; padding-top: 6px; margin-top: 20px; }
        body[data-theme="jornal"] h3 { color: #444 !important; font-weight: 600; font-variant: small-caps; letter-spacing: 1px; }
        body[data-theme="jornal"] button { font-family: 'Playfair Display', serif !important; border-radius: 0px !important; font-variant: small-caps; letter-spacing: 1px; border: 1.5px solid #1a1a1a !important; font-weight: 600 !important; }
        body[data-theme="jornal"] hr { border: none !important; height: 1px !important; background: #1a1a1a !important; margin: 18px 0 !important; }
        body[data-theme="jornal"] #al-theme-overlay { opacity: 0; }
        body[data-theme="jornal"]::before { content: "✦ EDIÇÃO DIÁRIA ✦"; display: block; text-align: center; font-family: 'Playfair Display', serif; font-variant: small-caps; font-size: 11px; letter-spacing: 4px; color: rgba(0,0,0,0.35); border-bottom: 1px solid rgba(0,0,0,0.1); border-top: 1px solid rgba(0,0,0,0.1); padding: 4px 0; margin: -10px 0 14px 0; }

        /* ══════════════════════════════════════════════════ */
        /* 9. QUADRO NEGRO                                   */
        /* ══════════════════════════════════════════════════ */
        body[data-theme="quadro"] {
            font-family: 'Patrick Hand', cursive;
            font-size: 18px;
            background-color: #1a2e1a;
            color: #e2ddd0;
            background-image:
                linear-gradient(to bottom, #3e2b1a 0px, #5a3f24 4px, #3e2b1a 6px, transparent 7px),
                radial-gradient(ellipse 400px 300px at 25% 35%, rgba(255,255,255,0.018) 0%, transparent 100%),
                radial-gradient(ellipse 350px 250px at 70% 60%, rgba(255,255,255,0.015) 0%, transparent 100%),
                radial-gradient(ellipse 200px 150px at 55% 20%, rgba(255,255,255,0.01) 0%, transparent 100%),
                radial-gradient(circle 2px at 8% 25%, rgba(255,255,255,0.06) 0%, transparent 100%),
                radial-gradient(circle 3px at 15% 60%, rgba(255,255,255,0.04) 0%, transparent 100%),
                radial-gradient(circle 2px at 25% 45%, rgba(255,255,255,0.05) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 35% 80%, rgba(255,255,255,0.06) 0%, transparent 100%),
                radial-gradient(circle 2px at 45% 20%, rgba(255,255,255,0.04) 0%, transparent 100%),
                radial-gradient(circle 3px at 55% 70%, rgba(255,255,255,0.03) 0%, transparent 100%),
                radial-gradient(circle 2px at 65% 35%, rgba(255,255,255,0.05) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 75% 55%, rgba(255,255,255,0.04) 0%, transparent 100%),
                radial-gradient(circle 2px at 85% 15%, rgba(255,255,255,0.06) 0%, transparent 100%),
                radial-gradient(circle 3px at 92% 75%, rgba(255,255,255,0.03) 0%, transparent 100%),
                radial-gradient(circle 1px at 50% 90%, rgba(255,255,255,0.05) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="quadro"] div[style*="background-color: #f8f9fa"],
        body[data-theme="quadro"] div[style*="border: 1px solid #ddd"] {
            background: transparent !important; border: 2px dashed rgba(255,255,255,0.35) !important;
            border-radius: 4px !important; color: #e2ddd0 !important; box-shadow: none !important; position: relative;
        }
        body[data-theme="quadro"] h1 { color: #ffffff; font-size: 34px; text-shadow: 1px 1px 3px rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.08); text-decoration: underline; text-underline-offset: 6px; text-decoration-style: solid; text-decoration-color: rgba(255,255,255,0.4); }
        body[data-theme="quadro"] h2 { color: #ffe066 !important; font-weight: 400; text-shadow: 0 0 6px rgba(255,224,102,0.15); }
        body[data-theme="quadro"] h3 { color: #7ecfff !important; font-weight: 400; text-shadow: 0 0 6px rgba(126,207,255,0.15); }
        body[data-theme="quadro"] button { font-family: 'Patrick Hand', cursive !important; font-size: 16px !important; border-radius: 4px !important; border: 2px dashed rgba(255,255,255,0.4) !important; background: transparent !important; color: #e2ddd0 !important; }
        body[data-theme="quadro"] button:hover { background: rgba(255,255,255,0.08) !important; }
        body[data-theme="quadro"] hr { border: none !important; height: 0px !important; border-bottom: 2px dashed rgba(255,255,255,0.2) !important; }
        body[data-theme="quadro"] #al-theme-overlay { opacity: 0; }
        body[data-theme="quadro"]::after { content: "▬▬"; position: fixed; bottom: 12px; right: 16px; font-size: 22px; color: rgba(255,255,255,0.12); letter-spacing: -2px; pointer-events: none; z-index: 0; }

        /* ══════════════════════════════════════════ */
        /* ANIMAÇÕES                                   */
        /* ══════════════════════════════════════════ */
        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244,63,94,0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0); }
        }

        /* ══════════════════════════════════════════ */
        /* AJUSTES ESCUROS PARA POPUP + BOTÕES        */
        /* ══════════════════════════════════════════ */
        body[data-theme="outono"] .theme-popup,
        body[data-theme="cyber"] .theme-popup,
        body[data-theme="quadro"] .theme-popup { background: rgba(12,12,12,0.95) !important; border-color: rgba(255,255,255,0.15) !important; color: #fff !important; }
        body[data-theme="outono"] .theme-popup-item:hover,
        body[data-theme="cyber"] .theme-popup-item:hover,
        body[data-theme="quadro"] .theme-popup-item:hover { background: rgba(255,255,255,0.08) !important; }
        body[data-theme="outono"] .theme-popup-item.active { background: rgba(245,158,11,0.15) !important; }
        body[data-theme="cyber"] .theme-popup-item.active { background: rgba(0,255,65,0.12) !important; }
        body[data-theme="quadro"] .theme-popup-item.active { background: rgba(255,224,102,0.12) !important; }
        body[data-theme="outono"] .clock-btn,
        body[data-theme="cyber"] .clock-btn,
        body[data-theme="quadro"] .clock-btn { background-color: rgba(10,10,10,0.85) !important; border-color: rgba(255,255,255,0.2) !important; }

        /* ══════════════════════════════════════════ */
        /* COMPONENTES EXCLUSIVOS DO TEMA OUTONO      */
        /* ══════════════════════════════════════════ */
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; animation: pulse 1.6s infinite; }
        .pulse-red { background-color: #f43f5e; box-shadow: 0 0 0 0 rgba(244,63,94,0.7); }
        .pulse-green { background-color: #10b981; box-shadow: 0 0 0 0 rgba(16,185,129,0.7); }
        .stat-box { background: rgba(18,16,14,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; padding: 18px; }
        .stat-val { font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 4px; }
        .bar-bg { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; margin-top: 10px; }
        .bar-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #ea580c); border-radius: 3px; }
        .segment-btn { font-family: inherit; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 12px; cursor: pointer; border: none; background: transparent; color: #a3998e; transition: all 0.25s ease; }
        .segment-btn.active-cleaning { background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 700; box-shadow: 0 4px 15px rgba(245,158,11,0.35); }
        .segment-btn.active-occupancy { background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(16,185,129,0.35); }
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

const THEME_LIST = [
    { key: 'white',      label: 'Original',     emoji: '⬜' },
    { key: 'outono',     label: 'Outono',        emoji: '🍂' },
    { key: 'cyber',      label: 'Terminal',      emoji: '🖥️' },
    { key: 'cappuccino', label: 'Caderno',       emoji: '📓' },
    { key: 'carnival',   label: 'Carnaval',      emoji: '🎪' },
    { key: 'sakura',     label: 'Sakura',        emoji: '🌸' },
    { key: 'aquarela',   label: 'Aquarela',      emoji: '🎨' },
    { key: 'jornal',     label: 'Jornal',        emoji: '📰' },
    { key: 'quadro',     label: 'Quadro Negro',  emoji: '🖍️' },
    { key: 'aleatorio',  label: 'Aleatório 🎲',  emoji: '🎲' },
];
const VALID_THEME_KEYS = THEME_LIST.map(t => t.key);

let currentRandomPresetName = "";
let unplayedRandomPool = [];

function getRandomUniverseCSS() {
    const universes = [
        { name: "Galáxia Cósmica 🌌", css: `@keyframes ale-nebula-spin { 0% { background-position: 0% 0%; filter: hue-rotate(0deg); } 50% { background-position: 100% 100%; filter: hue-rotate(45deg); } 100% { background-position: 0% 0%; filter: hue-rotate(0deg); } } @keyframes ale-galaxy-card-float { 0%, 100% { transform: translateY(0px); box-shadow: 0 10px 35px rgba(112, 26, 232, 0.3), inset 0 0 25px rgba(168, 85, 247, 0.15); } 50% { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(56, 189, 248, 0.4), inset 0 0 35px rgba(56, 189, 248, 0.2); } } @keyframes ale-star-glow { 0%, 100% { text-shadow: 0 0 10px #38bdf8, 0 0 20px #c084fc; } 50% { text-shadow: 0 0 20px #f472b6, 0 0 40px #38bdf8; } } body[data-theme="aleatorio"] { font-family: 'Orbitron', 'Plus Jakarta Sans', sans-serif; background-color: #050212; color: #e0e7ff; background-image: radial-gradient(ellipse 600px 400px at 20% 30%, rgba(168, 85, 247, 0.35) 0%, transparent 70%), radial-gradient(ellipse 500px 400px at 80% 70%, rgba(56, 189, 248, 0.3) 0%, transparent 70%), radial-gradient(ellipse 400px 300px at 50% 50%, rgba(244, 114, 182, 0.2) 0%, transparent 70%); background-size: 200% 200%, 200% 200%, 200% 200%; animation: ale-nebula-spin 12s ease-in-out infinite; background-attachment: fixed; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(14, 10, 32, 0.85) !important; border: 1.5px solid rgba(168, 85, 247, 0.5) !important; border-radius: 20px !important; color: #e0e7ff !important; animation: ale-galaxy-card-float 4s ease-in-out infinite !important; backdrop-filter: blur(16px); } body[data-theme="aleatorio"] h1 { font-weight: 900; font-size: 36px; background: linear-gradient(135deg, #38bdf8 0%, #c084fc 40%, #f472b6 80%, #38bdf8 100%); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 3px; animation: ale-nebula-spin 6s linear infinite, ale-star-glow 3s ease-in-out infinite; } body[data-theme="aleatorio"] h2 { color: #38bdf8 !important; text-shadow: 0 0 12px rgba(56, 189, 248, 0.6); font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #c084fc !important; font-weight: 700; } body[data-theme="aleatorio"] button { border-radius: 14px !important; font-family: 'Orbitron', sans-serif !important; box-shadow: 0 0 18px rgba(168, 85, 247, 0.4) !important; border: 1px solid rgba(168, 85, 247, 0.6) !important; } body[data-theme="aleatorio"] hr { border: none !important; height: 2px !important; background: linear-gradient(90deg, transparent, #a855f7, #38bdf8, #f472b6, transparent) !important; }` },
        { name: "Synthwave 80s 🌅", css: `@keyframes ale-synth-grid { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } } @keyframes ale-synth-border-pulse { 0%, 100% { border-color: #ec4899; box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); } 50% { border-color: #06b6d4; box-shadow: 0 0 30px rgba(6, 182, 212, 0.5); } } body[data-theme="aleatorio"] { font-family: 'Righteous', cursive; background-color: #120224; color: #fdf4ff; background-image: repeating-linear-gradient(0deg, rgba(217, 70, 239, 0.15) 0px, rgba(217, 70, 239, 0.15) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.15) 0px, rgba(6, 182, 212, 0.15) 1px, transparent 1px, transparent 40px), radial-gradient(circle 320px at 50% 8%, rgba(244, 63, 94, 0.4) 0%, transparent 100%); background-size: 100% 40px, 40px 100%, 100% 100%; animation: ale-synth-grid 2s linear infinite; background-attachment: fixed; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(30, 8, 55, 0.88) !important; border: 2px solid #ec4899 !important; border-radius: 14px !important; color: #fdf4ff !important; animation: ale-synth-border-pulse 3s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-size: 38px; background: linear-gradient(180deg, #fef08a 0%, #f43f5e 50%, #d946ef 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 2px; } body[data-theme="aleatorio"] h2 { color: #22d3ee !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #f472b6 !important; } body[data-theme="aleatorio"] button { font-family: 'Righteous', cursive !important; border-radius: 8px !important; box-shadow: 4px 4px 0px #06b6d4 !important; border: 2px solid #ec4899 !important; } body[data-theme="aleatorio"] hr { border: none !important; height: 3px !important; background: linear-gradient(90deg, #ec4899, #fef08a, #06b6d4) !important; }` },
        { name: "Selva Esmeralda 🌿", css: `@keyframes ale-firefly-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } body[data-theme="aleatorio"] { font-family: 'Outfit', sans-serif; background-color: #03140b; color: #ecfdf5; background-image: radial-gradient(ellipse 600px 400px at 15% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 65%), radial-gradient(ellipse 500px 400px at 85% 80%, rgba(245, 158, 11, 0.25) 0%, transparent 65%); background-attachment: fixed; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(8, 32, 18, 0.88) !important; border: 2px solid rgba(16, 185, 129, 0.45) !important; border-radius: 36px 8px 36px 8px !important; color: #ecfdf5 !important; animation: ale-firefly-float 5s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 800; font-size: 34px; background: linear-gradient(135deg, #a7f3d0 0%, #10b981 40%, #fbbf24 85%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] h2 { color: #34d399 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #fbbf24 !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border: none !important; height: 2px !important; background: linear-gradient(90deg, transparent, #10b981, #fbbf24, transparent) !important; }` },
        { name: "Candy Pop 🍭", css: `@keyframes ale-candy-wave { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } } @keyframes ale-candy-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } } body[data-theme="aleatorio"] { font-family: 'Comfortaa', cursive; background: linear-gradient(135deg, #fdf2f8, #fce7f3, #fae8ff, #fef9c3); background-size: 300% 300%; animation: ale-candy-wave 6s ease infinite; color: #4a1d34; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(255,255,255,0.9) !important; border: 3.5px solid #f472b6 !important; border-radius: 32px !important; color: #4a1d34 !important; animation: ale-candy-bounce 3.5s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 700; font-size: 34px; color: #db2777; } body[data-theme="aleatorio"] h2 { color: #a855f7 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #ec4899 !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border: none !important; height: 4px !important; background: linear-gradient(90deg, #f472b6, #c084fc, #fde047, #f472b6) !important; border-radius: 50px !important; }` },
        { name: "Neo-Brutalismo 👾", css: `@keyframes ale-brutal-tilt { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(1deg); } 75% { transform: rotate(-1deg); } } body[data-theme="aleatorio"] { font-family: 'Space Grotesk', sans-serif; background-color: #fde047; color: #000000; background-image: radial-gradient(#000000 15%, transparent 16%), radial-gradient(#000000 15%, transparent 16%); background-size: 20px 20px; background-position: 0 0, 10px 10px; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: #ffffff !important; border: 4px solid #000000 !important; border-radius: 0px !important; color: #000000 !important; box-shadow: 10px 10px 0px #000000 !important; animation: ale-brutal-tilt 5s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 900; font-size: 34px; text-transform: uppercase; background: #000000; color: #fde047; display: inline-block; padding: 6px 16px; } body[data-theme="aleatorio"] h2 { color: #000000 !important; font-weight: 800; text-transform: uppercase; } body[data-theme="aleatorio"] button { border-radius: 0px !important; border: 3.5px solid #000000 !important; font-weight: 800 !important; box-shadow: 5px 5px 0px #000000 !important; } body[data-theme="aleatorio"] hr { border: none !important; border-top: 4px solid #000000 !important; }` },
        { name: "Ouro Imperial 🏺", css: `@keyframes ale-gold-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } } @keyframes ale-imperial-float { 0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(217,119,6,0.3); } 50% { box-shadow: 0 16px 45px rgba(0,0,0,0.8), 0 0 35px rgba(251,191,36,0.5); } } body[data-theme="aleatorio"] { font-family: 'Cinzel', serif; background-color: #120e0a; color: #fef3c7; background-image: radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.22) 0%, transparent 80%); background-attachment: fixed; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(28,22,16,0.92) !important; border: 2px solid #d97706 !important; border-radius: 6px !important; color: #fef3c7 !important; animation: ale-imperial-float 4s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 900; font-size: 34px; letter-spacing: 4px; background: linear-gradient(90deg, #d97706, #fbbf24, #fef08a, #fbbf24, #d97706); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: ale-gold-shimmer 4s linear infinite; } body[data-theme="aleatorio"] h2 { color: #fbbf24 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #d97706 !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border-color: rgba(217,119,6,0.4) !important; }` },
        { name: "Abismo Oceânico 🌊", css: `@keyframes ale-ocean-undulate { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 50% 100%; } } @keyframes ale-jelly-glow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } } body[data-theme="aleatorio"] { font-family: 'Outfit', sans-serif; background-color: #010d1a; color: #e0f2fe; background-image: radial-gradient(ellipse 700px 500px at 20% 10%, rgba(6,182,212,0.28) 0%, transparent 70%), radial-gradient(ellipse 600px 400px at 80% 90%, rgba(59,130,246,0.32) 0%, transparent 70%); background-attachment: fixed; animation: ale-ocean-undulate 8s ease-in-out infinite; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(6,25,48,0.85) !important; border: 1.5px solid rgba(34,211,238,0.45) !important; border-radius: 22px !important; color: #e0f2fe !important; animation: ale-jelly-glow 4.5s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 800; background: linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #a5f3fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] h2 { color: #38bdf8 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #22d3ee !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border-color: rgba(34,211,238,0.3) !important; }` },
        { name: "Cyberpunk 2077 ⚡", css: `body[data-theme="aleatorio"] { font-family: 'Orbitron', monospace; background-color: #08080c; color: #fef08a; background-image: repeating-linear-gradient(0deg, rgba(250,204,21,0.04) 0px, rgba(250,204,21,0.04) 1px, transparent 1px, transparent 4px), radial-gradient(circle 300px at 80% 20%, rgba(250,204,21,0.2) 0%, transparent 100%); background-attachment: fixed; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(16,16,24,0.94) !important; border: 2px solid #facc15 !important; border-left: 8px solid #facc15 !important; border-radius: 0px !important; color: #fef08a !important; box-shadow: 0 0 20px rgba(250,204,21,0.25) !important; } body[data-theme="aleatorio"] h1 { font-weight: 900; color: #facc15; text-transform: uppercase; letter-spacing: 3px; } body[data-theme="aleatorio"] h2 { color: #38bdf8 !important; text-transform: uppercase; font-weight: 800; } body[data-theme="aleatorio"] h3 { color: #facc15 !important; font-weight: 800; } body[data-theme="aleatorio"] button { border-radius: 0px !important; text-transform: uppercase; border: 2px solid #facc15 !important; } body[data-theme="aleatorio"] hr { border-color: rgba(250,204,21,0.5) !important; }` },
        { name: "Aurora Boreal 🌲", css: `@keyframes ale-aurora-sweep { 0% { background-position: 0% 50%; filter: hue-rotate(0deg); } 50% { background-position: 100% 50%; filter: hue-rotate(30deg); } 100% { background-position: 0% 50%; filter: hue-rotate(0deg); } } @keyframes ale-aurora-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } body[data-theme="aleatorio"] { font-family: 'Space Grotesk', sans-serif; background: linear-gradient(135deg, #020c17, #063124, #12103a, #031e2b, #020c17); background-size: 300% 300%; animation: ale-aurora-sweep 10s ease infinite; color: #d1fae5; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(6,24,42,0.82) !important; border: 1.5px solid rgba(52,211,153,0.45) !important; border-radius: 22px !important; color: #d1fae5 !important; animation: ale-aurora-float 5s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 800; font-size: 34px; background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 40%, #c4b5fd 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] h2 { color: #6ee7b7 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #c4b5fd !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border-color: rgba(52,211,153,0.35) !important; }` },
        { name: "Arcade 8-Bit 🕹️", css: `@keyframes ale-arcade-jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } } body[data-theme="aleatorio"] { font-family: 'Press Start 2P', cursive; font-size: 13px; background-color: #0f0024; color: #fef08a; background-image: linear-gradient(rgba(234,179,8,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.08) 1px, transparent 1px); background-size: 16px 16px; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: #1f083d !important; border: 4px solid #f43f5e !important; border-radius: 0px !important; color: #fef08a !important; box-shadow: 6px 6px 0px #eab308 !important; animation: ale-arcade-jump 3s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-size: 24px; color: #eab308; text-shadow: 3px 3px 0px #f43f5e; } body[data-theme="aleatorio"] h2 { color: #38bdf8 !important; font-size: 16px; } body[data-theme="aleatorio"] h3 { color: #f43f5e !important; font-size: 14px; } body[data-theme="aleatorio"] hr { border: none !important; border-top: 4px dashed #eab308 !important; }` },
        { name: "Vulcão Magma 🌋", css: `@keyframes ale-magma-boil { 0%, 100% { filter: hue-rotate(0deg) brightness(1); } 50% { filter: hue-rotate(15deg) brightness(1.2); } } @keyframes ale-magma-pulse { 0%, 100% { border-color: rgba(239,68,68,0.5); } 50% { border-color: #f97316; } } body[data-theme="aleatorio"] { font-family: 'Outfit', sans-serif; background-color: #0f0303; color: #fed7aa; background-image: radial-gradient(ellipse 600px 400px at 20% 80%, rgba(239,68,68,0.35) 0%, transparent 70%), radial-gradient(ellipse 500px 350px at 80% 20%, rgba(249,115,22,0.3) 0%, transparent 70%); background-attachment: fixed; animation: ale-magma-boil 4s ease-in-out infinite; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(30,10,10,0.92) !important; border: 2px solid rgba(239,68,68,0.5) !important; border-radius: 18px !important; color: #fed7aa !important; animation: ale-magma-pulse 3s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 900; font-size: 34px; background: linear-gradient(135deg, #fef08a 0%, #f97316 40%, #ef4444 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] h2 { color: #f97316 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #ef4444 !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border-color: rgba(239,68,68,0.4) !important; }` },
        { name: "Holograma Prisma 🦄", css: `@keyframes ale-holo-sheen { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } @keyframes ale-holo-glass { 0%, 100% { transform: translateY(0); border-color: rgba(192,132,252,0.5); } 50% { transform: translateY(-7px); border-color: rgba(6,182,212,0.6); } } body[data-theme="aleatorio"] { font-family: 'Comfortaa', sans-serif; background: linear-gradient(135deg, #fdf2f8, #f0fdf4, #e0f2fe, #faf5ff, #fdf2f8); background-size: 400% 400%; animation: ale-holo-sheen 8s ease infinite; color: #1e1b4b; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(255,255,255,0.85) !important; border: 2px solid rgba(192,132,252,0.5) !important; border-radius: 24px !important; color: #1e1b4b !important; animation: ale-holo-glass 4s ease-in-out infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 700; font-size: 34px; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 40%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] h2 { color: #8b5cf6 !important; font-weight: 700; } body[data-theme="aleatorio"] h3 { color: #06b6d4 !important; font-weight: 700; } body[data-theme="aleatorio"] hr { border: none !important; height: 3px !important; background: linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4) !important; }` },
        { name: "Arco-Íris Giratório 🌈", css: `@keyframes ale-rainbow-bg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } @keyframes ale-spin-border { 0% { border-color: #ff0000; } 50% { border-color: #00ff00; } 100% { border-color: #ff0000; } } body[data-theme="aleatorio"] { font-family: 'Fredoka', sans-serif; background: linear-gradient(270deg, #ff0080, #ff8c00, #ffd700, #00ff80, #00bfff, #8000ff); background-size: 400% 400%; animation: ale-rainbow-bg 5s ease infinite; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"], body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { background: rgba(255,255,255,0.9) !important; border: 4px solid #ff0080 !important; border-radius: 24px !important; animation: ale-spin-border 2s linear infinite !important; } body[data-theme="aleatorio"] h1 { font-weight: 900; font-size: 38px; background: linear-gradient(90deg, #ff0080, #00bfff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } body[data-theme="aleatorio"] hr { background: linear-gradient(90deg, #ff0080, #00bfff) !important; height: 4px !important; }` },
        { name: "Letras Saltitantes 🎵", css: `@keyframes ale-bounce-h1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } body[data-theme="aleatorio"] { font-family: 'Bungee', cursive; background: #0f0a2a; color: #fff; } body[data-theme="aleatorio"] h1 { animation: ale-bounce-h1 1s infinite; display: inline-block; }` },
        { name: "Matrix Glitch 💀", css: `@keyframes ale-glitch-shake { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-2px, 2px); } } body[data-theme="aleatorio"] { font-family: 'VT323', monospace; background: #000; color: #00ff41; } body[data-theme="aleatorio"] div[style*="background-color: #f8f9fa"] { background: #000 !important; border: 1px solid #00ff41 !important; } body[data-theme="aleatorio"] h1 { text-shadow: 2px 0 #ff0000; animation: ale-glitch-shake 0.1s infinite; }` },
        { name: "Disco Inferno 🕺", css: `@keyframes ale-disco-bg { 0% { background: #1a0533; } 50% { background: #33001a; } } body[data-theme="aleatorio"] { animation: ale-disco-bg 2s infinite; color: #fff; }` },
        { name: "Quadrados Loucos 🟥", css: `body[data-theme="aleatorio"] { background: #0f0f0f; color: #fff; } body[data-theme="aleatorio"] div[style*="border: 1px solid #ddd"] { border: 4px solid #facc15 !important; border-radius: 0 !important; }` },
        { name: "Explosão de Néon 💥", css: `body[data-theme="aleatorio"] { background: #000; color: #fff; } body[data-theme="aleatorio"] h1 { text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff; }` },
        { name: "Psicodélico Ácido 🍄", css: `@keyframes ale-psych-bg { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } } body[data-theme="aleatorio"] { animation: ale-psych-bg 5s infinite; background: #0a0010; color: #fff; }` },
        { name: "Cartaz de Circo 🎠", css: `body[data-theme="aleatorio"] { background: #fef3c7; color: #1a0000; } body[data-theme="aleatorio"] h1 { text-transform: uppercase; color: #dc2626; }` },
        { name: "Cosmos Infinito ✨", css: `body[data-theme="aleatorio"] { background: #050520; color: #e0e7ff; } body[data-theme="aleatorio"] h1 { font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; display: inline-block; text-shadow: 3px 3px 0 rgba(51,153,255,0.5); } body[data-theme="aleatorio"] h2 { color: #3399ff !important; font-weight: 800; } body[data-theme="aleatorio"] h3 { color: #33ff99 !important; font-weight: 800; } body[data-theme="aleatorio"] hr { border: none !important; height: 3px !important; background: linear-gradient(90deg, #ff3366, #ffcc00, #33ff99, #3399ff, #cc33ff, #ff3366) !important; }` }
    ];

    if (!unplayedRandomPool || unplayedRandomPool.length === 0) {
        unplayedRandomPool = universes.map((_, i) => i);
        for (let i = unplayedRandomPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [unplayedRandomPool[i], unplayedRandomPool[j]] = [unplayedRandomPool[j], unplayedRandomPool[i]];
        }
    }

    const chosenIndex = unplayedRandomPool.pop();
    const chosen = universes[chosenIndex] || universes[0];
    currentRandomPresetName = chosen.name;
    return chosen.css;
}

function getThemeEmoji(key) {
    const t = THEME_LIST.find(x => x.key === key);
    return t ? t.emoji : '⬜';
}

const result = document.getElementById("result");
let globalReservations = [];
let cloudHistory = {};
let currentView = "cleaning";
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let showPastStatsMode = false;
let selectedSnapshotDate = null;

// Proteção para nunca gravar na cloud se o histórico não carregou
let historyLoadedOk = false;

// ══════════════════════════════════════════════════
// DIAS BLOQUEADOS (guardados em localStorage)
// Datas no formato "YYYY-MM-DD" em que não se fazem
// limpezas, exceto turnarounds obrigatórios (saída e
// entrada no mesmo dia).
// ══════════════════════════════════════════════════
let blockedDates = [];
try {
    blockedDates = JSON.parse(localStorage.getItem("al_blocked_dates") || "[]");
    if (!Array.isArray(blockedDates)) blockedDates = [];
} catch(e) { blockedDates = []; }

let showBlockedDatesPanel = false;

function isBlockedDate(date) {
    return blockedDates.includes(formatDateKey(date));
}

window.toggleBlockedDatesPanel = function() {
    showBlockedDatesPanel = !showBlockedDatesPanel;
    showCleaningPlan();
};

window.addBlockedDate = function() {
    const input = document.getElementById('al-blocked-date-input');
    if (!input || !input.value) return;
    const dk = input.value; // já está em formato YYYY-MM-DD
    if (!blockedDates.includes(dk)) {
        blockedDates.push(dk);
        blockedDates.sort();
        try { localStorage.setItem("al_blocked_dates", JSON.stringify(blockedDates)); } catch(e) {}
        syncCleaningPlan();
    }
    input.value = '';
    showCleaningPlan();
};

window.removeBlockedDate = function(dk) {
    blockedDates = blockedDates.filter(d => d !== dk);
    try { localStorage.setItem("al_blocked_dates", JSON.stringify(blockedDates)); } catch(e) {}
    syncCleaningPlan();
    showCleaningPlan();
};

// TEMA INICIAL
let currentTheme = localStorage.getItem("al_theme") || "white";
if (!VALID_THEME_KEYS.includes(currentTheme)) currentTheme = "white";
document.body.setAttribute("data-theme", currentTheme);

function applyDynamicRandomTheme() {
    let dynStyle = document.getElementById("al-theme-aleatorio-dynamic");
    if (!dynStyle) {
        dynStyle = document.createElement("style");
        dynStyle.id = "al-theme-aleatorio-dynamic";
        document.head.appendChild(dynStyle);
    }
    dynStyle.textContent = getRandomUniverseCSS();
}

if (currentTheme === "aleatorio") {
    applyDynamicRandomTheme();
}

window.setTheme = function(themeKey) {
    currentTheme = themeKey;
    try { localStorage.setItem("al_theme", themeKey); } catch(e){}
    document.body.setAttribute("data-theme", currentTheme);
    if (themeKey === "aleatorio") applyDynamicRandomTheme();
    renderCurrentView();
};

window.rerollRandomTheme = function(event) {
    if (event) event.stopPropagation();
    currentTheme = "aleatorio";
    try { localStorage.setItem("al_theme", "aleatorio"); } catch(e){}
    document.body.setAttribute("data-theme", "aleatorio");
    applyDynamicRandomTheme();
    renderCurrentView();
};

window.toggleThemePopup = function(event) {
    event.stopPropagation();
    const popup = document.getElementById('al-theme-popup');
    if (popup) {
        const isOpen = popup.style.display === 'block';
        popup.style.display = isOpen ? 'none' : 'block';
    }
};

document.addEventListener('click', function(e) {
    const popup = document.getElementById('al-theme-popup');
    if (popup && popup.style.display === 'block') {
        if (!e.target.closest('.theme-popup-wrapper')) {
            popup.style.display = 'none';
        }
    }
});

function buildThemePopupHTML() {
    let items = THEME_LIST.map(t =>
        `<div onclick="event.stopPropagation(); window.setTheme('${t.key}')" class="theme-popup-item ${currentTheme===t.key?'active':''}">${t.emoji} ${t.label}</div>`
    ).join('');
    return `<div id="al-theme-popup" class="theme-popup" style="display: none;">${items}</div>`;
}

function renderNavigation() {
    const isCleaning = currentView === "cleaning";
    const isOccupancy = currentView === "occupancy";
    const isSnapshots = currentView === "snapshots";
    const themeEmoji = getThemeEmoji(currentTheme);

    const floatingMenu = `
        <div style="position: absolute; top: 0px; right: 0px; display: flex; flex-direction: column; gap: 12px; align-items: center; z-index: 100;">
            <a href="" target="_blank" style="display: block; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                <img src="icone2.jpeg" alt="Airbnb" title="Ver no Airbnb" style="height: 42px; width: 42px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            </a>
            <div class="theme-popup-wrapper">
                <button onclick="window.toggleThemePopup(event)" class="clock-btn" title="Mudar Estilo">${themeEmoji}</button>
                ${buildThemePopupHTML()}
            </div>
            ${currentTheme === 'aleatorio' ? `<button onclick="window.rerollRandomTheme(event)" class="clock-btn" title="Sortear Outro Estilo! (Atual: ${currentRandomPresetName})" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; border: none;">🎲</button>` : ''}
            <button onclick="window.toggleSnapshots()" class="clock-btn ${isSnapshots?'active':''}" title="${isSnapshots?'Voltar ao Início':'Ver Previsões'}" style="${isSnapshots?'background-color:#e2e6ea;':''}">🕒</button>
        </div>
    `;

    let html = floatingMenu;

    if (currentTheme === "outono") {
        html += `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; padding-right: 60px;">
                <div style="min-width: 0;">
                    <h1 style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #fff8f0 30%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">🍂 Traços de Outono</h1>
                    <div style="font-size: 13px; color: #a3998e; font-weight: 500;">Gestão de Alojamento Local</div>
                </div>
            </div>
            <div style="margin-bottom: 24px;">
                <div style="display: inline-flex; background: rgba(255,255,255,0.04); padding: 5px; border-radius: 16px; border: 1px solid rgba(245,158,11,0.2); gap: 4px;">
                    <button onclick="window.switchMainView('cleaning')" class="segment-btn ${isCleaning?'active-cleaning':''}">🧹 Limpezas</button>
                    <button onclick="window.switchMainView('occupancy')" class="segment-btn ${isOccupancy?'active-occupancy':''}">📊 Disponibilidade</button>
                </div>
            </div>`;
    } else {
        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-right: 60px;">
                <div style="flex: 1; min-width: 0;">
                    <h1 style="margin: 0;">Traços de Outono</h1>
                    ${currentTheme === 'aleatorio' ? `<div style="font-size: 13px; font-weight: bold; margin-top: 4px; opacity: 0.9;">✨ Estilo: ${currentRandomPresetName}</div>` : ''}
                </div>
            </div>
            <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="window.switchMainView('cleaning')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #007bff; background-color: ${isCleaning?'#007bff':'#ffffff'}; color: ${isCleaning?'#ffffff':'#007bff'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧹 Plano de Limpezas</button>
                <button onclick="window.switchMainView('occupancy')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #28a745; background-color: ${isOccupancy?'#28a745':'#ffffff'}; color: ${isOccupancy?'#ffffff':'#28a745'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📊 Disponibilidade da Casa</button>
            </div>`;
    }

    return html;
}

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
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) cloudHistory = {};
        historyLoadedOk = true;
    }
    catch (e) {
        console.warn("Aviso: Histórico não carregou.", e);
        cloudHistory = {};
        historyLoadedOk = false;
    }
}

async function saveToCloudHistory(newEntries) {
    try {
        await fetchWithTimeout(`${WORKER_BASE_URL}?action=saveHistory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntries)
        }, 8000);
    } catch (e) {
        console.error("Erro ao guardar histórico:", e);
    }
}

async function loadCalendars() {
    result.innerHTML = "<p style='font-size: 18px; font-weight: bold; color: #007bff;'>⏳ A ligar à Cloud e a carregar calendários (aguarda)...</p>";

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetchWithTimeout(calendar.url, {}, 12000);
                if (!response.ok) return [];
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.warn("Erro ou atraso extremo ao carregar " + calendar.name + ". A ignorar este calendário por agora.");
                return [];
            }
        });
        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();
        syncCleaningPlan();
        renderCurrentView();
    } catch (err) {
        result.innerHTML = `<p style="color: red; font-weight: bold;">Erro geral: ${err.message}</p>`;
    }
}

function parseDate(d) {
    return new Date(Number(d.substring(0,4)), Number(d.substring(4,6))-1, Number(d.substring(6,8)));
}

function parseDateKey(key) {
    if (!key || typeof key !== 'string') return new Date();
    const parts = key.split("-");
    if (parts.length < 3) return new Date(key);
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function parseICS(text, roomName) {
    const r = [];
    if (!text || !text.includes("BEGIN:VEVENT")) return r;
    for (const event of text.split("BEGIN:VEVENT")) {
        const summary = event.match(/SUMMARY:(.*)/i);
        if (summary && /not available|unavailable|blocked|indispon/i.test(summary[1].trim())) {
            continue;
        }
        const s = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
        const e = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);
        if (s && e) {
            const checkIn = parseDate(s[1]);
            const checkOut = parseDate(e[1]);
            if (checkOut > checkIn) {
                r.push({ room: roomName, checkIn, checkOut });
            }
        }
    }
    return r;
}

function sameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate()+days); return d; }
function isSunday(date) { return date.getDay()===0; }
function getDaysBetween(a, b) { return Math.round((b.getTime()-a.getTime())/(1000*60*60*24)); }

function formatDateKey(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
}

function getGarbageTasks(date) {
    const dayOfWeek = date.getDay();
    const tasks = [];
    if (dayOfWeek === 1) {
        tasks.push({ pt: "♻️ Colocar lixo reciclável (Impasse)", es: "♻️ Sacar basura reciclable (Impasse)" });
        tasks.push({ pt: "🗑️ Colocar lixo (Impasse)", es: "🗑️ Sacar basura (Impasse)" });
        tasks.push({ pt: "🗑️ Colocar lixo (Achada)", es: "🗑️ Sacar basura (Achada)" });
    } else if (dayOfWeek === 3) {
        tasks.push({ pt: "♻️ Colocar lixo reciclável (Achada)", es: "♻️ Sacar basura reciclable (Achada)" });
    } else if (dayOfWeek === 4) {
        tasks.push({ pt: "🗑️ Colocar lixo (Impasse)", es: "🗑️ Sacar basura (Impasse)" });
    } else if (dayOfWeek === 5) {
        tasks.push({ pt: "🗑️ Colocar lixo (Achada)", es: "🗑️ Sacar basura (Achada)" });
    }
    return tasks;
}

// Algoritmo de determinação da data ideal de limpeza.
// Regras:
//  1. Se houver turnaround no mesmo dia (saída e entrada do mesmo quarto),
//     OBRIGATORIAMENTE limpa nesse dia, mesmo que seja domingo ou data bloqueada.
//  2. Caso contrário, limpa o mais próximo possível do checkout:
//     - Se checkout for domingo → começa a procurar na segunda-feira seguinte.
//     - Avança dia a dia até encontrar um dia que não seja domingo nem data bloqueada.
function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;

    // Próxima reserva no mesmo quarto
    const nextR = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout && r !== reservation)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    const sameDayTurnaround = nextR && sameDay(checkout, nextR.checkIn);
    let bestDay = checkout;
    let isForcedSunday = false;

    if (sameDayTurnaround) {
        // Turnaround obrigatório: tem de limpar no dia de checkout, independentemente de tudo
        bestDay = checkout;
        if (isSunday(checkout)) isForcedSunday = true;
    } else {
        // Começa no próprio dia de checkout (ou segunda se for domingo)
        let candidate = isSunday(checkout) ? addDays(checkout, 1) : checkout;

        // Avança enquanto o dia for bloqueado ou domingo (segurança: máx 14 dias)
        let safety = 0;
        while ((isSunday(candidate) || isBlockedDate(candidate)) && safety < 14) {
            candidate = addDays(candidate, 1);
            safety++;
        }

        bestDay = candidate;
    }

    const hasCheckout = sameDay(bestDay, checkout);
    const hasCheckin = nextR ? sameDay(bestDay, nextR.checkIn) : false;

    return {
        date: bestDay,
        sunday: isForcedSunday,
        urgent: nextR ? sameDay(bestDay, nextR.checkIn) : false,
        hasCheckout,
        hasCheckin
    };
}

function syncCleaningPlan() {
    try {
        let today = new Date();
        today.setHours(0,0,0,0);
        const todayStr = formatDateKey(today);
        let hasChanges = false;

        if (!cloudHistory["_plan"] || typeof cloudHistory["_plan"] !== 'object') {
            cloudHistory["_plan"] = {};
            hasChanges = true;
        }
        const plan = cloudHistory["_plan"];

        const activeCleanings = {};
        globalReservations.forEach(res => {
            const info = getCleaningInfo(res, globalReservations);
            const checkinStr = formatDateKey(res.checkIn);
            const checkoutStr = formatDateKey(res.checkOut);
            const cleaningStr = formatDateKey(info.date);
            const key = `${res.room}|${checkoutStr}`;

            activeCleanings[key] = {
                room: res.room,
                checkinKey: checkinStr,
                checkoutKey: checkoutStr,
                cleaningKey: cleaningStr,
                cleaningIso: info.date.toISOString(),
                sunday: info.sunday,
                urgent: info.urgent,
                hasCheckout: info.hasCheckout,
                hasCheckin: info.hasCheckin
            };
        });

        Object.keys(activeCleanings).forEach(key => {
            const active = activeCleanings[key];
            const existing = plan[key];

            if (!existing) {
                plan[key] = active;
                hasChanges = true;
            } else {
                const cleanDate = parseDateKey(existing.cleaningKey);
                if (cleanDate >= today) {
                    if (existing.cleaningKey !== active.cleaningKey ||
                        existing.checkinKey !== active.checkinKey ||
                        existing.cleaningIso !== active.cleaningIso ||
                        existing.sunday !== active.sunday ||
                        existing.urgent !== active.urgent ||
                        existing.hasCheckout !== active.hasCheckout ||
                        existing.hasCheckin !== active.hasCheckin) {
                        plan[key] = active;
                        hasChanges = true;
                    }
                }
            }
        });

        if (!cloudHistory["_reviews"] || typeof cloudHistory["_reviews"] !== 'object') {
            cloudHistory["_reviews"] = {};
            hasChanges = true;
        }
        const reviews = cloudHistory["_reviews"];

        Object.keys(reviews).forEach(k => {
            const rev = reviews[k];
            if (!rev || !rev.targetDateKey) {
                delete reviews[k];
                hasChanges = true;
                return;
            }
            if (rev.checkinKey && parseDateKey(rev.checkinKey) > parseDateKey(rev.cancelledOn || todayStr)) {
                delete reviews[k];
                hasChanges = true;
            }
        });

        Object.keys(plan).forEach(key => {
            const existing = plan[key];
            const cleanDate = parseDateKey(existing.cleaningKey);

            if (cleanDate >= today) {
                if (!activeCleanings[key]) {
                    const checkinDate = existing.checkinKey ? parseDateKey(existing.checkinKey) : null;
                    const wasCurrentStay = checkinDate ? (checkinDate <= today) : (existing.checkoutKey === todayStr);

                    if (wasCurrentStay) {
                        let reviewDate = addDays(today, 1);
                        if (isSunday(reviewDate)) reviewDate = addDays(reviewDate, 1);
                        const reviewTargetKey = formatDateKey(reviewDate);

                        reviews[key] = {
                            room: existing.room,
                            checkinKey: existing.checkinKey || "",
                            targetDateKey: reviewTargetKey,
                            targetIso: reviewDate.toISOString(),
                            cancelledOn: todayStr,
                            originalCheckout: existing.checkoutKey
                        };
                    }

                    delete plan[key];
                    hasChanges = true;
                }
            }
        });

        if (!cloudHistory["_snapshots"] || typeof cloudHistory["_snapshots"] !== 'object') {
            cloudHistory["_snapshots"] = {};
            hasChanges = true;
        }
        if (!cloudHistory["_snapshots"][todayStr]) {
            let sp = {};
            const lim = addDays(today, 6);
            globalReservations.forEach(res => {
                const info = getCleaningInfo(res, globalReservations);
                if (info.date >= today && info.date <= lim) {
                    const sdk = formatDateKey(info.date);
                    if (!sp[sdk]) sp[sdk] = { dateIso: info.date.toISOString(), rooms: [] };
                    if (!sp[sdk].rooms.some(r => r.room === res.room)) {
                        sp[sdk].rooms.push({ room: res.room, sunday: info.sunday, urgent: info.urgent });
                    }
                }
            });
            cloudHistory["_snapshots"][todayStr] = sp;
            hasChanges = true;
        }

        if (hasChanges && historyLoadedOk) {
            saveToCloudHistory(cloudHistory);
        }
    } catch(err) {
        console.error("Erro na sincronização:", err);
    }
}

function showSnapshotsPlan() {
    let html=renderNavigation(); html+=`<h1>🕒 Previsões Passadas</h1>`;
    const snapshots=cloudHistory["_snapshots"]||{}; const snapshotKeys=Object.keys(snapshots).sort().reverse();
    if (snapshotKeys.length===0) { html+=`<p>Ainda não há previsões guardadas. A primeira foi gerada agora!</p>`; result.innerHTML=html; return; }
    if (!selectedSnapshotDate) {
        html+=`<p style="color: #555;">Escolhe um dia para ver o plano que estava previsto nesse momento:</p><div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">`;
        snapshotKeys.forEach(key => {
            const d = parseDateKey(key);
            html+=`<button onclick="window.selectSnapshot('${key}')" style="padding: 10px 15px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #f8f9fa; color: #17a2b8; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">📅 ${d.toLocaleDateString("pt-PT",{day:"numeric",month:"long",year:"numeric"})}</button>`;
        });
        html+=`</div>`;
    } else {
        const d = parseDateKey(selectedSnapshotDate);
        const label = d.toLocaleDateString("pt-PT",{day:"numeric",month:"long",year:"numeric"});
        html+=`<div style="margin-bottom: 20px;"><button onclick="window.selectSnapshot(null)" style="padding: 8px 14px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">🔙 Voltar</button></div>`;
        html+=`<h2 style="color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 8px;">Plano do dia: <span style="color: #333;">${label}</span></h2>`;
        const plan=snapshots[selectedSnapshotDate]; const planKeys=Object.keys(plan).sort();
        if (planKeys.length===0) html+=`<p>Sem limpezas planeadas.</p>`;
        planKeys.forEach(key => {
            const day=plan[key]; const dDay=parseDateKey(key);
            let title=dDay.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
            if (day.rooms.some(r=>r.sunday)) title="🔴 "+title;
            let rh=""; day.rooms.sort((a,b)=>a.room.localeCompare(b.room)).forEach(c => { rh+=`${c.urgent?"⚠️":"🧹"} ${c.room}${c.urgent?" <b>(entrada no mesmo dia)</b>":""}<br>`; });
            html+=`<div style="margin-top: 15px; margin-bottom: 15px;"><h3 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">${title}</h3><div style="font-size: 15px;">${rh}</div></div><hr style="border: 0; border-top: 1px solid #eee;">`;
        });
    }
    result.innerHTML=html;
}

function buildBlockedDatesPanelHTML() {
    const hasBlocked = blockedDates.length > 0;

    // Filtra datas passadas para mostrar separadas
    const today = new Date(); today.setHours(0,0,0,0);
    const futureDates = blockedDates.filter(dk => parseDateKey(dk) >= today);
    const pastDates = blockedDates.filter(dk => parseDateKey(dk) < today);

    let chipsHtml = '';
    if (futureDates.length > 0) {
        chipsHtml += `<div style="margin-bottom: 8px; font-size: 12px; font-weight: 700; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Próximas</div>`;
        chipsHtml += futureDates.map(dk => {
            const d = parseDateKey(dk);
            const label = d.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short" });
            return `<div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(220,53,69,0.1); border: 1px solid rgba(220,53,69,0.3); border-radius: 20px; padding: 5px 12px; font-size: 14px; font-weight: 600;">
                <span>📅 ${label}</span>
                <button onclick="window.removeBlockedDate('${dk}')" title="Remover" style="background: none; border: none; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; color: #dc3545; font-weight: bold;">×</button>
            </div>`;
        }).join('');
    }
    if (pastDates.length > 0) {
        chipsHtml += `<div style="margin-top: 10px; margin-bottom: 8px; font-size: 12px; font-weight: 700; opacity: 0.4; text-transform: uppercase; letter-spacing: 1px;">Passadas</div>`;
        chipsHtml += pastDates.map(dk => {
            const d = parseDateKey(dk);
            const label = d.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short" });
            return `<div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(108,117,125,0.08); border: 1px solid rgba(108,117,125,0.2); border-radius: 20px; padding: 5px 12px; font-size: 14px; opacity: 0.6;">
                <span>📅 ${label}</span>
                <button onclick="window.removeBlockedDate('${dk}')" title="Remover" style="background: none; border: none; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; color: #6c757d; font-weight: bold;">×</button>
            </div>`;
        }).join('');
    }
    if (!hasBlocked) {
        chipsHtml = `<div style="font-size: 14px; opacity: 0.5; font-style: italic;">Nenhum dia bloqueado ainda.</div>`;
    }

    return `
        <div style="border: 1px solid #ddd; border-radius: 12px; padding: 18px; margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #dc3545;">
            <div style="font-size: 15px; font-weight: 700; margin-bottom: 14px; color: #dc3545;">
                🚫 Dias sem Limpezas
                <span style="font-size: 12px; font-weight: 400; color: #666; margin-left: 8px;">(exceto turnarounds obrigatórios)</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 14px; flex-wrap: wrap;">
                <input type="date" id="al-blocked-date-input"
                    style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; cursor: pointer;"
                    onkeydown="if(event.key==='Enter') window.addBlockedDate()">
                <button onclick="window.addBlockedDate()"
                    style="padding: 8px 16px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background-color: #dc3545; color: white; font-weight: bold;">
                    ➕ Adicionar
                </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">${chipsHtml}</div>
        </div>
    `;
}

function showCleaningPlan() {
    const today=new Date(); today.setHours(0,0,0,0); let grouped={};
    const plan = cloudHistory["_plan"] || {};
    const planKeys = Object.keys(plan);

    if (showHistoryMode) {
        Object.keys(cloudHistory).forEach(dk => {
            if (dk !== "_snapshots" && dk !== "_plan") {
                const val = cloudHistory[dk];
                const d = parseDateKey(dk);
                if (d < today) {
                    if (!grouped[dk]) grouped[dk] = { date: d, rooms: [] };
                    let roomsList = [];
                    if (Array.isArray(val)) { roomsList = val; }
                    else if (val && Array.isArray(val.rooms)) { roomsList = val.rooms; }
                    roomsList.forEach(r => {
                        if (r && r.room && !grouped[dk].rooms.some(existing => existing.room === r.room)) {
                            grouped[dk].rooms.push({ room: r.room, sunday: !!r.sunday, urgent: !!r.urgent, hasCheckout: r.hasCheckout, hasCheckin: r.hasCheckin });
                        }
                    });
                }
            }
        });

        planKeys.forEach(key => {
            const entry = plan[key];
            if (!entry || !entry.cleaningKey) return;
            const d = parseDateKey(entry.cleaningKey);
            if (d < today) {
                const dk = entry.cleaningKey;
                if (!grouped[dk]) grouped[dk] = { date: d, rooms: [] };
                const existingRoomIdx = grouped[dk].rooms.findIndex(r => r.room === entry.room);
                const roomObj = { room: entry.room, sunday: !!entry.sunday, urgent: !!entry.urgent, hasCheckout: entry.hasCheckout, hasCheckin: entry.hasCheckin };
                if (existingRoomIdx >= 0) { grouped[dk].rooms[existingRoomIdx] = roomObj; }
                else { grouped[dk].rooms.push(roomObj); }
            }
        });
    } else {
        if (planKeys.length > 0) {
            planKeys.forEach(key => {
                const entry = plan[key];
                if (!entry || !entry.cleaningKey) return;
                const d = parseDateKey(entry.cleaningKey);
                if (d >= today) {
                    const dk = entry.cleaningKey;
                    if (!grouped[dk]) grouped[dk] = { date: d, rooms: [] };
                    if (!grouped[dk].rooms.some(r => r.room === entry.room)) {
                        grouped[dk].rooms.push({ room: entry.room, sunday: !!entry.sunday, urgent: !!entry.urgent, hasCheckout: entry.hasCheckout, hasCheckin: entry.hasCheckin });
                    }
                }
            });
        } else {
            globalReservations.forEach(res => {
                const info = getCleaningInfo(res, globalReservations);
                if (info.date >= today) {
                    const dk = formatDateKey(info.date);
                    if (!grouped[dk]) grouped[dk] = { date: info.date, rooms: [] };
                    if (!grouped[dk].rooms.some(r => r.room === res.room)) {
                        grouped[dk].rooms.push({ room: res.room, sunday: info.sunday, urgent: info.urgent, hasCheckout: info.hasCheckout, hasCheckin: info.hasCheckin });
                    }
                }
            });
        }

        const reviews = cloudHistory["_reviews"] || {};
        Object.keys(reviews).forEach(k => {
            const rev = reviews[k];
            if (!rev || !rev.targetDateKey) return;
            const d = parseDateKey(rev.targetDateKey);
            if (d >= today) {
                const dk = rev.targetDateKey;
                if (!grouped[dk]) grouped[dk] = { date: d, rooms: [], reviews: [] };
                if (!grouped[dk].reviews) grouped[dk].reviews = [];
                if (!grouped[dk].reviews.some(r => r.room === rev.room)) {
                    grouped[dk].reviews.push(rev);
                }
            }
        });
    }

    let sortedKeys=Object.keys(grouped).sort(); if (showHistoryMode) sortedKeys.reverse();
    let html=renderNavigation();

    // ── Barra de botões de controlo ──
    const blockedBtnLabel = showBlockedDatesPanel
        ? '🚫 Fechar Dias Bloqueados'
        : `🚫 Dias Bloqueados${blockedDates.length > 0 ? ` (${blockedDates.length})` : ''}`;
    const blockedBtnStyle = showBlockedDatesPanel || blockedDates.length > 0
        ? 'border: 1px solid #dc3545; background-color: #dc3545; color: white;'
        : 'border: 1px solid #6c757d; background-color: #6c757d; color: white;';

    html += `<div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
        <button onclick="window.toggleHistoryView()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">
            ${showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores"}
        </button>
        <button onclick="window.toggleBlockedDatesPanel()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; font-weight: bold; ${blockedBtnStyle}">
            ${blockedBtnLabel}
        </button>
    </div>`;

    // ── Painel de dias bloqueados ──
    if (showBlockedDatesPanel) {
        html += buildBlockedDatesPanelHTML();
    } else if (blockedDates.length > 0 && !showHistoryMode) {
        // Aviso discreto quando há dias bloqueados mas o painel está fechado
        const futureBlocked = blockedDates.filter(dk => parseDateKey(dk) >= today);
        if (futureBlocked.length > 0) {
            const labels = futureBlocked.map(dk => parseDateKey(dk).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })).join(", ");
            html += `<div style="padding: 8px 14px; border-radius: 8px; background: rgba(220,53,69,0.08); border: 1px solid rgba(220,53,69,0.2); font-size: 13px; margin-bottom: 16px; color: #dc3545;">
                🚫 <strong>Dias bloqueados ativos:</strong> ${labels}
            </div>`;
        }
    }

    html+=`<h1>${showHistoryMode?"📜 Histórico de Limpezas (Cloud)":"🧹 Plano de Limpezas"}</h1>`;
    if (sortedKeys.length===0) html+=`<p>Não há limpezas ${showHistoryMode?'anteriores no histórico':'agendadas'}.</p>`;

    sortedKeys.forEach(key => {
        const day=grouped[key];
        const hasRooms = day.rooms && day.rooms.length > 0;
        const hasReviews = day.reviews && day.reviews.length > 0;
        if (!hasRooms && !hasReviews) return;

        let title=day.date.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
        if (day.rooms && day.rooms.some(r=>r.sunday)) title="🔴 "+title;

        // Indica se o dia está bloqueado (mas tem limpezas obrigatórias - turnarounds)
        const dayIsBlocked = isBlockedDate(day.date);
        if (dayIsBlocked && !showHistoryMode) {
            title = "⚠️ " + title;
        }

        let dPt=title.replace("🔴 ","").replace("⚠️ ",""); dPt=dPt.charAt(0).toUpperCase()+dPt.slice(1); let cPt=[`🧹 Limpezas - ${dPt}:`];
        let dEs=day.date.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); dEs=dEs.charAt(0).toUpperCase()+dEs.slice(1); let cEs=[`🧹 Limpiezas - ${dEs}:`];
        let rh="";

        // Aviso de dia bloqueado com limpezas forçadas
        if (dayIsBlocked && hasRooms && !showHistoryMode) {
            rh += `<div style="margin-bottom: 8px; font-size: 13px; color: #dc3545; font-weight: 600;">⚠️ Dia bloqueado — limpezas abaixo são obrigatórias (turnaround)</div>`;
        }

        if (!showHistoryMode && (hasRooms || hasReviews)) {
            const gTasks = getGarbageTasks(day.date);
            gTasks.forEach(gt => {
                cPt.push(gt.pt); cEs.push(gt.es);
                rh += `<div style="margin-bottom: 4px; font-size: 15px;"><b>${gt.pt}</b></div>`;
            });
        }

        if (hasReviews && !showHistoryMode) {
            day.reviews.forEach(rev => {
                cPt.push(`🔍 Rever limpeza: ${rev.room} (estadia cancelada)`);
                cEs.push(`🔍 Revisar limpieza: ${rev.room} (estancia cancelada)`);
                rh += `<div style="margin-top: 4px; margin-bottom: 4px; font-size: 15px;">🔍 <b>Rever limpeza: ${rev.room}</b> <span style="font-size: 13px; color: #666;">(estadia cancelada)</span></div>`;
            });
        }

        if (hasRooms) {
            day.rooms.sort((a,b)=>a.room.localeCompare(b.room)).forEach(clean => {
                let hCo = clean.hasCheckout;
                let hCi = clean.hasCheckin;
                let tPt="",tEs="",tH="";
                if (showHistoryMode) {
                    if (clean.urgent) { tPt=" (entrada no mesmo dia)"; tEs=" (entrada en el mismo día)"; tH=" <b>(entrada no mesmo dia)</b>"; }
                } else {
                    if (hCo === undefined || hCi === undefined) {
                        hCo = globalReservations.some(r=>r.room===clean.room&&sameDay(r.checkOut,day.date));
                        hCi = clean.urgent||globalReservations.some(r=>r.room===clean.room&&sameDay(r.checkIn,day.date));
                    }
                    if (hCo && hCi) { tPt=" (sai e entra)"; tEs=" (sale y entra)"; tH=" <b>(sai e entra)</b>"; }
                    else if (hCo) { tPt=" (sai hoje)"; tEs=" (sale hoy)"; tH=" <b>(sai hoje)</b>"; }
                    else if (hCi) { tPt=" (entrada hoje)"; tEs=" (entrada hoy)"; tH=" <b>(entrada hoje)</b>"; }
                }
                const em = (clean.urgent || (hCi && !showHistoryMode)) ? "⚠️" : "🧹";
                cPt.push(`${em} ${clean.room}${tPt}`);
                cEs.push(`${em} ${clean.room}${tEs}`);
                rh += `${em} ${clean.room}${tH}<br>`;
            });
        }

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
    const houseRooms = getHouseRooms(selectedHouse), totalRooms = houseRooms.length;
    const houseLabels = { achada: "Achada (6 Quartos)", impasse: "Impasse (3 Quartos)", vizinho: "Vizinho (3 Quartos)" };
    let html = renderNavigation();
    
    html += `<div style="margin-bottom: 25px; display: flex; gap: 6px; flex-wrap: nowrap; justify-content: space-between;">
        <button onclick="window.selectHouse('achada')" style="flex: 1; padding: 10px 2px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='achada'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='achada'?'#ffffff':'#17a2b8'}; font-weight: bold; text-align: center; white-space: nowrap;">🏡 Achada</button>
        <button onclick="window.selectHouse('impasse')" style="flex: 1; padding: 10px 2px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='impasse'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='impasse'?'#ffffff':'#17a2b8'}; font-weight: bold; text-align: center; white-space: nowrap;">🏡 Impasse</button>
        <button onclick="window.selectHouse('vizinho')" style="flex: 1; padding: 10px 2px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse==='vizinho'?'#17a2b8':'#ffffff'}; color: ${selectedHouse==='vizinho'?'#ffffff':'#17a2b8'}; font-weight: bold; text-align: center; white-space: nowrap;">🏡 Vizinho</button>
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
