import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  id: string;
  building_type: string;
  surface: number;
  current_lighting: string;
  postal_code: string;
  company_name: string;
  siren: string;
  employees: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  created_at: string;
}

async function sendEmail(from: string, to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error("Resend API error:", data);
    throw new Error(`Failed to send email: ${JSON.stringify(data)}`);
  }

  return data;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    console.log("Nouveau lead reçu:", leadData);

    const commercialEmailHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0E1B25; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #19B86A, #16a05e); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
      .content { background: #F5F7F9; padding: 30px; border-radius: 0 0 8px 8px; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
      .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #19B86A; }
      .label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px; }
      .value { font-size: 16px; font-weight: 600; color: #0E1B25; }
      .section { margin: 25px 0; }
      .section-title { font-size: 18px; font-weight: 600; color: #0E1B25; margin-bottom: 15px; border-bottom: 2px solid #19B86A; padding-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">🆕 Nouvelle Demande CEE LED</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Reçue le ${new Date(leadData.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      <div class="content">
        <div class="section">
          <div class="section-title">📋 Informations du Projet</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Type de bâtiment</div>
              <div class="value">${leadData.building_type}</div>
            </div>
            <div class="info-item">
              <div class="label">Surface éclairée</div>
              <div class="value">${leadData.surface} m²</div>
            </div>
            <div class="info-item">
              <div class="label">Éclairage actuel</div>
              <div class="value">${leadData.current_lighting}</div>
            </div>
            <div class="info-item">
              <div class="label">Code postal</div>
              <div class="value">${leadData.postal_code}</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">🏢 Informations Entreprise</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Entreprise</div>
              <div class="value">${leadData.company_name}</div>
            </div>
            <div class="info-item">
              <div class="label">SIREN</div>
              <div class="value">${leadData.siren}</div>
            </div>
            <div class="info-item">
              <div class="label">Effectifs</div>
              <div class="value">${leadData.employees}</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">👤 Contact</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Nom</div>
              <div class="value">${leadData.first_name} ${leadData.last_name}</div>
            </div>
            <div class="info-item">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${leadData.email}" style="color: #19B86A;">${leadData.email}</a></div>
            </div>
            <div class="info-item">
              <div class="label">Téléphone</div>
              <div class="value"><a href="tel:${leadData.phone}" style="color: #19B86A;">${leadData.phone}</a></div>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">ID du lead : ${leadData.id}</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

    // Email 1 : Notification à l'équipe commerciale
    const commercialEmail = await sendEmail(
      "EnvironnementCEE <onboarding@resend.dev>",
      ["environnementcee@gmail.com"],
      `🆕 Nouvelle demande CEE LED - ${leadData.company_name}`,
      commercialEmailHTML
    );

    console.log("Email commercial envoyé:", commercialEmail);

    const prospectEmailHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0E1B25; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #19B86A, #16a05e); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: #F5F7F9; padding: 30px; border-radius: 0 0 8px 8px; }
      .checkmark { font-size: 48px; margin-bottom: 10px; }
      .highlight-box { background: white; border-left: 4px solid #19B86A; padding: 20px; margin: 20px 0; border-radius: 6px; }
      .recap-item { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
      .recap-item:last-child { border-bottom: none; }
      .label { font-weight: 600; color: #0E1B25; }
      .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="checkmark">✓</div>
        <h1 style="margin: 0; font-size: 26px;">Demande Reçue !</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Nous vous répondrons sous 48 heures</p>
      </div>
      <div class="content">
        <p>Bonjour ${leadData.first_name} ${leadData.last_name},</p>
        
        <p>Nous avons bien reçu votre demande d'éligibilité aux <strong>Certificats d'Économies d'Énergie (CEE)</strong> pour votre projet d'éclairage LED.</p>

        <div class="highlight-box">
          <h3 style="margin-top: 0; color: #19B86A;">📝 Récapitulatif de votre demande</h3>
          <div class="recap-item">
            <span class="label">Entreprise :</span> ${leadData.company_name}
          </div>
          <div class="recap-item">
            <span class="label">Type de bâtiment :</span> ${leadData.building_type}
          </div>
          <div class="recap-item">
            <span class="label">Surface éclairée :</span> ${leadData.surface} m²
          </div>
          <div class="recap-item">
            <span class="label">Éclairage actuel :</span> ${leadData.current_lighting}
          </div>
          <div class="recap-item">
            <span class="label">Code postal :</span> ${leadData.postal_code}
          </div>
        </div>

        <h3 style="color: #0E1B25;">🔄 Prochaines étapes</h3>
        <ol style="padding-left: 20px;">
          <li><strong>Analyse de votre demande</strong> - Notre équipe examine votre éligibilité aux aides CEE</li>
          <li><strong>Prise de contact</strong> - Nous vous contacterons sous 48h par email ou téléphone</li>
          <li><strong>Étude personnalisée</strong> - Un expert vous proposera une solution adaptée</li>
        </ol>

        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0;"><strong>💡 Le saviez-vous ?</strong></p>
          <p style="margin: 5px 0 0 0;">Les aides CEE peuvent financer jusqu'à 80% de votre projet d'éclairage LED, tout en réduisant votre consommation énergétique de façon drastique.</p>
        </div>

        <p>Si vous avez des questions en attendant notre retour, n'hésitez pas à nous contacter à <a href="mailto:environnementcee@gmail.com" style="color: #19B86A;">environnementcee@gmail.com</a></p>

        <p>À très bientôt,<br><strong>L'équipe EnvironnementCEE.fr</strong></p>

        <div class="footer">
          <p>EnvironnementCEE.fr - Votre partenaire pour la transition énergétique</p>
          <p>Cet email a été envoyé à ${leadData.email}</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

    // Email 2 : Confirmation au prospect
    const prospectEmail = await sendEmail(
      "EnvironnementCEE <onboarding@resend.dev>",
      [leadData.email],
      "Votre demande d'éligibilité CEE a bien été reçue",
      prospectEmailHTML
    );

    console.log("Email prospect envoyé:", prospectEmail);

    return new Response(
      JSON.stringify({ success: true, commercialEmail, prospectEmail }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erreur dans notify-new-lead:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
