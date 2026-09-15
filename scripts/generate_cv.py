from pathlib import Path
from io import BytesIO

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
OUTPUT = ROOT / "public" / "CV-Ulrich-Babbel-Mbonihankuye.pdf"
PHOTO = ROOT / "public" / "images" / "portrait-ulrich.png"

INK = HexColor("#082f28")
LIME = HexColor("#bdf26f")
MINT = HexColor("#5eead4")
PAPER = HexColor("#f7f7f2")
TEXT = HexColor("#18352f")
MUTED = HexColor("#5c706b")
WHITE = HexColor("#ffffff")
LINE = HexColor("#d7dfdb")

pdfmetrics.registerFont(TTFont("CVRegular", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("CVBold", r"C:\Windows\Fonts\arialbd.ttf"))


def style(name, size, leading=None, color=TEXT, font="CVRegular", space_after=0):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading or size * 1.25,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
    )


BODY = style("body", 8.4, 11.3)
BODY_SMALL = style("body-small", 7.5, 9.6, MUTED)
BODY_WHITE = style("body-white", 7.8, 10.3, HexColor("#dcebe6"))
TITLE = style("section", 11.2, 13, INK, "CVBold")
ITEM_TITLE = style("item-title", 8.8, 10.5, TEXT, "CVBold")
ITEM_META = style("item-meta", 7.3, 9, MUTED, "CVBold")
SIDE_TITLE = style("side-title", 8.4, 10, LIME, "CVBold")
SIDE_META = style("side-meta", 7.3, 9.2, HexColor("#93aba3"), "CVRegular")


def draw_paragraph(pdf, text, x, y_top, width, paragraph_style, max_height=80 * mm):
    paragraph = Paragraph(text, paragraph_style)
    _, height = paragraph.wrap(width, max_height)
    paragraph.drawOn(pdf, x, y_top - height)
    return y_top - height


def section_heading(pdf, text, x, y, width):
    pdf.setFillColor(LIME)
    pdf.rect(x, y - 3.1 * mm, 2.2 * mm, 3.1 * mm, fill=1, stroke=0)
    y = draw_paragraph(pdf, text.upper(), x + 5 * mm, y, width - 5 * mm, TITLE)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.5)
    pdf.line(x, y - 2.2 * mm, x + width, y - 2.2 * mm)
    return y - 5.2 * mm


def item(pdf, title, meta, description, x, y, width, gap=4.2 * mm):
    y = draw_paragraph(pdf, title, x, y, width, ITEM_TITLE)
    y -= 0.5 * mm
    y = draw_paragraph(pdf, meta, x, y, width, ITEM_META)
    y -= 1 * mm
    y = draw_paragraph(pdf, description, x, y, width, BODY_SMALL)
    return y - gap


def draw_photo(pdf, cx, cy, radius):
    image_buffer = BytesIO()
    with Image.open(PHOTO) as source_image:
        source_image.convert("RGB").save(image_buffer, format="JPEG", quality=88, optimize=True)
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
    pdf.drawImage(
        image,
        cx - draw_width / 2,
        cy - draw_height / 2,
        draw_width,
        draw_height,
        preserveAspectRatio=True,
        mask="auto",
    )
    pdf.restoreState()
    pdf.setStrokeColor(LIME)
    pdf.setLineWidth(2)
    pdf.circle(cx, cy, radius, fill=0, stroke=1)


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    width, height = A4

    main_x = 17 * mm
    main_w = 122 * mm
    side_x = 148 * mm
    side_w = 45 * mm

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.rect(0, height - 60 * mm, width, 60 * mm, fill=1, stroke=0)
    pdf.rect(145 * mm, 0, width - 145 * mm, height, fill=1, stroke=0)

    pdf.setFillColor(LIME)
    pdf.roundRect(main_x, height - 18 * mm, 44 * mm, 6.5 * mm, 3.25 * mm, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("CVBold", 7.1)
    pdf.drawCentredString(main_x + 22 * mm, height - 15.8 * mm, "DISPONIBLE EN ALTERNANCE")

    pdf.setFillColor(WHITE)
    pdf.setFont("CVBold", 27)
    pdf.drawString(main_x, height - 31 * mm, "ULRICH BABBEL")
    pdf.setFillColor(LIME)
    pdf.drawString(main_x, height - 43 * mm, "MBONIHANKUYE")
    pdf.setFillColor(WHITE)
    pdf.setFont("CVRegular", 11)
    pdf.drawString(main_x, height - 51 * mm, "Développement logiciel, web et data")

    draw_photo(pdf, 174 * mm, height - 30 * mm, 18.5 * mm)

    y = height - 70 * mm
    y = section_heading(pdf, "Profil", main_x, y, main_w)
    profile = (
        "Étudiant en Master ICE-LD à l'Université Toulouse Jean Jaurès, je conçois des "
        "applications web et logicielles fiables, de la modélisation des données jusqu'à "
        "l'interface. Je recherche une alternance pour contribuer à des produits utiles "
        "tout en renforçant mes compétences en ingénierie logicielle, web et data."
    )
    y = draw_paragraph(pdf, profile, main_x, y, main_w, BODY) - 5 * mm

    y = section_heading(pdf, "Expérience et projets", main_x, y, main_w)
    y = item(
        pdf,
        "Stage - Solio Group | Applicant Tracking System (ATS)",
        "DÉVELOPPEMENT WEB - PROJET DE FIN D'ÉTUDES",
        "Contribution à la conception d'un outil de suivi des candidatures avec React, "
        "Express, gestion des e-mails et authentification sécurisée.",
        main_x,
        y,
        main_w,
    )
    y = item(
        pdf,
        "GEM e-Mobility",
        "PLATEFORME WEB - MOBILITÉ ÉLECTRIQUE",
        "Présentation du déploiement de la première station de mobilité électrique au "
        "Burundi, avec une interface accessible et adaptée aux différents écrans.",
        main_x,
        y,
        main_w,
    )
    y = item(
        pdf,
        "Portfolio bilingue",
        "REACT - VITE - API - VERCEL",
        "Conception d'un portfolio français/anglais, intégration d'un formulaire de contact "
        "avec envoi d'e-mails et déploiement continu depuis GitHub.",
        main_x,
        y,
        main_w,
    )

    y = section_heading(pdf, "Formation", main_x, y + 0.5 * mm, main_w)
    y = item(
        pdf,
        "Master ICE-LD",
        "2025 - PRÉSENT | UNIVERSITÉ TOULOUSE JEAN JAURÈS",
        "Ingénierie continue des écosystèmes logiciels et données : développement, DevOps "
        "et gestion des données.",
        main_x,
        y,
        main_w,
        3.2 * mm,
    )
    y = item(
        pdf,
        "Licence MIASHS",
        "2022 - 2025 | UNIVERSITÉ TOULOUSE JEAN JAURÈS",
        "Mathématiques et informatique appliquées aux sciences humaines et sociales. "
        "Spécialisation en développement logiciel et analyse de données.",
        main_x,
        y,
        main_w,
        0,
    )

    side_y = height - 64 * mm
    side_y = draw_paragraph(pdf, "CONTACT", side_x, side_y, side_w, SIDE_TITLE) - 2.5 * mm
    contact_lines = [
        "Toulouse, France",
        "<link href='mailto:ulrichbab09@gmail.com' color='#dcebe6'>ulrichbab09@gmail.com</link>",
        "+33 6 35 67 02 68",
        "<link href='https://github.com/Rich9153' color='#dcebe6'>github.com/Rich9153</link>",
        "<link href='https://www.linkedin.com/in/ulrich-babbel-mbonihankuye-798a752b1/' color='#dcebe6'>LinkedIn / Ulrich Babbel</link>",
        "<link href='https://portefolio-five-teal.vercel.app/' color='#dcebe6'>Portfolio en ligne</link>",
    ]
    for line in contact_lines:
        side_y = draw_paragraph(pdf, line, side_x, side_y, side_w, BODY_WHITE) - 1.5 * mm

    side_y -= 5 * mm
    side_y = draw_paragraph(pdf, "COMPÉTENCES", side_x, side_y, side_w, SIDE_TITLE) - 2.5 * mm
    skill_groups = [
        ("LANGAGES", "Python, Java, C, C++, Go, SQL"),
        ("FRONTEND", "React, Vue.js, JavaScript, TypeScript, HTML5, CSS3"),
        ("BACKEND", "Node.js, Python, API REST"),
        ("DONNÉES", "PostgreSQL, MariaDB, Power BI"),
        ("OUTILS", "Git, GitHub, Docker, Postman, VS Code, Eclipse"),
    ]
    for label, values in skill_groups:
        side_y = draw_paragraph(pdf, label, side_x, side_y, side_w, ITEM_META) - 0.6 * mm
        side_y = draw_paragraph(pdf, values, side_x, side_y, side_w, BODY_WHITE) - 3.1 * mm

    side_y -= 2 * mm
    side_y = draw_paragraph(pdf, "AUTRES FORMATIONS", side_x, side_y, side_w, SIDE_TITLE) - 2.5 * mm
    side_y = draw_paragraph(pdf, "Licence en Informatique de Gestion", side_x, side_y, side_w, BODY_WHITE) - 1 * mm
    side_y = draw_paragraph(pdf, "2020 - 2022 | Université Lumière de Bujumbura", side_x, side_y, side_w, SIDE_META) - 3 * mm
    side_y = draw_paragraph(pdf, "Baccalauréat scientifique", side_x, side_y, side_w, BODY_WHITE) - 1 * mm
    draw_paragraph(pdf, "2018 - 2019 | Lycée du Lac Tanganyika", side_x, side_y, side_w, SIDE_META)

    pdf.setFillColor(MINT)
    pdf.rect(side_x, 13 * mm, side_w, 1.2 * mm, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#b8cec7"))
    pdf.setFont("CVRegular", 6.5)
    pdf.drawString(side_x, 8.8 * mm, "CV mis à jour en septembre 2026")

    pdf.setTitle("CV - Ulrich Babbel Mbonihankuye")
    pdf.setAuthor("Ulrich Babbel Mbonihankuye")
    pdf.setSubject("Développement logiciel, web et data")
    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    build_cv()
