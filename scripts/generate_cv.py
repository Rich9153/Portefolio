from pathlib import Path
from io import BytesIO
import shutil

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "CV-Ulrich-Babbel-Mbonihankuye-Full-Stack-IA.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "CV-Ulrich-Babbel-Mbonihankuye.pdf"
PHOTO = ROOT / "public" / "images" / "portrait-ulrich.png"

BURGUNDY = HexColor("#2a0d17")
BURGUNDY_2 = HexColor("#3a1321")
ACCENT = HexColor("#b52b52")
ROSE = HexColor("#f0a0b5")
CYAN = HexColor("#5eead4")
PAPER = HexColor("#fbf8f9")
TEXT = HexColor("#2c1b22")
MUTED = HexColor("#6f5a63")
WHITE = HexColor("#fff9fb")
SIDE_TEXT = HexColor("#eadce1")
LINE = HexColor("#e2d4d9")

pdfmetrics.registerFont(TTFont("CVRegular", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("CVBold", r"C:\Windows\Fonts\arialbd.ttf"))


def style(name, size, leading=None, color=TEXT, font="CVRegular"):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=leading or size * 1.25,
                          textColor=color, alignment=TA_LEFT, splitLongWords=False)


BODY = style("body", 8.15, 10.6)
BODY_SMALL = style("body-small", 7.25, 9.2, MUTED)
BODY_SIDE = style("body-side", 7.35, 9.5, SIDE_TEXT)
SECTION = style("section", 10.6, 12.5, BURGUNDY, "CVBold")
ITEM_TITLE = style("item-title", 8.55, 10.3, TEXT, "CVBold")
ITEM_META = style("item-meta", 6.85, 8.5, ACCENT, "CVBold")
SIDE_TITLE = style("side-title", 8.2, 10, ROSE, "CVBold")
SIDE_LABEL = style("side-label", 6.65, 8.2, CYAN, "CVBold")
SIDE_META = style("side-meta", 6.8, 8.8, HexColor("#bfaab2"))


def draw_paragraph(pdf, text, x, y_top, width, paragraph_style, max_height=100 * mm):
    paragraph = Paragraph(text, paragraph_style)
    _, height = paragraph.wrap(width, max_height)
    paragraph.drawOn(pdf, x, y_top - height)
    return y_top - height


def section_heading(pdf, text, x, y, width):
    pdf.setFillColor(ACCENT)
    pdf.roundRect(x, y - 3.0 * mm, 2.3 * mm, 3.0 * mm, 0.8 * mm, fill=1, stroke=0)
    y = draw_paragraph(pdf, text.upper(), x + 5 * mm, y, width - 5 * mm, SECTION)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.55)
    pdf.line(x, y - 1.7 * mm, x + width, y - 1.7 * mm)
    return y - 4.6 * mm


def item(pdf, title, meta, description, x, y, width, gap=3.2 * mm):
    y = draw_paragraph(pdf, title, x, y, width, ITEM_TITLE)
    y -= 0.4 * mm
    y = draw_paragraph(pdf, meta.upper(), x, y, width, ITEM_META)
    y -= 0.8 * mm
    y = draw_paragraph(pdf, description, x, y, width, BODY_SMALL)
    return y - gap


def compact_item(pdf, title, description, x, y, width, gap=2.2 * mm):
    y = draw_paragraph(pdf, f"<b>{title}</b> - {description}", x, y, width, BODY_SMALL)
    return y - gap


def draw_photo(pdf, cx, cy, radius):
    image_buffer = BytesIO()
    with Image.open(PHOTO) as source_image:
        source_image.convert("RGB").save(image_buffer, format="JPEG", quality=90, optimize=True)
    image_buffer.seek(0)
    image = ImageReader(image_buffer)
    image_width, image_height = image.getSize()
    diameter = radius * 2
    scale = max(diameter / image_width, diameter / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    path = pdf.beginPath()
    path.circle(cx, cy, radius)
    pdf.saveState()
    pdf.clipPath(path, stroke=0, fill=0)
    pdf.drawImage(image, cx - draw_width / 2, cy - draw_height / 2, draw_width, draw_height,
                  preserveAspectRatio=True, mask="auto")
    pdf.restoreState()
    pdf.setStrokeColor(ROSE)
    pdf.setLineWidth(2.2)
    pdf.circle(cx, cy, radius, fill=0, stroke=1)


def sidebar_group(pdf, label, values, x, y, width):
    y = draw_paragraph(pdf, label.upper(), x, y, width, SIDE_LABEL) - 0.5 * mm
    y = draw_paragraph(pdf, values, x, y, width, BODY_SIDE)
    return y - 2.8 * mm


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    width, height = A4
    main_x, main_w = 15 * mm, 119 * mm
    side_x, side_w = 143 * mm, 51 * mm

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(BURGUNDY)
    pdf.rect(0, height - 61 * mm, width, 61 * mm, fill=1, stroke=0)
    pdf.setFillColor(BURGUNDY_2)
    pdf.rect(140 * mm, 0, width - 140 * mm, height, fill=1, stroke=0)

    pdf.setFillColor(ACCENT)
    pdf.roundRect(main_x, height - 16.5 * mm, 53 * mm, 6.2 * mm, 3.1 * mm, fill=1, stroke=0)
    pdf.setFillColor(WHITE)
    pdf.setFont("CVBold", 6.8)
    pdf.drawCentredString(main_x + 26.5 * mm, height - 14.4 * mm, "ALTERNANCE - SEPTEMBRE 2026")
    pdf.setFillColor(WHITE)
    pdf.setFont("CVBold", 24)
    pdf.drawString(main_x, height - 29.5 * mm, "ULRICH BABBEL")
    pdf.setFillColor(ROSE)
    pdf.drawString(main_x, height - 40.5 * mm, "MBONIHANKUYE")
    pdf.setFillColor(WHITE)
    pdf.setFont("CVBold", 10.5)
    pdf.drawString(main_x, height - 49.2 * mm, "DÉVELOPPEUR FULL STACK & IA")
    pdf.setFillColor(HexColor("#d7c4cb"))
    pdf.setFont("CVRegular", 7.7)
    pdf.drawString(main_x, height - 55.3 * mm, "Applications web, API REST, données et automatisation")
    draw_photo(pdf, 174 * mm, height - 30.5 * mm, 18.7 * mm)

    y = height - 68 * mm
    y = section_heading(pdf, "Profil", main_x, y, main_w)
    profile = ("Étudiant en Master ICE-LD à l'Université Toulouse Jean Jaurès, je développe des "
               "applications web de bout en bout, de la base de données à l'interface et au déploiement. "
               "Mon expérience actuelle en intégration CRM/ERP Odoo renforce ma compréhension des processus "
               "métiers. Autonome, rigoureux et curieux, je souhaite contribuer à des applications internes "
               "et progresser sur l'intégration de LLM, les assistants IA et l'automatisation.")
    y = draw_paragraph(pdf, profile, main_x, y, main_w, BODY) - 4.2 * mm

    y = section_heading(pdf, "Expériences pertinentes", main_x, y, main_w)
    y = item(pdf, "Croissance Capital | Intégration CRM/ERP Odoo",
             "Projet professionnel en cours - Paris, filiales Afrique et Canada",
             "Intégration et adaptation des processus CRM/ERP dans Odoo : centralisation des données, "
             "harmonisation des workflows et amélioration du suivi opérationnel entre plusieurs entités.",
             main_x, y, main_w)
    y = item(pdf, "Solio Group | Applicant Tracking System (ATS)",
             "Stage - Développement Full Stack",
             "Contribution à un outil de suivi des candidatures avec React et Express : fonctionnalités "
             "métier, échanges API, envoi d'e-mails avec Nodemailer et authentification sécurisée avec Bcrypt.",
             main_x, y, main_w)
    y = item(pdf, "Portfolio bilingue | React, API et déploiement continu",
             "Projet personnel - React, Vite, API Serverless, GitHub, Vercel",
             "Conception d'un portfolio français/anglais, création d'une API de contact, tests fonctionnels "
             "et publication continue. Gestion des évolutions avec Git et documentation du projet.",
             main_x, y, main_w, 3.7 * mm)

    y = section_heading(pdf, "Projets sélectionnés", main_x, y, main_w)
    y = compact_item(pdf, "Campus Explorer",
                     "application collaborative réalisée en équipe avec JavaScript, PHP, MariaDB et Bootstrap ; "
                     "authentification, données et fonctionnalités interactives.", main_x, y, main_w)
    y = compact_item(pdf, "Programmation réseau",
                     "projet académique en C autour d'une architecture client-serveur et des échanges réseau.",
                     main_x, y, main_w, 3.8 * mm)

    y = section_heading(pdf, "Objectif d'alternance", main_x, y, main_w)
    objective = ("Participer au cycle de vie d'applications internes : compréhension du besoin, développement "
                 "Full Stack, API REST, tests et mise en production. Prototyper progressivement des usages "
                 "d'IA générative pour créer des assistants et automatiser des processus métier.")
    y = draw_paragraph(pdf, objective, main_x, y, main_w, BODY_SMALL) - 3.8 * mm

    y = section_heading(pdf, "Formation", main_x, y, main_w)
    y = item(pdf, "Master ICE-LD", "2025 - Présent | Université Toulouse Jean Jaurès",
             "Ingénierie continue des écosystèmes logiciels et données : développement, DevOps, "
             "architecture logicielle et gestion des données.", main_x, y, main_w, 2.4 * mm)
    item(pdf, "Licence MIASHS", "2022 - 2025 | Université Toulouse Jean Jaurès",
         "Mathématiques et informatique appliquées, développement logiciel et analyse de données.",
         main_x, y, main_w, 0)

    side_y = height - 64.5 * mm
    side_y = draw_paragraph(pdf, "CONTACT", side_x, side_y, side_w, SIDE_TITLE) - 2.2 * mm
    contact_lines = [
        "Toulouse, France",
        "<link href='mailto:ulrichbab09@gmail.com' color='#eadce1'>ulrichbab09@gmail.com</link>",
        "+33 6 35 67 02 68",
        "<link href='https://github.com/Rich9153' color='#eadce1'>github.com/Rich9153</link>",
        "<link href='https://www.linkedin.com/in/ulrich-babbel-mbonihankuye-798a752b1/' color='#eadce1'>LinkedIn / Ulrich Babbel</link>",
        "<link href='https://portefolio-five-teal.vercel.app/' color='#eadce1'>Portfolio en ligne</link>",
    ]
    for line in contact_lines:
        side_y = draw_paragraph(pdf, line, side_x, side_y, side_w, BODY_SIDE) - 1.25 * mm

    side_y -= 4.1 * mm
    side_y = draw_paragraph(pdf, "COMPÉTENCES", side_x, side_y, side_w, SIDE_TITLE) - 2.3 * mm
    groups = [
        ("Langages", "JavaScript / TypeScript, Python, SQL, Java, C"),
        ("Full Stack", "React, Vue.js, Node.js, Express, PHP, HTML5, CSS3, API REST"),
        ("Données", "PostgreSQL, MariaDB, modélisation et requêtes SQL"),
        ("CRM / ERP", "Odoo, workflows métier, intégration et centralisation des données"),
        ("IA et automatisation", "LLM, assistants et agents IA, intégration par API - montée en compétence"),
        ("Outils", "Git, GitHub, Docker, Postman, Vercel, VS Code"),
    ]
    for label, values in groups:
        side_y = sidebar_group(pdf, label, values, side_x, side_y, side_w)

    side_y -= 1.8 * mm
    side_y = draw_paragraph(pdf, "ATOUTS", side_x, side_y, side_w, SIDE_TITLE) - 2.2 * mm
    side_y = draw_paragraph(pdf, "Autonomie<br/>Rigueur<br/>Curiosité technique<br/>Apprentissage rapide<br/>"
                            "Travail en équipe<br/>Force de proposition", side_x, side_y, side_w, BODY_SIDE)
    side_y -= 5.5 * mm
    side_y = draw_paragraph(pdf, "AUTRES FORMATIONS", side_x, side_y, side_w, SIDE_TITLE) - 2.2 * mm
    side_y = draw_paragraph(pdf, "Licence en Informatique de Gestion", side_x, side_y, side_w, BODY_SIDE) - 0.7 * mm
    side_y = draw_paragraph(pdf, "2020 - 2022 | Université Lumière de Bujumbura", side_x, side_y, side_w, SIDE_META) - 2.6 * mm
    side_y = draw_paragraph(pdf, "Baccalauréat scientifique", side_x, side_y, side_w, BODY_SIDE) - 0.7 * mm
    draw_paragraph(pdf, "2018 - 2019 | Lycée du Lac Tanganyika", side_x, side_y, side_w, SIDE_META)

    pdf.setFillColor(ACCENT)
    pdf.rect(side_x, 13 * mm, side_w, 1.1 * mm, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#baa4ad"))
    pdf.setFont("CVRegular", 6.3)
    pdf.drawString(side_x, 8.8 * mm, "CV ciblé Full Stack & IA - octobre 2026")
    pdf.setTitle("CV - Ulrich Babbel Mbonihankuye - Full Stack et IA")
    pdf.setAuthor("Ulrich Babbel Mbonihankuye")
    pdf.setSubject("Candidature alternance Développeur Full Stack et IA - septembre 2026")
    pdf.showPage()
    pdf.save()
    shutil.copy2(OUTPUT, PUBLIC_OUTPUT)


if __name__ == "__main__":
    build_cv()
