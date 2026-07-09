export interface EstatisticaCriminal {
  ano: number;
  municipio: string;
  delito: string;
  taxa_de_delito: number;
  ocorrencia: number;
}

export interface OcorrenciaMapa {
  id: string;
  municipio: string;
  delito: string;
  lat: number;
  lng: number;
  bairro: string;
}

// Simulated grouped data based on the provided python script structure
export const estatisticasMock: EstatisticaCriminal[] = [
  // Praia Grande Data
  { ano: 2018, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 15.2, ocorrencia: 450 },
  { ano: 2018, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 20.1, ocorrencia: 600 },
  { ano: 2018, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 5.5, ocorrencia: 85 },
  { ano: 2019, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 14.5, ocorrencia: 430 },
  { ano: 2019, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 19.8, ocorrencia: 590 },
  { ano: 2019, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 4.8, ocorrencia: 75 },
  { ano: 2020, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 12.0, ocorrencia: 350 },
  { ano: 2020, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 17.5, ocorrencia: 520 },
  { ano: 2020, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 4.5, ocorrencia: 70 },
  { ano: 2021, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 13.2, ocorrencia: 380 },
  { ano: 2021, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 18.0, ocorrencia: 535 },
  { ano: 2021, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 4.0, ocorrencia: 62 },
  { ano: 2022, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 14.8, ocorrencia: 440 },
  { ano: 2022, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 21.0, ocorrencia: 620 },
  { ano: 2022, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 4.2, ocorrencia: 65 },
  { ano: 2023, municipio: 'praia_grande', delito: 'roubo_veiculo', taxa_de_delito: 13.5, ocorrencia: 400 },
  { ano: 2023, municipio: 'praia_grande', delito: 'furto_veiculo', taxa_de_delito: 19.5, ocorrencia: 580 },
  { ano: 2023, municipio: 'praia_grande', delito: 'homicidio', taxa_de_delito: 3.8, ocorrencia: 58 },
  
  // Santos Data
  { ano: 2018, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 12.1, ocorrencia: 320 },
  { ano: 2018, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 25.4, ocorrencia: 680 },
  { ano: 2018, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 3.5, ocorrencia: 45 },
  { ano: 2019, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 11.5, ocorrencia: 305 },
  { ano: 2019, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 24.8, ocorrencia: 660 },
  { ano: 2019, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 3.2, ocorrencia: 40 },
  { ano: 2020, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 9.8, ocorrencia: 250 },
  { ano: 2020, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 20.5, ocorrencia: 540 },
  { ano: 2020, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 2.8, ocorrencia: 35 },
  { ano: 2021, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 10.2, ocorrencia: 270 },
  { ano: 2021, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 22.0, ocorrencia: 590 },
  { ano: 2021, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 2.9, ocorrencia: 38 },
  { ano: 2022, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 11.0, ocorrencia: 290 },
  { ano: 2022, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 23.5, ocorrencia: 630 },
  { ano: 2022, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 3.1, ocorrencia: 42 },
  { ano: 2023, municipio: 'santos', delito: 'roubo_veiculo', taxa_de_delito: 10.5, ocorrencia: 280 },
  { ano: 2023, municipio: 'santos', delito: 'furto_veiculo', taxa_de_delito: 21.8, ocorrencia: 595 },
  { ano: 2023, municipio: 'santos', delito: 'homicidio', taxa_de_delito: 2.5, ocorrencia: 32 },
  
  // São Vicente Data
  { ano: 2018, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 18.5, ocorrencia: 480 },
  { ano: 2018, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 15.2, ocorrencia: 390 },
  { ano: 2018, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 7.2, ocorrencia: 110 },
  { ano: 2019, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 17.8, ocorrencia: 460 },
  { ano: 2019, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 14.5, ocorrencia: 370 },
  { ano: 2019, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 6.8, ocorrencia: 105 },
  { ano: 2020, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 15.0, ocorrencia: 390 },
  { ano: 2020, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 12.5, ocorrencia: 320 },
  { ano: 2020, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 6.5, ocorrencia: 95 },
  { ano: 2021, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 16.2, ocorrencia: 420 },
  { ano: 2021, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 13.8, ocorrencia: 350 },
  { ano: 2021, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 6.0, ocorrencia: 88 },
  { ano: 2022, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 17.5, ocorrencia: 450 },
  { ano: 2022, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 14.0, ocorrencia: 360 },
  { ano: 2022, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 6.3, ocorrencia: 92 },
  { ano: 2023, municipio: 'sao_vicente', delito: 'roubo_veiculo', taxa_de_delito: 16.8, ocorrencia: 435 },
  { ano: 2023, municipio: 'sao_vicente', delito: 'furto_veiculo', taxa_de_delito: 13.5, ocorrencia: 345 },
  { ano: 2023, municipio: 'sao_vicente', delito: 'homicidio', taxa_de_delito: 5.5, ocorrencia: 80 },

  // Guarujá Data
  { ano: 2023, municipio: 'guaruja', delito: 'roubo_veiculo', taxa_de_delito: 15.5, ocorrencia: 380 },
  { ano: 2023, municipio: 'guaruja', delito: 'furto_veiculo', taxa_de_delito: 22.1, ocorrencia: 520 },
  { ano: 2023, municipio: 'guaruja', delito: 'homicidio', taxa_de_delito: 6.8, ocorrencia: 90 },

  // Cubatão Data
  { ano: 2023, municipio: 'cubatao', delito: 'roubo_veiculo', taxa_de_delito: 19.2, ocorrencia: 210 },
  { ano: 2023, municipio: 'cubatao', delito: 'furto_veiculo', taxa_de_delito: 11.5, ocorrencia: 150 },
  { ano: 2023, municipio: 'cubatao', delito: 'homicidio', taxa_de_delito: 8.5, ocorrencia: 65 },

  // Mongaguá Data
  { ano: 2023, municipio: 'mongagua', delito: 'roubo_veiculo', taxa_de_delito: 11.2, ocorrencia: 90 },
  { ano: 2023, municipio: 'mongagua', delito: 'furto_veiculo', taxa_de_delito: 16.5, ocorrencia: 130 },
  { ano: 2023, municipio: 'mongagua', delito: 'homicidio', taxa_de_delito: 4.5, ocorrencia: 25 },

  // Itanhaém Data
  { ano: 2023, municipio: 'itanhaem', delito: 'roubo_veiculo', taxa_de_delito: 10.5, ocorrencia: 110 },
  { ano: 2023, municipio: 'itanhaem', delito: 'furto_veiculo', taxa_de_delito: 18.2, ocorrencia: 190 },
  { ano: 2023, municipio: 'itanhaem', delito: 'homicidio', taxa_de_delito: 5.1, ocorrencia: 35 },

  // Peruíbe Data
  { ano: 2023, municipio: 'peruibe', delito: 'roubo_veiculo', taxa_de_delito: 8.5, ocorrencia: 60 },
  { ano: 2023, municipio: 'peruibe', delito: 'furto_veiculo', taxa_de_delito: 14.8, ocorrencia: 110 },
  { ano: 2023, municipio: 'peruibe', delito: 'homicidio', taxa_de_delito: 3.8, ocorrencia: 20 },

  // Bertioga Data
  { ano: 2023, municipio: 'bertioga', delito: 'roubo_veiculo', taxa_de_delito: 9.2, ocorrencia: 75 },
  { ano: 2023, municipio: 'bertioga', delito: 'furto_veiculo', taxa_de_delito: 15.5, ocorrencia: 125 },
  { ano: 2023, municipio: 'bertioga', delito: 'homicidio', taxa_de_delito: 4.2, ocorrencia: 22 },
];

const CIDADES = [
  { nome: 'santos', lat: -23.9618, lng: -46.3322 },
  { nome: 'sao_vicente', lat: -23.9631, lng: -46.3919 },
  { nome: 'praia_grande', lat: -24.0058, lng: -46.4127 },
  { nome: 'guaruja', lat: -23.9930, lng: -46.2564 },
  { nome: 'cubatao', lat: -23.8950, lng: -46.4253 },
  { nome: 'mongagua', lat: -24.0931, lng: -46.6204 },
  { nome: 'itanhaem', lat: -24.1852, lng: -46.7865 },
  { nome: 'peruibe', lat: -24.3204, lng: -46.9996 },
  { nome: 'bertioga', lat: -23.8540, lng: -46.1390 },
];

// Define land-based bounding boxes for realistic coordinate generation (avoiding the ocean)
const LAND_ZONES = {
  santos: [
    { minLat: -23.965, maxLat: -23.935, minLng: -46.345, maxLng: -46.315 }, // Gonzaga to Centro (inland)
    { minLat: -23.975, maxLat: -23.955, minLng: -46.325, maxLng: -46.305 }, // Ponta da Praia / Embaré (inland)
  ],
  sao_vicente: [
    { minLat: -23.965, maxLat: -23.945, minLng: -46.395, maxLng: -46.370 }, // Centro / Itararé (inland)
    { minLat: -23.950, maxLat: -23.920, minLng: -46.420, maxLng: -46.385 }, // SV Mainland
  ],
  praia_grande: [
    { minLat: -24.010, maxLat: -23.985, minLng: -46.425, maxLng: -46.405 }, // Boqueirão / Guilhermina (Inland)
    { minLat: -24.025, maxLat: -24.005, minLng: -46.465, maxLng: -46.435 }, // Ocian / Tupi (Inland)
    { minLat: -24.045, maxLat: -24.020, minLng: -46.505, maxLng: -46.475 }, // Caiçara (Inland)
  ],
  guaruja: [
    { minLat: -23.985, maxLat: -23.960, minLng: -46.290, maxLng: -46.260 }, // Vicente de Carvalho
    { minLat: -23.990, maxLat: -23.975, minLng: -46.260, maxLng: -46.240 }, // Pitangueiras inland
  ],
  cubatao: [
    { minLat: -23.900, maxLat: -23.870, minLng: -46.440, maxLng: -46.400 }, // Mainland industrial/residential
  ],
  mongagua: [
    { minLat: -24.100, maxLat: -24.080, minLng: -46.630, maxLng: -46.610 }, // Inland blocks
  ],
  itanhaem: [
    { minLat: -24.180, maxLat: -24.160, minLng: -46.790, maxLng: -46.770 }, // Inland blocks
  ],
  peruibe: [
    { minLat: -24.320, maxLat: -24.300, minLng: -47.010, maxLng: -46.990 }, // Inland blocks
  ],
  bertioga: [
    { minLat: -23.850, maxLat: -23.830, minLng: -46.150, maxLng: -46.130 }, // Inland blocks
  ]
};

function generateMockMapData(count: number): OcorrenciaMapa[] {
  const data: OcorrenciaMapa[] = [];
  
  for (let i = 0; i < count; i++) {
    const cidadeInfo = CIDADES[Math.floor(Math.random() * CIDADES.length)];
    const cityZones = LAND_ZONES[cidadeInfo.nome as keyof typeof LAND_ZONES];
    const zone = cityZones[Math.floor(Math.random() * cityZones.length)];
    
    // Generate coordinate within the selected land zone
    const lat = zone.minLat + Math.random() * (zone.maxLat - zone.minLat);
    const lng = zone.minLng + Math.random() * (zone.maxLng - zone.minLng);

    const randDelito = Math.random();
    let delitoType = 'roubo_veiculo';
    if (randDelito > 0.8) delitoType = 'homicidio';
    else if (randDelito > 0.4) delitoType = 'furto_veiculo';

    data.push({
      id: `oc_${Math.random().toString(36).substr(2, 9)}`,
      municipio: cidadeInfo.nome,
      delito: delitoType,
      lat,
      lng,
      bairro: 'Centro' // Placeholder
    });
  }
  return data;
}

export const initialMapData = generateMockMapData(800);
