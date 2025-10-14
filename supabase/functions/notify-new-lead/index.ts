import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  id: string;
  aid_type: string;
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string;
  created_at: string;
  // Champs optionnels
  building_type?: string;
  surface?: number;
  current_lighting?: string;
  company_name?: string;
  siren?: string;
  employees?: string;
  ceiling_height?: number;
  fixture_count?: number;
  current_fixture_type?: string;
  zone_type?: string;
  sun_exposure?: string;
  lamppost_height?: number;
  wall_material?: string;
  insulation_type?: string;
  construction_year?: number;
  income_bracket?: string;
  heating_system?: string;
  pac_type?: string;
  usage_type?: string;
  room_count?: number;
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

    // Déterminer le titre selon le type d'aide
    const aideTitles: Record<string, string> = {
      led_entrepot: "LED Entrepôt",
      led_bureau: "LED Bureau",
      led_solaire: "LED Solaire",
      isolation: "Isolation",
      pac: "Pompe à Chaleur",
      brasseur_air: "Brasseur d'Air",
      housse_piscine: "Housse de Piscine",
    };
    const aideTitle = aideTitles[leadData.aid_type] || leadData.aid_type;

    // Construction des détails du projet selon le type d'aide
    let projectDetails = "";
    if (leadData.aid_type === "led_entrepot" || leadData.aid_type === "led_bureau") {
      projectDetails = `
        ${leadData.surface ? `<div class="info-item"><div class="label">Surface</div><div class="value">${leadData.surface} m²</div></div>` : ""}
        ${leadData.ceiling_height ? `<div class="info-item"><div class="label">Hauteur sous plafond</div><div class="value">${leadData.ceiling_height} m</div></div>` : ""}
        ${leadData.fixture_count ? `<div class="info-item"><div class="label">Nombre de luminaires</div><div class="value">${leadData.fixture_count}</div></div>` : ""}
        ${leadData.current_fixture_type ? `<div class="info-item"><div class="label">Type actuel</div><div class="value">${leadData.current_fixture_type}</div></div>` : ""}
      `;
    } else if (leadData.aid_type === "led_solaire") {
      projectDetails = `
        ${leadData.fixture_count ? `<div class="info-item"><div class="label">Nombre de points lumineux</div><div class="value">${leadData.fixture_count}</div></div>` : ""}
        ${leadData.zone_type ? `<div class="info-item"><div class="label">Type de zone</div><div class="value">${leadData.zone_type}</div></div>` : ""}
        ${leadData.sun_exposure ? `<div class="info-item"><div class="label">Exposition</div><div class="value">${leadData.sun_exposure}</div></div>` : ""}
        ${leadData.lamppost_height ? `<div class="info-item"><div class="label">Hauteur lampadaires</div><div class="value">${leadData.lamppost_height} m</div></div>` : ""}
      `;
    } else if (leadData.aid_type === "isolation") {
      projectDetails = `
        ${leadData.building_type ? `<div class="info-item"><div class="label">Type de bâtiment</div><div class="value">${leadData.building_type}</div></div>` : ""}
        ${leadData.surface ? `<div class="info-item"><div class="label">Surface à isoler</div><div class="value">${leadData.surface} m²</div></div>` : ""}
        ${leadData.wall_material ? `<div class="info-item"><div class="label">Matériau murs</div><div class="value">${leadData.wall_material}</div></div>` : ""}
        ${leadData.insulation_type ? `<div class="info-item"><div class="label">Type d'isolation</div><div class="value">${leadData.insulation_type}</div></div>` : ""}
        ${leadData.construction_year ? `<div class="info-item"><div class="label">Année construction</div><div class="value">${leadData.construction_year}</div></div>` : ""}
      `;
    } else if (leadData.aid_type === "pac") {
      projectDetails = `
        ${leadData.heating_system ? `<div class="info-item"><div class="label">Chauffage actuel</div><div class="value">${leadData.heating_system}</div></div>` : ""}
        ${leadData.surface ? `<div class="info-item"><div class="label">Surface à chauffer</div><div class="value">${leadData.surface} m²</div></div>` : ""}
        ${leadData.pac_type ? `<div class="info-item"><div class="label">Type de PAC</div><div class="value">${leadData.pac_type}</div></div>` : ""}
        ${leadData.construction_year ? `<div class="info-item"><div class="label">Année construction</div><div class="value">${leadData.construction_year}</div></div>` : ""}
      `;
    } else if (leadData.aid_type === "brasseur_air") {
      projectDetails = `
        ${leadData.usage_type ? `<div class="info-item"><div class="label">Usage</div><div class="value">${leadData.usage_type}</div></div>` : ""}
        ${leadData.ceiling_height ? `<div class="info-item"><div class="label">Hauteur plafond</div><div class="value">${leadData.ceiling_height} m</div></div>` : ""}
        ${leadData.surface ? `<div class="info-item"><div class="label">Surface</div><div class="value">${leadData.surface} m²</div></div>` : ""}
        ${leadData.room_count ? `<div class="info-item"><div class="label">Nombre de pièces</div><div class="value">${leadData.room_count}</div></div>` : ""}
      `;
    } else if (leadData.aid_type === "housse_piscine") {
      projectDetails = `
        ${leadData.surface ? `<div class="info-item"><div class="label">Surface piscine</div><div class="value">${leadData.surface} m²</div></div>` : ""}
        ${leadData.usage_type ? `<div class="info-item"><div class="label">Type d'usage</div><div class="value">${leadData.usage_type}</div></div>` : ""}
      `;
    }

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
        <h1 style="margin: 0; font-size: 24px;">🆕 Nouvelle Demande CEE ${aideTitle}</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Reçue le ${new Date(leadData.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Type: ${leadData.user_type === "particulier" ? "Particulier" : "Professionnel"}</p>
      </div>
      <div class="content">
        <div class="section">
          <div class="section-title">📋 Informations du Projet</div>
          <div class="info-grid">
            ${projectDetails}
            <div class="info-item">
              <div class="label">Code postal</div>
              <div class="value">${leadData.postal_code}</div>
            </div>
          </div>
        </div>
        ${leadData.user_type === "professionnel" && leadData.company_name ? `
        <div class="section">
          <div class="section-title">🏢 Informations Entreprise</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Entreprise</div>
              <div class="value">${leadData.company_name}</div>
            </div>
            ${leadData.siren ? `<div class="info-item"><div class="label">SIREN</div><div class="value">${leadData.siren}</div></div>` : ""}
            ${leadData.employees ? `<div class="info-item"><div class="label">Effectifs</div><div class="value">${leadData.employees}</div></div>` : ""}
          </div>
        </div>
        ` : ""}
        ${leadData.user_type === "particulier" && leadData.income_bracket ? `
        <div class="section">
          <div class="section-title">👤 Informations Particulier</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Tranche de revenus</div>
              <div class="value">${leadData.income_bracket}</div>
            </div>
          </div>
        </div>
        ` : ""}
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
    const subjectName = leadData.user_type === "professionnel" && leadData.company_name 
      ? leadData.company_name 
      : `${leadData.first_name} ${leadData.last_name}`;
    
    const commercialEmail = await sendEmail(
      "EnvironnementCEE <onboarding@resend.dev>",
      ["environnementcee@gmail.com"],
      `🆕 Nouvelle demande CEE ${aideTitle} - ${subjectName}`,
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
            <span class="label">Type d'aide :</span> ${aideTitle}
          </div>
          ${leadData.company_name ? `<div class="recap-item"><span class="label">Entreprise :</span> ${leadData.company_name}</div>` : ""}
          ${leadData.surface ? `<div class="recap-item"><span class="label">Surface :</span> ${leadData.surface} m²</div>` : ""}
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
