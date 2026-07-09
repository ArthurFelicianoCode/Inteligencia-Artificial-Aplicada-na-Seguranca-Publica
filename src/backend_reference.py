import pandas as pd
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import ai_model

app = FastAPI(title="SafeZone API - Baixada Santista")

class Ocorrencia(BaseModel):
    id: str
    cidade: str
    tipo: str
    veiculo: str
    data: str
    lat: float
    lng: float
    bairro: str
    isHotspot: Optional[bool] = False

@app.post("/upload", response_model=List[Ocorrencia])
async def upload_planilha(file: UploadFile = File(...)):
    # Lendo o arquivo (CSV ou Excel)
    if file.filename.endswith('.csv'):
        df = pd.read_csv(file.file)
    else:
        df = pd.read_excel(file.file)
        
    # Limpeza e padronização (Pandas)
    df = df.dropna(subset=['tipo', 'veiculo', 'data']) # Remove registros sem informações chave
    
    # Geocodificação Automática (Simulação)
    # Se 'lat' e 'lng' não existirem, chamaria uma API do Google Maps / Mapbox
    if 'lat' not in df.columns or 'lng' not in df.columns:
        df['lat'], df['lng'] = ai_model.geocode_bairros(df['cidade'], df['bairro'])
        
    # Agrupamento de Hotspots via IA
    df = ai_model.cluster_hotspots(df)
    
    # Predição e Geração de Insights de Risco
    insights = ai_model.generate_insights(df)
    print("Insights gerados:", insights)
    
    # Prepara resposta para o Frontend
    return df.to_dict(orient="records")

@app.get("/insights")
def get_insights():
    # Retorna os últimos insights processados
    return {"message": "Monitoramento constante ativado."}
