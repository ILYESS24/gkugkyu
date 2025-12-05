# Dockerfile pour Flo AI API - Racine du repository
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copier d'abord le dossier parent pour éviter les problèmes de chemins avec espaces
COPY Downloads/ ./Downloads/

# Trouver et copier les fichiers depuis la structure réelle
# La structure est: Downloads/flo-ai-develop (2)/flo-ai-develop/aurora_ai/requirements.txt
RUN FLO_DIR=$(find Downloads/ -type d -name "flo-ai-develop" -path "*flo-ai-develop*" | head -1) && \
    if [ -z "$FLO_DIR" ]; then \
        echo "ERROR: flo-ai-develop directory not found" && \
        ls -la Downloads/ && \
        exit 1; \
    fi && \
    echo "Found flo-ai-develop at: $FLO_DIR" && \
    REQ_FILE="$FLO_DIR/aurora_ai/requirements.txt" && \
    API_FILE="$FLO_DIR/api.py" && \
    AURORA_DIR="$FLO_DIR/aurora_ai" && \
    if [ ! -f "$REQ_FILE" ]; then \
        echo "ERROR: requirements.txt not found at $REQ_FILE" && \
        find "$FLO_DIR" -name "*.txt" | head -10 && \
        exit 1; \
    fi && \
    cp "$REQ_FILE" . && \
    pip install --no-cache-dir -r requirements.txt && \
    cp -r "$AURORA_DIR" ./aurora_ai/ && \
    cp "$API_FILE" .

# Créer un utilisateur non-root
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Exposer le port
EXPOSE 8000

# Commande de démarrage
CMD ["python", "api.py"]
