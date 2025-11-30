// src/app/lib/utils/pdfGenerator.js
import jsPDF from 'jspdf';

/**
 * Genera un PDF de la bitácora completa
 */
export const generateBitacoraPDF = async (childName, entries) => {
  const doc = new jsPDF();
  
  // Configuración
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Función auxiliar para agregar nueva página si es necesario
  const checkPageBreak = (requiredHeight) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Función para dividir texto en líneas
  const splitText = (text, maxWidth) => {
    return doc.splitTextToSize(text, maxWidth);
  };

  // PORTADA
  doc.setFillColor(251, 191, 36); // Yellow-400
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(26, 18, 92); // Purple oscuro
  doc.setFontSize(32);
  doc.setFont(undefined, 'bold');
  doc.text('BITÁCORA', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text(childName, pageWidth / 2, 50, { align: 'center' });

  yPosition = 80;

  // Fecha de generación
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generado el ${today}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // ENTRADAS
  entries.forEach((entry, index) => {
    // Verificar espacio para el encabezado
    checkPageBreak(40);

    // Fondo amarillo para cada entrada
    doc.setFillColor(254, 243, 199); // Yellow-100
    
    // Fecha
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text(entry.fecha || '', margin, yPosition);
    
    yPosition += 8;

    // Descripción
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    const lines = splitText(entry.descripcion || '', maxWidth);
    const textHeight = lines.length * 7;
    
    // Verificar espacio para el texto
    checkPageBreak(textHeight + 10);
    
    // Dibujar fondo
    doc.rect(margin, yPosition - 5, maxWidth, textHeight + 10, 'F');
    
    // Dibujar texto
    lines.forEach((line, i) => {
      doc.text(line, margin + 5, yPosition + (i * 7));
    });
    
    yPosition += textHeight + 20;

    // Separador entre entradas (excepto la última)
    if (index < entries.length - 1) {
      checkPageBreak(10);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    }
  });

  // PIE DE PÁGINA en todas las páginas
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Fundación Huahuacuna - Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Guardar PDF
  doc.save(`bitacora-${childName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`);
};