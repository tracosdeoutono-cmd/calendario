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
        body[data-theme="aquarela"] button[onclick*="switchMainView('laundry')"] { background: linear-gradient(135deg, #0284c7, #06b6d4) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.3) !important; }
        body[data-theme="aquarela"] button[onclick*="switchMainView('payments')"] { background: linear-gradient(135deg, #8b5cf6, #ec4899) !important; border: none !important; color: white !important; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3) !important; }

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
        .segment-btn { font-family: inherit; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 12px; cursor: pointer; border: 1px solid rgba(245,158,11,0.2); background: rgba(255,255,255,0.04); color: #fff8f0; transition: all 0.25s ease; }
        .segment-btn.active-cleaning { background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 700; box-shadow: 0 4px 15px rgba(245,158,11,0.35); border-color: #f59e0b; }
        .segment-btn.active-occupancy { background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(16,185,129,0.35); border-color: #10b981; }
        .segment-btn.active-laundry { background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(2,132,199,0.35); border-color: #0284c7; }
        .segment-btn.active-payments { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(139,92,246,0.35); border-color: #8b5cf6; }
        body[data-theme="outono"] .clock-btn.active { background: linear-gradient(135deg, #ea580c, #c2410c) !important; box-shadow: 0 0 15px rgba(234,88,12,0.5) !important; border-color: transparent !important; }

        /* ══════════════════════════════════════════ */
        /* COMPONENTES DE STOCK DE LAVANDARIA         */
        /* ══════════════════════════════════════════ */
        .laundry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 10px;
            margin-top: 14px;
        }
        .laundry-item-card {
            border: 1px solid rgba(0,0,0,0.1);
            background: rgba(255,255,255,0.7);
            border-radius: 12px;
            padding: 12px 10px;
            text-align: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        body[data-theme="outono"] .laundry-item-card {
            background: rgba(255,255,255,0.05);
            border-color: rgba(245,158,11,0.25);
            color: #fff8f0;
        }
        body[data-theme="cyber"] .laundry-item-card {
            background: rgba(0,255,65,0.05);
            border-color: #00ff41;
            color: #00ff41;
            border-radius: 0;
        }
        body[data-theme="quadro"] .laundry-item-card {
            background: rgba(255,255,255,0.05);
            border: 1px dashed rgba(255,255,255,0.3);
            color: #e2ddd0;
        }
        .laundry-item-val {
            font-size: 22px;
            font-weight: 800;
            margin: 4px 0 2px 0;
            color: #0284c7;
        }
        body[data-theme="outono"] .laundry-item-val { color: #f59e0b; }
        body[data-theme="cyber"] .laundry-item-val { color: #00ff41; }
        body[data-theme="quadro"] .laundry-item-val { color: #ffe066; }
        .laundry-item-lbl {
            font-size: 11px;
            font-weight: 600;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }

        /* ══════════════════════════════════════════ */
        /* COMPONENTES DE DEFINIÇÕES E DISPOSITIVOS   */
        /* ══════════════════════════════════════════ */
        .toggle-switch-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255,255,255,0.7);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 14px;
            padding: 16px 20px;
            margin-bottom: 18px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        }
        body[data-theme="outono"] .toggle-switch-container {
            background: rgba(255,255,255,0.05);
            border-color: rgba(245,158,11,0.25);
        }
        body[data-theme="cyber"] .toggle-switch-container {
            background: rgba(0,255,65,0.05);
            border-color: #00ff41;
            border-radius: 0;
        }
        body[data-theme="quadro"] .toggle-switch-container {
            background: rgba(255,255,255,0.05);
            border: 1px dashed rgba(255,255,255,0.3);
        }
        .toggle-pill {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            padding: 8px 18px;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 700;
            border: none;
            transition: all 0.2s ease;
        }
        .toggle-pill.active {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 3px 10px rgba(16,185,129,0.4);
        }
        .toggle-pill.inactive {
            background: #6c757d;
            color: white;
            opacity: 0.85;
        }
        .device-card {
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 12px;
            padding: 14px 16px;
            background: rgba(255,255,255,0.7);
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
        }
        body[data-theme="outono"] .device-card {
            background: rgba(255,255,255,0.05);
            border-color: rgba(245,158,11,0.2);
        }
        body[data-theme="cyber"] .device-card {
            background: rgba(0,255,65,0.05);
            border-color: #00ff41;
            border-radius: 0;
        }
        body[data-theme="quadro"] .device-card {
            background: rgba(255,255,255,0.05);
            border: 1px dashed rgba(255,255,255,0.3);
        }
        .log-day-box {
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 12px;
            padding: 14px 16px;
            background: rgba(255,255,255,0.7);
            margin-bottom: 12px;
        }
        body[data-theme="outono"] .log-day-box {
            background: rgba(255,255,255,0.04);
            border-color: rgba(245,158,11,0.2);
        }
        body[data-theme="cyber"] .log-day-box {
            background: rgba(0,255,65,0.04);
            border-color: #00ff41;
            border-radius: 0;
        }
        body[data-theme="quadro"] .log-day-box {
            background: rgba(255,255,255,0.04);
            border: 1px dashed rgba(255,255,255,0.3);
        }

        /* ══════════════════════════════════════════ */
        /* BARRA SUPERIOR (LADO A LADO) & MENU        */
        /* ══════════════════════════════════════════ */
        body > h1:not(.al-badge-title), header > h1:not(.al-badge-title), .header > h1:not(.al-badge-title), #title, .page-title {
            display: none !important;
        }

        .top-navbar-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 16px !important;
            width: 100% !important;
            margin-bottom: 20px !important;
            position: relative !important;
            box-sizing: border-box !important;
        }

        .al-badge-title {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 8px !important;
            background: linear-gradient(135deg, #007bff, #0056b3) !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            padding: 0 18px !important;
            height: 46px !important;
            border-radius: 11px !important;
            font-size: 22px !important;
            font-weight: 800 !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            box-shadow: 0 4px 14px rgba(0, 123, 255, 0.35) !important;
            border: 2px solid #007bff !important;
            letter-spacing: 0.3px !important;
            white-space: nowrap !important;
            line-height: 1 !important;
            user-select: none !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
            cursor: pointer !important;
            outline: none !important;
            transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease !important;
            text-decoration: none !important;
            text-shadow: none !important;
            text-transform: none !important;
            box-sizing: border-box !important;
        }
        .al-badge-title:hover {
            transform: translateY(-1px) scale(1.02) !important;
            filter: brightness(1.06) !important;
        }
        .al-badge-title:active {
            transform: translateY(1px) scale(0.98) !important;
        }

        /* Estilos Adaptados por Tema para o Título Casas do Martim */
        body[data-theme="outono"] .al-badge-title {
            background: linear-gradient(135deg, rgba(245,158,11,0.25), rgba(234,88,12,0.35)) !important;
            border: 2px solid rgba(245,158,11,0.5) !important;
            color: #fff8f0 !important;
            -webkit-text-fill-color: #fff8f0 !important;
            font-family: 'Outfit', sans-serif !important;
            font-size: 22px !important;
            box-shadow: 0 4px 20px rgba(245,158,11,0.3) !important;
        }

        body[data-theme="cyber"] .al-badge-title {
            background: rgba(0,255,65,0.12) !important;
            border: 2px solid #00ff41 !important;
            border-radius: 0px !important;
            color: #00ff41 !important;
            -webkit-text-fill-color: #00ff41 !important;
            font-family: 'VT323', monospace !important;
            font-size: 25px !important;
            text-shadow: 0 0 10px rgba(0,255,65,0.6) !important;
            box-shadow: 0 0 15px rgba(0,255,65,0.25) !important;
        }

        body[data-theme="cappuccino"] .al-badge-title {
            background: #fffde7 !important;
            border: 2px dashed #e88d67 !important;
            border-radius: 6px !important;
            color: #2c1810 !important;
            -webkit-text-fill-color: #2c1810 !important;
            font-family: 'Caveat', cursive !important;
            font-size: 25px !important;
            box-shadow: 3px 3px 0px rgba(44,24,16,0.15) !important;
        }

        body[data-theme="carnival"] .al-badge-title {
            background: #fff7cc !important;
            border: 3px solid #ff0050 !important;
            border-radius: 30px !important;
            color: #ff0050 !important;
            -webkit-text-fill-color: #ff0050 !important;
            font-family: 'Fredoka', sans-serif !important;
            font-size: 21px !important;
            box-shadow: 4px 4px 0px #ff0050 !important;
        }

        body[data-theme="sakura"] .al-badge-title {
            background: rgba(255,255,255,0.9) !important;
            border: 2px solid #f9a8d4 !important;
            border-radius: 14px !important;
            color: #be185d !important;
            -webkit-text-fill-color: #be185d !important;
            font-family: 'Quicksand', sans-serif !important;
            font-size: 21px !important;
            box-shadow: 0 4px 15px rgba(244,114,182,0.25) !important;
        }

        body[data-theme="aquarela"] .al-badge-title {
            background: linear-gradient(135deg, rgba(2, 132, 199, 0.22) 0%, rgba(124, 58, 237, 0.2) 50%, rgba(225, 29, 72, 0.2) 100%) !important;
            border: 2px solid #0284c7 !important;
            border-radius: 16px !important;
            color: #0369a1 !important;
            -webkit-text-fill-color: #0369a1 !important;
            font-family: 'Kalam', cursive, sans-serif !important;
            font-size: 22px !important;
            font-weight: 700 !important;
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.25) !important;
            backdrop-filter: blur(10px) !important;
        }

        body[data-theme="jornal"] .al-badge-title {
            background: #ffffff !important;
            border: 2px solid #1a1a1a !important;
            border-radius: 0px !important;
            color: #1a1a1a !important;
            -webkit-text-fill-color: #1a1a1a !important;
            font-family: 'Playfair Display', serif !important;
            font-size: 20px !important;
            font-variant: small-caps !important;
            box-shadow: none !important;
        }

        body[data-theme="quadro"] .al-badge-title {
            background: rgba(255,255,255,0.06) !important;
            border: 2px dashed rgba(255,255,255,0.5) !important;
            border-radius: 6px !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            font-family: 'Patrick Hand', cursive !important;
            font-size: 25px !important;
            text-shadow: 0 0 6px rgba(255,255,255,0.25) !important;
            box-shadow: none !important;
        }

        .floating-menu-container {
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 100 !important;
            margin-left: auto !important;
            flex-shrink: 0 !important;
            width: 46px !important;
            height: 46px !important;
        }
        .menu-trigger-btn {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            outline: none;
            transition: transform 0.2s ease, opacity 0.2s ease;
            display: block;
            height: 46px;
            width: 46px;
        }
        .menu-trigger-btn:hover {
            transform: scale(1.05);
            opacity: 0.92;
        }
        .menu-trigger-btn:active {
            transform: scale(0.96);
        }
        .menu-trigger-img {
            height: 46px;
            width: 46px;
            object-fit: cover;
            border-radius: 11px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.18);
            display: block;
        }
        .floating-sub-items {
            position: absolute !important;
            top: 52px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            align-items: center !important;
            transition: opacity 0.25s ease, transform 0.25s ease, max-height 0.25s ease !important;
            transform-origin: top center !important;
            z-index: 101 !important;
        }
        .floating-sub-items.menu-collapsed {
            opacity: 0 !important;
            transform: translateX(-50%) translateY(-8px) !important;
            pointer-events: none !important;
            max-height: 0 !important;
            overflow: hidden !important;
        }
        .floating-sub-items.menu-expanded {
            opacity: 1 !important;
            transform: translateX(-50%) translateY(0) !important;
            pointer-events: auto !important;
            max-height: 350px !important;
        }

        /* ══════════════════════════════════════════ */
        /* CABEÇALHO RETRÁTIL (TRANSIÇÃO SUAVE)       */
        /* ══════════════════════════════════════════ */
        .collapsible-header-section {
            display: block !important;
            width: 100% !important;
            clear: both !important;
            transition: max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease, margin-bottom 0.25s ease;
            overflow: hidden;
            transform-origin: top left;
        }
        .collapsible-header-section.header-collapsed {
            max-height: 0 !important;
            opacity: 0 !important;
            margin-bottom: 0 !important;
            pointer-events: none !important;
            transform: translateY(-10px);
        }
        .collapsible-header-section.header-expanded {
            max-height: 350px;
            opacity: 1;
            margin-bottom: 20px;
            pointer-events: auto;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    try {
        document.querySelectorAll('body > h1:not(.al-badge-title), header h1, #title, .page-title').forEach(el => {
            if (!el.closest('#result')) {
                el.style.display = 'none';
            }
        });
    } catch(e) {}
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

// ══════════════════════════════════════════════════
// CONFIGURAÇÃO DE ROUPA POR QUARTO (STOCK LAVANDARIA)
// ══════════════════════════════════════════════════
const ROOM_LINEN = {
    "Vizinho 1":     { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 0, lencolSolteiro: 2, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Vizinho 2":     { edredonCasal: 0, edredonSolteiro: 1, lencolCasal: 0, lencolSolteiro: 1, capaAlmofada: 1, toalhaGrande: 1, toalhaPequena: 1 },
    "Vizinho 3":     { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Achada 1":      { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 3 },
    "Achada 2":      { edredonCasal: 0, edredonSolteiro: 1, lencolCasal: 0, lencolSolteiro: 1, capaAlmofada: 1, toalhaGrande: 1, toalhaPequena: 1 },
    "Achada 3":      { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Achada 4":      { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Achada 5":      { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Achada 6":      { edredonCasal: 0, edredonSolteiro: 3, lencolCasal: 0, lencolSolteiro: 3, capaAlmofada: 3, toalhaGrande: 3, toalhaPequena: 3 },
    "Impasse 2":     { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Impasse 3":     { edredonCasal: 0, edredonSolteiro: 2, lencolCasal: 0, lencolSolteiro: 2, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 },
    "Impasse 4":     { edredonCasal: 0, edredonSolteiro: 2, lencolCasal: 0, lencolSolteiro: 2, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 3 }
};

const LINEN_ITEMS_DEF = [
    { key: "edredonCasal",    label: "Edredões Casal",     short: "Edredão Casal",    emoji: "🛏️" },
    { key: "edredonSolteiro", label: "Edredões Solteiro",  short: "Edredão Solteiro", emoji: "🛏️" },
    { key: "lencolCasal",     label: "Lençóis Casal",      short: "Lençol Casal",     emoji: "🛏️" },
    { key: "lencolSolteiro",  label: "Lençóis Solteiro",   short: "Lençol Solteiro",  emoji: "🛏️" },
    { key: "capaAlmofada",    label: "Capas Almofada",     short: "Capa Almofada",    emoji: "枕" },
    { key: "toalhaGrande",    label: "Toalhas Grandes",    short: "Toalha Grande",    emoji: "🛁" },
    { key: "toalhaPequena",   label: "Toalhas Pequenas",   short: "Toalha Pequena",   emoji: "🧴" }
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
let currentView = "cleaning"; // "cleaning" | "occupancy" | "snapshots" | "laundry" | "settings" | "payments"
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let showPastStatsMode = false;
let selectedSnapshotDate = null;

// Estados para Stock de Lavandaria
let showLaundryHistory = false;
let showAddDropOffForm = false;
let showAddPickUpForm = false;
let showRoomConfigModal = false;

// Estados para Gestão de Pagamentos & Horas
let showPaymentsHistory = false;
let editingWorkId = null;

// Proteção para nunca gravar na cloud se o histórico não carregou
let historyLoadedOk = false;

// ══════════════════════════════════════════════════
// DIAS BLOQUEADOS (sincronizados na Cloud & localStorage)
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
        cloudHistory["_blockedDates"] = blockedDates;
        try { localStorage.setItem("al_blocked_dates", JSON.stringify(blockedDates)); } catch(e) {}
        if (historyLoadedOk) saveToCloudHistory(cloudHistory);
        syncCleaningPlan();
    }
    input.value = '';
    showCleaningPlan();
};

window.removeBlockedDate = function(dk) {
    blockedDates = blockedDates.filter(d => d !== dk);
    cloudHistory["_blockedDates"] = blockedDates;
    try { localStorage.setItem("al_blocked_dates", JSON.stringify(blockedDates)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    syncCleaningPlan();
    showCleaningPlan();
};

// ══════════════════════════════════════════════════
// DEFINIÇÕES DA APP (Moradas nas Cópias, etc.)
// ══════════════════════════════════════════════════
function getAppSettings() {
    if (!cloudHistory["_settings"] || typeof cloudHistory["_settings"] !== 'object') {
        let localInclude = localStorage.getItem("al_include_addresses");
        cloudHistory["_settings"] = {
            includeAddresses: localInclude !== null ? localInclude === 'true' : true
        };
    }
    if (cloudHistory["_settings"].includeAddresses === undefined) {
        cloudHistory["_settings"].includeAddresses = true;
    }
    return cloudHistory["_settings"];
}

window.toggleIncludeAddresses = function() {
    const settings = getAppSettings();
    settings.includeAddresses = !settings.includeAddresses;
    try { localStorage.setItem("al_include_addresses", String(settings.includeAddresses)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    renderCurrentView();
};

// ══════════════════════════════════════════════════
// REGISTO E DETEÇÃO DE DISPOSITIVOS
// ══════════════════════════════════════════════════
function getDeviceFingerprint() {
    let devId = null;
    try {
        devId = localStorage.getItem("al_device_id");
    } catch(e) {}
    if (!devId) {
        devId = "dev_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
        try { localStorage.setItem("al_device_id", devId); } catch(e) {}
    }
    return devId;
}

function detectDeviceName() {
    const ua = navigator.userAgent || "";
    let name = "Dispositivo";
    let icon = "💻";

    // 1. Detectar Navegador
    let browser = "";
    if (/CriOS\//i.test(ua)) browser = "Chrome iOS";
    else if (/FxiOS\//i.test(ua)) browser = "Firefox iOS";
    else if (/EdgiOS\//i.test(ua)) browser = "Edge iOS";
    else if (/Edg\//i.test(ua)) browser = "Edge";
    else if (/Chrome\//i.test(ua) && !/Chromium|Edg|CriOS/i.test(ua)) browser = "Chrome";
    else if (/Safari\//i.test(ua) && !/Chrome|CriOS/i.test(ua)) browser = "Safari";
    else if (/Firefox\//i.test(ua)) browser = "Firefox";
    else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "Opera";

    // 2. Detectar iPhone / iPad / iOS
    if (/iPhone/i.test(ua)) {
        icon = "📱";
        let iosVer = "";
        const vm = ua.match(/OS\s+([\d_]+)\s+like/i);
        if (vm && vm[1]) iosVer = " iOS " + vm[1].replace(/_/g, '.');
        name = `iPhone${browser ? ` (${browser})` : (iosVer || ' (iOS)')}`;
    }
    else if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        icon = "📱";
        let iosVer = "";
        const vm = ua.match(/OS\s+([\d_]+)\s+like/i);
        if (vm && vm[1]) iosVer = " iPadOS " + vm[1].replace(/_/g, '.');
        name = `iPad${browser ? ` (${browser})` : (iosVer || ' (iPadOS)')}`;
    }
    // 3. Detectar Android e Modelo Específico do Hardware
    else if (/Android/i.test(ua)) {
        icon = "📱";
        let model = "";
        const m = ua.match(/Android\s+[^;]+;\s*([^;)]+?)(?:\s+Build|\))/i);
        if (m && m[1]) {
            model = m[1].trim().replace(/^wv\s+/i, '').replace(/;\s*wv/i, '');
        }

        if (model && model !== "K" && model.toLowerCase() !== "mobile") {
            let brand = "";
            if (/^SM-|^GT-|^SCH-/i.test(model)) brand = "Samsung ";
            else if (/^Pixel/i.test(model)) brand = "Google ";
            else if (/^Redmi|^Mi\s|^POCO|^2\d{3}[A-Z0-9]+/i.test(model)) brand = "Xiaomi ";
            else if (/^CPH|^RMX/i.test(model)) brand = "Oppo/Realme ";
            else if (/^moto/i.test(model)) brand = "Motorola ";
            else if (/^HUAWEI|^VOG-|^ELE-/i.test(model)) brand = "Huawei ";
            else if (/^ONEPLUS/i.test(model)) brand = "OnePlus ";

            name = `${brand}${model}${browser ? ` (${browser})` : ''}`;
        } else {
            name = (/Mobile/i.test(ua) ? "Android" : "Tablet Android") + (browser ? ` (${browser})` : '');
        }
    }
    // 4. Detectar Windows
    else if (/Windows NT 10\.0/i.test(ua)) {
        name = `Windows 10/11${browser ? ` (${browser})` : ' PC'}`;
        icon = "💻";
    }
    else if (/Windows NT 6\./i.test(ua)) {
        name = `Windows 7/8${browser ? ` (${browser})` : ' PC'}`;
        icon = "💻";
    }
    else if (/Windows/i.test(ua)) {
        name = `Windows PC${browser ? ` (${browser})` : ''}`;
        icon = "💻";
    }
    // 5. Detectar Mac / Linux
    else if (/Macintosh|Mac OS/i.test(ua)) {
        name = `Mac / MacBook${browser ? ` (${browser})` : ''}`;
        icon = "💻";
    }
    else if (/Linux/i.test(ua)) {
        name = `Computador Linux${browser ? ` (${browser})` : ''}`;
        icon = "💻";
    }

    return { name, icon };
}

function logDeviceAccess() {
    try {
        const devId = getDeviceFingerprint();
        let customLocalName = "";
        try { customLocalName = localStorage.getItem("al_custom_device_name") || ""; } catch(e) {}

        const detected = detectDeviceName();

        if (!cloudHistory["_devices"] || typeof cloudHistory["_devices"] !== 'object') {
            cloudHistory["_devices"] = {};
        }

        const now = new Date();
        const todayStr = formatDateKey(now);
        const existing = cloudHistory["_devices"][devId] || {};
        const savedCustomName = existing.customName || customLocalName || "";
        const finalDisplayName = savedCustomName || existing.name || detected.name;

        cloudHistory["_devices"][devId] = {
            id: devId,
            name: finalDisplayName,
            customName: savedCustomName || undefined,
            icon: existing.icon || detected.icon,
            platform: navigator.platform || "",
            screen: `${window.innerWidth}x${window.innerHeight}`,
            firstSeen: existing.firstSeen || now.toISOString(),
            lastSeen: now.toISOString(),
            visitsCount: (existing.visitsCount || 0) + 1
        };

        if (!Array.isArray(cloudHistory["_access_logs"])) {
            cloudHistory["_access_logs"] = [];
        }

        const lastLog = cloudHistory["_access_logs"][cloudHistory["_access_logs"].length - 1];
        const isRecent = lastLog && lastLog.deviceId === devId && (now.getTime() - new Date(lastLog.timestamp).getTime()) < 5 * 60 * 1000;

        if (!isRecent) {
            cloudHistory["_access_logs"].push({
                deviceId: devId,
                deviceName: finalDisplayName,
                icon: detected.icon,
                timestamp: now.toISOString(),
                dateKey: todayStr,
                timeStr: now.toLocaleTimeString("pt-PT", { hour: '2-digit', minute: '2-digit' })
            });

            if (cloudHistory["_access_logs"].length > 200) {
                cloudHistory["_access_logs"] = cloudHistory["_access_logs"].slice(-200);
            }
        }

        // Se o dispositivo suportar Client Hints de alta precisão (Chrome/Edge em Android ou PC), atualiza o nome técnico se não tiver nome personalizado
        if (!savedCustomName && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
            navigator.userAgentData.getHighEntropyValues(['model', 'platform']).then(uaData => {
                if (uaData && uaData.model && uaData.model.trim() !== "") {
                    let brand = "";
                    const m = uaData.model.trim();
                    if (/^SM-|^GT-/i.test(m)) brand = "Samsung ";
                    else if (/^Pixel/i.test(m)) brand = "Google ";
                    else if (/^Redmi|^POCO/i.test(m)) brand = "Xiaomi ";

                    const exactName = `${brand}${m}`;
                    if (cloudHistory["_devices"] && cloudHistory["_devices"][devId] && !cloudHistory["_devices"][devId].customName) {
                        cloudHistory["_devices"][devId].name = exactName;
                        if (historyLoadedOk) saveToCloudHistory(cloudHistory);
                    }
                }
            }).catch(() => {});
        }
    } catch(e) {
        console.warn("Erro ao registar dispositivo:", e);
    }
}

window.renameDevice = function(devId) {
    const devices = cloudHistory["_devices"] || {};
    const dev = devices[devId] || {};
    const currentName = dev.customName || dev.name || "Dispositivo";
    const newName = prompt("Nome real / identificador para este dispositivo (ex: iPhone do Martim, Telemóvel da Maria, PC Recepção):", currentName);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) return;

    if (!cloudHistory["_devices"]) cloudHistory["_devices"] = {};
    if (!cloudHistory["_devices"][devId]) {
        cloudHistory["_devices"][devId] = { id: devId };
    }

    cloudHistory["_devices"][devId].name = trimmed;
    cloudHistory["_devices"][devId].customName = trimmed;

    if (devId === getDeviceFingerprint()) {
        try { localStorage.setItem("al_custom_device_name", trimmed); } catch(e) {}
    }

    // Atualiza também nos registos de acesso para coerência visual
    if (Array.isArray(cloudHistory["_access_logs"])) {
        cloudHistory["_access_logs"].forEach(l => {
            if (l.deviceId === devId) {
                l.deviceName = trimmed;
            }
        });
    }

    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    renderCurrentView();
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

let showFloatingSubMenu = false;
let showNavButtons = false;

window.toggleNavButtons = function(event) {
    if (event) event.stopPropagation();
    showNavButtons = !showNavButtons;
    const headerSec = document.getElementById('al-collapsible-header');
    if (headerSec) {
        if (showNavButtons) {
            headerSec.classList.remove('header-collapsed');
            headerSec.classList.add('header-expanded');
        } else {
            headerSec.classList.remove('header-expanded');
            headerSec.classList.add('header-collapsed');
        }
    }
};

window.toggleFloatingSubMenu = function(event) {
    if (event) event.stopPropagation();
    showFloatingSubMenu = !showFloatingSubMenu;
    const sub = document.getElementById('al-floating-sub-items');
    if (sub) {
        if (showFloatingSubMenu) {
            sub.classList.remove('menu-collapsed');
            sub.classList.add('menu-expanded');
        } else {
            sub.classList.remove('menu-expanded');
            sub.classList.add('menu-collapsed');
            const popup = document.getElementById('al-theme-popup');
            if (popup) popup.style.display = 'none';
        }
    }
};

window.toggleThemePopup = function(event) {
    if (event) event.stopPropagation();
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
    if (showFloatingSubMenu && !e.target.closest('.floating-menu-container')) {
        showFloatingSubMenu = false;
        const sub = document.getElementById('al-floating-sub-items');
        if (sub) {
            sub.classList.remove('menu-expanded');
            sub.classList.add('menu-collapsed');
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
    const isLaundry = currentView === "laundry";
    const isPayments = currentView === "payments";
    const isSnapshots = currentView === "snapshots";
    const isSettings = currentView === "settings";
    const themeEmoji = getThemeEmoji(currentTheme);

    const floatingMenu = `
        <div class="floating-menu-container">
            <button onclick="window.toggleFloatingSubMenu(event)" class="menu-trigger-btn" title="Definições e Ferramentas">
                <img src="icone2.jpeg" alt="Menu" class="menu-trigger-img">
            </button>
            <div id="al-floating-sub-items" class="floating-sub-items ${showFloatingSubMenu ? 'menu-expanded' : 'menu-collapsed'}">
                <div class="theme-popup-wrapper">
                    <button onclick="window.toggleThemePopup(event)" class="clock-btn" title="Mudar Estilo">${themeEmoji}</button>
                    ${buildThemePopupHTML()}
                </div>
                ${currentTheme === 'aleatorio' ? `<button onclick="window.rerollRandomTheme(event)" class="clock-btn" title="Sortear Outro Estilo! (Atual: ${currentRandomPresetName})" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; border: none;">🎲</button>` : ''}
                <button onclick="window.toggleSnapshots()" class="clock-btn ${isSnapshots?'active':''}" title="${isSnapshots?'Voltar ao Início':'Ver Previsões'}" style="${isSnapshots?'background-color:#e2e6ea;':''}">🕒</button>
                <button onclick="window.toggleSettings()" class="clock-btn ${isSettings?'active':''}" title="${isSettings?'Voltar ao Início':'Definições e Dispositivos'}" style="${isSettings?'background-color:#e2e6ea;':''}">⚙️</button>
            </div>
        </div>
    `;

    // Linha de topo: [ 🏡 Casas do Martim ] à esquerda e [ Ícone Quadrado ] à direita
    const topBar = `
        <div class="top-navbar-row" style="margin-bottom: 20px;">
            <div onclick="window.toggleNavButtons(event)" class="al-badge-title" role="button" tabindex="0" title="Ver / Ocultar Menu de Limpezas e Casas">
                🏡 Casas do Martim
            </div>
            ${floatingMenu}
        </div>
    `;

    let navButtonsHtml = "";

    if (currentTheme === "outono") {
        navButtonsHtml = `
            <div style="margin-bottom: 24px; width: 100%; display: flex; flex-direction: column; gap: 8px; clear: both;">
                <button onclick="window.switchMainView('cleaning')" class="segment-btn ${isCleaning?'active-cleaning':''}">🧹 Limpezas</button>
                <button onclick="window.switchMainView('occupancy')" class="segment-btn ${isOccupancy?'active-occupancy':''}">📊 Disponibilidade</button>
                <button onclick="window.switchMainView('laundry')" class="segment-btn ${isLaundry?'active-laundry':''}">🧺 Stock Lavandaria</button>
                <button onclick="window.switchMainView('payments')" class="segment-btn ${isPayments?'active-payments':''}">💶 Pagamentos</button>
            </div>`;
    } else {
        navButtonsHtml = `
            <div style="margin-bottom: 20px; width: 100%; display: flex; gap: 10px; flex-wrap: wrap; clear: both;">
                <button onclick="window.switchMainView('cleaning')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #007bff; background-color: ${isCleaning?'#007bff':'#ffffff'}; color: ${isCleaning?'#ffffff':'#007bff'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧹 Plano de Limpezas</button>
                <button onclick="window.switchMainView('occupancy')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #28a745; background-color: ${isOccupancy?'#28a745':'#ffffff'}; color: ${isOccupancy?'#ffffff':'#28a745'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📊 Disponibilidade da Casa</button>
                <button onclick="window.switchMainView('laundry')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #0284c7; background-color: ${isLaundry?'#0284c7':'#ffffff'}; color: ${isLaundry?'#ffffff':'#0284c7'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧺 Stock Lavandaria</button>
                <button onclick="window.switchMainView('payments')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #8b5cf6; background-color: ${isPayments?'#8b5cf6':'#ffffff'}; color: ${isPayments?'#ffffff':'#8b5cf6'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">💶 Pagamentos</button>
            </div>`;
    }

    return `
        ${topBar}
        <div id="al-collapsible-header" class="collapsible-header-section ${showNavButtons ? 'header-expanded' : 'header-collapsed'}">
            ${navButtonsHtml}
        </div>
    `;
}

function renderCurrentView() {
    if (currentView === "cleaning") showCleaningPlan();
    else if (currentView === "occupancy") showOccupancyPlan();
    else if (currentView === "snapshots") showSnapshotsPlan();
    else if (currentView === "laundry") showLaundryStockView();
    else if (currentView === "settings") showSettingsView();
    else if (currentView === "payments") showPaymentsView();
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

window.toggleSettings = function() {
    if (currentView === "settings") {
        currentView = "cleaning";
    } else {
        currentView = "settings";
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

// ══════════════════════════════════════════════════
// PERSISTÊNCIA NA CLOUD & LOCALSTORAGE
// ══════════════════════════════════════════════════
async function fetchCloudHistory() {
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) cloudHistory = {};
        historyLoadedOk = true;

        // Sincroniza e une dias bloqueados da cloud + local para nunca esquecer nenhum dia bloqueado
        let mergedBlocked = new Set(blockedDates);
        if (Array.isArray(cloudHistory["_blockedDates"])) {
            cloudHistory["_blockedDates"].forEach(d => mergedBlocked.add(d));
        }
        blockedDates = Array.from(mergedBlocked).sort();
        cloudHistory["_blockedDates"] = blockedDates;
        try { localStorage.setItem("al_blocked_dates", JSON.stringify(blockedDates)); } catch(e) {}

        // Sincroniza dados de pagamentos/horas da cloud
        if (cloudHistory["_payroll"] && typeof cloudHistory["_payroll"] === 'object') {
            try { localStorage.setItem("al_payroll_backup", JSON.stringify(cloudHistory["_payroll"])); } catch(e) {}
        } else {
            try {
                const localPayroll = JSON.parse(localStorage.getItem("al_payroll_backup") || 'null');
                if (localPayroll) cloudHistory["_payroll"] = localPayroll;
            } catch(e) {}
        }

        // Regista o acesso do dispositivo atual e envia para a Cloud imediatamente
        logDeviceAccess();
        saveToCloudHistory(cloudHistory);
    }
    catch (e) {
        console.warn("Aviso: Histórico não carregou da cloud. A usar armazenamento local.", e);
        try {
            cloudHistory = JSON.parse(localStorage.getItem("al_cloud_history_backup") || "{}");
            if (Array.isArray(cloudHistory["_blockedDates"])) {
                let mergedBlocked = new Set(blockedDates);
                cloudHistory["_blockedDates"].forEach(d => mergedBlocked.add(d));
                blockedDates = Array.from(mergedBlocked).sort();
            }
            if (!cloudHistory["_payroll"]) {
                const localPayroll = JSON.parse(localStorage.getItem("al_payroll_backup") || 'null');
                if (localPayroll) cloudHistory["_payroll"] = localPayroll;
            }
        } catch(err) { cloudHistory = {}; }
        historyLoadedOk = false;
        logDeviceAccess();
    }
}

async function saveToCloudHistory(newEntries) {
    try {
        localStorage.setItem("al_cloud_history_backup", JSON.stringify(newEntries));
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

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;

    const nextR = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout && r !== reservation)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    const sameDayTurnaround = nextR && sameDay(checkout, nextR.checkIn);
    let bestDay = checkout;
    let isForcedSunday = false;

    if (sameDayTurnaround) {
        bestDay = checkout;
        if (isSunday(checkout)) isForcedSunday = true;
    } else {
        let candidate = isSunday(checkout) ? addDays(checkout, 1) : checkout;
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
        chipsHtml += `<div style="margin-top: 12px; margin-bottom: 8px; font-size: 12px; font-weight: 700; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px;">Passadas (Guardadas para sempre no histórico)</div>`;
        chipsHtml += pastDates.map(dk => {
            const d = parseDateKey(dk);
            const label = d.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
            return `<div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(108,117,125,0.08); border: 1px solid rgba(108,117,125,0.25); border-radius: 20px; padding: 5px 12px; font-size: 13px; opacity: 0.75;">
                <span>📅 ${label}</span>
                <button onclick="window.removeBlockedDate('${dk}')" title="Remover do histórico" style="background: none; border: none; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; color: #6c757d; font-weight: bold;">×</button>
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
            if (dk !== "_snapshots" && dk !== "_plan" && dk !== "_reviews" && dk !== "_laundry" && /^\d{4}-\d{2}-\d{2}$/.test(dk)) {
                const val = cloudHistory[dk];
                const d = parseDateKey(dk);
                if (d < today) {
                    if (!grouped[dk]) grouped[dk] = { date: d, rooms: [] };
                    let roomsList = [];
                    if (Array.isArray(val)) { roomsList = val; }
                    else if (val && Array.isArray(val.rooms)) { roomsList = val.rooms; }
                    roomsList.forEach(r => {
                        const roomName = typeof r === 'string' ? r : (r && r.room ? r.room : null);
                        if (roomName && !grouped[dk].rooms.some(existing => existing.room === roomName)) {
                            grouped[dk].rooms.push({ room: roomName, sunday: !!r.sunday, urgent: !!r.urgent, hasCheckout: r.hasCheckout, hasCheckin: r.hasCheckin });
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

    const futureBlocked = blockedDates.filter(dk => parseDateKey(dk) >= today);
    const blockedBtnLabel = showBlockedDatesPanel
        ? '🚫 Fechar Dias Bloqueados'
        : `🚫 Dias Bloqueados${futureBlocked.length > 0 ? ` (${futureBlocked.length} ativos)` : ''}`;
    const blockedBtnStyle = showBlockedDatesPanel || futureBlocked.length > 0
        ? 'border: 2px solid #dc3545; background-color: #dc3545; color: white; box-shadow: 0 3px 8px rgba(220,53,69,0.3);'
        : 'border: 2px solid #dc3545; background-color: rgba(220,53,69,0.06); color: #dc3545;';

    html += `<div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
        <button onclick="window.toggleHistoryView()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1.5px solid #10b981; background: linear-gradient(135deg, #10b981, #059669); color: white; font-weight: bold; box-shadow: 0 3px 8px rgba(16,185,129,0.25);">
            ${showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores"}
        </button>
        <button onclick="window.toggleBlockedDatesPanel()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; font-weight: bold; ${blockedBtnStyle}">
            ${blockedBtnLabel}
        </button>
    </div>`;

    if (showBlockedDatesPanel) {
        html += buildBlockedDatesPanelHTML();
    } else if (futureBlocked.length > 0 && !showHistoryMode) {
        const labels = futureBlocked.map(dk => parseDateKey(dk).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })).join(", ");
        html += `<div style="padding: 8px 14px; border-radius: 8px; background: rgba(220,53,69,0.08); border: 1px solid rgba(220,53,69,0.2); font-size: 13px; margin-bottom: 16px; color: #dc3545;">
            🚫 <strong>Dias bloqueados ativos:</strong> ${labels}
        </div>`;
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

        const dayIsBlocked = isBlockedDate(day.date);
        const isTodayOrFuture = day.date >= today;
        if (dayIsBlocked && isTodayOrFuture && !showHistoryMode) {
            title = "⚠️ " + title;
        }

        let dPt=title.replace("🔴 ","").replace("⚠️ ",""); dPt=dPt.charAt(0).toUpperCase()+dPt.slice(1); let cPt=[`🧹 Limpezas - ${dPt}:`];
        let dEs=day.date.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); dEs=dEs.charAt(0).toUpperCase()+dEs.slice(1); let cEs=[`🧹 Limpiezas - ${dEs}:`];
        let rh="";

        if (dayIsBlocked && isTodayOrFuture && hasRooms && !showHistoryMode) {
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

        const settings = getAppSettings();
        if (settings.includeAddresses) {
            cPt.push("");
            cPt.push("Endereço da minha casa: Impasse Romeiras 6");
            cPt.push("Endereço da casa Funchal: Beco da Achada 3");

            cEs.push("");
            cEs.push("Dirección de mi casa: Impasse Romeiras 6");
            cEs.push("Dirección de la casa Funchal: Beco da Achada 3");
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

// ══════════════════════════════════════════════════
// MÓDULO DE GESTÃO DE STOCK DE ROUPA NA LAVANDARIA
// ══════════════════════════════════════════════════

function getLaundryData() {
    if (!cloudHistory["_laundry"] || typeof cloudHistory["_laundry"] !== 'object') {
        try {
            const local = JSON.parse(localStorage.getItem("al_laundry_data") || "null");
            if (local && typeof local === 'object') {
                cloudHistory["_laundry"] = local;
            } else {
                cloudHistory["_laundry"] = { dropOffs: [], pickUps: [] };
            }
        } catch(e) {
            cloudHistory["_laundry"] = { dropOffs: [], pickUps: [] };
        }
    }
    if (!Array.isArray(cloudHistory["_laundry"].dropOffs)) cloudHistory["_laundry"].dropOffs = [];
    if (!Array.isArray(cloudHistory["_laundry"].pickUps)) cloudHistory["_laundry"].pickUps = [];
    return cloudHistory["_laundry"];
}

function saveLaundryData() {
    try {
        localStorage.setItem("al_laundry_data", JSON.stringify(cloudHistory["_laundry"]));
    } catch(e) {}
    if (historyLoadedOk) {
        saveToCloudHistory(cloudHistory);
    }
}

// Reúne todas as limpezas de forma cronológica única (ignora Impasse Villa)
function getAllCleaningsList() {
    const list = [];
    const seen = new Set();

    // 1. A partir do plano persistido na cloud
    const plan = cloudHistory["_plan"] || {};
    Object.keys(plan).forEach(k => {
        const entry = plan[k];
        if (entry && entry.cleaningKey && entry.room && entry.room !== "Impasse Villa") {
            const uid = `${entry.cleaningKey}|${entry.room}`;
            if (!seen.has(uid)) {
                seen.add(uid);
                list.push({ dateKey: entry.cleaningKey, room: entry.room });
            }
        }
    });

    // 2. A partir do histórico legado por datas (YYYY-MM-DD)
    Object.keys(cloudHistory).forEach(dk => {
        if (dk !== "_snapshots" && dk !== "_plan" && dk !== "_reviews" && dk !== "_laundry" && dk !== "_blockedDates" && dk !== "_settings" && dk !== "_devices" && dk !== "_access_logs" && /^\d{4}-\d{2}-\d{2}$/.test(dk)) {
            const val = cloudHistory[dk];
            let roomsList = [];
            if (Array.isArray(val)) roomsList = val;
            else if (val && Array.isArray(val.rooms)) roomsList = val.rooms;
            roomsList.forEach(r => {
                const roomName = typeof r === 'string' ? r : (r && r.room ? r.room : null);
                if (roomName && roomName !== "Impasse Villa") {
                    const uid = `${dk}|${roomName}`;
                    if (!seen.has(uid)) {
                        seen.add(uid);
                        list.push({ dateKey: dk, room: roomName });
                    }
                }
            });
        }
    });

    // 3. Fallback a partir das reservas se o plano ainda não tiver limpezas
    if (list.length === 0) {
        globalReservations.forEach(res => {
            if (res.room === "Impasse Villa") return;
            const info = getCleaningInfo(res, globalReservations);
            const dk = formatDateKey(info.date);
            const uid = `${dk}|${res.room}`;
            if (!seen.has(uid)) {
                seen.add(uid);
                list.push({ dateKey: dk, room: res.room });
            }
        });
    }

    list.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    return list;
}

// Calcula as peças de roupa para uma lista de limpezas
function calculateLinenItems(cleanings) {
    const counts = {
        edredonCasal: 0,
        edredonSolteiro: 0,
        lencolCasal: 0,
        lencolSolteiro: 0,
        capaAlmofada: 0,
        toalhaGrande: 0,
        toalhaPequena: 0
    };
    cleanings.forEach(c => {
        if (c.room === "Impasse Villa") return;
        const r = ROOM_LINEN[c.room] || { edredonCasal: 1, edredonSolteiro: 0, lencolCasal: 1, lencolSolteiro: 0, capaAlmofada: 2, toalhaGrande: 2, toalhaPequena: 2 };
        counts.edredonCasal += r.edredonCasal || 0;
        counts.edredonSolteiro += r.edredonSolteiro || 0;
        counts.lencolCasal += r.lencolCasal || 0;
        counts.lencolSolteiro += r.lencolSolteiro || 0;
        counts.capaAlmofada += r.capaAlmofada || 0;
        counts.toalhaGrande += r.toalhaGrande || 0;
        counts.toalhaPequena += r.toalhaPequena || 0;
    });
    const totalPieces = Object.values(counts).reduce((a, b) => a + b, 0);
    return { counts, totalPieces };
}

// Determina os lotes levados à lavandaria e a roupa acumulada pendente
function getLaundryBatchesAndPending(previewDateKey = null) {
    const lData = getLaundryData();
    const dropOffs = [...lData.dropOffs].sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    const allCleanings = getAllCleaningsList();

    const batches = [];
    let lastDateKey = null;

    dropOffs.forEach((drop, idx) => {
        const batchCleanings = allCleanings.filter(c => {
            if (lastDateKey) {
                return c.dateKey > lastDateKey && c.dateKey <= drop.dateKey;
            } else {
                return c.dateKey <= drop.dateKey;
            }
        });
        lastDateKey = drop.dateKey;
        const linen = calculateLinenItems(batchCleanings);
        batches.push({
            dropOff: drop,
            startDateKey: idx === 0 ? (batchCleanings[0] ? batchCleanings[0].dateKey : null) : dropOffs[idx - 1].dateKey,
            endDateKey: drop.dateKey,
            cleanings: batchCleanings,
            linen: linen
        });
    });

    const todayStr = formatDateKey(new Date());
    const limitDateKey = previewDateKey || todayStr;

    const pendingCleanings = allCleanings.filter(c => {
        if (lastDateKey) {
            return c.dateKey > lastDateKey && c.dateKey <= limitDateKey;
        } else {
            return c.dateKey <= limitDateKey;
        }
    });
    const pendingLinen = calculateLinenItems(pendingCleanings);

    // Stock total atualmente na lavandaria (lotes entregues que ainda não foram retirados)
    const stockInLaundry = {
        edredonCasal: 0,
        edredonSolteiro: 0,
        lencolCasal: 0,
        lencolSolteiro: 0,
        capaAlmofada: 0,
        toalhaGrande: 0,
        toalhaPequena: 0
    };
    let uncollectedBatchCount = 0;
    batches.forEach(b => {
        if (!b.dropOff.collected) {
            uncollectedBatchCount++;
            Object.keys(stockInLaundry).forEach(k => {
                stockInLaundry[k] += b.linen.counts[k] || 0;
            });
        }
    });
    const totalStockPieces = Object.values(stockInLaundry).reduce((a, b) => a + b, 0);

    return {
        batches,
        pendingCleanings,
        pendingLinen,
        stockInLaundry,
        totalStockPieces,
        uncollectedBatchCount,
        lastDropOffDateKey: lastDateKey
    };
}

window.toggleLaundryHistory = function() {
    showLaundryHistory = !showLaundryHistory;
    showAddDropOffForm = false;
    showAddPickUpForm = false;
    showLaundryStockView();
};

window.toggleAddDropOffForm = function() {
    showAddDropOffForm = !showAddDropOffForm;
    showAddPickUpForm = false;
    showLaundryStockView();
};

window.toggleAddPickUpForm = function() {
    showAddPickUpForm = !showAddPickUpForm;
    showAddDropOffForm = false;
    showLaundryStockView();
};

window.toggleRoomConfigModal = function() {
    showRoomConfigModal = !showRoomConfigModal;
    showLaundryStockView();
};

window.onDropOffDateChange = function() {
    const input = document.getElementById('al-dropoff-date-input');
    const previewDiv = document.getElementById('al-dropoff-preview');
    if (!input || !previewDiv) return;
    const dk = input.value;
    if (!dk) return;

    const data = getLaundryBatchesAndPending(dk);
    const cleanings = data.pendingCleanings;
    const linen = data.pendingLinen;

    let previewHtml = `<div style="margin-top: 10px; padding: 12px; border-radius: 8px; background: rgba(2,132,199,0.08); border: 1px solid rgba(2,132,199,0.2);">`;
    previewHtml += `<div style="font-size: 13px; font-weight: 700; color: #0284c7; margin-bottom: 6px;">📋 Pré-visualização para esta data (${dk}):</div>`;
    previewHtml += `<div style="font-size: 13px; margin-bottom: 4px;">• <strong>${cleanings.length}</strong> limpezas incluídas desde a última ida.</div>`;

    if (cleanings.length > 0) {
        const roomCounts = {};
        cleanings.forEach(c => { roomCounts[c.room] = (roomCounts[c.room] || 0) + 1; });
        const roomsStr = Object.keys(roomCounts).map(r => `${r}${roomCounts[r]>1?` (${roomCounts[r]}x)`:''}`).join(', ');
        previewHtml += `<div style="font-size: 12px; color: #666; margin-bottom: 8px;">Quartos: ${roomsStr}</div>`;
        previewHtml += `<div style="font-size: 13px; font-weight: 600;">Total de peças a levar: <span style="color: #0284c7; font-size: 15px; font-weight: bold;">${linen.totalPieces}</span> peças</div>`;
        previewHtml += `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">`;
        LINEN_ITEMS_DEF.forEach(it => {
            const count = linen.counts[it.key];
            if (count > 0) {
                previewHtml += `<span style="font-size: 12px; background: white; padding: 3px 8px; border-radius: 12px; border: 1px solid #ddd;">${it.emoji} ${it.short}: <b>${count}</b></span>`;
            }
        });
        previewHtml += `</div>`;
    } else {
        previewHtml += `<div style="font-size: 12px; color: #dc3545;">⚠️ Nenhuma limpeza registada no período até esta data.</div>`;
    }
    previewHtml += `</div>`;
    previewDiv.innerHTML = previewHtml;
};

// 🔄 FUI LEVANTAR E DEIXAR TUDO (Ação Completa num só clique)
window.submitLaundrySwapAll = function(customDateKey = null) {
    const todayStr = customDateKey || formatDateKey(new Date());
    const lData = getLaundryData();

    // 1. Marca todos os lotes atualmente não recolhidos como retirados hoje
    let uncollectedCount = 0;
    lData.dropOffs.forEach(drop => {
        if (!drop.collected) {
            drop.collected = true;
            drop.collectedDateKey = todayStr;
            uncollectedCount++;
        }
    });

    if (uncollectedCount > 0) {
        lData.pickUps.push({
            id: "pick_" + Date.now(),
            type: "pick_up",
            dateKey: todayStr,
            collectedCount: uncollectedCount,
            note: "Levantamento total (Troca)",
            createdAt: new Date().toISOString()
        });
    }

    // 2. Regista a entrega de toda a roupa suja acumulada até hoje
    const newDropOff = {
        id: "drop_" + (Date.now() + 1),
        type: "drop_off",
        dateKey: todayStr,
        collected: false,
        collectedDateKey: null,
        note: "Entrega total (Troca)",
        createdAt: new Date().toISOString()
    };
    lData.dropOffs.push(newDropOff);

    saveLaundryData();
    showAddDropOffForm = false;
    showAddPickUpForm = false;
    showLaundryStockView();
};

window.submitLaundryDropOff = function() {
    const input = document.getElementById('al-dropoff-date-input');
    const dk = input ? input.value : formatDateKey(new Date());
    if (!dk) { alert("Por favor seleciona uma data válida."); return; }

    const lData = getLaundryData();
    const newDropOff = {
        id: "drop_" + Date.now(),
        type: "drop_off",
        dateKey: dk,
        collected: false,
        collectedDateKey: null,
        createdAt: new Date().toISOString()
    };

    lData.dropOffs.push(newDropOff);
    saveLaundryData();
    showAddDropOffForm = false;
    showLaundryStockView();
};

window.submitLaundryPickUp = function(targetDropOffId = null) {
    const lData = getLaundryData();
    const todayStr = formatDateKey(new Date());
    const dateInput = document.getElementById('al-pickup-date-input');
    const pickDateKey = dateInput ? dateInput.value : todayStr;

    if (targetDropOffId) {
        const drop = lData.dropOffs.find(d => d.id === targetDropOffId);
        if (drop) {
            drop.collected = true;
            drop.collectedDateKey = todayStr;
            lData.pickUps.push({
                id: "pick_" + Date.now(),
                type: "pick_up",
                dateKey: todayStr,
                targetDropOffId: targetDropOffId,
                createdAt: new Date().toISOString()
            });
            saveLaundryData();
            showLaundryStockView();
            return;
        }
    }

    const checkboxes = document.querySelectorAll('.al-pickup-batch-cb:checked');
    let collectedCount = 0;

    if (checkboxes.length > 0) {
        checkboxes.forEach(cb => {
            const drop = lData.dropOffs.find(d => d.id === cb.value);
            if (drop) {
                drop.collected = true;
                drop.collectedDateKey = pickDateKey;
                collectedCount++;
            }
        });
    } else {
        lData.dropOffs.forEach(drop => {
            if (!drop.collected && drop.dateKey <= pickDateKey) {
                drop.collected = true;
                drop.collectedDateKey = pickDateKey;
                collectedCount++;
            }
        });
    }

    if (collectedCount === 0) {
        alert("Não foram encontrados lotes para levantar nesta data.");
        return;
    }

    lData.pickUps.push({
        id: "pick_" + Date.now(),
        type: "pick_up",
        dateKey: pickDateKey,
        collectedCount: collectedCount,
        createdAt: new Date().toISOString()
    });

    saveLaundryData();
    showAddPickUpForm = false;
    showLaundryStockView();
};

// Apaga imediatamente sem confirmação (conforme pedido)
window.removeLaundryEvent = function(eventId, eventType) {
    const lData = getLaundryData();
    if (eventType === "drop_off") {
        lData.dropOffs = lData.dropOffs.filter(d => d.id !== eventId);
    } else if (eventType === "pick_up") {
        const pick = lData.pickUps.find(p => p.id === eventId);
        if (pick && pick.targetDropOffId) {
            const drop = lData.dropOffs.find(d => d.id === pick.targetDropOffId);
            if (drop) {
                drop.collected = false;
                drop.collectedDateKey = null;
            }
        }
        lData.pickUps = lData.pickUps.filter(p => p.id !== eventId);
    }

    saveLaundryData();
    showLaundryStockView();
};

function buildRoomConfigGuideHTML() {
    let rowsHtml = '';
    Object.keys(ROOM_LINEN).forEach(roomName => {
        const cfg = ROOM_LINEN[roomName];
        let desc = [];
        if (cfg.edredonCasal) desc.push(`<b>${cfg.edredonCasal}</b> Edredão Casal`);
        if (cfg.edredonSolteiro) desc.push(`<b>${cfg.edredonSolteiro}</b> Edredão Solteiro`);
        if (cfg.lencolCasal) desc.push(`<b>${cfg.lencolCasal}</b> Lençol Casal`);
        if (cfg.lencolSolteiro) desc.push(`<b>${cfg.lencolSolteiro}</b> Lençol Solteiro`);
        if (cfg.capaAlmofada) desc.push(`<b>${cfg.capaAlmofada}</b> Capas Almofada`);
        if (cfg.toalhaGrande) desc.push(`<b>${cfg.toalhaGrande}</b> Toalhas Grandes`);
        if (cfg.toalhaPequena) desc.push(`<b>${cfg.toalhaPequena}</b> Toalhas Pequenas`);

        rowsHtml += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid rgba(0,0,0,0.06); font-size: 13px;">
                <span style="font-weight: bold; min-width: 110px;">🏠 ${roomName}</span>
                <span style="opacity: 0.9; text-align: right;">${desc.join(', ')}</span>
            </div>
        `;
    });

    return `
        <div style="border: 1px solid #ddd; border-radius: 12px; padding: 16px; margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #0284c7;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #0284c7; font-size: 15px;">📋 Composição de Roupa por Quarto</strong>
                <button onclick="window.toggleRoomConfigModal()" style="background: none; border: none; font-size: 13px; color: #666; cursor: pointer;">✕ Fechar</button>
            </div>
            <div>${rowsHtml}</div>
        </div>
    `;
}

function showLaundryStockView() {
    let html = renderNavigation();
    const todayStr = formatDateKey(new Date());
    const data = getLaundryBatchesAndPending();
    const lData = getLaundryData();

    // ── Botões de Ação Principais ──
    html += `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px;">
            <h1 style="margin: 0; font-size: 26px;">🧺 Stock na Lavandaria</h1>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="window.submitLaundrySwapAll()" title="Levanta toda a roupa que estava na lavandaria e deixa toda a roupa suja acumulada até hoje"
                    style="padding: 10px 18px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; font-weight: bold; box-shadow: 0 4px 12px rgba(124,58,237,0.35);">
                    🔄 Fui Levantar e Deixar Tudo
                </button>
                <button onclick="window.toggleAddDropOffForm()" style="padding: 10px 14px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; font-weight: bold; box-shadow: 0 3px 8px rgba(2,132,199,0.25);">
                    ➕ Só Levar Roupa
                </button>
                <button onclick="window.toggleAddPickUpForm()" style="padding: 10px 14px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background: linear-gradient(135deg, #059669, #047857); color: white; font-weight: bold; box-shadow: 0 3px 8px rgba(5,150,105,0.25);">
                    📦 Só Retirar Roupa
                </button>
                <button onclick="window.toggleLaundryHistory()" style="padding: 10px 14px; font-size: 14px; cursor: pointer; border-radius: 8px; border: 1px solid #6c757d; background-color: ${showLaundryHistory?'#6c757d':'#ffffff'}; color: ${showLaundryHistory?'#ffffff':'#6c757d'}; font-weight: bold;">
                    ${showLaundryHistory ? "🧺 Ver Stock Atual" : "📜 Ver Histórico"}
                </button>
            </div>
        </div>
    `;

    // ── Formulário: Adicionar Ida à Lavandaria (Drop-off) ──
    if (showAddDropOffForm) {
        html += `
            <div style="border: 2px solid #0284c7; border-radius: 14px; padding: 18px; margin-bottom: 22px; background: rgba(2,132,199,0.04);">
                <div style="font-size: 16px; font-weight: bold; color: #0284c7; margin-bottom: 8px;">
                    ➕ Registar Ida à Lavandaria (Levar Roupa)
                </div>
                <div style="font-size: 13px; color: #555; margin-bottom: 12px;">
                    Ao adicionar este dia, assume-se que foi levada toda a roupa suja acumulada desde a última ida até esta data.
                </div>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label style="font-size: 14px; font-weight: 600;">Data da Ida:</label>
                    <input type="date" id="al-dropoff-date-input" value="${todayStr}" onchange="window.onDropOffDateChange()"
                        style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; cursor: pointer;">
                    <button onclick="window.submitLaundryDropOff()" style="padding: 8px 18px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background-color: #0284c7; color: white; font-weight: bold;">
                        ✓ Confirmar Entrega
                    </button>
                    <button onclick="window.toggleAddDropOffForm()" style="padding: 8px 14px; font-size: 14px; cursor: pointer; border-radius: 8px; border: 1px solid #ccc; background-color: #f8f9fa; color: #666;">
                        Cancelar
                    </button>
                </div>
                <div id="al-dropoff-preview"></div>
            </div>
        `;
    }

    // ── Formulário: Retirar da Lavandaria (Pick-up) ──
    if (showAddPickUpForm) {
        const uncollected = data.batches.filter(b => !b.dropOff.collected);
        let batchesCheckboxes = '';
        if (uncollected.length > 0) {
            batchesCheckboxes = uncollected.map(b => {
                const d = parseDateKey(b.dropOff.dateKey);
                const label = d.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
                return `
                    <label style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border-radius: 8px; border: 1px solid #ddd; font-size: 13px; cursor: pointer;">
                        <input type="checkbox" class="al-pickup-batch-cb" value="${b.dropOff.id}" checked>
                        <span>📦 Lote de <strong>${label}</strong> (${b.linen.totalPieces} peças)</span>
                    </label>
                `;
            }).join('');
        }

        html += `
            <div style="border: 2px solid #059669; border-radius: 14px; padding: 18px; margin-bottom: 22px; background: rgba(5,150,105,0.04);">
                <div style="font-size: 16px; font-weight: bold; color: #059669; margin-bottom: 8px;">
                    📦 Registar Retirada da Lavandaria (Levantar Roupa)
                </div>
                ${uncollected.length === 0 ? `
                    <p style="color: #666; font-size: 14px;">Não há lotes pendentes na lavandaria de momento. Toda a roupa entregue já foi retirada! ✨</p>
                    <button onclick="window.toggleAddPickUpForm()" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: white;">Fechar</button>
                ` : `
                    <div style="font-size: 13px; color: #555; margin-bottom: 12px;">
                        Escolhe os lotes que estás a levantar e a data da retirada:
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
                        ${batchesCheckboxes}
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="font-size: 14px; font-weight: 600;">Data do Levantamento:</label>
                        <input type="date" id="al-pickup-date-input" value="${todayStr}"
                            style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; cursor: pointer;">
                        <button onclick="window.submitLaundryPickUp()" style="padding: 8px 18px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background-color: #059669; color: white; font-weight: bold;">
                            ✓ Confirmar Levantamento
                        </button>
                        <button onclick="window.toggleAddPickUpForm()" style="padding: 8px 14px; font-size: 14px; cursor: pointer; border-radius: 8px; border: 1px solid #ccc; background-color: #f8f9fa; color: #666;">
                            Cancelar
                        </button>
                    </div>
                `}
            </div>
        `;
    }

    // ── Guia de Composição por Quarto (colapsável) ──
    if (showRoomConfigModal) {
        html += buildRoomConfigGuideHTML();
    } else {
        html += `
            <div style="margin-bottom: 14px; display: flex; justify-content: flex-end;">
                <button onclick="window.toggleRoomConfigModal()" style="background: none; border: none; color: #0284c7; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: underline;">
                    📋 Ver composição de roupa de cada quarto
                </button>
            </div>
        `;
    }

    // ══════════════════════════════════════════════════
    // MODO HISTÓRICO
    // ══════════════════════════════════════════════════
    if (showLaundryHistory) {
        html += `<h2>📜 Histórico de Movimentos de Lavandaria</h2>`;
        const dropOffs = [...lData.dropOffs].sort((a, b) => b.dateKey.localeCompare(a.dateKey));

        if (dropOffs.length === 0) {
            html += `<p style="color: #666;">Ainda não há registos de idas à lavandaria no histórico.</p>`;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 14px; margin-top: 15px;">`;
            dropOffs.forEach(drop => {
                const batch = data.batches.find(b => b.dropOff.id === drop.id);
                const d = parseDateKey(drop.dateKey);
                const label = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const linen = batch ? batch.linen : { totalPieces: 0, counts: {} };
                const cleaningsCount = batch ? batch.cleanings.length : 0;

                let statusBadge = drop.collected
                    ? `<span style="background: rgba(5,150,105,0.12); color: #059669; border: 1px solid rgba(5,150,105,0.3); padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">✅ Retirado ${drop.collectedDateKey ? `a ${drop.collectedDateKey}` : ''}</span>`
                    : `<span style="background: rgba(2,132,199,0.12); color: #0284c7; border: 1px solid rgba(2,132,199,0.3); padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">⏳ Na Lavandaria</span>`;

                let chipsHtml = '';
                LINEN_ITEMS_DEF.forEach(it => {
                    const count = linen.counts[it.key];
                    if (count > 0) {
                        chipsHtml += `<span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; padding: 2px 8px; font-size: 12px;">${it.emoji} ${it.short}: <b>${count}</b></span>`;
                    }
                });

                html += `
                    <div style="border: 1px solid #ddd; border-radius: 12px; padding: 14px 16px; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                            <div>
                                <strong style="font-size: 16px;">🚚 Ida de ${label}</strong>
                                <span style="font-size: 13px; color: #666; margin-left: 8px;">(${cleaningsCount} limpezas)</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                ${statusBadge}
                                <button onclick="window.removeLaundryEvent('${drop.id}', 'drop_off')" title="Remover este dia histórico"
                                    style="padding: 4px 10px; font-size: 12px; cursor: pointer; border-radius: 6px; border: 1px solid #dc3545; background-color: transparent; color: #dc3545; font-weight: bold;">
                                    🗑️ Remover
                                </button>
                            </div>
                        </div>
                        <div style="font-size: 13px; margin-bottom: 8px;">
                            Total levado: <strong>${linen.totalPieces}</strong> peças
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 6px;">${chipsHtml}</div>
                    </div>
                `;
            });
            html += `</div>`;
        }
        result.innerHTML = html;
        return;
    }

    // ══════════════════════════════════════════════════
    // MODO ESTADO ATUAL (STOCK NA LAVANDARIA)
    // ══════════════════════════════════════════════════

    // 1. Bloco de Stock Atual na Lavandaria
    html += `
        <div style="border: 1px solid #ddd; border-radius: 16px; padding: 20px; margin-bottom: 25px; background-color: #f8f9fa; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-left: 6px solid #0284c7;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h2 style="margin: 0; color: #0284c7; font-size: 20px;">🧺 Roupa Atualmente na Lavandaria</h2>
                    <div style="font-size: 13px; opacity: 0.7; margin-top: 2px;">Peças entregues que aguardam levantamento (${data.uncollectedBatchCount} lote${data.uncollectedBatchCount!==1?'s':''})</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 28px; font-weight: 900; color: #0284c7;">${data.totalStockPieces} <span style="font-size: 15px; font-weight: 600; opacity: 0.8;">peças</span></div>
                </div>
            </div>

            <div class="laundry-grid">
                ${LINEN_ITEMS_DEF.map(it => {
                    const count = data.stockInLaundry[it.key] || 0;
                    return `
                        <div class="laundry-item-card">
                            <span style="font-size: 20px;">${it.emoji}</span>
                            <div class="laundry-item-val">${count}</div>
                            <div class="laundry-item-lbl">${it.short}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // 2. Lotes a Aguardar Levantamento
    const uncollectedBatches = data.batches.filter(b => !b.dropOff.collected);
    if (uncollectedBatches.length > 0) {
        html += `<h3 style="margin-top: 20px; margin-bottom: 12px;">📦 Lotes Entregues a Aguardar Levantamento</h3>`;
        html += `<div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px;">`;

        uncollectedBatches.forEach(b => {
            const d = parseDateKey(b.dropOff.dateKey);
            const label = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            const roomsStr = b.cleanings.map(c => c.room).join(', ') || 'Nenhum quarto';

            let itemsBadges = '';
            LINEN_ITEMS_DEF.forEach(it => {
                const count = b.linen.counts[it.key];
                if (count > 0) {
                    itemsBadges += `<span style="display: inline-flex; align-items: center; gap: 4px; background: white; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 3px 8px; font-size: 12px;">${it.emoji} ${it.short}: <b>${count}</b></span>`;
                }
            });

            html += `
                <div style="border: 1px solid #ddd; border-radius: 12px; padding: 14px 16px; background-color: #f8f9fa;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                        <div>
                            <strong style="font-size: 15px;">🚚 Entregue a ${label}</strong>
                            <div style="font-size: 12px; color: #666; margin-top: 2px;">Limpezas incluídas (${b.cleanings.length}): ${roomsStr}</div>
                        </div>
                        <button onclick="window.submitLaundryPickUp('${b.dropOff.id}')" style="padding: 6px 14px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #059669; background-color: #059669; color: white; font-weight: bold;">
                            ✓ Marcar como Retirado
                        </button>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">${itemsBadges}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // 3. Roupa Suja Acumulada (Pendente por levar à lavandaria)
    html += `
        <div style="border: 1px solid #ddd; border-radius: 16px; padding: 20px; margin-top: 20px; background-color: #f8f9fa; border-left: 6px solid #f59e0b;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                <div>
                    <h2 style="margin: 0; color: #f59e0b; font-size: 20px;">👕 Roupa Suja Acumulada (Por Levar)</h2>
                    <div style="font-size: 13px; opacity: 0.7; margin-top: 2px;">
                        Gerada pelas limpezas desde ${data.lastDropOffDateKey ? `a última ida (${data.lastDropOffDateKey})` : 'o início'} até hoje
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 28px; font-weight: 900; color: #f59e0b;">${data.pendingLinen.totalPieces} <span style="font-size: 15px; font-weight: 600; opacity: 0.8;">peças</span></div>
                </div>
            </div>

            ${data.pendingCleanings.length === 0 ? `
                <p style="color: #666; font-size: 14px; margin: 8px 0;">Não há roupa suja pendente de momento. Toda a roupa anterior já foi levada à lavandaria! ✨</p>
            ` : `
                <div style="font-size: 13px; margin-bottom: 10px;">
                    <strong>${data.pendingCleanings.length}</strong> limpezas efetuadas: <span style="color: #555;">${data.pendingCleanings.map(c => c.room).join(', ')}</span>
                </div>
                <div class="laundry-grid">
                    ${LINEN_ITEMS_DEF.map(it => {
                        const count = data.pendingLinen.counts[it.key] || 0;
                        return `
                            <div class="laundry-item-card">
                                <span style="font-size: 20px;">${it.emoji}</span>
                                <div class="laundry-item-val" style="color: #f59e0b;">${count}</div>
                                <div class="laundry-item-lbl">${it.short}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="window.submitLaundrySwapAll()" style="padding: 10px 18px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; font-weight: bold; box-shadow: 0 4px 12px rgba(124,58,237,0.3);">
                        🔄 Fui Levantar e Deixar Tudo Hoje
                    </button>
                    <button onclick="window.submitLaundryDropOff()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 8px; border: none; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; font-weight: bold; box-shadow: 0 3px 8px rgba(245,158,11,0.25);">
                        🧺 Só Deixar Roupa Hoje
                    </button>
                </div>
            `}
        </div>
    `;

    result.innerHTML = html;
    if (showAddDropOffForm) {
        window.onDropOffDateChange();
    }
}

// ══════════════════════════════════════════════════
// VISTA DE DEFINIÇÕES & HISTÓRICO DE DISPOSITIVOS ⚙️
// ══════════════════════════════════════════════════
function showSettingsView() {
    let html = renderNavigation();
    const settings = getAppSettings();
    const isIncludeOn = !!settings.includeAddresses;
    const myDevId = getDeviceFingerprint();
    const devices = cloudHistory["_devices"] || {};
    const devKeys = Object.keys(devices);
    const logs = Array.isArray(cloudHistory["_access_logs"]) ? [...cloudHistory["_access_logs"]] : [];

    html += `
        <div style="margin-bottom: 25px;">
            <h1 style="margin: 0 0 6px 0; font-size: 26px;">⚙️ Definições & Dispositivos</h1>
            <div style="font-size: 13px; color: #666;">Personalização de cópias e monitorização de acessos ao site.</div>
        </div>

        <!-- Secção 1: Moradas nas Cópias -->
        <div class="toggle-switch-container">
            <div>
                <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">
                    📍 Incluir Moradas nas Cópias (PT e ES)
                </div>
                <div style="font-size: 13px; opacity: 0.8; max-width: 550px; line-height: 1.4;">
                    Quando <strong>Ligado</strong>, anexa automaticamente os endereços das casas no final do texto ao clicar em 🇵🇹 <b>Copiar PT</b> e 🇪🇸 <b>Copiar ES</b>. As moradas <em>não aparecem no ecrã</em>.
                </div>
            </div>
            <div>
                <button onclick="window.toggleIncludeAddresses()" class="toggle-pill ${isIncludeOn ? 'active' : 'inactive'}">
                    ${isIncludeOn ? '🟢 LIGADO' : '⚪ DESLIGADO'}
                </button>
            </div>
        </div>

        <!-- Secção 2: Dispositivos Conectados -->
        <div style="margin-top: 30px; margin-bottom: 25px;">
            <h2 style="margin: 0 0 14px 0; font-size: 20px;">📱 Dispositivos Conectados (${devKeys.length})</h2>
            <div style="font-size: 13px; color: #666; margin-bottom: 15px;">
                Dispositivos (telemóveis, tablets, computadores) que já abriram esta aplicação:
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
    `;

    if (devKeys.length === 0) {
        html += `<p style="color: #888; font-size: 14px;">Ainda não há dispositivos registados.</p>`;
    } else {
        devKeys.forEach(devId => {
            const dev = devices[devId];
            const isCurrent = devId === myDevId;
            const lastDate = dev.lastSeen ? new Date(dev.lastSeen).toLocaleDateString("pt-PT", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recentemente";

            html += `
                <div class="device-card" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px solid #ddd; border-radius: 12px; background: #fff; margin-bottom: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 26px;">${dev.icon || '📱'}</span>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <strong style="font-size: 15px; color: #111;">${dev.name || 'Dispositivo'}</strong>
                                ${isCurrent ? `<span style="background: rgba(16,185,129,0.15); color: #059669; border: 1px solid rgba(16,185,129,0.3); padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold;">👉 Este Dispositivo</span>` : ''}
                                ${dev.customName ? `<span style="background: rgba(2,132,199,0.1); color: #0284c7; border: 1px solid rgba(2,132,199,0.25); padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: bold;">Nome Guardado na Cloud</span>` : ''}
                            </div>
                            <div style="font-size: 12px; opacity: 0.7; margin-top: 2px;">
                                Último acesso: ${lastDate} • Visitas: <strong>${dev.visitsCount || 1}</strong> ${dev.screen ? `• Ecrã: ${dev.screen}` : ''}
                            </div>
                        </div>
                    </div>
                    <button onclick="window.renameDevice('${devId}')" title="Mudar o nome real deste dispositivo na Cloud"
                        style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 8px; border: 1px solid #007bff; background-color: rgba(0,123,255,0.08); color: #007bff; font-weight: bold; white-space: nowrap;">
                        ✏️ Mudar Nome
                    </button>
                </div>
            `;
        });
    }

    html += `
            </div>
        </div>

        <!-- Secção 3: Histórico de Acessos Recentes por Dia -->
        <div style="margin-top: 30px;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px;">📜 Histórico de Acessos Recentes</h2>
            <div style="font-size: 13px; color: #666; margin-bottom: 15px;">
                Registo cronológico organizado por dia dos acessos efetuados ao programa:
            </div>
    `;

    if (logs.length === 0) {
        html += `<p style="color: #888; font-size: 14px;">Sem histórico de acessos recente.</p>`;
    } else {
        // Agrupa os logs por dia
        const logsByDay = {};
        logs.slice().reverse().forEach(log => {
            const dk = log.dateKey || formatDateKey(new Date(log.timestamp));
            if (!logsByDay[dk]) logsByDay[dk] = [];
            logsByDay[dk].push(log);
        });

        const sortedDayKeys = Object.keys(logsByDay).sort().reverse();

        sortedDayKeys.forEach(dk => {
            const dayLogs = logsByDay[dk];
            const d = parseDateKey(dk);
            const dayTitle = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            const capitalizedTitle = dayTitle.charAt(0).toUpperCase() + dayTitle.slice(1);

            let logsListHtml = '';
            dayLogs.forEach(entry => {
                const dev = devices[entry.deviceId] || {};
                const isCurrent = entry.deviceId === myDevId;
                const devName = dev.name || entry.deviceName || "Dispositivo";
                const devIcon = dev.icon || entry.icon || "📱";

                logsListHtml += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 13px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>${devIcon}</span>
                            <strong>${devName}</strong>
                            ${isCurrent ? `<span style="font-size: 11px; opacity: 0.6;">(atual)</span>` : ''}
                        </div>
                        <div style="font-weight: 600; opacity: 0.8; font-family: monospace;">
                            🕒 ${entry.timeStr || new Date(entry.timestamp).toLocaleTimeString("pt-PT", { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="log-day-box">
                    <div style="font-size: 14px; font-weight: bold; color: #007bff; margin-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 4px;">
                        📅 ${capitalizedTitle} <span style="font-size: 12px; font-weight: normal; color: #666;">(${dayLogs.length} acesso${dayLogs.length!==1?'s':''})</span>
                    </div>
                    <div>${logsListHtml}</div>
                </div>
            `;
        });
    }

    html += `</div>`;
    result.innerHTML = html;
}

// ══════════════════════════════════════════════════
// GESTÃO DE PAGAMENTOS & HORAS DE TRABALHO 💶
// ══════════════════════════════════════════════════
function getPayrollData() {
    if (!cloudHistory["_payroll"] || typeof cloudHistory["_payroll"] !== 'object' || Array.isArray(cloudHistory["_payroll"])) {
        try {
            cloudHistory["_payroll"] = JSON.parse(localStorage.getItem("al_payroll_backup") || '{"ratePerHour":11,"pendingWork":[],"settlements":[]}');
        } catch(e) {
            cloudHistory["_payroll"] = { ratePerHour: 11, pendingWork: [], settlements: [] };
        }
    }
    if (typeof cloudHistory["_payroll"].ratePerHour !== 'number') cloudHistory["_payroll"].ratePerHour = 11;
    if (!Array.isArray(cloudHistory["_payroll"].pendingWork)) cloudHistory["_payroll"].pendingWork = [];
    if (!Array.isArray(cloudHistory["_payroll"].settlements)) cloudHistory["_payroll"].settlements = [];
    return cloudHistory["_payroll"];
}

window.addWorkEntry = function() {
    const dateInput = document.getElementById('al-work-date-input');
    const hoursInput = document.getElementById('al-work-hours-input');
    const noteInput = document.getElementById('al-work-note-input');

    if (!dateInput || !hoursInput) return;
    const dk = dateInput.value;
    if (!dk) {
        alert("Por favor, seleciona a data do trabalho.");
        return;
    }

    const rawHours = hoursInput.value.replace(',', '.').trim();
    const hours = parseFloat(rawHours);
    if (isNaN(hours) || hours <= 0) {
        alert("Por favor, introduz um número de horas válido (ex: 2,5 ou 4).");
        return;
    }

    const note = noteInput ? noteInput.value.trim() : "";
    const pData = getPayrollData();
    const rate = pData.ratePerHour || 11;
    const amount = Math.round(hours * rate * 100) / 100;

    const newEntry = {
        id: "work_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        dateKey: dk,
        hours: hours,
        rate: rate,
        amount: amount,
        note: note,
        createdAt: new Date().toISOString()
    };

    pData.pendingWork.push(newEntry);
    pData.pendingWork.sort((a, b) => b.dateKey.localeCompare(a.dateKey));

    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);

    showPaymentsView();
};

window.startEditWork = function(workId) {
    editingWorkId = workId;
    showPaymentsView();
};

window.cancelEditWork = function() {
    editingWorkId = null;
    showPaymentsView();
};

window.saveWorkEntry = function(workId) {
    const dateInput = document.getElementById(`al-edit-date-${workId}`);
    const hoursInput = document.getElementById(`al-edit-hours-${workId}`);
    const noteInput = document.getElementById(`al-edit-note-${workId}`);
    if (!dateInput || !hoursInput) return;

    const dk = dateInput.value;
    const rawHours = hoursInput.value.replace(',', '.').trim();
    const hours = parseFloat(rawHours);
    if (!dk || isNaN(hours) || hours <= 0) {
        alert("Por favor, introduz valores válidos.");
        return;
    }

    const note = noteInput ? noteInput.value.trim() : "";
    const pData = getPayrollData();
    const item = pData.pendingWork.find(w => w.id === workId);
    if (item) {
        item.dateKey = dk;
        item.hours = hours;
        item.amount = Math.round(hours * (item.rate || pData.ratePerHour || 11) * 100) / 100;
        item.note = note;
        pData.pendingWork.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
    }

    editingWorkId = null;
    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    showPaymentsView();
};

window.deleteWorkEntry = function(workId) {
    if (!confirm("Tens a certeza de que queres apagar este registo de horas?")) return;
    const pData = getPayrollData();
    pData.pendingWork = pData.pendingWork.filter(w => w.id !== workId);
    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    showPaymentsView();
};

window.settleAllPayments = function() {
    const pData = getPayrollData();
    if (pData.pendingWork.length === 0) {
        alert("Não existem horas pendentes para liquidar.");
        return;
    }

    const totalHours = pData.pendingWork.reduce((sum, w) => sum + (parseFloat(w.hours) || 0), 0);
    const totalAmount = pData.pendingWork.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);
    const formattedAmount = totalAmount.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    const formattedHours = (Math.round(totalHours * 100) / 100).toString().replace('.', ',');

    if (!confirm(`Confirmas a liquidação total de ${formattedAmount} correspondente a ${formattedHours} horas acumuladas?\n\nEste lote será arquivado no Histórico de Pagamentos com todos os dias detalhados.`)) {
        return;
    }

    const now = new Date();
    const newSettlement = {
        id: "settle_" + Date.now(),
        settledDate: formatDateKey(now),
        settledTimestamp: now.toISOString(),
        rate: pData.ratePerHour || 11,
        totalHours: Math.round(totalHours * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
        items: [...pData.pendingWork]
    };

    pData.settlements.unshift(newSettlement);
    pData.pendingWork = [];

    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);

    showPaymentsHistory = true;
    showPaymentsView();
};

window.reopenSettlement = function(settleId) {
    if (!confirm("Queres reabrir este pagamento? Todos os dias deste pagamento voltarão para as horas pendentes a pagar.")) return;
    const pData = getPayrollData();
    const settle = pData.settlements.find(s => s.id === settleId);
    if (!settle) return;

    if (Array.isArray(settle.items)) {
        pData.pendingWork.push(...settle.items);
        pData.pendingWork.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
    }
    pData.settlements = pData.settlements.filter(s => s.id !== settleId);

    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);

    showPaymentsHistory = false;
    showPaymentsView();
};

window.deleteSettlement = function(settleId) {
    if (!confirm("Tens a certeza de que queres apagar permanentemente este registo histórico de pagamento?")) return;
    const pData = getPayrollData();
    pData.settlements = pData.settlements.filter(s => s.id !== settleId);

    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    if (historyLoadedOk) saveToCloudHistory(cloudHistory);
    showPaymentsView();
};

window.togglePaymentsTab = function(historyMode) {
    showPaymentsHistory = !!historyMode;
    showPaymentsView();
};

window.onWorkHoursInput = function(val) {
    const preview = document.getElementById('al-work-calc-preview');
    if (!preview) return;
    const raw = (val || '').replace(',', '.').trim();
    const h = parseFloat(raw);
    if (!isNaN(h) && h > 0) {
        const amt = (h * 11).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
        preview.innerText = `💡 Previsão: ${val} h × 11,00 €/h = ${amt}`;
    } else {
        preview.innerText = '';
    }
};

function buildPendingWorkTextPT(pendingList, totalHours, totalAmount) {
    if (pendingList.length === 0) return "Sem horas de trabalho acumuladas.";

    const lines = [];
    lines.push("💶 *Horas de Trabalho Acumuladas — Casas do Martim*");
    lines.push("");

    const sorted = [...pendingList].sort((a, b) => a.dateKey.localeCompare(b.dateKey));

    sorted.forEach(item => {
        const d = parseDateKey(item.dateKey);
        const dayLabel = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });
        const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        const hStr = item.hours.toString().replace('.', ',');
        const valStr = (item.amount || (item.hours * 11)).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
        const noteStr = item.note ? ` (${item.note})` : '';

        lines.push(`📅 ${capitalizedDay}: ${hStr}h = ${valStr}${noteStr}`);
    });

    const hTotalStr = (Math.round(totalHours * 100) / 100).toString().replace('.', ',');
    const valTotalStr = totalAmount.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

    lines.push("");
    lines.push(`⏱️ *Total de Horas:* ${hTotalStr} h (11,00 € / hora)`);
    lines.push(`💰 *TOTAL A PAGAR:* ${valTotalStr}`);

    return lines.join("\n");
}

function buildPendingWorkTextES(pendingList, totalHours, totalAmount) {
    if (pendingList.length === 0) return "Sin horas de trabajo acumuladas.";

    const lines = [];
    lines.push("💶 *Horas de Trabajo Acumuladas — Casas do Martim*");
    lines.push("");

    const sorted = [...pendingList].sort((a, b) => a.dateKey.localeCompare(b.dateKey));

    sorted.forEach(item => {
        const d = parseDateKey(item.dateKey);
        const dayLabel = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
        const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        const hStr = item.hours.toString().replace('.', ',');
        const valStr = (item.amount || (item.hours * 11)).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
        const noteStr = item.note ? ` (${item.note})` : '';

        lines.push(`📅 ${capitalizedDay}: ${hStr}h = ${valStr}${noteStr}`);
    });

    const hTotalStr = (Math.round(totalHours * 100) / 100).toString().replace('.', ',');
    const valTotalStr = totalAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

    lines.push("");
    lines.push(`⏱️ *Total de Horas:* ${hTotalStr} h (11,00 € / hora)`);
    lines.push(`💰 *TOTAL A PAGAR:* ${valTotalStr}`);

    return lines.join("\n");
}

function showPaymentsView() {
    let html = renderNavigation();
    const pData = getPayrollData();
    const rate = pData.ratePerHour || 11;
    const pendingList = pData.pendingWork || [];
    const settlementsList = pData.settlements || [];

    const totalPendingHours = pendingList.reduce((sum, w) => sum + (parseFloat(w.hours) || 0), 0);
    const totalPendingAmount = pendingList.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);

    const formattedPendingAmount = totalPendingAmount.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    const formattedPendingHours = (Math.round(totalPendingHours * 100) / 100).toString().replace('.', ',');

    // Cálculo da Média Mensal
    const monthlyTotals = {};
    settlementsList.forEach(s => {
        const m = (s.settledDate || "").substring(0, 7);
        if (m) {
            monthlyTotals[m] = (monthlyTotals[m] || 0) + (parseFloat(s.totalAmount) || 0);
        }
    });
    pendingList.forEach(w => {
        const m = (w.dateKey || "").substring(0, 7);
        if (m) {
            monthlyTotals[m] = (monthlyTotals[m] || 0) + (parseFloat(w.amount) || 0);
        }
    });

    const activeMonthsCount = Object.keys(monthlyTotals).length;
    const totalAllEarnings = Object.values(monthlyTotals).reduce((sum, v) => sum + v, 0);
    const monthlyAverage = activeMonthsCount > 0 ? (totalAllEarnings / activeMonthsCount) : 0;
    const formattedMonthlyAverage = monthlyAverage.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

    const textPT = buildPendingWorkTextPT(pendingList, totalPendingHours, totalPendingAmount);
    const textES = buildPendingWorkTextES(pendingList, totalPendingHours, totalPendingAmount);

    const todayStr = formatDateKey(new Date());

    html += `
        <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 6px;">
                <h1 style="margin: 0; font-size: 26px;">💶 Gestão de Pagamentos & Horas</h1>
                <div style="background: rgba(139,92,246,0.1); border: 1.5px solid rgba(139,92,246,0.3); padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; color: #7c3aed;">
                    Tarifa: <strong>11,00 € / hora</strong>
                </div>
            </div>
            <div style="font-size: 13px; color: #666;">
                Registo de horas de trabalho, cálculo automático de valores a pagar e histórico de liquidações.
            </div>
        </div>

        <!-- Cartões de Resumo no Topo -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 24px;">
            <div style="background: linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.08)); border: 2px solid ${totalPendingAmount > 0 ? '#ef4444' : '#10b981'}; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${totalPendingAmount > 0 ? '#dc2626' : '#059669'};">
                    ${totalPendingAmount > 0 ? '⚠️ Total a Dever (Pendente)' : '✅ Sem Valores a Dever'}
                </div>
                <div style="font-size: 30px; font-weight: 900; color: ${totalPendingAmount > 0 ? '#dc2626' : '#059669'}; margin: 6px 0 2px 0;">
                    ${formattedPendingAmount}
                </div>
                <div style="font-size: 13px; opacity: 0.8;">
                    <strong>${formattedPendingHours}</strong> horas de trabalho acumuladas
                </div>
            </div>

            <div style="background: rgba(255,255,255,0.7); border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6d28d9;">
                    📊 Média Mensal
                </div>
                <div style="font-size: 30px; font-weight: 900; color: #6d28d9; margin: 6px 0 2px 0;">
                    ${formattedMonthlyAverage} <span style="font-size: 16px; font-weight: 600; opacity: 0.7;">/ mês</span>
                </div>
                <div style="font-size: 13px; opacity: 0.8;">
                    Calculada com base em <strong>${activeMonthsCount || 1}</strong> ${activeMonthsCount === 1 ? 'mês' : 'meses'} registado${activeMonthsCount === 1 ? '' : 's'}
                </div>
            </div>
        </div>

        <!-- Separadores / Tabs -->
        <div style="display: flex; gap: 10px; margin-bottom: 22px; border-bottom: 2px solid rgba(0,0,0,0.06); padding-bottom: 12px; flex-wrap: wrap;">
            <button onclick="window.togglePaymentsTab(false)"
                style="padding: 10px 20px; font-size: 14px; font-weight: bold; cursor: pointer; border-radius: 10px; border: none; transition: all 0.2s ease; ${!showPaymentsHistory ? 'background: #8b5cf6; color: white; box-shadow: 0 4px 12px rgba(139,92,246,0.35);' : 'background: rgba(0,0,0,0.05); color: #555;'}">
                ⏳ Horas a Pagar (${pendingList.length})
            </button>
            <button onclick="window.togglePaymentsTab(true)"
                style="padding: 10px 20px; font-size: 14px; font-weight: bold; cursor: pointer; border-radius: 10px; border: none; transition: all 0.2s ease; ${showPaymentsHistory ? 'background: #8b5cf6; color: white; box-shadow: 0 4px 12px rgba(139,92,246,0.35);' : 'background: rgba(0,0,0,0.05); color: #555;'}">
                📜 Histórico de Pagamentos (${settlementsList.length})
            </button>
        </div>
    `;

    if (!showPaymentsHistory) {
        // ═══════════════════════════════════════════════
        // TAB 1: REGISTO DE HORAS & PENDENTES
        // ═══════════════════════════════════════════════
        html += `
            <!-- Formulário de Adicionar Dia de Trabalho -->
            <div style="border: 2px solid #8b5cf6; border-radius: 16px; padding: 20px; margin-bottom: 26px; background: rgba(139,92,246,0.03); box-shadow: 0 4px 15px rgba(139,92,246,0.06);">
                <div style="font-size: 16px; font-weight: bold; color: #7c3aed; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>➕ Registar Dia de Trabalho</span>
                    <span style="font-size: 12px; font-weight: normal; color: #666;">(11 € / hora)</span>
                </div>
                <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 5px; color: #444;">📅 Data do Trabalho:</label>
                        <input type="date" id="al-work-date-input" value="${todayStr}"
                            style="padding: 10px 14px; border: 1.5px solid #ccc; border-radius: 10px; font-size: 14px; cursor: pointer;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 5px; color: #444;">⏱️ Número de Horas (ex: 2,5 ou 4):</label>
                        <input type="text" id="al-work-hours-input" placeholder="Ex: 2,5"
                            oninput="window.onWorkHoursInput(this.value)"
                            onkeydown="if(event.key==='Enter') window.addWorkEntry()"
                            style="padding: 10px 14px; border: 1.5px solid #ccc; border-radius: 10px; font-size: 14px; width: 140px; font-weight: bold;">
                    </div>
                    <div style="flex-grow: 1; min-width: 180px;">
                        <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 5px; color: #444;">📝 Notas / Descrição (opcional):</label>
                        <input type="text" id="al-work-note-input" placeholder="Ex: Limpeza Achada 1 e Impasse"
                            onkeydown="if(event.key==='Enter') window.addWorkEntry()"
                            style="padding: 10px 14px; border: 1.5px solid #ccc; border-radius: 10px; font-size: 14px; width: 100%; box-sizing: border-box;">
                    </div>
                    <div>
                        <button onclick="window.addWorkEntry()"
                            style="padding: 10px 22px; font-size: 14px; cursor: pointer; border-radius: 10px; border: none; background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; font-weight: bold; box-shadow: 0 4px 14px rgba(139,92,246,0.35);">
                            ➕ Adicionar
                        </button>
                    </div>
                </div>
                <div id="al-work-calc-preview" style="font-size: 13px; font-weight: 600; color: #7c3aed; margin-top: 10px; min-height: 18px;"></div>
            </div>

            <!-- Barra de Ações: Já Paguei Tudo & Copiar PT/ES -->
            ${pendingList.length > 0 ? `
                <div style="margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; background: rgba(16,185,129,0.06); border: 1.5px dashed #10b981; border-radius: 14px; padding: 16px 18px;">
                    <div>
                        <strong style="font-size: 15px; color: #059669;">💰 Desejas enviar ou liquidar as contas?</strong>
                        <div style="font-size: 12px; color: #555;">Copia a mensagem com todos os dias e o total a pagar (${formattedPendingAmount}) ou marca tudo como liquidado.</div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                        <button onclick="window.copyFromData(this, '${encodeURIComponent(textPT)}')"
                            style="padding: 10px 16px; font-size: 13px; cursor: pointer; border-radius: 10px; border: 1.5px solid #007bff; background: linear-gradient(135deg, #007bff, #0056b3); color: white; font-weight: bold; box-shadow: 0 2px 8px rgba(0,123,255,0.25);">
                            🇵🇹 Copiar PT (${formattedPendingAmount})
                        </button>
                        <button onclick="window.copyFromData(this, '${encodeURIComponent(textES)}')"
                            style="padding: 10px 16px; font-size: 13px; cursor: pointer; border-radius: 10px; border: 1.5px solid #e11d48; background: linear-gradient(135deg, #e11d48, #be123c); color: white; font-weight: bold; box-shadow: 0 2px 8px rgba(225,29,72,0.25);">
                            🇪🇸 Copiar ES (${formattedPendingAmount})
                        </button>
                        <button onclick="window.settleAllPayments()"
                            style="padding: 10px 18px; font-size: 13px; cursor: pointer; border-radius: 10px; border: none; background: linear-gradient(135deg, #10b981, #059669); color: white; font-weight: bold; box-shadow: 0 3px 10px rgba(16,185,129,0.3);">
                            ✓ Já Paguei Tudo (${formattedPendingAmount})
                        </button>
                    </div>
                </div>
            ` : ''}

            <!-- Lista de Dias de Trabalho Pendentes -->
            <h2 style="font-size: 19px; margin: 0 0 14px 0; color: #333;">📋 Dias de Trabalho Acumulados (Por Pagar)</h2>
        `;

        if (pendingList.length === 0) {
            html += `
                <div style="text-align: center; padding: 40px 20px; border: 2px dashed rgba(0,0,0,0.1); border-radius: 16px; background: rgba(255,255,255,0.4); margin-bottom: 25px;">
                    <span style="font-size: 42px;">✨</span>
                    <div style="font-size: 16px; font-weight: bold; margin-top: 8px; color: #333;">Sem horas pendentes de pagamento!</div>
                    <div style="font-size: 13px; color: #666; margin-top: 4px;">Podes registar novos dias de trabalho no formulário acima.</div>
                </div>
            `;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px;">`;
            pendingList.forEach(item => {
                const isEditing = editingWorkId === item.id;
                const d = parseDateKey(item.dateKey);
                const dayLabel = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
                const formattedHours = item.hours.toString().replace('.', ',');
                const formattedItemAmount = (item.amount || (item.hours * 11)).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

                if (isEditing) {
                    html += `
                        <div style="border: 2px solid #8b5cf6; border-radius: 14px; padding: 14px 18px; background: #fff; box-shadow: 0 4px 15px rgba(139,92,246,0.15);">
                            <div style="font-size: 14px; font-weight: bold; color: #7c3aed; margin-bottom: 10px;">✏️ Editar Registo de Trabalho</div>
                            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px;">
                                <input type="date" id="al-edit-date-${item.id}" value="${item.dateKey}"
                                    style="padding: 8px 12px; border: 1.5px solid #ccc; border-radius: 8px; font-size: 13px;">
                                <input type="text" id="al-edit-hours-${item.id}" value="${formattedHours}" placeholder="Horas"
                                    style="padding: 8px 12px; border: 1.5px solid #ccc; border-radius: 8px; font-size: 13px; width: 100px; font-weight: bold;">
                                <input type="text" id="al-edit-note-${item.id}" value="${item.note || ''}" placeholder="Notas (opcional)"
                                    style="padding: 8px 12px; border: 1.5px solid #ccc; border-radius: 8px; font-size: 13px; flex-grow: 1;">
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <button onclick="window.saveWorkEntry('${item.id}')"
                                    style="padding: 6px 14px; font-size: 13px; cursor: pointer; border-radius: 6px; border: none; background: #10b981; color: white; font-weight: bold;">
                                    💾 Guardar
                                </button>
                                <button onclick="window.cancelEditWork()"
                                    style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: #f8f9fa; color: #555;">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div style="border: 1px solid rgba(0,0,0,0.1); border-radius: 14px; padding: 14px 18px; background: rgba(255,255,255,0.85); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
                            <div>
                                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                                    <strong style="font-size: 15px; color: #111;">📅 ${capitalizedDay}</strong>
                                    <span style="background: rgba(139,92,246,0.12); color: #7c3aed; font-weight: 800; padding: 2px 10px; border-radius: 12px; font-size: 13px;">
                                        ⏱️ ${formattedHours} h
                                    </span>
                                    <span style="font-size: 14px; font-weight: 800; color: #059669;">
                                        = ${formattedItemAmount}
                                    </span>
                                </div>
                                ${item.note ? `<div style="font-size: 12px; color: #666; margin-top: 4px; font-style: italic;">📝 ${item.note}</div>` : ''}
                            </div>
                            <div style="display: flex; gap: 6px;">
                                <button onclick="window.startEditWork('${item.id}')" title="Corrigir valores deste dia"
                                    style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 8px; border: 1px solid #6c757d; background: transparent; color: #495057; font-weight: bold;">
                                    ✏️ Corrigir
                                </button>
                                <button onclick="window.deleteWorkEntry('${item.id}')" title="Apagar este registo"
                                    style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 8px; border: 1px solid #dc3545; background: transparent; color: #dc3545; font-weight: bold;">
                                    🗑️ Apagar
                                </button>
                            </div>
                        </div>
                    `;
                }
            });
            html += `</div>`;
        }
    } else {
        // ═══════════════════════════════════════════════
        // TAB 2: HISTÓRICO DE PAGAMENTOS LIQUIDADOS (GRUPOS)
        // ═══════════════════════════════════════════════
        html += `<h2 style="font-size: 19px; margin: 0 0 14px 0; color: #333;">📜 Histórico de Pagamentos Realizados</h2>`;

        if (settlementsList.length === 0) {
            html += `
                <div style="text-align: center; padding: 40px 20px; border: 2px dashed rgba(0,0,0,0.1); border-radius: 16px; background: rgba(255,255,255,0.4); margin-bottom: 25px;">
                    <span style="font-size: 42px;">📜</span>
                    <div style="font-size: 16px; font-weight: bold; margin-top: 8px; color: #333;">Ainda não foram arquivados pagamentos totais.</div>
                    <div style="font-size: 13px; color: #666; margin-top: 4px;">Quando clicares em "Já Paguei Tudo" nas horas a pagar, o grupo liquidado aparecerá aqui.</div>
                </div>
            `;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 18px; margin-bottom: 25px;">`;
            settlementsList.forEach(settle => {
                const sDate = parseDateKey(settle.settledDate);
                const sDateLabel = sDate.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const sCapitalized = sDateLabel.charAt(0).toUpperCase() + sDateLabel.slice(1);
                const formattedSettleAmount = settle.totalAmount.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
                const formattedSettleHours = settle.totalHours.toString().replace('.', ',');
                const items = settle.items || [];

                let itemsRowsHtml = '';
                items.forEach(it => {
                    const itDate = parseDateKey(it.dateKey);
                    const itDateLabel = itDate.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
                    const itHours = it.hours.toString().replace('.', ',');
                    const itAmount = (it.amount || (it.hours * (settle.rate || 11))).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

                    itemsRowsHtml += `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 13px;">
                            <div>
                                <span>📅 ${itDateLabel}</span>
                                ${it.note ? `<span style="color: #666; font-size: 12px; margin-left: 8px;">(${it.note})</span>` : ''}
                            </div>
                            <div style="display: flex; gap: 14px; align-items: center;">
                                <span style="font-weight: 600; color: #7c3aed;">${itHours} h</span>
                                <strong style="color: #059669;">${itAmount}</strong>
                            </div>
                        </div>
                    `;
                });

                html += `
                    <div style="border: 1.5px solid rgba(16,185,129,0.4); border-radius: 16px; padding: 18px; background: rgba(255,255,255,0.9); box-shadow: 0 4px 14px rgba(16,185,129,0.06); border-left: 6px solid #10b981;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 8px; font-size: 12px; font-weight: bold;">PAGO</span>
                                    <strong style="font-size: 16px; color: #111;">💰 Pagamento de ${sCapitalized}</strong>
                                </div>
                                <div style="font-size: 13px; color: #666; margin-top: 3px;">
                                    Total pago: <strong style="color: #059669; font-size: 15px;">${formattedSettleAmount}</strong> • <strong>${formattedSettleHours}</strong> horas (${items.length} dia${items.length !== 1 ? 's' : ''})
                                </div>
                            </div>
                            <div style="display: flex; gap: 6px;">
                                <button onclick="window.reopenSettlement('${settle.id}')" title="Reabrir este pagamento e devolver os dias para as horas a pagar"
                                    style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 8px; border: 1px solid #7c3aed; background: rgba(124,58,237,0.08); color: #7c3aed; font-weight: bold;">
                                    ↩️ Reabrir Horas
                                </button>
                                <button onclick="window.deleteSettlement('${settle.id}')" title="Remover este registo histórico"
                                    style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 8px; border: 1px solid #dc3545; background: transparent; color: #dc3545; font-weight: bold;">
                                    🗑️ Apagar
                                </button>
                            </div>
                        </div>

                        <div style="background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 12px 14px; margin-top: 10px;">
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #555; margin-bottom: 6px; letter-spacing: 0.5px;">Dias incluídos neste pagamento:</div>
                            ${itemsRowsHtml}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }
    }

    result.innerHTML = html;
}

loadCalendars();


