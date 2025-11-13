import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { tipo, proyecto, dotacion, descripcion } = await request.json();

    let subject = '';
    let htmlContent = '';

    if (tipo === 'voluntariado') {
      subject = `Nuevo Voluntario - Proyecto: ${proyecto}`;
      htmlContent = `
        <h2>Nueva solicitud de voluntariado</h2>
        <p><strong>Proyecto seleccionado:</strong> ${proyecto}</p>
        <p><strong>Descripción:</strong></p>
        <p>${descripcion}</p>
      `;
    } else if (tipo === 'dotacion') {
      subject = `Nueva Donación de Dotación: ${dotacion}`;
      htmlContent = `
        <h2>Nueva donación de dotación</h2>
        <p><strong>Tipo de dotación:</strong> ${dotacion}</p>
        <p><strong>Descripción:</strong></p>
        <p>${descripcion}</p>
      `;
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sn09pro@gmail.com',
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}