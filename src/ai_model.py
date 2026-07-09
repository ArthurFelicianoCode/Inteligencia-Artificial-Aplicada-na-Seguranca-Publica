from sklearn.cluster import DBSCAN
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np

def geocode_bairros(cidades, bairros):
    # Simula chamada a uma API de Geocoding (Google Maps ou Mapbox)
    # Ex: requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?address={bairro},+{cidade}")
    return np.random.uniform(-24.0, -23.8, len(bairros)), np.random.uniform(-46.4, -46.2, len(bairros))

def cluster_hotspots(df, eps=0.015, min_samples=3):
    """
    Usa o DBSCAN para encontrar aglomerações (Zonas Vermelhas/Hotspots) 
    de furtos/roubos na Baixada Santista com base em densidade geográfica.
    eps=0.015 equivale a cerca de 1.5km na linha do equador.
    """
    coords = df[['lat', 'lng']].values
    
    # Opcionalmente, pode-se usar a métrica de Haversine para distâncias precisas em KM
    # db = DBSCAN(eps=eps, min_samples=min_samples, metric='haversine', algorithm='ball_tree')
    db = DBSCAN(eps=eps, min_samples=min_samples).fit(coords)
    
    # Adiciona flag de Hotspot (onde a label não for -1)
    df['isHotspot'] = db.labels_ != -1
    return df

def generate_insights(df):
    """
    Análise Preditiva e Geração de Texto Natural.
    """
    insights = []
    
    # Predição simplificada: Se um bairro tem uma concentração alta nos últimos 30 dias, risco aumenta.
    recentes = pd.to_datetime(df['data']) >= (pd.Timestamp.now() - pd.Timedelta(days=30))
    df_recent = df[recentes]
    
    if not df_recent.empty:
        # Contagem por bairro
        bairros_risco = df_recent['bairro'].value_counts()
        bairro_pior = bairros_risco.index[0]
        aumento = (bairros_risco.iloc[0] / len(df_recent)) * 100
        
        insights.append(f"Atenção: Aumento significativo nas ocorrências no bairro {bairro_pior} ({aumento:.1f}% dos casos recentes).")
    
    # Modelo Preditivo (Random Forest para prever probabilidade do próximo evento ser um Roubo vs Furto)
    # Apenas um exemplo arquitetônico
    X = df[['lat', 'lng', 'isHotspot']]
    y = df['tipo'] # Classificar se é Furto ou Roubo
    
    # Treino rápido de exemplo (na vida real, salvaria o modelo com joblib ou pickle)
    clf = RandomForestClassifier(n_estimators=10)
    clf.fit(X, y)
    
    return insights
