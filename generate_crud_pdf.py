import os
import sys
from reportlab.lib.pagesizes import letter, landscape, A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # We are using A4 Landscape: width = 841.89, height = 595.27
        width, height = landscape(A4)
        
        # Header
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#2C3E35")) # Moss Green
        self.drawString(54, height - 36, "EcoStay AI — W5 CRUD Verification Report")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#C5A880")) # Gold
        self.drawRightString(width - 54, height - 36, "TBI-26100184")
        
        # Divider lines
        self.setStrokeColor(colors.HexColor("#C5A880"))
        self.setLineWidth(1)
        self.line(54, height - 42, width - 54, height - 42)
        
        # Footer
        self.setStrokeColor(colors.HexColor("#E5E7EB"))
        self.line(54, 46, width - 54, 46)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#9CA3AF"))
        self.drawString(54, 30, "Database Integration & API Testing Verification")
        
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(width - 54, 30, page_text)
        
        self.restoreState()


def compile_pdf():
    intern_id = "TBI-26100184"
    output_filename = f"W5_CRUDVerification_{intern_id}.pdf"
    
    # Check if files exist
    files = ["1_read.png", "2_create.png", "3_update.png", "4_delete.png"]
    missing = [f for f in files if not os.path.exists(f)]
    
    if missing:
        print(f"[ERROR] Missing files: {missing}")
        sys.exit(1)

    print("Compiling high-quality PDF using ReportLab...")

    # Set up landscape document
    page_width, page_height = landscape(A4)
    # Margins: 54 pt (0.75 inch)
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=landscape(A4),
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#2C3E35"),
        spaceAfter=15,
        alignment=1 # Center
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#6B7F73"),
        spaceAfter=30,
        alignment=1 # Center
    )

    h1_style = ParagraphStyle(
        'StepTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#2C3E35"),
        spaceAfter=8
    )

    caption_style = ParagraphStyle(
        'StepCaption',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#374151"), # Slate 700
    )

    story = []

    # --- COVER PAGE ---
    story.append(Spacer(1, 120))
    story.append(Paragraph("<b>EcoStay AI</b>", title_style))
    story.append(Paragraph("<b>W5 CRUD Operations Verification Report</b>", ParagraphStyle(
        'DocHeader',
        parent=title_style,
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#C5A880"),
        spaceAfter=30
    )))
    
    # Details Box Table
    info_data = [
        [Paragraph("<b>Intern ID:</b>", caption_style), Paragraph(intern_id, caption_style)],
        [Paragraph("<b>Topic:</b>", caption_style), Paragraph("Database Integration, REST API & Frontend CRUD Verification", caption_style)],
        [Paragraph("<b>Status:</b>", caption_style), Paragraph("<font color='#059669'><b>Completed & Verified</b></font>", caption_style)],
        [Paragraph("<b>Date:</b>", caption_style), Paragraph("July 4, 2026", caption_style)]
    ]
    info_table = Table(info_data, colWidths=[100, 300])
    info_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#F3F4F6"))
    ]))
    
    # Wrap table in a centered container table
    outer_table = Table([[info_table]], colWidths=[400])
    outer_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E5E7EB")),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF9F6")),
        ('TOPPADDING', (0,0), (-1,-1), 15),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
    ]))
    story.append(outer_table)
    story.append(PageBreak())

    # --- CRUD PAGES ---
    steps = [
        {
            "file": "1_read.png",
            "title": "1. Read Operation (List Database Records)",
            "caption": "This screenshot displays the <b>Admin Panel</b> interface displaying the live list of homestays. The application executes a <b>GET</b> request to the database via FastAPI, which retrieves the active properties with details like pricing, rating, sustainability levels, and features, and maps them to this responsive management table."
        },
        {
            "file": "2_create.png",
            "title": "2. Create Operation (Add Record to Database)",
            "caption": "This screenshot displays the creation of a new homestay named <b>'Paradise Dev Eco Resort'</b>. Clicking the 'Add New Villa' button opens the modal form. Upon submission, a <b>POST</b> request writes the data directly to the database. The table updates automatically, and a green success toast confirms it."
        },
        {
            "file": "3_update.png",
            "title": "3. Update Operation (Modify Database Record)",
            "caption": "This screenshot displays the successful update of the newly created villa. Selecting the 'Edit' action triggers a modal pre-filled with database values. The user updated the price per night to <b>₹8,200</b>. The <b>PUT</b> request modified the record, and the UI refreshed with the new price and a success toast."
        },
        {
            "file": "4_delete.png",
            "title": "4. Delete Operation (Remove Record from Database)",
            "caption": "This screenshot displays the deletion flow. Clicking the 'Delete' icon on 'Paradise Dev Eco Resort' prompts a confirm dialog. Upon acceptance, a <b>DELETE</b> request permanently clears the row from the database. The record immediately vanishes from the frontend list, and a success toast confirms deletion."
        }
    ]

    # Printable page height limit: 595.27 - margins = 487.27
    # Landscape A4 printable width: 841.89 - 108 = 733.89
    
    for step in steps:
        story.append(Paragraph(step["title"], h1_style))
        
        # Add screenshot scaled to fit nicely
        # Widescreen standard aspect ratio is 16:9 or 16:10.
        # Let's scale it to fit within 560 width, which keeps height around 315-350.
        # This leaves plenty of space for text and margins!
        img = Image(step["file"], width=560, height=315)
        img.hAlign = 'CENTER'
        story.append(img)
        story.append(Spacer(1, 10))
        
        # Caption box table
        caption_p = Paragraph(step["caption"], caption_style)
        caption_table = Table([[caption_p]], colWidths=[700])
        caption_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF9F6")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E5E7EB")),
            ('TOPPADDING', (0,0), (-1,-1), 10),
            ('BOTTOMPADDING', (0,0), (-1,-1), 10),
            ('LEFTPADDING', (0,0), (-1,-1), 15),
            ('RIGHTPADDING', (0,0), (-1,-1), 15),
        ]))
        story.append(caption_table)
        story.append(PageBreak())

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[SUCCESS] High-quality PDF compiled successfully at: {output_filename}")


if __name__ == "__main__":
    compile_pdf()
